// Plano B, enquanto o Stripe não estiver configurado: pedido de reserva sem pagamento.
// Confirma datas e preço e envia os dois emails (precisa de GMAIL_USER e GMAIL_APP_PASSWORD).
import { quote, rangeIsFree } from "../../src/config/pricing.js";
import { getAllBusy } from "./lib/bookings.mjs";
import { mailConfigured, sendBookingEmails } from "./lib/mailer.mjs";
import { json, readBooking } from "./lib/validate.mjs";

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "method" });

  let raw;
  try { raw = await req.json(); } catch { return json(400, { error: "invalid" }); }

  // Campo escondido: se vier preenchido é um robô — finge que correu bem
  if (raw.company) return json(200, { ok: true });

  const { b, error } = readBooking(raw);
  if (error) return json(400, { error });

  const q = quote(b.checkIn, b.checkOut, b.adults + b.children);
  if (!q) return json(400, { error: "closed" });

  const today = new Date().toISOString().slice(0, 10);
  const { busy } = await getAllBusy();
  if (!rangeIsFree(b.checkIn, b.checkOut, busy, today)) return json(409, { error: "unavailable" });

  if (!mailConfigured()) return json(503, { error: "not_configured" });

  try {
    await sendBookingEmails({ b, q, kind: "request" });
  } catch (err) {
    console.error("Email:", err.message);
    return json(502, { error: "email" });
  }
  return json(200, { ok: true });
};
