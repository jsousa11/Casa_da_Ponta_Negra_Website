// Reservas diretas guardadas na Netlify (Netlify Blobs).
// Estados: "hold" (à espera de pagamento, 30 min) · "processing" (Multibanco/MB Way a confirmar)
//          "paid" (confirmada) · "cancelled"
import { getStore } from "@netlify/blobs";
import snapshot from "../../../src/config/availability-snapshot.json";
import { getBusy } from "./calendar.mjs";

// O Stripe exige pelo menos 30 min; a retenção dura um pouco mais do que o pagamento
export const HOLD_MINUTES = 32;

const store = () => getStore({ name: "bookings", consistency: "strong" });

export const newBookingId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const saveBooking = (booking) => store().setJSON(booking.id, booking);
export const getBooking = (id) => store().get(id, { type: "json" });

export const listBookings = async () => {
  const { blobs } = await store().list();
  const all = await Promise.all(blobs.map((b) => store().get(b.key, { type: "json" })));
  return all.filter(Boolean);
};

// Reservas que ocupam datas: pagas, a confirmar, ou retidas há menos de 30 min.
// As reservas de teste do Stripe (livemode: false) nunca bloqueiam datas.
const isActive = (b, now = Date.now()) =>
  b.livemode !== false && (
    b.status === "paid" || b.status === "processing" ||
    (b.status === "hold" && now - b.createdAt < HOLD_MINUTES * 60000)
  );

export const activeDirectBookings = async () => {
  try {
    return (await listBookings()).filter((b) => isActive(b));
  } catch (err) {
    // Sem Blobs (ex.: em desenvolvimento) não há reservas diretas guardadas
    console.error("Blobs:", err.message);
    return [];
  }
};

/** Todas as noites ocupadas: calendários das plataformas + reservas diretas */
export const getAllBusy = async () => {
  const [{ busy, source }, direct] = await Promise.all([getBusy(snapshot), activeDirectBookings()]);
  return {
    source,
    busy: [...busy, ...direct.map((b) => ({ start: b.checkIn, end: b.checkOut }))],
  };
};
