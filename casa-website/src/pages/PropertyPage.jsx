import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookButton from "../components/BookButton";
import { netlifyImageUrl } from "../components/NImg";
import usePageMeta from "../hooks/usePageMeta";
import { useLanguage } from "../context/LanguageContext";
import {
  FaWifi, FaTv, FaSnowflake, FaUtensils, FaBath, FaBed,
  FaTshirt, FaHotTub, FaTree, FaSun, FaUmbrellaBeach,
  FaFire, FaShower, FaThLarge
} from "react-icons/fa";
import "../styles/PropertyPage.css";

// Ordem da galeria — as 5 primeiras aparecem no mosaico
const galleryImages = [
  "view_jacuzzi.jpg",
  "livingroom.jpg",
  "bedroom_1.jpg",
  "view.jpg",
  "front_house.jpg",
  "view_balcony.jpg",
  "FrontHouse.jpg",
  "bedroom_2.jpg",
  "sofa.jpg",
  "bedroom_1_sheets.jpg",
  "dinningroom.jpg",
  "kitchen.jpg",
  "kitchen_2.jpg",
  "bathroom_1.jpg",
  "bedroom_2_sheets.jpg",
  "beach_view.jpg",
  "coast.jpg",
];
const MOSAIC_COUNT = 5;

const indoorIcons = [FaBed, FaSnowflake, FaWifi, FaTv, FaUtensils, FaBath, FaTshirt];
const outdoorIcons = [FaHotTub, FaSun, FaTree, FaUmbrellaBeach, FaShower, FaUtensils, FaFire];

// --- Galeria em mosaico + lightbox ---
const Gallery = ({ images, t }) => {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const touchX = useRef(null);
  const total = images.length;
  const isOpen = lightboxIdx !== null;

  const open = (idx) => setLightboxIdx(idx);
  const close = () => setLightboxIdx(null);
  const go = (dir) => setLightboxIdx((i) => (i + dir + total) % total);
  const prev = (e) => { e.stopPropagation(); go(-1); };
  const next = (e) => { e.stopPropagation(); go(1); };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, total]);

  // Swipe no telemóvel
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const altOf = (src) => t.property.gallery[src.replace(/\.\w+$/, "")] || "";

  return (
    <section className="gallery">
      <div className="section-head reveal">
        <span className="eyebrow">{t.property.galleryEyebrow}</span>
        <h2 className="section-title">{t.property.galleryTitle}</h2>
      </div>

      <div className="gallery__mosaic reveal">
        {images.slice(0, MOSAIC_COUNT).map((src, idx) => (
          <button
            className="gallery__item"
            key={src}
            onClick={() => open(idx)}
            aria-label={`${t.property.viewPhoto}: ${altOf(src)}`}
          >
            <img
              src={netlifyImageUrl(`/assets/${src}`, { w: idx === 0 ? 1400 : 800 })}
              alt={altOf(src)}
              className="gallery__thumb"
              loading="lazy"
            />
          </button>
        ))}
        <button className="btn gallery__all" onClick={() => open(0)}>
          <FaThLarge /> {t.property.galleryAll} ({total})
        </button>
      </div>

      {isOpen && ReactDOM.createPortal(
        <div
          className="lightbox"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={altOf(images[lightboxIdx])}
        >
          <button className="lightbox__close" onClick={close} aria-label={t.property.close}>&#10005;</button>
          <button className="lightbox__btn lightbox__btn--left" onClick={prev} aria-label={t.property.prev}>&#8249;</button>
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightboxIdx}
              src={netlifyImageUrl(`/assets/${images[lightboxIdx]}`, { w: 1800, q: 88 })}
              alt={altOf(images[lightboxIdx])}
              className="lightbox__img"
            />
            <figcaption>{altOf(images[lightboxIdx])}</figcaption>
          </figure>
          <button className="lightbox__btn lightbox__btn--right" onClick={next} aria-label={t.property.next}>&#8250;</button>
          <div className="lightbox__counter">{lightboxIdx + 1} / {total}</div>
        </div>,
        document.body
      )}
    </section>
  );
};

const FeatureSection = ({ title, subtitle, features, theme, image, imageAlt }) => (
  <section className={`feature-section feature-section--${theme}`}>
    <div className="feature-section__inner">
      <div className="feature-text reveal">
        <h2 className="section-title">{title}</h2>
        <p className="section-lead">{subtitle}</p>
        <ul className="features-grid reveal-stagger">
          {features.map(({ icon: Icon, text }, index) => (
            <li className="feature-item" key={index}>
              <span className="feature-item__icon"><Icon size={18} /></span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="feature-image zoom-frame reveal">
        <img src={netlifyImageUrl(`/assets/${image}`, { w: 1000 })} alt={imageAlt} loading="lazy" />
      </div>
    </div>
  </section>
);

const PropertyPage = () => {
  const { t } = useLanguage();
  usePageMeta(t.nav.property, t.property.metaDescription);

  const indoorFeatures = indoorIcons.map((icon, i) => ({ icon, text: t.property.features.indoor[i] }));
  const outdoorFeatures = outdoorIcons.map((icon, i) => ({ icon, text: t.property.features.outdoor[i] }));

  return (
    <div className="page">
      <Navbar />

      <header className="page-hero">
        <img
          src={netlifyImageUrl("/assets/front_house.jpg", { w: 2000, q: 85 })}
          alt={t.property.gallery.front_house}
          className="page-hero__bg"
          style={{ objectPosition: "center 55%" }}
          fetchpriority="high"
        />
        <div className="page-hero__overlay" />
        <div className="page-hero__text">
          <span className="eyebrow">{t.property.heroEyebrow}</span>
          <h1>Casa da Ponta Negra</h1>
          <p>{t.property.heroText}</p>
        </div>
      </header>

      <main>
        <Gallery images={galleryImages} t={t} />

        <FeatureSection
          title={t.property.interiorTitle}
          subtitle={t.property.interiorSubtitle}
          features={indoorFeatures}
          theme="light"
          image="sofa.jpg"
          imageAlt={t.property.gallery.sofa}
        />

        <FeatureSection
          title={t.property.exteriorTitle}
          subtitle={t.property.exteriorSubtitle}
          features={outdoorFeatures}
          theme="dark"
          image="view_balcony.jpg"
          imageAlt={t.property.gallery.view_balcony}
        />

        <section className="property-cta">
          <img src={netlifyImageUrl("/assets/view.jpg", { w: 2000 })} alt="" className="property-cta__bg" loading="lazy" />
          <div className="property-cta__overlay" />
          <div className="property-cta__text reveal">
            <h2>{t.property.ctaTitle}</h2>
            <p>{t.property.ctaText}</p>
            <BookButton className="btn btn--primary">{t.property.ctaBtn}</BookButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyPage;
