// Emails de reserva: um para os anfitriões, outro para o hóspede.
// kind: "request" (pedido sem pagamento) · "confirmed" (pago) · "processing" (Multibanco por pagar)
// HTML em tabelas e estilos inline (é o que os clientes de email suportam).
import { site } from "../../../src/config/site.js";

const C = {
  bg: "#F2ECE2",
  card: "#FFFFFF",
  ink: "#1E2320",
  soft: "#5A6157",
  blue: "#142F57",
  green: "#4E8040",
  line: "#E5DED2",
  amber: "#9A6A12",
};

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const eur = (n) => `${n.toLocaleString("pt-PT")} €`;

const fmtDate = (iso, lang) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", {
    weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(Date.UTC(y, m - 1, d));
};

const guestsText = (b, lang) => {
  const pt = lang === "pt";
  const parts = [`${b.adults} ${pt ? (b.adults === 1 ? "adulto" : "adultos") : (b.adults === 1 ? "adult" : "adults")}`];
  if (b.children) parts.push(`${b.children} ${pt ? (b.children === 1 ? "criança" : "crianças") : (b.children === 1 ? "child" : "children")}`);
  if (b.infants) parts.push(`${b.infants} ${pt ? (b.infants === 1 ? "bebé (berço)" : "bebés (berço)") : (b.infants === 1 ? "baby (cot)" : "babies (cot)")}`);
  return parts.join(", ");
};

const row = (label, value) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.line};color:${C.soft};font-size:13px;width:38%;vertical-align:top">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.line};color:${C.ink};font-size:15px;vertical-align:top">${value}</td>
  </tr>`;

const button = (href, label, color = C.green) =>
  `<a href="${href}" style="display:inline-block;background:${color};color:#fff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:13px 26px;border-radius:999px">${label}</a>`;

const badge = (text, color) =>
  `<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${color};color:#fff;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase">${text}</span>`;

const steps = (items) =>
  `<ol style="margin:0;padding-left:20px;color:${C.ink};font-size:14px;line-height:1.8">${items.map((l) => `<li>${l}</li>`).join("")}</ol>`;

const h2 = (text) =>
  `<h2 style="margin:28px 0 10px;font-family:Georgia,serif;font-weight:400;font-size:19px;color:${C.blue}">${text}</h2>`;

const layout = ({ siteUrl, preheader, hero, body }) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:Helvetica,Arial,sans-serif">
<span style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg}">
<tr><td align="center" style="padding:28px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${C.card};border-radius:14px;overflow:hidden">
    ${siteUrl ? `<tr><td align="center" style="padding:26px 0 18px"><img src="${siteUrl}/assets/LOGO_BLACK.png" width="110" alt="${site.name}" style="display:block"></td></tr>` : `<tr><td align="center" style="padding:26px 0 10px;font-family:Georgia,serif;font-size:22px;color:${C.blue}">${site.name}</td></tr>`}
    ${hero && siteUrl ? `<tr><td><img src="${siteUrl}/.netlify/images?url=/assets/${hero}&w=1200&q=75" width="600" alt="" style="display:block;width:100%;height:auto"></td></tr>` : ""}
    <tr><td style="padding:30px 34px 34px">${body}</td></tr>
    <tr><td style="padding:22px 34px;background:${C.blue};color:#cfd8e6;font-size:12px;line-height:1.7">
      <strong style="color:#fff">${site.name}</strong><br>
      Ponta Negra · Baía de São Lourenço · 9580-114 Vila do Porto · Santa Maria, Açores<br>
      ${site.email} · ${site.phoneDisplay}${site.rnal ? `<br>AL ${site.rnal}` : ""}
    </td></tr>
  </table>
