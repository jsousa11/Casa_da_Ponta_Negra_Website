import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { pt, enGB } from "react-day-picker/locale";
import "react-day-picker/style.css";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { netlifyImageUrl } from "../components/NImg";
import usePageMeta from "../hooks/usePageMeta";
import { useLanguage } from "../context/LanguageContext";
import { site, emailjsConfig } from "../config/site";
import {
  pricing, quote, toISODate, fromISODate, addDaysISO, nightsBetween,
  isNightBusy, isNightBookable, rangeIsFree,
} from "../config/pricing";
import snapshot from "../config/availability-snapshot.json";
import { FaCheck, FaAirbnb, FaStar, FaUsers, FaSignInAlt, FaSignOutAlt, FaMinus, FaPlus } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import "../styles/BookPage.css";

// Datas ocupadas: função da Netlify (calendários Airbnb/Booking); em desenvolvimento usa a cópia local
const useBusyDates = () => {
  const [busy, setBusy] = useState(snapshot.busy);
  useEffect(() => {
    fetch("/.netlify/functions/availability")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => Array.isArray(d.busy) && setBusy(d.busy))
      .catch(() => {});
  }, []);
  return busy;
};

const eur = (n) => `${n.toLocaleString("pt-PT")} €`;

const Stepper = ({ label, hint, value, min, max, onChange, decLabel, incLabel }) => (
  <div className="stepper">
    <div>
      <span className="stepper__label">{label}</span>
      <span className="stepper__hint">{hint}</span>
    </div>
    <div className="stepper__controls">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`${decLabel}: ${label}`}><FaMinus /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`${incLabel}: ${label}`}><FaPlus /></button>
    </div>
  </div>
);

