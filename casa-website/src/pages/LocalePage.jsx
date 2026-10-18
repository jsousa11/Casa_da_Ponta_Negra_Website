import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MapView from "../components/MapView";
import Weather from "../components/Weather";
import { netlifyImageUrl } from "../components/NImg";
import usePageMeta from "../hooks/usePageMeta";
import { useLanguage } from "../context/LanguageContext";
import { site } from "../config/site";
import { attractionsMeta, placesMeta, directionsUrl } from "../config/places";
import { FaCar, FaHome, FaWater, FaFish, FaHiking, FaMusic, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { GiDolphin } from "react-icons/gi";
import "../styles/LocalePage.css";

const experienceIcons = [FaWater, FaFish, GiDolphin, FaHiking, FaMusic, FaStar];

const LocalePage = () => {
  const sliderRef = useRef(null);
  const { t } = useLanguage();
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const [activePin, setActivePin] = useState(null);

  usePageMeta(t.nav.locale, t.locale.metaDescription);

  const scrollAttr = (dir) => {
    const el = sliderRef.current;
    if (el) el.scrollBy({ left: dir * 324, behavior: 'smooth' });
  };

  const onDragStart = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.pageX, scrollLeft: sliderRef.current.scrollLeft };
    sliderRef.current.style.cursor = 'grabbing';
  };

  const onDragMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    sliderRef.current.scrollLeft = dragStart.current.scrollLeft - (e.pageX - dragStart.current.x);
  };

  const onDragEnd = () => {
    isDragging.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = '';
  };

  // Junta os dados fixos (coordenadas, imagens) ao texto traduzido
  const attractions = t.locale.attractions.map((a, i) => ({ ...attractionsMeta[i], ...a }));
  const places = t.locale.places.map((p, i) => ({ ...placesMeta[i], ...p }));
  const mapPoints = attractions.map((a) => ({ name: a.name, coords: a.coords }));

  const travelLabel = (a) =>
    a.here ? <><FaHome /> {t.locale.here}</> : <><FaCar /> {a.minutes} min {t.locale.byCar}</>;

  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <header className="page-hero">
        <img src={netlifyImageUrl("/assets/praia_formosa.jpg", { w: 2000, q: 85 })} alt="Praia Formosa, Santa Maria" className="page-hero__bg" fetchpriority="high" />
        <div className="page-hero__overlay" />
        <div className="page-hero__text">
          <span className="eyebrow">{t.locale.heroEyebrow}</span>
          <h1>{t.locale.heroTitle}</h1>
          <p>{t.locale.heroSubtitle}</p>
          <Weather label={t.locale.weatherNow} seaLabel={t.locale.sea} windLabel={t.locale.wind} />
        </div>
      </header>

      <main>
        {/* Sítios a visitar */}
        <section className="attractions-section">
          <div className="attractions-header reveal">
            <div>
              <span className="eyebrow">{t.locale.attractionsEyebrow}</span>
              <h2 className="section-title">{t.locale.attractionsTitle}</h2>
              <p className="section-lead">{t.locale.attractionsSubtitle}</p>
            </div>
            <div className="attractions-arrows">
              <button className="carousel-arrow" onClick={() => scrollAttr(-1)} aria-label={t.locale.arrowPrev}>&#8249;</button>
              <button className="carousel-arrow" onClick={() => scrollAttr(1)} aria-label={t.locale.arrowNext}>&#8250;</button>
            </div>
          </div>

          <div
            className="attractions-slider reveal"
            ref={sliderRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {attractions.map((attr, i) => (
              <article key={attr.name} className="attraction-card">
                <div className="attraction-card__img-wrap zoom-frame">
                  <img src={netlifyImageUrl(`/assets/${attr.image}`, { w: 800 })} alt={attr.name} loading="lazy" draggable="false" />
                  <span className="attraction-card__num">{i + 1}</span>
                </div>
                <div className="attraction-card__body">
                  <span className="attraction-card__time">{travelLabel(attr)}</span>
                  <h3>{attr.name}</h3>
                  <p>{attr.description}</p>
                  {!attr.here && (
                    <a className="text-link" href={directionsUrl(site.coords, attr.coords)} target="_blank" rel="noopener noreferrer">
                      {t.locale.directions} →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Mapa */}
        <section className="map-section">
          <div className="map-section__inner">
            <div className="map-section__text reveal">
              <span className="eyebrow">{t.locale.mapEyebrow}</span>
              <h2 className="section-title">{t.locale.mapTitle}</h2>
              <p className="section-lead">{t.locale.mapSubtitle}</p>
              <ol className="map-legend">
                {attractions.map((a, i) => (
                  <li
                    key={a.name}
                    onMouseEnter={() => setActivePin(i)}
                    onMouseLeave={() => setActivePin(null)}
                    onFocus={() => setActivePin(i)}
                    onBlur={() => setActivePin(null)}
                    tabIndex={0}
                  >
                    <span className="map-legend__num">{i + 1}</span>
                    <span className="map-legend__name">{a.name}</span>
                    <span className="map-legend__time">{a.here ? "—" : `${a.minutes} min`}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="map-section__map reveal">
              <MapView house={site.coords} houseLabel={t.locale.house} points={mapPoints} activeIndex={activePin} />
            </div>
          </div>
        </section>

        {/* Experiências */}
        <section className="experiences">
          <div className="section-head reveal">
            <span className="eyebrow">{t.locale.experiencesEyebrow}</span>
            <h2 className="section-title">{t.locale.experiencesTitle}</h2>
          </div>
          <ul className="experiences__grid reveal reveal-stagger">
            {t.locale.experiences.map((exp, i) => {
              const Icon = experienceIcons[i];
              return (
                <li key={exp.title} className="experience-card">
                  <span className="experience-card__icon"><Icon /></span>
                  <h3>{exp.title}</h3>
                  <p>{exp.text}</p>
                </li>
              );
            })}
          </ul>
          <div className="experiences__more reveal">
            <a href="https://www.exploresantamaria.pt/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              {t.locale.attractionsMore} →
            </a>
          </div>
        </section>

        {/* Comer & Beber */}
        <section className="eat-section">
          <div className="eat-section__inner">
            <div className="eat-list">
              <div className="reveal">
                <span className="eyebrow">{t.locale.eatDrinkEyebrow}</span>
                <h2 className="section-title">{t.locale.eatDrinkTitle}</h2>
              </div>
              <ul className="reveal reveal-stagger">
                {places.map((place) => (
                  <li key={place.name} className="eat-item">
                    <div className="eat-item__head">
                      <h3>{place.name}</h3>
                      <a href={place.url} target="_blank" rel="noopener noreferrer" className="eat-item__map" aria-label={`${t.locale.viewMap}: ${place.name}`}>
                        <FaMapMarkerAlt /> {place.area}
                      </a>
                    </div>
                    <p>{place.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="eat-images reveal">
              {["bife-a-regional.jpg", "BISCOITOS-DE-ORELHA.jpg", "cuisine.jpeg"].map((src) => (
                <div key={src} className="eat-images__item zoom-frame">
                  <img src={netlifyImageUrl(`/assets/${src}`, { w: 600 })} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocalePage;