</td></tr></table></body></html>`;

// ───────────────────────── Anfitriões ─────────────────────────

const ownerKinds = {
  request: {
    eyebrow: "Novo pedido de reserva",
    badge: badge("Por confirmar", C.amber),
    subject: "Pedido de reserva",
    priceLabel: "Preço no site",
    steps: (q) => [
      "Confirmar que as datas estão livres no Airbnb e no Booking.",
      `Responder ao hóspede com o total (${eur(q.direct)}) e as formas de pagamento: transferência, MB Way ou cartão. Prazo: 48 horas.`,
      "Quando o pagamento entrar, confirmar ao hóspede e <strong>bloquear as datas no Airbnb e no Booking</strong>.",
    ],
  },
  confirmed: {
    eyebrow: "Nova reserva direta",
    badge: badge("Paga", C.green),
    subject: "✅ Reserva paga",
    priceLabel: "Valor pago",
    steps: () => [
      "Não precisa de aceitar nada: a reserva está paga e o hóspede já recebeu a confirmação.",
      "O Airbnb e o Booking bloqueiam estas datas sozinhos na próxima sincronização (pode demorar algumas horas). Se quiser, confirme lá.",
      "Passar a fatura ao hóspede.",
      "Uns dias antes, combinar a hora de chegada.",
    ],
  },
  processing: {
    eyebrow: "Reserva à espera de pagamento",
    badge: badge("Multibanco por pagar", C.amber),
    subject: "⏳ Reserva a aguardar pagamento",
    priceLabel: "Valor a pagar",
    steps: () => [
      "O hóspede escolheu pagar por referência Multibanco. As datas ficam guardadas até ao fim do prazo de pagamento.",
      "Quando o pagamento entrar, recebe outro email a dizer \"Reserva paga\". Se não pagar, as datas voltam a ficar livres.",
    ],
  },
};

export const ownerEmail = ({ b, q, siteUrl, payUrl, kind = "request" }) => {
  const K = ownerKinds[kind];
  const nightsText = q.lines.map((l) => `${l.nights} × ${eur(l.nightly)}`).join(" + ");
  const phoneDigits = (b.phone || "").replace(/[^\d+]/g, "").replace(/^\+/, "");
  const replySubject = encodeURIComponent(`Casa da Ponta Negra: ${fmtDate(b.checkIn, b.lang)} – ${fmtDate(b.checkOut, b.lang)}`);

  const body = `
    <p style="margin:0 0 10px">${K.badge}</p>
    <p style="margin:0 0 6px;color:${C.green};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">${K.eyebrow}</p>
    <h1 style="margin:0 0 4px;font-family:Georgia,serif;font-weight:400;font-size:26px;color:${C.blue}">${esc(b.name)}</h1>
    <p style="margin:0 0 22px;color:${C.soft};font-size:15px">${fmtDate(b.checkIn, "pt")} → ${fmtDate(b.checkOut, "pt")} · ${q.nights} noites</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Chegada", `${fmtDate(b.checkIn, "pt")}${site.checkIn ? ` · a partir das ${site.checkIn}` : ""}`)}
      ${row("Partida", `${fmtDate(b.checkOut, "pt")}${site.checkOut ? ` · até às ${site.checkOut}` : ""}`)}
      ${row("Hóspedes", guestsText(b, "pt"))}
      ${row(K.priceLabel, `<strong>${eur(q.direct)}</strong><br><span style="color:${C.soft};font-size:13px">${nightsText} · nas plataformas seria ${eur(q.platform)}</span>`)}
      ${row("Email", `<a href="mailto:${esc(b.email)}" style="color:${C.blue}">${esc(b.email)}</a>`)}
      ${row("Telefone", b.phone ? `<a href="tel:${esc(b.phone)}" style="color:${C.blue}">${esc(b.phone)}</a>${phoneDigits.length > 8 ? ` · <a href="https://wa.me/${phoneDigits}" style="color:${C.green}">WhatsApp</a>` : ""}` : "—")}
      ${row("Idioma", b.lang === "pt" ? "Português" : "Inglês")}
      ${row("Mensagem", b.message ? esc(b.message).replace(/\n/g, "<br>") : "—")}
    </table>

    ${payUrl ? `
    <div style="margin:26px 0 0;padding:18px 20px;background:#EEF4EA;border-radius:10px">
      <p style="margin:0 0 6px;font-weight:700;color:${C.ink}">Link de pagamento (${eur(q.direct)})</p>
      <a href="${payUrl}" style="color:${C.green};word-break:break-all;font-size:14px">${payUrl}</a>
    </div>` : ""}

    ${h2("Próximos passos")}
    ${steps(K.steps(q))}

    <p style="margin:26px 0 0">${button(`mailto:${esc(b.email)}?subject=${replySubject}`, "Responder ao hóspede")}</p>`;

  return {
    subject: `${K.subject}: ${fmtDate(b.checkIn, "pt")} – ${fmtDate(b.checkOut, "pt")} · ${q.nights} noites · ${b.name}`,
    html: layout({ siteUrl, preheader: `${guestsText(b, "pt")} · ${eur(q.direct)}`, body }),
  };
};

// ───────────────────────── Hóspede ─────────────────────────

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${site.coords.join(",")}`;

