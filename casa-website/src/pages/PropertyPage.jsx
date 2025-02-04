import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTree, FaBicycle, FaWineGlassAlt, FaHiking, FaLeaf, FaBath, FaBed, FaRegSnowflake, FaFire, FaUtensils, FaArchive } from "react-icons/fa";
import "../styles/PropertyPage.css"; // Importação do CSS

// Componente reutilizável para "Indoors" e "Outdoors"
const FeatureSection = ({ title, subtitle, features, backgroundColor }) => {
  return (
    <section className="feature-section" style={{ backgroundColor }}>
      <div className="feature-text">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="features-grid">
        {features.map(({ icon: Icon, text }, index) => (
          <div className="feature-item" key={index}>
            <Icon size={24} className="icon" />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const PropertyPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="property-hero">
        <img src="/property-hero.jpg" alt="Luxury cabin" className="hero-image" />
      </div>

      {/* Indoors Section */}
      <FeatureSection
        title="Indoors"
        subtitle="An inviting atmosphere for repose and quiet recreation."
        backgroundColor="#E5D4BA"
        features={[
          { icon: FaBed, text: "King size bed" },
          { icon: FaRegSnowflake, text: "Comfortable pillows" },
          { icon: FaFire, text: "Cozy fireplace" },
          { icon: FaBath, text: "Towels and bed linen" },
          { icon: FaUtensils, text: "Kitchen essentials" },
          { icon: FaArchive, text: "Ample personal storage" }
        ]}
      />

      {/* Outdoors Section */}
      <FeatureSection
        title="Outdoors"
        subtitle="A sanctuary for leisure and energizing exploration."
        backgroundColor="#43543E"
        features={[
          { icon: FaTree, text: "Natural splendour" },
          { icon: FaBicycle, text: "Mountain biking trails" },
          { icon: FaWineGlassAlt, text: "Wineries and restaurants" },
          { icon: FaHiking, text: "Hiking trails" },
          { icon: FaLeaf, text: "Natural forest and bushland" },
          { icon: FaBath, text: "Outdoor bath" }
        ]}
      />

      {/* Gallery Section */}
      <section className="gallery">
        <div className="gallery-container">
          <img src="/outdoor-1.jpg" alt="Scenic view" className="gallery-image" />
          <img src="/outdoor-2.jpg" alt="Outdoor bath" className="gallery-image" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyPage;
