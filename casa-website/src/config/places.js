// Coordenadas: OpenStreetMap. Tempos de carro: Google Maps a partir da casa (out. 2026),
// arredondados aos 5 minutos.
// A ordem tem de corresponder a `locale.attractions` / `locale.places` nas traduções.

export const attractionsMeta = [
  { coords: [36.98847, -25.05602], here: true,  image: "baia_sao_lourenço.jpg" },
  { coords: [36.98150, -25.06025], minutes: 5,  image: "poço_da_pedreira.jpg" },
  { coords: [36.95100, -25.09764], minutes: 20, image: "praia_formosa.jpg" },
  { coords: [36.93977, -25.06476], minutes: 20, image: "ribeira-de-maloas-6.jpg" },
  { coords: [36.94782, -25.01544], minutes: 25, image: "baia_da_maia.jpg" },
  { coords: [36.94808, -25.02090], minutes: 30, image: "cascata_do_aveiro.jpg" },
  { coords: [37.00010, -25.12210], minutes: 25, image: "barreiro_faneca.jpg" },
];

export const placesMeta = [
  { area: "Baía de São Lourenço", coords: [36.9876317, -25.0546795], url: "https://maps.app.goo.gl/79fQkoN2EAertdQQ9" },
  { area: "Vila do Porto",        coords: [36.9535869, -25.1430252], url: "https://maps.app.goo.gl/5TAG5XAP3Yf4BhuA9" },
  { area: "Vila do Porto",        coords: [36.9559387, -25.1416191], url: "https://maps.app.goo.gl/YFtsE3eTJxVsBPP38" },
  { area: "Vila do Porto",        coords: [36.9566058, -25.1475931], url: "https://maps.app.goo.gl/Aa1cTzHJtWbYYiwe7" },
  { area: "São Pedro",            coords: [37.0078004, -25.1533865], url: "https://maps.app.goo.gl/539iaBwq4xRvCEcR9" },
];

// Link de direções no Google Maps desde a casa
export const directionsUrl = (from, to) =>
  `https://www.google.com/maps/dir/?api=1&origin=${from.join(",")}&destination=${to.join(",")}&travelmode=driving`;