const guestTexts = {
  pt: {
    hello: (n) => `Olá ${n},`,
    arrival: "Chegada", departure: "Partida", guests: "Hóspedes",
    from: "a partir das", until: "até às", nights: "noites",
    savings: (s) => `Poupou ${s} em relação ao Airbnb e ao Booking.`,
    cancel: "Cancelamento até 30 dias antes da chegada: devolvemos o valor total. A menos de 30 dias: sem reembolso.",
    questions: "Alguma dúvida? Basta responder a este email.",
    bye: "Até breve,",
    request: {
      subject: "Recebemos o seu pedido de reserva",
      badge: badge("Pedido recebido", C.amber),
      intro: "Obrigado pelo seu pedido. Vamos confirmar a disponibilidade e responder em menos de 24 horas.",
      totalLabel: "Total estimado",
      nextTitle: "O que acontece a seguir",
      next: [
        "Confirmamos a disponibilidade e enviamos as formas de pagamento: transferência bancária, MB Way ou cartão.",
        "Paga o valor total nas 48 horas seguintes. A reserva fica confirmada quando recebermos o pagamento.",
      ],
      cta: "Ver a casa",
    },
    confirmed: {
      subject: "Reserva confirmada",
      badge: badge("Reserva confirmada", C.green),
      intro: "Recebemos o seu pagamento e a sua reserva está confirmada. Estamos à sua espera em São Lourenço!",
      totalLabel: "Total pago",
      nextTitle: "Antes de chegar",
      next: [
        "Uns dias antes, diga-nos a hora prevista de chegada. O Paulo recebe-o pessoalmente na casa.",
        "Recomendamos alugar carro e fazer compras em Vila do Porto antes de descer para a baía.",
        `A casa fica na Baía de São Lourenço. <a href="${mapsLink}" style="color:${C.green}">Ver no Google Maps</a>.`,
      ],
      cta: "Como chegar e FAQ",
      ctaPath: "/info",
    },
    processing: {
      subject: "Reserva a aguardar pagamento",
      badge: badge("A aguardar pagamento", C.amber),
      intro: "As suas datas estão guardadas. Assim que o pagamento Multibanco for recebido, enviamos a confirmação da reserva.",
      totalLabel: "Total a pagar",
      nextTitle: "O que falta",
      next: [
        "Pague a referência Multibanco que recebeu do Stripe dentro do prazo indicado.",
        "Se o pagamento não for feito no prazo, a reserva é cancelada e as datas ficam novamente livres.",
      ],
      cta: "Ver a casa",
    },
  },
  en: {
    hello: (n) => `Hi ${n},`,
    arrival: "Arrival", departure: "Departure", guests: "Guests",
    from: "from", until: "by", nights: "nights",
    savings: (s) => `You saved ${s} compared with Airbnb and Booking.com.`,
    cancel: "Cancel up to 30 days before arrival for a full refund. Less than 30 days before: no refund.",
    questions: "Any questions? Just reply to this email.",
    bye: "See you soon,",
    request: {
      subject: "We've received your booking request",
      badge: badge("Request received", C.amber),
      intro: "Thank you for your request. We'll check availability and get back to you within 24 hours.",
      totalLabel: "Estimated total",
      nextTitle: "What happens next",
      next: [
        "We confirm availability and send you the payment options: bank transfer, MB Way or card.",
        "You pay the full amount within 48 hours. Your booking is confirmed once we receive the payment.",
      ],
      cta: "See the house",
    },
    confirmed: {
      subject: "Booking confirmed",
      badge: badge("Booking confirmed", C.green),
      intro: "We've received your payment and your booking is confirmed. We look forward to welcoming you to São Lourenço!",
      totalLabel: "Total paid",
      nextTitle: "Before you arrive",
      next: [
        "A few days before, let us know your expected arrival time. Paulo will meet you at the house.",
        "We recommend hiring a car and doing your shopping in Vila do Porto before driving down to the bay.",
        `The house is on São Lourenço Bay. <a href="${mapsLink}" style="color:${C.green}">Open in Google Maps</a>.`,
      ],
      cta: "Getting here & FAQ",
      ctaPath: "/info",
    },
    processing: {
      subject: "Booking awaiting payment",
      badge: badge("Awaiting payment", C.amber),
      intro: "Your dates are on hold. As soon as your Multibanco payment arrives, we'll send your booking confirmation.",
      totalLabel: "Total due",
      nextTitle: "What's left",
      next: [
        "Pay the Multibanco reference you received from Stripe before the deadline shown.",
        "If the payment isn't made in time, the booking is cancelled and the dates become available again.",
      ],
      cta: "See the house",
    },
  },
};

