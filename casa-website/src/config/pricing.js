// ==========================================
// Preços e regras de reserva — EDITAR AQUI
// Usado no site e no envio dos emails (netlify/functions).
// ==========================================

export const pricing = {
  // Preço por noite no Airbnb, por mês (1 = janeiro). Lido do Airbnb em out. 2026, 2 adultos.
  // Agosto não tinha datas livres para consultar: usa o preço de julho.
  platformNightly: { 5: 295, 6: 315, 7: 345, 8: 345, 9: 325, 10: 290 },

  // Suplemento por pessoa extra, por noite (igual ao Airbnb: a partir da 3.ª pessoa;
  // crianças contam como adultos, bebés não pagam)
  includedGuests: 2,
  extraGuestNightly: 75,

  // Desconto para reservas diretas no site (0.10 = 10%)
  directDiscount: 0.10,

  minNights: 3,
  maxGuests: 5,   // adultos + crianças
  maxInfants: 1,  // bebés 0–3 anos (berço gratuito)
};

const DAY = 86400000;

// Datas sempre como "YYYY-MM-DD" (sem horas, sem fusos)
export const toISODate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const fromISODate = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const addDaysISO = (s, n) => toISODate(new Date(fromISODate(s).getTime() + n * DAY + 3600000));
export const nightsBetween = (a, b) => Math.round((fromISODate(b) - fromISODate(a)) / DAY);

export const isOpenMonth = (month) => month in pricing.platformNightly;

// Preço por noite nas plataformas para um número de pessoas (adultos + crianças)
export const platformNightly = (month, guests = pricing.includedGuests) => {
  const base = pricing.platformNightly[month];
  if (!base) return null;
  return base + Math.max(0, guests - pricing.includedGuests) * pricing.extraGuestNightly;
};

// Preço direto: desconto aplicado e arredondado para baixo em múltiplos de 5 €
export const directNightly = (month, guests = pricing.includedGuests) => {
  const platform = platformNightly(month, guests);
  return platform ? Math.floor((platform * (1 - pricing.directDiscount)) / 5) * 5 : null;
};

export const lowestDirectNightly = () =>
  Math.min(...Object.keys(pricing.platformNightly).map((m) => directNightly(Number(m))));

/**
 * Orçamento para uma estadia. checkIn/checkOut em "YYYY-MM-DD"; guests = adultos + crianças.
 * Devolve null se alguma noite cair num mês fechado.
 */
export const quote = (checkIn, checkOut, guests = pricing.includedGuests) => {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) return null;
  const lines = [];
  let direct = 0;
  let platform = 0;
  for (let i = 0; i < nights; i++) {
    const month = fromISODate(addDaysISO(checkIn, i)).getMonth() + 1;
    const d = directNightly(month, guests);
    if (d === null) return null;
    direct += d;
    platform += platformNightly(month, guests);
    const last = lines[lines.length - 1];
    if (last && last.nightly === d) last.nights += 1;
    else lines.push({ nightly: d, nights: 1 });
  }
  return { nights, lines, direct, platform, savings: platform - direct };
};

// Noites ocupadas: busy = [{ start, end }] com end exclusivo (dia de saída fica livre)
export const isNightBusy = (iso, busy) => busy.some((r) => iso >= r.start && iso < r.end);

export const isNightBookable = (iso, busy, todayISO) =>
  iso >= todayISO && isOpenMonth(fromISODate(iso).getMonth() + 1) && !isNightBusy(iso, busy);

export const rangeIsFree = (checkIn, checkOut, busy, todayISO) => {
  for (let d = checkIn; d < checkOut; d = addDaysISO(d, 1)) {
    if (!isNightBookable(d, busy, todayISO)) return false;
  }
  return true;
};
