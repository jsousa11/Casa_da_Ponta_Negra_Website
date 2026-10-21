// ==========================================
// Dados da casa — EDITAR AQUI
// Campos a `null` não aparecem no site.
// ==========================================

export const site = {
  name: "Casa da Ponta Negra",
  email: "pontanegrahouse@gmail.com",
  phone: "+351963504856",
  phoneDisplay: "(+351) 963 504 856",
  mapsUrl: "https://maps.app.goo.gl/8nCDUXo3fRSxScvWA",
  coords: [36.9851579, -25.0506407],

  // Número de registo de Alojamento Local (obrigatório por lei). Ex.: "12345/AL"
  rnal: "3866/AL",

  // Capacidade
  bedrooms: 2,
  bathrooms: 2,
  maxGuests: 5, // cama de casal + cama queen + sofá-cama (berço disponível)

  // Preços, desconto e regras de reserva: ver pricing.js

  // Horários (ex.: "15:00"). null = não aparece
  checkIn: "17:00",  // Booking: check-in das 17:00 às 23:00
  checkOut: "10:00",

  // Notas médias nas plataformas (ex.: { score: "9,8", count: 42 }). null = não aparece
  ratings: {
    booking: { score: "10", count: 28 },  // "Excecional" (out. 2026)
    airbnb: { score: "5,0", count: 25 },  // Superhost · Favorito dos hóspedes (out. 2026)
  },

  platforms: {
    booking: "https://www.booking.com/hotel/pt/casa-da-ponta-negra-vila-do-porto.html",
    airbnb: "https://www.airbnb.pt/rooms/993976971668808205",
  },

  social: {
    instagram: "https://www.instagram.com/casapontanegra.sma/",
    facebook: "https://www.facebook.com/profile.php?id=61552277438053",
  },
};

// EmailJS (formulário de contacto)
export const emailjsConfig = {
  serviceId: "service_78mmtgl",
  templateId: "template_9etmqy9",
  publicKey: "Q57EjSZH_wzy6dHBf",
};