export const guestEmail = ({ b, q, siteUrl, hostName, kind = "request" }) => {
  const L = guestTexts[b.lang] || guestTexts.en;
  const K = L[kind];
  const body = `
    <p style="margin:0 0 14px">${K.badge}</p>
    <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:22px;color:${C.blue}">${esc(L.hello(b.name.split(" ")[0]))}</p>
    <p style="margin:0 0 24px;color:${C.ink};font-size:15px;line-height:1.6">${K.intro}</p>

    <div style="padding:20px 22px;background:${C.bg};border-radius:10px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row(L.arrival, `${fmtDate(b.checkIn, b.lang)}${site.checkIn ? ` · ${L.from} ${site.checkIn}` : ""}`)}
        ${row(L.departure, `${fmtDate(b.checkOut, b.lang)}${site.checkOut ? ` · ${L.until} ${site.checkOut}` : ""}`)}
        ${row(L.guests, guestsText(b, b.lang))}
        ${row(K.totalLabel, `<strong>${eur(q.direct)}</strong> · ${q.nights} ${L.nights}`)}
      </table>
      <p style="margin:12px 0 0;color:${C.green};font-size:13px">${L.savings(eur(q.savings))}</p>
    </div>

    ${h2(K.nextTitle)}
    ${steps(K.next)}
    <p style="margin:16px 0 0;color:${C.soft};font-size:13px">${L.cancel}</p>

    <p style="margin:24px 0 0;color:${C.ink};font-size:15px">${L.questions}</p>
    ${siteUrl ? `<p style="margin:24px 0 0">${button(`${siteUrl}${K.ctaPath || "/property"}`, K.cta, C.blue)}</p>` : ""}
    <p style="margin:28px 0 0;color:${C.ink};font-size:15px">${L.bye}<br><strong>${esc(hostName)}</strong><br>${site.name}</p>`;

  return {
    subject: `${K.subject} · ${site.name}`,
    html: layout({ siteUrl, preheader: K.intro, hero: "view_jacuzzi.jpg", body }),
  };
};
