// Validação comum aos pedidos de reserva vindos do site
import { pricing, nightsBetween } from "../../../src/config/pricing.js";

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const int = (v) => Number.parseInt(v, 10) || 0;
const str = (v, max) => String(v ?? "").trim().slice(0, max);

export const json = (status, data) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

/** Lê e valida o corpo do pedido. Devolve { b } ou { error } */
export const readBooking = (raw) => {
  const b = {
    checkIn: str(raw.checkIn, 10),
    checkOut: str(raw.checkOut, 10),
    adults: int(raw.adults),
    children: int(raw.children),
    infants: int(raw.infants),
    name: str(raw.name, 100),
    email: str(raw.email, 150),
    phone: str(raw.phone, 40),
    message: str(raw.message, 3000),
    lang: raw.lang === "pt" ? "pt" : "en",
  };
  const valid =
    ISO.test(b.checkIn) && ISO.test(b.checkOut) &&
    nightsBetween(b.checkIn, b.checkOut) >= pricing.minNights &&
    b.adults >= 1 && b.children >= 0 && b.infants >= 0 &&
    b.adults + b.children <= pricing.maxGuests && b.infants <= pricing.maxInfants &&
    b.name && EMAIL.test(b.email);
  return valid ? { b } : { error: "invalid" };
};
