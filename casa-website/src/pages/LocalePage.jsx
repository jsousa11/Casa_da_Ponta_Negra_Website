import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/LocalePage.css";

// Dados mantidos no topo do ficheiro para fácil acesso
const places = [
  {
    name: "Central Pub",
    address: "Praça 1º de Maio, Vila do Porto",
    website: "https://facebook.com/centralpubsantamaria",
    description: "Petiscos, hambúrgueres e ambiente descontraído no centro da vila."
  },
  {
    name: "Espaço Em Cena",
    address: "Rua Teófilo Braga, Vila do Porto",
    website: "https://facebook.com/espacoemcena",
    description: "Café cultural com refeições leves, brunch e eventos."
  },
  {
    name: "Restaurante Atlântico",
    address: "Avenida de São João de Deus, Vila do Porto",
    website: "https://facebook.com/restauranteatlanticosantamaria",
    description: "Peixe fresco, mariscos e pratos regionais."
  },
  {
    name: "Bar dos Anjos",
    address: "Praia dos Anjos, Santa Maria",
    website: "https://facebook.com/bardosanjos",
    description: "Bar à beira-mar com tapas, cocktails e música ao pôr do sol."
  }
];

const attractions = [
  {
    name: "Praia Formosa",
    address: "Praia Formosa, Santa Maria",
    directions: "https://maps.app.goo.gl/9v8q9jv9v8q9jv9v8",
    description: "A praia mais famosa da ilha, com areia clara e águas calmas."
  },
  {
    name: "Poço da Pedreira",
    address: "São Pedro, Santa Maria",
    directions: "https://maps.app.goo.gl/poçodapedreira",
    description: "Antiga pedreira transformada em lago, rodeada por falésias avermelhadas."
  },
  {
    name: "Miradouro da Macela",
    address: "Santa Bárbara, Santa Maria",
    directions: "https://maps.app.goo.gl/miradourodasmacela",
    description: "Vista panorâmica sobre a ilha e o oceano Atlântico."
  },
  {
    name: "Baía dos Anjos",
    address: "Anjos, Santa Maria",
    directions: "https://maps.app.goo.gl/baiadosanjos",
    description: "Local histórico onde Cristóvão Colombo fez escala no regresso da América."
  }
];

// --- Componentes Reutilizáveis Internos ---

// Componente para renderizar cada item da lista (local ou atração)
const InfoItem = ({ item }) => (
  <div className="info-item">
    <div className="info-text">
      <h3>{item.name}</h3>
      <p>{item.address}</p>
      {item.website && (
        <a href={item.website} target="_blank" rel="noopener noreferrer">
          Visitar Website
        </a>
      )}
      {item.directions && (
        <a href={item.directions} target="_blank" rel="noopener noreferrer">
          Ver no Mapa
        </a>
      )}
    </div>
    <p className="info-description">{item.description}</p>
  </div>
);

// Componente para renderizar uma secção inteira (lista + imagem)
const InfoSection = ({ title, items, imageSrc, imageAlt, sectionId }) => (
  <section id={sectionId} className="info-section">
    <div className="info-container">
      <div className="info-list">
        <h2>{title}</h2>
        {items.map((item) => (
          <InfoItem key={item.name} item={item} />
        ))}
      </div>
      <div className="info-image-wrapper">
        <img src={imageSrc} alt={imageAlt} className="info-image" />
      </div>
    </div>
  </section>
);


// --- Componente Principal da Página ---

const LocalePage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="locale-hero">
        <div className="locale-text">
          <h1>Santa Maria, Açores</h1>
          <p>Descubra a autenticidade, a natureza e os sabores únicos da ilha mais solarenga dos Açores.</p>
        </div>
        <div className="locale-images">
          <img src="src/assets/praia-formosa.jpg" alt="Praia Formosa" className="locale-main-image" />
          <img src="src/assets/poço-da-pedreira.jpg" alt="Poço da Pedreira" className="locale-secondary-image" />
        </div>
      </section>

      {/* Secções de conteúdo agora usam o componente reutilizável InfoSection */}
      {/* Isto torna o código mais limpo e sem repetição */}
      <InfoSection
        sectionId="eat-drink-section"
        title="Comer & Beber"
        items={places}
        imageSrc="src/assets/gastronomia.jpg"
        imageAlt="Gastronomia local"
      />
      
      <InfoSection
        sectionId="attractions-section"
        title="Atrações"
        items={attractions}
        imageSrc="src/assets/miradouro.jpg"
        imageAlt="Miradouro"
      />

      <Footer />
    </div>
  );
};

export default LocalePage;