import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBed, FaCalendarAlt, FaAirbnb } from "react-icons/fa";
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
  const { t } = useLanguage();
  const reviewsSliderRef = useRef(null);

  const scrollReviews = (dir) => {
    const el = reviewsSliderRef.current;
    if (el) el.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <img src="/assets/FrontHouse.jpg" alt="Casa da Ponta Negra view" className="hero__img" fetchpriority="high" />
        <div className="hero__overlay" />
        <div className="hero__text">
          <h2>{t.home.heroTitle}</h2>
          <p>{t.home.heroSubtitle}</p>
          <button
            className="hero__scroll-btn"
            aria-label="Scroll down"
            onClick={() => {
              const el = document.querySelector('.property-section');
              if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' });
            }}
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
            <img src="/assets/coast.jpg" alt="Outdoor view" loading="lazy" />
          </div>
        </div>
        <div className="property-right-col">
          <img src="/assets/bedroom_1.jpg" alt="Cozy bedroom" loading="lazy" />
        </div>
      </section>

      {/* Locale Section */}
      <section className="locale">
        <div className="locale-left-col">
          <img src="/assets/ribeira-de-maloas-6.jpg" alt="Stunning cliffs and ocean views" loading="lazy" />
        </div>
        <div className="locale-right-col">
          <div className="locale-content">
            <h2>{t.home.localeTitle}</h2>
            <p>{t.home.localeText}</p>
            <a href="/locale" className="locale-explore-button">{t.home.localeBtn}</a>
          </div>
          <div className="locale-bottom-image">
            <img src="/assets/cuisine.jpeg" alt="Authentic Azorean cuisine" loading="lazy" />
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

          <div className="reviews-carousel">
            <button className="reviews-arrow reviews-arrow--left" onClick={() => scrollReviews(-1)} aria-label="Previous">&#8249;</button>

            <div
              className="reviews-slider"
              ref={reviewsSliderRef}
            >
              {reviews.map((review, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <span className="flag">{review.country}</span>
                    <span className="review-name">{review.name}</span>
                    <span className="review-location">{review.location}</span>
                  </div>
                  <div className="review-details">
                    <FaBed className="review-icon" /> {review.nights} {t.home.nights}
                    <FaCalendarAlt className="review-icon" /> {review.month}
                  </div>
                  <div className="review-score">{review.score} / 10</div>
                  <p className="review-text">"{review.text}"</p>
                </div>
              ))}
            </div>

            <button className="reviews-arrow reviews-arrow--right" onClick={() => scrollReviews(1)} aria-label="Next">&#8250;</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
