import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/LocalePage.css";

const places = [
  {
    name: "Central Pub",
    address: "Praça 1º de Maio, Vila do Porto",
    website: "facebook.com/centralpubsantamaria",
    description: "Petiscos, hambúrgueres e ambiente descontraído no centro da vila."
  },
  {
    name: "Espaço Em Cena",
    address: "Rua Teófilo Braga, Vila do Porto",
    website: "facebook.com/espacoemcena",
    description: "Café cultural com refeições leves, brunch e eventos."
  },
  {
    name: "Restaurante Atlântico",
    address: "Avenida de São João de Deus, Vila do Porto",
    website: "facebook.com/restauranteatlanticosantamaria",
    description: "Peixe fresco, mariscos e pratos regionais."
  },
  {
    name: "Bar dos Anjos",
    address: "Praia dos Anjos, Santa Maria",
    website: "facebook.com/bardosanjos",
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

      {/* Eat & Drink Section */}
      <section className="locale-section">
        <h2>Comer & Beber</h2>
        <div className="locale-container">
          <div className="locale-list">
            {places.map((place, index) => (
              <div key={index} className="locale-item">
                <div className="locale-text">
                  <h3>{place.name}</h3>
                  <p>{place.address}</p>
                  <a href={`https://${place.website}`} target="_blank" rel="noopener noreferrer">
                    {place.website.replace("https://", "")}
                  </a>
                </div>
                <p className="locale-description">{place.description}</p>
                {index < places.length - 1 && <hr />}
              </div>
            ))}
          </div>
          <div className="locale-image">
            <img src="src/assets/gastronomia.jpg" alt="Gastronomia local" />
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="attractions-section">
        <h2>Atrações</h2>
        <div className="attractions-container">
          <div className="attractions-list">
            {attractions.map((attraction, index) => (
              <div key={index} className="attraction-item">
                <div className="attraction-text">
                  <h3>{attraction.name}</h3>
                  <p>{attraction.address}</p>
                  <a href={attraction.directions} target="_blank" rel="noopener noreferrer">
                    Ver no mapa
                  </a>
                </div>
                <p className="attraction-description">{attraction.description}</p>
                {index < attractions.length - 1 && <hr />}
              </div>
            ))}
          </div>
          <div className="attractions-image">
            <img src="src/assets/miradouro.jpg" alt="Miradouro" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocalePage;
