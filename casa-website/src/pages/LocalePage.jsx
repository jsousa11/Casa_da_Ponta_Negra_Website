import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import "../styles/LocalePage.css";

// Endereços e links estáticos mantidos aqui (não mudam com o idioma)
const attractionsMeta = [
  { address: "Praia Formosa, Santa Maria", directions: "https://maps.app.goo.gl/9v8q9jv9v8q9jv9v8", image: "praia_formosa.jpg" },
  { address: "São Pedro, Santa Maria",     directions: "https://maps.app.goo.gl/poçodapedreira",    image: "poço_da_pedreira.jpg" },
  { address: "Ribeira de Maloas, Santa Maria", directions: "https://maps.app.goo.gl/ribeirademaloas", image: "ribeira-de-maloas-6.jpg" },
  { address: "Maia, Santa Maria",          directions: "https://maps.app.goo.gl/baiaDaMaia",        image: "baia_da_maia.jpg" },
  { address: "São Lourenço, Santa Maria",  directions: "https://maps.app.goo.gl/saolourencobaia",  image: "baia_sao_lourenço.jpg" },
  { address: "Norte, Santa Maria",         directions: "https://maps.app.goo.gl/barreirofaneca",   image: "barreiro_faneca.jpg" },
  { address: "Aveiro, Santa Maria",        directions: "https://maps.app.goo.gl/cascatadoaveiro",  image: "cascata_do_aveiro.jpg" },
];

const placesMeta = [
  { address: "Baía de São Lourenço, Santa Maria", website: "https://maps.app.goo.gl/79fQkoN2EAertdQQ9" },
  { address: "Vila do Porto, Santa Maria",        website: "https://maps.app.goo.gl/5TAG5XAP3Yf4BhuA9" },
  { address: "Vila do Porto, Santa Maria",        website: "https://maps.app.goo.gl/YFtsE3eTJxVsBPP38" },
  { address: "Vila do Porto, Santa Maria",        website: "https://maps.app.goo.gl/Aa1cTzHJtWbYYiwe7" },
  { address: "Santa Maria, Açores",               website: "https://maps.app.goo.gl/539iaBwq4xRvCEcR9" },
];

// --- Componentes Reutilizáveis Internos ---

// Componente para renderizar cada item da lista (local ou atração)
const InfoItem = ({ item, viewMapLabel }) => (
  <div className="info-item">
    <div className="info-text">
      <h3>{item.name}</h3>
      <p>{item.address}</p>
      {item.website && (
        <a href={item.website} target="_blank" rel="noopener noreferrer">
          {viewMapLabel}
        </a>
      )}
      {item.directions && (
        <a href={item.directions} target="_blank" rel="noopener noreferrer">
          {viewMapLabel}
        </a>
      )}
    </div>
    <p className="info-description">{item.description}</p>
  </div>
);

// Componente para renderizar uma secção inteira (lista + imagem)
const InfoSection = ({ title, items, imageSrc, imageAlt, sectionId, viewMapLabel }) => (
  <section id={sectionId} className="info-section">
    <div className="info-container">
      <div className="info-list">
        <h2>{title}</h2>
        {items.map((item) => (
          <InfoItem key={item.name} item={item} viewMapLabel={viewMapLabel} />
        ))}
      </div>
      <div className="info-image-wrapper">
        <img src={imageSrc} alt={imageAlt} className="info-image" />
      </div>
    </div>
  </section>
);


const LocalePage = () => {
  const sliderRef = useRef(null);
  const { t } = useLanguage();

  const scrollAttr = (dir) => {
    const el = sliderRef.current;
    if (el) el.scrollBy({ left: dir * 284, behavior: 'smooth' });
  };

  // Merge static meta (links, images, addresses) with translated text
  const attractions = t.locale.attractions.map((a, i) => ({ ...attractionsMeta[i], ...a }));
  const places = t.locale.places.map((p, i) => ({ ...placesMeta[i], ...p }));

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <header className="locale-hero">
        <img src="src/assets/praia_formosa.jpg" alt="Santa Maria, Açores" className="locale-hero__bg" fetchpriority="high" />
        <div className="locale-hero__overlay" />
        <div className="locale-hero__text">
          <h1>{t.locale.heroTitle}</h1>
          <p>{t.locale.heroSubtitle}</p>
        </div>
      </header>

      {/* Sítios a Visitar */}
      <section className="attractions-section" id="attractions-section">
        <div className="attractions-header">
          <h2>{t.locale.attractionsTitle}</h2>
          <p>{t.locale.attractionsSubtitle}</p>
        </div>
        <div className="attractions-carousel">
          <button
            className="attractions-arrow attractions-arrow--left"
            onClick={() => scrollAttr(-1)}
            aria-label={t.locale.arrowPrev}
          >&#8249;</button>
          <div className="attractions-slider" ref={sliderRef}>
            {attractions.map((attr) => (
              <a
                key={attr.name}
                href={attr.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="attraction-card"
              >
                <div className="attraction-card__img-wrap">
                  <img src={`src/assets/${attr.image}`} alt={attr.name} loading="lazy" />
                </div>
                <div className="attraction-card__body">
                  <h3>{attr.name}</h3>
                  <p>{attr.description}</p>
                </div>
              </a>
            ))}
          </div>
          <button
            className="attractions-arrow attractions-arrow--right"
            onClick={() => scrollAttr(1)}
            aria-label={t.locale.arrowNext}
          >&#8250;</button>
        </div>
        <div className="attractions-footer">
          <a
            href="https://www.exploresantamaria.pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="attractions-more-btn"
          >
            {t.locale.attractionsMore}
          </a>
        </div>
      </section>

      {/* Comer & Beber */}
      <InfoSection
        sectionId="eat-drink-section"
        title={t.locale.eatDrinkTitle}
        items={places}
        imageSrc="src/assets/gastronomia.jpg"
        imageAlt="Gastronomia local"
        viewMapLabel={t.locale.viewMap}
      />

      <Footer />
    </div>
  );
};

export default LocalePage;