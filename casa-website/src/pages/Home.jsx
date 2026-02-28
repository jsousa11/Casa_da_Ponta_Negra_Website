import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowLeft, FaArrowRight, FaBed, FaCalendarAlt, FaAirbnb } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Home.css";

const reviews = [
  {
    country: "🇨🇭", // Suíça
    name: "Gerda",
    location: "Switzerland",
    nights: 6,
    month: "July 2024",
    score: 10,
    text: "Secluded and surrounded by nature. Very nice sandy beach and perfect for snorkelers/freedivers to start right from the beach. Paul is the perfect host and his house was clean and very well equipped.",
  },
  {
    country: "🇩🇪", // Alemanha
    name: "Günter",
    location: "Germany",
    nights: 4,
    month: "September 2024",
    score: 10,
    text: "One of the best holiday homes we have ever had - at a most wonderful location with great hosts.",
  },
  {
    country: "🇺🇸", // EUA
    name: "Angela",
    location: "United States",
    nights: 3,
    month: "September 2024",
    score: 10,
    text: "Everything about this home and our stay was perfect.",
  },
  {
    country: "🇬🇧", // Reino Unido
    name: "Heather",
    location: "United Kingdom",
    nights: 5,
    month: "August 2024",
    score: 10,
    text: "Fabulously located house in the beautiful São Lourenço bay. The house had all the facilities we needed for our 5-night stay.",
  },
  {
    country: "🇫🇷", // França
    name: "Sylvain",
    location: "France",
    nights: 3,
    month: "June 2024",
    score: 10,
    text: "Amazing location, you couldn't be closer to the ocean! Isolated, you will have the feeling of being alone on Earth while still being able to walk to some nice restaurants!",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const { t } = useLanguage();

  const nextReview = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      setFade(false);
    }, 250);
  };

  const prevReview = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
      setFade(false);
    }, 250);
  };

  const review = reviews[index];
  const scoreLabel = `${review.score} / 10`;

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <img src="src/assets/FrontHouse.jpg" alt="Casa da Ponta Negra view" className="hero__img" fetchpriority="high" />
        <div className="hero__overlay" />
        <div className="hero__text">
          <h2>{t.home.heroTitle}</h2>
          <p>{t.home.heroSubtitle}</p>
          <button
            className="hero__scroll-btn"
            aria-label="Scroll down"
            onClick={() => document.querySelector('.property-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="hero__scroll-mouse" />
            <span>{t.home.scroll}</span>
          </button>
        </div>
      </section>

      {/* Property Section */}
      <section className="property-section">
        <div className="property-left-col">
          <div className="property-content">
            <h2>{t.home.propertyTitle}</h2>
            <p>{t.home.propertyText}</p>
            <a href="/property" className="explore-button">{t.home.propertyBtn}</a>
          </div>
          <div className="property-bottom-image">
            <img src="src/assets/coast.jpg" alt="Outdoor view" loading="lazy" />
          </div>
        </div>
        <div className="property-right-col">
          <img src="src/assets/bedroom_1.jpg" alt="Cozy bedroom" loading="lazy" />
        </div>
      </section>

      {/* Locale Section */}
      <section className="locale">
        <div className="locale-left-col">
          <img src="src/assets/ribeira-de-maloas-6.jpg" alt="Stunning cliffs and ocean views" loading="lazy" />
        </div>
        <div className="locale-right-col">
          <div className="locale-content">
            <h2>{t.home.localeTitle}</h2>
            <p>{t.home.localeText}</p>
            <a href="/locale" className="locale-explore-button">{t.home.localeBtn}</a>
          </div>
          <div className="locale-bottom-image">
            <img src="src/assets/cuisine.jpeg" alt="Authentic Azorean cuisine" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="book-section">
        <h2>{t.home.bookTitle}</h2>
        <p>{t.home.bookSubtitle}</p>
        <div className="book-links">
          <a
            href="https://www.booking.com/hotel/pt/casa-da-ponta-negra-vila-do-porto.html?label=gen173nr-1BCAsouwFCIWNhc2EtZGEtcG9udGEtbmVncmEtdmlsYS1kby1wb3J0b0gxWARouwGIAQGYATG4ARnIAQzYAQHoAQGIAgGoAgO4AtCMnb4GwAIB0gIkYjg0MjNiMGQtNzk2Ny00OWUyLTlhNmQtYjA2NjQ2NzYxN2Jm2AIF4AIB&sid=f5b17de40a0a0b3cfcbc0a915bd5935b&dist=0&group_adults=2&group_children=0&keep_landing=1&no_rooms=1&sb_price_type=total&type=total"
            target="_blank"
            rel="noopener noreferrer"
            className="book-link book-link--booking"
          >
            <TbBrandBooking className="book-icon" />
            <div className="book-link__text">
              <span className="book-platform-name">Booking.com</span>
              <span className="book-cta">{t.home.bookCta}</span>
            </div>
          </a>
          <a
            href="https://www.airbnb.pt/rooms/993976971668808205?source_impression_id=p3_1741112895_P3Q_U5wSEDpjFoix"
            target="_blank"
            rel="noopener noreferrer"
            className="book-link book-link--airbnb"
          >
            <FaAirbnb className="book-icon" />
            <div className="book-link__text">
              <span className="book-platform-name">Airbnb</span>
              <span className="book-cta">{t.home.bookCta}</span>
            </div>
          </a>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-container">
          <h2>{t.home.reviewsTitle}</h2>
          <p>{t.home.reviewsSubtitle}</p>

          <div className={`review-card${fade ? " fade" : ""}`}>
            {/* Nome e Bandeira */}
            <div className="review-header">
              <span className="flag" style={{ fontSize: 32 }}>{review.country}</span>
              <span style={{ fontWeight: "bold", marginLeft: 8 }}>{review.name}</span>
              <span style={{ color: "#888", marginLeft: 8 }}>{review.location}</span>
            </div>

            {/* Informação das noites e mês */}
            <div className="review-details">
              <FaBed className="review-icon" /> {review.nights} {t.home.nights}
              <FaCalendarAlt className="review-icon" /> {review.month}
            </div>

            {/* Estrelas (Score) */}
            <div className="review-score">{scoreLabel}</div>

            {/* Texto da Review */}
            <p className="review-text">
              "{review.text}"
            </p>

            {/* Botões de Navegação */}
            <div className="review-navigation">
              <button className="nav-button" onClick={prevReview}>
                <FaArrowLeft />
              </button>
              <button className="nav-button" onClick={nextReview}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
