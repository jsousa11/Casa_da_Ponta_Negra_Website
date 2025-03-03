import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBed, FaFire, FaRegSnowflake } from "react-icons/fa";
import "../styles/Home.css"; // Importação do CSS único

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <h2>Your Private Escape in Santa Maria</h2>
        <p>Experience the tranquility of the Azores with breathtaking ocean views.</p>
        <img src="/hero-image.jpg" alt="Casa da Ponta Negra view" />
      </section>

      {/* Property Section */}
      <section className="property">
        <h2>The Property</h2>
        <p>A secluded retreat designed for relaxation and comfort.</p>
        <div className="property-images">
          <img src="/property-1.jpg" alt="Outdoor terrace with ocean view" />
          <img src="/property-2.jpg" alt="Modern and cozy interior" />
        </div>
      </section>

      {/* Locale Section */}
      <section className="locale">
        <h2>Discover Santa Maria</h2>
        <p>From golden beaches to scenic hiking trails, immerse yourself in island life.</p>
        <div className="locale-images">
          <img src="/locale-1.jpg" alt="Stunning cliffs and ocean views" />
          <img src="/locale-2.jpg" alt="Authentic Azorean cuisine" />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <h2>Guest Experiences</h2>
        <p>See what our guests say about their stay at Casa da Ponta Negra.</p>
        <div className="reviews-images">
          <img src="/reviews-1.jpg" alt="Cozy living space with fireplace" />
          <img src="/reviews-2.jpg" alt="Relaxing outdoor bathtub with nature views" />
        </div>
      </section>

      {/* Indoors Section (Amenities) */}
      <section className="amenities">
        <h2>Comfort & Features</h2>
        <p>Everything you need for an unforgettable stay.</p>
        <div className="amenity-list">
          <div className="amenity"><FaBed size={30} /><p>Spacious King Bed</p></div>
          <div className="amenity"><FaRegSnowflake size={30} /><p>Premium Bedding & Pillows</p></div>
          <div className="amenity"><FaFire size={30} /><p>Cozy Indoor Fireplace</p></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
