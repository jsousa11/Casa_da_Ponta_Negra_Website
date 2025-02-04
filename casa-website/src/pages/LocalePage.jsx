import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/LocalePage.css"; // Certifique-se de que este CSS está correto

const places = [
  {
    name: "Flinders Deli",
    address: "5 Chester Ave, Flinders, VIC 3929",
    website: "flindersdeli.com.au",
    description: "Gourmet food, nibbles and wine."
  },
  {
    name: "Hideaway Café",
    address: "15 Shoreham Rd, Shoreham, VIC 3916",
    website: "hideawaycafe.co",
    description: "Breakfast, Lunch & Brunch."
  },
  {
    name: "Ember",
    address: "52 Linden Grove, Merricks, VIC 3916",
    website: "ember-restaurant.com.au",
    description: "Fine-dining with a view to match."
  },
  {
    name: "Dandara Brewing",
    address: "7 Rosewood Ct, Flinders, VIC 3929",
    website: "dandara.com.au",
    description: "Local beer, live music."
  }
];

const attractions = [
  {
    name: "Cape Schanck Lighthouse",
    address: "15 Shoreham Road, Shoreham",
    directions: "#",
    description: "A historic lighthouse with guided tours and spectacular coastal views."
  },
  {
    name: "Mushroom Reef Marine Sanctuary",
    address: "33 Highcliffe Road, Cape Schanck",
    directions: "#",
    description: "A unique ecosystem for snorkelling or diving."
  },
  {
    name: "Flinders Pier",
    address: "52 Linden Grove, Merricks, VIC 3916",
    directions: "#",
    description: "A picturesque location for a stroll, fishing, or enjoying the views."
  },
  {
    name: "Montalto Vineyard & Olive Grove",
    address: "7 Rosewood Ct, VIC 3929",
    directions: "#",
    description: "A renowned winery offering wine tastings, gourmet dining."
  }
];

const LocalePage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="locale-hero">
        <div className="locale-text">
          <h1>Locale</h1>
          <p>The enchanting allure of picturesque Flinders.</p>
        </div>
        <div className="locale-images">
          <img src="/images/cliffs-view.jpg" alt="Cliffs view" className="locale-main-image" />
          <img src="/images/gourmet-dish.jpg" alt="Gourmet dish" className="locale-secondary-image" />
        </div>
      </section>
      {/* Eat & Drink Section */}
      <section className="locale-section">
        <h2>Eat & Drink</h2>
        <div className="locale-container">
          <div className="locale-list">
            {places.map((place, index) => (
              <div key={index} className="locale-item">
                <div className="locale-text">
                  <h3>{place.name}</h3>
                  <p>{place.address}</p>
                  <a href={`https://${place.website}`} target="_blank" rel="noopener noreferrer">
                    {place.website}
                  </a>
                </div>
                <p className="locale-description">{place.description}</p>
                {index < places.length - 1 && <hr />}
              </div>
            ))}
          </div>
          <div className="locale-image">
            <img src="/images/restaurant.jpg" alt="Dish" />
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="attractions-section">
        <h2>Attractions</h2>
        <div className="attractions-container">
          <div className="attractions-list">
            {attractions.map((attraction, index) => (
              <div key={index} className="attraction-item">
                <div className="attraction-text">
                  <h3>{attraction.name}</h3>
                  <p>{attraction.address}</p>
                  <a href={attraction.directions} target="_blank" rel="noopener noreferrer">
                    Directions
                  </a>
                </div>
                <p className="attraction-description">{attraction.description}</p>
                {index < attractions.length - 1 && <hr />}
              </div>
            ))}
          </div>
          <div className="attractions-image">
            <img src="/images/lighthouse.jpg" alt="Lighthouse" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocalePage;
