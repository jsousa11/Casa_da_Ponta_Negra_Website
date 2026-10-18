// Calendário (iCal) com as reservas diretas pagas, para o Airbnb e o Booking importarem.
// Endereço a colar em "Importar calendário" nas duas plataformas:
//   https://<o-site>/.netlify/functions/direct-calendar
// Não inclui nomes nem contactos dos hóspedes.
import { activeDirectBookings } from "./lib/bookings.mjs";

const ymd = (iso) => iso.replaceAll("-", "");

export default async () => {
  const bookings = (await activeDirectBookings()).filter((b) => b.status === "paid" || b.status === "processing");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const events = bookings.map((b) => [
    "BEGIN:VEVENT",
    `UID:${b.id}@casadapontanegra`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd(b.checkIn)}`,
    `DTEND;VALUE=DATE:${ymd(b.checkOut)}`,
    "SUMMARY:Reserva direta (site)",
    "END:VEVENT",
  ].join("\r\n"));

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Casa da Ponta Negra//Reservas diretas//PT",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new Response(ics, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Cache-Control": "no-cache" },
  });
};
