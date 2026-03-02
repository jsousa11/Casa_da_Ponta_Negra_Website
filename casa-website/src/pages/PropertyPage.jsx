import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { netlifyImageUrl } from "../components/NImg";
import { useLanguage } from "../context/LanguageContext";
import {
  FaWifi, FaTv, FaSnowflake, FaUtensils, FaBath, FaBed,
  FaTshirt, FaParking, FaHotTub, FaTree, FaSun, FaUmbrellaBeach,
  FaFire, FaShower, FaDumbbell
} from "react-icons/fa";
import "../styles/PropertyPage.css";

const galleryImages = [
  { src: "front_house.jpg", alt: "Casa da Ponta Negra - Exterior" },
  { src: "view.jpg", alt: "Vista para o mar" },
  { src: "livingroom.jpg", alt: "Sala de estar" },
  { src: "bedroom_1.jpg", alt: "Quarto principal" },
  { src: "bedroom_2.jpg", alt: "Quarto secundário" },
  { src: "bathroom_1.jpg", alt: "Casa de banho" },
  { src: "kitchen.jpg", alt: "Cozinha" },
  { src: "view_jacuzzi.jpg", alt: "Jacuzzi com vista mar" },
  { src: "view_balcony.jpg", alt: "Varanda com vista" },
];

const indoorIcons = [FaBed, FaSnowflake, FaWifi, FaTv, FaUtensils, FaBath, FaTshirt];
const outdoorIcons = [FaHotTub, FaSun, FaTree, FaUmbrellaBeach, FaShower, FaDumbbell, FaFire];

// --- Galeria com grid + lightbox ---
const Gallery = ({ images, galleryTitle }) => {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const total = images.length;
  const isOpen = lightboxIdx !== null;

  const open = (idx) => setLightboxIdx(idx);
  const close = () => setLightboxIdx(null);
  const prev = (e) => { e.stopPropagation(); setLightboxIdx((i) => (i - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); setLightboxIdx((i) => (i + 1) % total); };

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") setLightboxIdx((i) => (i - 1 + total) % total);
      else if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % total);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, total]);

  return (
    <section className="gallery gallery--light">
      <h2 className="gallery__title">{galleryTitle}</h2>
      <div className="gallery__grid">
        {images.map((img, idx) => (
          <div
            className="gallery__item"
            key={idx}
            onClick={() => open(idx)}
            tabIndex={0}
            role="button"
            aria-label={`Ver ${img.alt}`}
            onKeyDown={(e) => e.key === "Enter" && open(idx)}
          >
            <img src={netlifyImageUrl(`/assets/${img.src}`, { w: 800 })} alt={img.alt} className="gallery__thumb" loading="lazy" />
            <div className="gallery__item-overlay" />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={close} aria-label="Fechar">&#10005;</button>
          <button className="lightbox__btn lightbox__btn--left" onClick={prev} aria-label="Anterior">&#8249;</button>
          <img
            src={netlifyImageUrl(`/assets/${images[lightboxIdx].src}`, { w: 1600, q: 90 })}
            alt={images[lightboxIdx].alt}
            className="lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox__btn lightbox__btn--right" onClick={next} aria-label="Próxima">&#8250;</button>
          <div className="lightbox__counter">{lightboxIdx + 1} / {total}</div>
        </div>
      )}
    </section>
  );
};

const FeatureSection = ({ title, subtitle, features, theme }) => (
  <section className={`feature-section feature-section--${theme}`}>
    <div className="feature-text">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
    <div className="features-grid">
      {features.map(({ icon: Icon, text }, index) => (
        <div className="feature-item" key={index}>
          <Icon size={20} className="feature-item__icon" />
          <p>{text}</p>
        </div>
      ))}
    </div>
  </section>
);

const PropertyPage = () => {
  const { t } = useLanguage();

  const indoorFeatures = indoorIcons.map((icon, i) => ({ icon, text: t.property.features.indoor[i] }));
  const outdoorFeatures = outdoorIcons.map((icon, i) => ({ icon, text: t.property.features.outdoor[i] }));

  return (
    <div>
      <Navbar />

      <header className="property-hero">
        <img
          src={netlifyImageUrl("/assets/front_house.jpg", { w: 1920, q: 90 })}
          alt="Casa da Ponta Negra - Exterior"
          className="hero-image"
          fetchpriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>Casa da Ponta Negra</h1>
          <p>{t.property.heroText}</p>
        </div>
      </header>

      <main>
        <Gallery images={galleryImages} galleryTitle={t.property.galleryTitle} />

        <FeatureSection
          title={t.property.interiorTitle}
          subtitle={t.property.interiorSubtitle}
          features={indoorFeatures}
          theme="accent"
        />

        <FeatureSection
          title={t.property.exteriorTitle}
          subtitle={t.property.exteriorSubtitle}
          features={outdoorFeatures}
          theme="dark"
        />
      </main>

      <Footer />
    </div>
  );
};

export default PropertyPage;
