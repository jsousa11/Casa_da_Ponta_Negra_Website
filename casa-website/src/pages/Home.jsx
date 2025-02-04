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
        <h2>Far away from the suburbs.</h2>
        <img src="/hero-image.jpg" alt="Cabin in the woods" />
      </section>

      {/* Property Section */}
      <section className="property">
        <h2>Property</h2>
        <p>A space tailor-made to relax and recenter.</p>
        <div className="property-images">
          <img src="/property-1.jpg" alt="Cabin exterior" />
          <img src="/property-2.jpg" alt="Cabin interior" />
        </div>
      </section>

      {/* Locale Section */}
      <section className="locale">
        <h2>Locale</h2>
        <p>The enchanting allure of the Mornington Peninsula.</p>
        <div className="locale-images">
          <img src="/locale-1.jpg" alt="Cliffs view" />
          <img src="/locale-2.jpg" alt="Gourmet dish" />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <h2>Reviews</h2>
        <p>Memorable experiences and cherished moments.</p>
        <div className="reviews-images">
          <img src="/reviews-1.jpg" alt="Cozy cabin interior" />
          <img src="/reviews-2.jpg" alt="Outdoor bathtub" />
        </div>
      </section>

      {/* Indoors Section (Extras) */}
      <div className="amenities">
        <div className="amenity"><FaBed size={30} /><p>King size bed</p></div>
        <div className="amenity"><FaRegSnowflake size={30} /><p>Comfortable pillows</p></div>
        <div className="amenity"><FaFire size={30} /><p>Cozy fireplace</p></div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