const BookPage = () => {
  const { t, lang } = useLanguage();
  const T = t.book;
  usePageMeta(t.nav.book, T.metaDescription);

  const busy = useBusyDates();
  const todayISO = toISODate(new Date());

  const [range, setRange] = useState({ from: null, to: null }); // "YYYY-MM-DD"
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  // Regresso do Stripe: ?status=paid (pago) ou ?status=cancelled (desistiu)
  const [params] = useSearchParams();
  const [status, setStatus] = useState(params.get("status") === "paid" ? "paid" : "idle");
  const paymentCancelled = params.get("status") === "cancelled";
  // false = Stripe ainda não configurado: o botão envia um pedido em vez de pagar
  const [instantBooking, setInstantBooking] = useState(true);

  const min = pricing.minNights;
  const canCheckIn = (iso) => isNightBookable(iso, busy, todayISO) && rangeIsFree(iso, addDaysISO(iso, min), busy, todayISO);
  const canCheckOut = (from, iso) => iso > from && nightsBetween(from, iso) >= min && rangeIsFree(from, iso, busy, todayISO);

  // Primeiro mês com datas livres
  const firstMonth = useMemo(() => {
    for (let i = 0, d = todayISO; i < 420; i++, d = addDaysISO(d, 1)) if (canCheckIn(d)) return fromISODate(d);
    return new Date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy]);

  const pickingCheckOut = range.from && !range.to;

  const isDisabled = (day) => {
    const iso = toISODate(day);
    if (pickingCheckOut && iso > range.from) return !canCheckOut(range.from, iso);
    return !canCheckIn(iso);
  };

  const onDayClick = (day) => {
    const iso = toISODate(day);
    if (pickingCheckOut && iso > range.from && canCheckOut(range.from, iso)) setRange({ from: range.from, to: iso });
    else if (canCheckIn(iso)) setRange({ from: iso, to: null });
    if (status !== "sending") setStatus("idle");
  };

  const totalGuests = guests.adults + guests.children;
  const q = range.from && range.to ? quote(range.from, range.to, totalGuests) : null;
  const setG = (k) => (v) => setGuests((g) => ({ ...g, [k]: v }));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const fmt = (iso) =>
    new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", { weekday: "short", day: "numeric", month: "long" }).format(fromISODate(iso));

  // Plano B (antes de configurar o Gmail na Netlify): envia pelo EmailJS
  const sendViaEmailJS = (payload) => {
    const message = [
      "PEDIDO DE RESERVA",
      `Chegada: ${payload.checkIn}`,
      `Partida: ${payload.checkOut} (${q.nights} noites)`,
      `Hóspedes: ${payload.adults} adultos, ${payload.children} crianças, ${payload.infants} bebés`,
      `Preço no site: ${eur(q.direct)} (plataformas: ${eur(q.platform)})`,
      `Idioma: ${payload.lang}`,
      "",
      payload.message,
    ].join("\n");
    return emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId,
      { name: payload.name, email: payload.email, phone: payload.phone, message }, emailjsConfig.publicKey);
  };

  const post = (fn, payload) =>
    fetch(`/.netlify/functions/${fn}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

  const submit = async (e) => {
    e.preventDefault();
    if (!q) return;
    setStatus("sending");
    const payload = { checkIn: range.from, checkOut: range.to, ...guests, ...form, lang };

    // 1.º reserva imediata com pagamento (Stripe)
    if (instantBooking) {
      try {
        const res = await post("create-checkout", payload);
        const data = res.headers.get("content-type")?.includes("application/json") ? await res.json() : null;
        if (res.ok && data?.url) { window.location.assign(data.url); return; }
        if (res.status === 409) { setStatus("unavailable"); return; }
        if (data && res.status !== 503) { setStatus("error"); return; }
      } catch { /* sem servidor (desenvolvimento): segue para o pedido */ }
      setInstantBooking(false);
    }

    // 2.º plano B: pedido de reserva por email
    try {
      const res = await fetch("/.netlify/functions/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const isJson = res.headers.get("content-type")?.includes("application/json");
      if (res.ok && isJson) { setStatus("success"); return; }
      if (res.status === 409) { setStatus("unavailable"); return; }
      if (isJson && res.status !== 503) { setStatus("error"); return; }
      await sendViaEmailJS(payload);
      setStatus("success");
    } catch {
      try { await sendViaEmailJS(payload); setStatus("success"); } catch { setStatus("error"); }
    }
  };

  const platforms = [
    { key: "booking", name: "Booking.com", url: site.platforms.booking, Icon: TbBrandBooking },
    { key: "airbnb", name: "Airbnb", url: site.platforms.airbnb, Icon: FaAirbnb },
  ];

  const endMonth = new Date(new Date().getFullYear() + 1, 11, 1);

  return (
    <div className="page">
      <Navbar />

      <main className="book-page">
        <div className="book-page__inner">
          <section className="book-page__main">
            <span className="eyebrow">{t.nav.book}</span>
            <h1 className="section-title">{T.title}</h1>
            <p className="section-lead">{T.subtitle}</p>

            {paymentCancelled && status === "idle" && (
              <p className="status-message error" role="status">{T.paymentCancelled}</p>
            )}

            {status === "paid" ? (
              <div className="book-done" role="status">
                <span className="book-done__icon"><FaCheck /></span>
                <h2>{T.paidTitle}</h2>
                <p>{T.paid}</p>
                <Link to="/info" className="btn btn--ghost">{t.nav.info}</Link>
              </div>
            ) : status === "success" ? (
              <div className="book-done" role="status">
                <span className="book-done__icon"><FaCheck /></span>
                <h2>{T.successTitle}</h2>
                <p>{T.success}</p>
                <Link to="/" className="btn btn--ghost">{t.nav.home}</Link>
              </div>
            ) : (
              <form className="form book-form" onSubmit={submit}>
                {/* 1. Datas */}
                <div className="book-step">
                  <div className="book-step__head">
                    <h2><span>1</span> {T.datesTitle}</h2>
                    {range.from && <button type="button" className="text-link" onClick={() => setRange({ from: null, to: null })}>{T.clear}</button>}
                  </div>
                  <p className="book-step__hint">
                    {!range.from ? T.pickCheckIn : !range.to ? T.pickCheckOut.replace("{date}", fmt(addDaysISO(range.from, min))) : `${fmt(range.from)} → ${fmt(range.to)} · ${q.nights} ${T.nights}`}
                  </p>
                  <DayPicker
                    mode="range"
                    locale={lang === "pt" ? pt : enGB}
                    weekStartsOn={1}
                    numberOfMonths={2}
                    defaultMonth={firstMonth}
                    startMonth={new Date()}
                    endMonth={endMonth}
                    selected={{ from: range.from ? fromISODate(range.from) : undefined, to: range.to ? fromISODate(range.to) : undefined }}
                    onDayClick={onDayClick}
                    onSelect={() => {}}
                    disabled={isDisabled}
                    modifiers={{ busy: (d) => isNightBusy(toISODate(d), busy) }}
                    modifiersClassNames={{ busy: "day--busy" }}
                    className="book-calendar"
                  />
                  <p className="book-step__note">{T.rulesNote}</p>
                </div>

                {/* 2. Hóspedes */}
                <div className="book-step">
                  <h2><span>2</span> {T.guestsTitle}</h2>
                  <Stepper label={T.adults} hint={T.adultsHint} value={guests.adults} min={1}
                    max={pricing.maxGuests - guests.children} onChange={setG("adults")} decLabel={T.less} incLabel={T.more} />
                  <Stepper label={T.children} hint={T.childrenHint} value={guests.children} min={0}
                    max={pricing.maxGuests - guests.adults} onChange={setG("children")} decLabel={T.less} incLabel={T.more} />
                  <Stepper label={T.infants} hint={T.infantsHint} value={guests.infants} min={0}
                    max={pricing.maxInfants} onChange={setG("infants")} decLabel={T.less} incLabel={T.more} />
                  <p className="book-step__note">{totalGuests >= pricing.maxGuests ? T.maxGuestsNote : T.extraGuestNote}</p>
                </div>

                {/* Preço */}
                {q && (
                  <div className="book-price">
                    {q.lines.map((l) => (
                      <div key={l.nightly} className="book-price__row">
                        <span>{l.nights} {l.nights === 1 ? T.night : T.nights} × {eur(l.nightly)}</span>
                        <span>{eur(l.nights * l.nightly)}</span>
                      </div>
                    ))}
                    <div className="book-price__row book-price__row--total">
                      <span>{T.total}</span>
                      <span>{eur(q.direct)}</span>
                    </div>
                    <div className="book-price__compare">
                      <span>{T.platformPrice} <s>{eur(q.platform)}</s></span>
                      <span className="book-price__save">{T.youSave} {eur(q.savings)}</span>
                    </div>
                  </div>
                )}

                {/* 3. Contacto */}
                <div className="book-step">
                  <h2><span>3</span> {T.contactTitle}</h2>
                  <div className="form__row">
                    <label className="form__field">
                      <span className="form__label">{T.name}</span>
                      <input type="text" autoComplete="name" value={form.name} onChange={set("name")} required />
                    </label>
                    <label className="form__field">
                      <span className="form__label">{T.email}</span>
                      <input type="email" autoComplete="email" value={form.email} onChange={set("email")} required />
                    </label>
                  </div>
                  <label className="form__field">
                    <span className="form__label">{T.phone}</span>
                    <input type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
                  </label>
                  <label className="form__field">
                    <span className="form__label">{T.message}</span>
                    <textarea value={form.message} onChange={set("message")} placeholder={T.messagePlaceholder} />
                  </label>
                  {/* armadilha para robôs: escondido das pessoas */}
                  <div className="sr-only" aria-hidden="true">
                    <input type="text" name="company" value={form.company} onChange={set("company")} tabIndex={-1} autoComplete="off" />
                  </div>
                </div>

                <p className="form__legal">
                  {t.legal.consent} <Link to="/privacy">{t.legal.privacy}</Link>.
                </p>
                <button type="submit" className="btn btn--primary book-submit" disabled={!q || status === "sending"}>
                  {status === "sending" ? T.sending : q ? `${instantBooking ? T.payNow : T.send} · ${eur(q.direct)}` : T.sendDisabled}
                </button>
                <p className="book-step__note">{instantBooking ? T.securePayment : T.noPaymentYet}</p>

                {status === "unavailable" && <p className="status-message error" role="alert">{T.unavailable}</p>}
                {status === "error" && <p className="status-message error" role="alert">{T.error}</p>}
              </form>
            )}
          </section>

          {/* Lateral */}
          <aside className="book-page__aside">
            <div className="book-aside-card">
              <img src={netlifyImageUrl("/assets/view_jacuzzi.jpg", { w: 800 })} alt={site.name} className="book-aside-card__img" />
              <div className="book-aside-card__body">
                <span className="book-discount">{T.discountBadge}</span>
                <h2>{T.detailsTitle}</h2>
                <ul className="book-facts">
                  <li><FaUsers /> {T.capacity}: {T.upTo} {pricing.maxGuests} {T.guestsPlural}</li>
                  {site.checkIn && <li><FaSignInAlt /> {T.checkInLabel}: {T.from} {site.checkIn}</li>}
                  {site.checkOut && <li><FaSignOutAlt /> {T.checkOutLabel}: {T.until} {site.checkOut}</li>}
                </ul>

                <h3>{T.policyTitle}</h3>
                <ul className="book-policy">
                  {T.policy.map((line) => <li key={line}>{line}</li>)}
                </ul>

                <h3>{T.whyTitle}</h3>
                <ul className="book-why">
                  {T.why.map((w) => <li key={w}><FaCheck /> {w}</li>)}
                </ul>
              </div>
            </div>

            <div className="book-platforms">
              <h3>{T.platformsTitle}</h3>
              {platforms.map(({ key, name, url, Icon }) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="book-platform">
                  <Icon className="book-platform__icon" />
                  <span>{name}</span>
                  {site.ratings[key] && <span className="book-platform__rating"><FaStar /> {site.ratings[key].score}</span>}
                  <span className="book-platform__arrow">→</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookPage;
