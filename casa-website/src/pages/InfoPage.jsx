import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MapView from "../components/MapView";
import { netlifyImageUrl } from "../components/NImg";
import usePageMeta from "../hooks/usePageMeta";
import { useLanguage } from "../context/LanguageContext";
import { site } from "../config/site";
import { FaPlane, FaShip, FaCar, FaPlus } from "react-icons/fa";
import "../styles/InfoPage.css";

const gettingIcons = { plane: FaPlane, ferry: FaShip, car: FaCar };

// Substitui {guests}, {checkIn}... pelos valores do config
const fill = (text) => text.replace(/\{(\w+)\}/g, (_, k) => (k === "guests" ? site.maxGuests : site[k] ?? ""));

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className={`faq-item${open ? " faq-item--open" : ""}`}>
      <button className="faq-item__q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <FaPlus className="faq-item__icon" aria-hidden="true" />
      </button>
      <div className="faq-item__a" role="region">
        <div><p>{a}</p></div>
      </div>
    </li>
  );
};

const InfoPage = () => {
  const { t } = useLanguage();
  usePageMeta(t.nav.info, t.info.metaDescription);

  // Perguntas que dependem de dados ainda por preencher ficam escondidas
  const faq = t.info.faq.filter((f) => !f.needs || f.needs.every((k) => site[k]));

  return (
    <div className="page">
      <Navbar />

      <header className="page-hero">
        <img src={netlifyImageUrl("/assets/coast.jpg", { w: 2000, q: 85 })} alt="" className="page-hero__bg" style={{ objectPosition: "center 70%" }} fetchpriority="high" />
        <div className="page-hero__overlay" />
        <div className="page-hero__text">
          <span className="eyebrow">{t.info.heroEyebrow}</span>
          <h1>{t.info.heroTitle}</h1>
          <p>{t.info.heroSubtitle}</p>
        </div>
      </header>

      <main>
        {/* Como chegar */}
        <section className="getting">
          <div className="section-head reveal">
            <span className="eyebrow">{t.info.gettingEyebrow}</span>
            <h2 className="section-title">{t.info.gettingTitle}</h2>
          </div>
          <ul className="getting__grid reveal reveal-stagger">
            {t.info.getting.map(({ key, title, text }) => {
              const Icon = gettingIcons[key];
              return (
                <li key={key} className="getting-card">
                  <span className="getting-card__icon"><Icon /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              );
            })}
          </ul>

          <div className="getting__map reveal">
            <div className="getting__map-head">
              <h3>{t.info.mapTitle}</h3>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link">{t.info.openMaps} →</a>
            </div>
            <MapView house={site.coords} houseLabel={site.name} zoom={13} className="getting__map-view" />
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="faq__inner">
            <div className="faq__head reveal">
              <span className="eyebrow">{t.info.faqEyebrow}</span>
              <h2 className="section-title">{t.info.faqTitle}</h2>
              <p className="section-lead">{t.info.stillQuestions}</p>
              <Link to="/contact" className="btn btn--ghost">{t.info.contactUs}</Link>
            </div>
            <ul className="faq__list reveal">
              {faq.map((f) => <FaqItem key={f.q} q={f.q} a={fill(f.a)} />)}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InfoPage;
