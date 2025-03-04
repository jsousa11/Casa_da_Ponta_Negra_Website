import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar, FaArrowLeft, FaArrowRight,FaBed, FaCalendarAlt } from "react-icons/fa";

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
  const [isOpen, setIsOpen] = useState(false);

  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Your Private Escape in Santa Maria</h2>
          <p>Experience the tranquility of the Azores with breathtaking ocean views.</p>
        </div>
        <img src="src/assets/2603.jpg" alt="Casa da Ponta Negra view" />
      </section>

      {/* Property Section */}
      <section className="property-section">
        <div className="property-content">
          <h2>Property</h2>
          <p>A retreat designed for relaxation and comfort.</p>
          <a href="/property" className="explore-button">Explore Property</a>
          <div className="property-left-image">
            <img src="src/assets/201.jpg" alt="Outdoor view" />
          </div>
        </div>

        <div className="property-images-container">
          <div className="property-right-image">
            <img src="src/assets/IMG_2599.jpg" alt="Cozy interior" />
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
            <img src="src/assets/IMG_2595.jpg" alt="Authentic Azorean cuisine" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-container">
          <h2>Guest Experiences</h2>
          <p>See what our guests say about their stay at Casa da Ponta Negra.</p>

          <div className="review-card">
            {/* Nome e Bandeira */}
            <div className="review-header">
              <span className="flag">{reviews[index].country}</span>
              <span>{reviews[index].name}, {reviews[index].location}</span>
            </div>

            {/* Informação das noites e mês */}
            <div className="review-details">
              <FaBed className="review-icon" /> {reviews[index].nights} nights
              <FaCalendarAlt className="review-icon" /> {reviews[index].month}
            </div>

            {/* Estrelas (Score) */}
            <div className="review-stars">
              {[...Array(reviews[index].score / 2)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>

            {/* Texto da Review */}
            <p className="review-text">“{reviews[index].text}”</p>

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
