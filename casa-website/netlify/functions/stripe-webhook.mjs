// O Stripe chama este endereço quando um pagamento é concluído, expira ou é reembolsado.
// No Stripe: Programadores → Webhooks → Adicionar destino
//   URL: https://<o-site>/.netlify/functions/stripe-webhook
//   Eventos: checkout.session.completed, checkout.session.async_payment_succeeded,
//            checkout.session.async_payment_failed, checkout.session.expired, charge.refunded
// O "segredo de assinatura" (whsec_…) vai para STRIPE_WEBHOOK_SECRET na Netlify.
import { quote } from "../../src/config/pricing.js";
import { getBooking, saveBooking, listBookings } from "./lib/bookings.mjs";
import { verifyWebhook } from "./lib/stripe.mjs";
import { mailConfigured, sendBookingEmails } from "./lib/mailer.mjs";

const ok = () => new Response("ok");

const notify = async (booking) => {
  if (!mailConfigured()) return;
  try {
    await sendBookingEmails({
      b: booking,
      q: quote(booking.checkIn, booking.checkOut, booking.adults + booking.children),
      test: booking.livemode === false,
    });
  } catch (err) {
    console.error("Email:", err.message);
  }
};

export default async (req) => {
  const raw = await req.text();
  if (!verifyWebhook(raw, req.headers.get("stripe-signature"))) {
    return new Response("bad signature", { status: 400 });
  }

  const event = JSON.parse(raw);
  const session = event.data?.object;

  // Reembolso no Stripe: cancela a reserva e liberta as datas.
  // Conta como cancelamento o reembolso total ou o que só retém a comissão do Stripe
  // (até 5% + 0,50 €); um desconto parcial maior não cancela a reserva.
  if (event.type === "charge.refunded") {
    const kept = (session?.amount_captured ?? session?.amount ?? 0) - (session?.amount_refunded ?? 0);
    const cancelled = session?.refunded || kept <= (session?.amount ?? 0) * 0.05 + 50;
    if (!cancelled) return ok();
    const booking = (await listBookings()).find((b) => b.paymentIntent && b.paymentIntent === session.payment_intent);
    if (booking && booking.status !== "cancelled") {
      await saveBooking({ ...booking, status: "cancelled", refundedAt: Date.now() });
    }
    return ok();
  }

  const id = session?.client_reference_id || session?.metadata?.booking_id;
  if (!id) return ok();

  const booking = await getBooking(id);
  if (!booking) return ok();

  const paid = event.type === "checkout.session.async_payment_succeeded" ||
    (event.type === "checkout.session.completed" && session.payment_status === "paid");

  if (paid && booking.status !== "paid") {
    await saveBooking({ ...booking, status: "paid", paidAt: Date.now(), paymentIntent: session.payment_intent });
    await notify(booking);
  } else if (event.type === "checkout.session.completed" && booking.status === "hold") {
    // Pagamento ainda a confirmar (pode acontecer com o MB WAY): as datas continuam guardadas
    await saveBooking({ ...booking, status: "processing" });
  } else if ((event.type === "checkout.session.async_payment_failed" || event.type === "checkout.session.expired") && booking.status !== "paid") {
    await saveBooking({ ...booking, status: "cancelled" });
  }
  return ok();
};
