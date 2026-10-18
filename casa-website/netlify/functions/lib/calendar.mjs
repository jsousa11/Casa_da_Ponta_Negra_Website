// Leitura dos calendários iCal das plataformas
import process from "node:process";

const toISO = (yyyymmdd) => `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;

// Extrai os eventos (reservas e bloqueios) de um ficheiro .ics
export const parseICal = (text) => {
  const unfolded = text.replace(/\r?\n[ \t]/g, "");
  const events = [];
  for (const block of unfolded.split("BEGIN:VEVENT").slice(1)) {
    const start = block.match(/DTSTART[^:]*:(\d{8})/);
    const end = block.match(/DTEND[^:]*:(\d{8})/);
    if (start && end) events.push({ start: toISO(start[1]), end: toISO(end[1]) });
  }
  return events;
};

const fetchICal = async (url) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`iCal ${res.status}`);
  return parseICal(await res.text());
};

/** Devolve { busy, source }. Se os calendários falharem, usa a cópia guardada. */
export const getBusy = async (snapshot) => {
  const urls = [process.env.AIRBNB_ICAL_URL, process.env.BOOKING_ICAL_URL].filter(Boolean);
  if (!urls.length) return { busy: snapshot.busy, source: "snapshot" };
  try {
    const lists = await Promise.all(urls.map(fetchICal));
    return { busy: lists.flat(), source: "ical" };
  } catch (err) {
    console.error("Falha ao ler calendários:", err.message);
    return { busy: snapshot.busy, source: "snapshot" };
  }
};
