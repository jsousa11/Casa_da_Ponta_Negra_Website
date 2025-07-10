import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTree, FaBicycle, FaWineGlassAlt, FaHiking, FaLeaf, FaBath, FaBed, FaRegSnowflake, FaFire, FaUtensils, FaArchive } from "react-icons/fa";
import "../styles/PropertyPage.css";

const galleryImages = [
  "view.jpg",
  "livingroom.jpg",
  "bedroom_1.jpg",
  "bedroom_2.jpg",
  "bathroom_1.jpg",
  "kitchen.jpg",
  "view_jacuzzi.jpg",
  "view_balcony.jpg",
];

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
      <div className="property-hero" style={{ position: "relative" }}>
        <img
          src="src/assets/front_house.jpg"
          alt="Casa da Ponta Negra - Exterior"
          className="hero-image"
        />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "100%",
            background: "linear-gradient(180deg,rgba(47,62,41,0.2) 60%,rgba(47,62,41,0.7) 100%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            color: "#fff",
            zIndex: 2,
            textShadow: "0 2px 8px #2F3E29"
          }}
        >
          <h1 style={{ fontSize: 48, marginBottom: 10 }}>Casa da Ponta Negra</h1>
          <p style={{ fontSize: 22, maxWidth: 600 }}>
            A tranquil oceanfront retreat in Santa Maria, Azores. Enjoy privacy, comfort, and breathtaking views just steps from the sand.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="gallery" style={{ background: "#F5EFE6" }}>
        <h2 style={{ color: "#2F3E29", marginBottom: 30 }}>Gallery</h2>
        <div className="gallery-container" style={{ flexWrap: "wrap" }}>
          {galleryImages.map((img, idx) => (
            <img
              key={img}
              src={`src/assets/${img}`}
              alt={`Casa da Ponta Negra ${idx + 1}`}
              className="gallery-image"
              style={{
                width: "30%",
                minWidth: 250,
                margin: "10px",
                borderRadius: 12,
                objectFit: "cover",
                boxShadow: "0 2px 12px rgba(47,62,41,0.08)"
              }}
            />
          ))}
        </div>
      </section>

      {/* Indoors Section */}
      <FeatureSection
        title="Indoors"
        subtitle="An inviting atmosphere for repose and quiet recreation."
        backgroundColor="#E5D4BA"
        features={[
          { icon: FaBed, text: "2 bedrooms with king & queen beds" },
          { icon: FaRegSnowflake, text: "Comfortable pillows & linens" },
          { icon: FaFire, text: "Cozy fireplace" },
          { icon: FaBath, text: "Modern bathroom" },
          { icon: FaUtensils, text: "Fully equipped kitchen" },
          { icon: FaArchive, text: "Ample storage" }
        ]}
      />

      {/* Outdoors Section */}
      <FeatureSection
        title="Outdoors"
        subtitle="A sanctuary for leisure and energizing exploration."
        backgroundColor="#43543E"
        features={[
          { icon: FaTree, text: "Private garden & natural surroundings" },
          { icon: FaBicycle, text: "Mountain biking & hiking trails" },
          { icon: FaWineGlassAlt, text: "Outdoor dining & BBQ" },
          { icon: FaHiking, text: "Direct beach access" },
          { icon: FaLeaf, text: "Ocean & sunset views" },
          { icon: FaBath, text: "Outdoor shower" }
        ]}
      />

      {/* Beach View Section */}
      <section className="gallery" style={{ background: "#A8B89F" }}>
        <h2 style={{ color: "#2F3E29", marginBottom: 30 }}>Beach & Nature</h2>
        <div className="gallery-container" style={{ justifyContent: "center" }}>
          <img
            src="src/assets/beach_view.jpg"
            alt="Beach view"
            className="gallery-image"
            style={{
              width: "45%",
              minWidth: 300,
              borderRadius: 12,
              objectFit: "cover",
              margin: "10px"
            }}
          />
          <img
            src="src/assets/ribeira-de-maloas-6.jpg"
            alt="Cliffs and ocean"
            className="gallery-image"
            style={{
              width: "45%",
              minWidth: 300,
              borderRadius: 12,
              objectFit: "cover",
              margin: "10px"
            }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyPage;
