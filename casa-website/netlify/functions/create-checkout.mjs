// Reserva imediata: confirma datas e preço, retém as datas 30 min e abre o pagamento no Stripe.
// Configurar na Netlify: STRIPE_SECRET_KEY e STRIPE_WEBHOOK_SECRET (ver stripe-webhook.mjs).
import process from "node:process";
import { quote, rangeIsFree } from "../../src/config/pricing.js";
import { site } from "../../src/config/site.js";
import { getAllBusy, saveBooking, newBookingId, HOLD_MINUTES } from "./lib/bookings.mjs";
import { stripe, stripeConfigured } from "./lib/stripe.mjs";
import { json, readBooking } from "./lib/validate.mjs";

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

  const today = new Date().toISOString().slice(0, 10);
  const { busy } = await getAllBusy();
  if (!rangeIsFree(b.checkIn, b.checkOut, busy, today)) return json(409, { error: "unavailable" });

  const id = newBookingId();
  const siteUrl = (process.env.URL || new URL(req.url).origin).replace(/\/$/, "");
  const nightsLabel = b.lang === "pt" ? "noites" : "nights";

  try {
    const session = await stripe("checkout/sessions", {
      mode: "payment",
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

    await saveBooking({ id, ...b, total: q.direct, status: "hold", sessionId: session.id, livemode: session.livemode, createdAt: Date.now() });
    return json(200, { url: session.url });
  } catch (err) {
    console.error("Checkout:", err.message);
    return json(502, { error: "payment" });
  }
};
