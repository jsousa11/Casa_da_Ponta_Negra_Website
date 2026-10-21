// Reserva imediata: confirma datas e preço, retém as datas 30 min e abre o pagamento no Stripe.
// Configurar na Netlify: STRIPE_SECRET_KEY e STRIPE_WEBHOOK_SECRET (ver stripe-webhook.mjs).
import process from "node:process";
import crypto from "node:crypto";
import { quote, rangeIsFree } from "../../src/config/pricing.js";
import { site } from "../../src/config/site.js";
import { getAllBusy, activeHolds, saveBooking, newBookingId, HOLD_MINUTES } from "./lib/bookings.mjs";
import { stripe, stripeConfigured } from "./lib/stripe.mjs";
import { json, readBooking } from "./lib/validate.mjs";

// Máximo de pessoas diferentes a pagar ao mesmo tempo (evita que alguém bloqueie o calendário)
const MAX_HOLDS = 5;

// Identifica o visitante sem guardar o IP: só um resumo (hash) dele
const clientId = (req) => {
  const ip = req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for") || "";
  return ip ? crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16) : null;
};

// Fecha a página de pagamento anterior e liberta as datas.
// Se o Stripe recusar (o pagamento já foi feito), a retenção fica como está.
const release = async (hold) => {
  try {
    await stripe(`checkout/sessions/${hold.sessionId}/expire`, {});
    await saveBooking({ ...hold, status: "cancelled" });
  } catch { /* já pago ou já expirado */ }
};

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "method" });
  if (!stripeConfigured()) return json(503, { error: "not_configured" });

  let raw;
  try { raw = await req.json(); } catch { return json(400, { error: "invalid" }); }
  if (raw.company) return json(400, { error: "invalid" });

  const { b, error } = readBooking(raw);
  if (error) return json(400, { error });

  const q = quote(b.checkIn, b.checkOut, b.adults + b.children);
  if (!q) return json(400, { error: "closed" });

  // Cada pessoa só retém umas datas de cada vez: ao tentar de novo, a tentativa anterior é libertada
  const client = clientId(req);
  const holds = await activeHolds();
  const mine = holds.filter((h) => (client && h.client === client) || h.email === b.email);
  await Promise.all(mine.map(release));
  if (holds.length - mine.length >= MAX_HOLDS) return json(429, { error: "busy" });

  const today = new Date().toISOString().slice(0, 10);
  const { busy } = await getAllBusy();
  if (!rangeIsFree(b.checkIn, b.checkOut, busy, today)) return json(409, { error: "unavailable" });

  const id = newBookingId();
  const siteUrl = (process.env.URL || new URL(req.url).origin).replace(/\/$/, "");
  const nightsLabel = b.lang === "pt" ? "noites" : "nights";

  try {
    const session = await stripe("checkout/sessions", {
      mode: "payment",
      payment_method_types: { 0: "card" }, // só cartão (inclui Apple Pay e Google Pay)
      customer_email: b.email,
      locale: b.lang === "pt" ? "pt" : "en",
      client_reference_id: id,
      expires_at: Math.floor(Date.now() / 1000) + (HOLD_MINUTES - 1) * 60,
      success_url: `${siteUrl}/book?status=paid&b=${id}`,
      cancel_url: `${siteUrl}/book?status=cancelled`,
      line_items: {
        0: {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: q.direct * 100,
            product_data: {
              name: `${site.name} · ${b.checkIn} → ${b.checkOut}`,
              description: `${q.nights} ${nightsLabel} · ${b.adults + b.children} ${b.lang === "pt" ? "hóspedes" : "guests"}`,
            },
          },
        },
      },
      payment_intent_data: { description: `${site.name} ${b.checkIn} → ${b.checkOut} · ${b.name}` },
      metadata: { booking_id: id, check_in: b.checkIn, check_out: b.checkOut },
    });

    await saveBooking({ id, ...b, client, total: q.direct, status: "hold", sessionId: session.id, livemode: session.livemode, createdAt: Date.now() });
    return json(200, { url: session.url });
  } catch (err) {
    console.error("Checkout:", err.message);
    return json(502, { error: "payment" });
  }
};
