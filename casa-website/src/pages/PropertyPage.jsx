import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTree, FaBicycle, FaWineGlassAlt, FaHiking, FaLeaf, FaBath, FaBed, FaRegSnowflake, FaFire, FaUtensils, FaArchive } from "react-icons/fa";
import "../styles/PropertyPage.css";

// --- Dados da Página ---
const mainGalleryImages = [
  "view.jpg", "livingroom.jpg", "bedroom_1.jpg", 
  "bedroom_2.jpg", "bathroom_1.jpg", "kitchen.jpg", 
  "view_jacuzzi.jpg", "view_balcony.jpg",
];

const natureGalleryImages = [
  "beach_view.jpg", 
  "ribeira-de-maloas-6.jpg"
];

const indoorFeatures = [
  { icon: FaBed, text: "2 quartos com camas king & queen" },
  { icon: FaRegSnowflake, text: "Almofadas e lençóis confortáveis" },
  { icon: FaFire, text: "Lareira acolhedora" },
  { icon: FaBath, text: "Casa de banho moderna" },
  { icon: FaUtensils, text: "Cozinha totalmente equipada" },
  { icon: FaArchive, text: "Amplo armazenamento" }
];

const outdoorFeatures = [
  { icon: FaTree, text: "Jardim privado e natureza envolvente" },
  { icon: FaBicycle, text: "Trilhos para BTT e caminhadas" },
  { icon: FaWineGlassAlt, text: "Refeições ao ar livre e BBQ" },
  { icon: FaHiking, text: "Acesso direto à praia" },
  { icon: FaLeaf, text: "Vistas para o mar e pôr do sol" },
  { icon: FaBath, text: "Chuveiro exterior" }
];


// --- Componentes Reutilizáveis ---

const FeatureSection = ({ title, subtitle, features, theme }) => (
  <section className={`feature-section feature-section--${theme}`}>
    <div className="feature-text">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
    <div className="features-grid">
      {features.map(({ icon: Icon, text }, index) => (
        <div className="feature-item" key={index}>
          <Icon size={24} className="feature-item__icon" />
          <p>{text}</p>
        </div>
      ))}
    </div>
  </section>
);

const GallerySection = ({ title, images, theme, layout }) => (
  <section className={`gallery gallery--${theme}`}>
    <h2 className="gallery__title">{title}</h2>
    <div className={`gallery__container gallery__container--${layout}`}>
      {images.map((img, idx) => (
        <img
          key={img}
          src={`src/assets/${img}`}
          alt={`${title} ${idx + 1}`}
          className="gallery__image"
        />
      ))}
    </div>
  </section>
);


// --- Componente Principal ---

const PropertyPage = () => {
  return (
    <div>
      <Navbar />

      <header className="property-hero">
        <img
          src="src/assets/front_house.jpg"
          alt="Casa da Ponta Negra - Exterior"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>Casa da Ponta Negra</h1>
          <p>
            Um refúgio tranquilo à beira-mar em Santa Maria, Açores. Desfrute de privacidade, conforto e vistas deslumbrantes a poucos passos da areia.
          </p>
        </div>
      </header>
      
      <main>
        <GallerySection
          title="Galeria"
          images={mainGalleryImages}
          theme="light"
          layout="grid"
        />

        <FeatureSection
          title="Interiores"
          subtitle="Uma atmosfera convidativa para o repouso e recreação tranquila."
          features={indoorFeatures}
          theme="accent"
        />

        <FeatureSection
          title="Exteriores"
          subtitle="Um santuário para o lazer e exploração energizante."
          features={outdoorFeatures}
          theme="dark"
        />

        <GallerySection
          title="Praia & Natureza"
          images={natureGalleryImages}
          theme="nature"
          layout="row"
        />
      </main>

      <Footer />
    </div>
  );
};

export default PropertyPage;