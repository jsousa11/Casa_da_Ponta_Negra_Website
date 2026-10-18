// Datas ocupadas: calendários do Airbnb e do Booking + reservas diretas do site.
// Configurar na Netlify: AIRBNB_ICAL_URL e BOOKING_ICAL_URL.
// Sem esses links, usa a cópia guardada em src/config/availability-snapshot.json.
import { getAllBusy } from "./lib/bookings.mjs";

export default async () => {
  const { busy, source } = await getAllBusy();
  return new Response(JSON.stringify({ source, busy }), {
    headers: {
      "Content-Type": "application/json",
      // 1 min de cache: rápido, e as datas acabadas de reservar aparecem logo
      "Cache-Control": "public, max-age=60",
    },
  });
};
