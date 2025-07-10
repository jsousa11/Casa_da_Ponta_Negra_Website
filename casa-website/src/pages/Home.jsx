import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar, FaArrowLeft, FaArrowRight, FaBed, FaCalendarAlt } from "react-icons/fa";
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

const MAX_STARS = 5;
const MAX_TEXT_LENGTH = 160; // caracteres antes de "ver mais"

const Home = () => {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [fade, setFade] = useState(false);

  const nextReview = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      setExpanded(false);
      setFade(false);
    }, 250);
  };

  const prevReview = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
      setExpanded(false);
      setFade(false);
    }, 250);
  };

  const review = reviews[index];
  const starsFilled = Math.round(review.score / 2);

  // Texto limitado + botão "ver mais"
  const reviewText =
    expanded || review.text.length <= MAX_TEXT_LENGTH
      ? review.text
      : review.text.slice(0, MAX_TEXT_LENGTH) + "...";

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Your Private Escape in Santa Maria</h2>
          <p>Experience the tranquility of the Azores with breathtaking ocean views.</p>
        </div>
        <img src="src/assets/coast.jpg" alt="Casa da Ponta Negra view" />
      </section>

      {/* Property Section */}
      <section className="property-section">
        <div className="property-content">
          <h2>Property</h2>
          <p>A retreat designed for relaxation and comfort.</p>
          <a href="/property" className="explore-button">Explore Property</a>
          <div className="property-left-image">
            <img src="src/assets/view.jpg" alt="Outdoor view" />
          </div>
        </div>

        <div className="property-images-container">
          <div className="property-right-image">
            <img src="src/assets/livingroom.jpg" alt="Cozy interior" />
          </div>
        </div>
      </section>

      {/* Locale Section */}
      <section className="locale">
        <div className="locale-left-image">
          <img src="src/assets/ribeira-de-maloas-6.jpg" alt="Stunning cliffs and ocean views" />
        </div>

        <div className="locale-content">
          <h2>Discover Santa Maria</h2>
          <p>From golden beaches to scenic hiking trails, immerse yourself in island life.</p>
          <a href="/locale" className="locale-explore-button">Explore Locale</a>
          <div className="locale-right-image">
            <img src="src/assets/cuisine.jpeg" alt="Authentic Azorean cuisine" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-container">
          <h2>Guest Experiences</h2>
          <p>See what our guests say about their stay at Casa da Ponta Negra.</p>

          <div className={`review-card${fade ? " fade" : ""}`}>
            {/* Nome e Bandeira */}
            <div className="review-header">
              <span className="flag" style={{ fontSize: 32 }}>{review.country}</span>
              <span style={{ fontWeight: "bold", marginLeft: 8 }}>{review.name}</span>
              <span style={{ color: "#888", marginLeft: 8 }}>{review.location}</span>
            </div>

            {/* Informação das noites e mês */}
            <div className="review-details">
              <FaBed className="review-icon" /> {review.nights} nights
              <FaCalendarAlt className="review-icon" /> {review.month}
            </div>

            {/* Estrelas (Score) */}
            <div className="review-stars">
              {[...Array(MAX_STARS)].map((_, i) => (
                <FaStar
                  key={i}
                  className="star-icon"
                  style={{ color: i < starsFilled ? "#FFD700" : "#E0E0E0" }}
                />
              ))}
            </div>

            {/* Texto da Review */}
            <p className="review-text">
              “{reviewText}”
              {review.text.length > MAX_TEXT_LENGTH && (
                <button
                  className="see-more"
                  onClick={() => setExpanded((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#3D5C2C",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginLeft: 6,
                  }}
                >
                  {expanded ? "ver menos" : "ver mais"}
                </button>
              )}
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
