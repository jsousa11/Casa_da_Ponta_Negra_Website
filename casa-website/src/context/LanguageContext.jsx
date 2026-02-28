import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  pt: {
    // Navbar
    nav: {
      home: "Home",
      property: "Propriedade",
      locale: "Região",
      contact: "Contacto",
    },

    // Footer
    footer: {
      contact: "Contacto",
      address: "Morada",
      copyright: "© 2024 Casa da Ponta Negra. Todos os direitos reservados.",
    },

    // Home
    home: {
      heroTitle: "O Seu Refúgio Privado em Santa Maria",
      heroSubtitle: "Experiencie a tranquilidade dos Açores com vistas deslumbrantes sobre o oceano.",
      scroll: "Scroll",
      propertyTitle: "Propriedade",
      propertyText: "Um retiro privado entre vinhas centenárias, falésias e a baía de São Lourenço. Rodeado pela natureza açoriana, a poucos passos do mar.",
      propertyBtn: "Explorar Propriedade",
      localeTitle: "Descubra Santa Maria",
      localeText: "De praias douradas a trilhos de montanha, mergulhe na vida da ilha.",
      localeBtn: "Explorar Região",
      bookTitle: "Reserve a sua estadia",
      bookSubtitle: "Disponível nas principais plataformas de alojamento.",
      bookCta: "Ver disponibilidade →",
      reviewsTitle: "Experiências dos Hóspedes",
      reviewsSubtitle: "Veja o que os nossos hóspedes dizem sobre a sua estadia na Casa da Ponta Negra.",
      nights: "noites",
    },

    // Property
    property: {
      heroText: "Rodeada de vinhas centenárias e natureza intocada, a Casa da Ponta Negra oferece privacidade, conforto e vistas deslumbrantes sobre a baía de São Lourenço.",
      galleryTitle: "Galeria",
      interiorTitle: "Interior",
      interiorSubtitle: "Conforto e elegância para descansar e desfrutar.",
      exteriorTitle: "Exterior",
      exteriorSubtitle: "Natureza, vistas e privilégios únicos à beira-mar.",
      features: {
        indoor: [
          "2 quartos — cama de casal",
          "Ar condicionado em todos os quartos",
          "WiFi gratuito",
          "Smart TV",
          "Cozinha totalmente equipada",
          "2 casas de banho",
          "Máquina de lavar e secar roupa",
        ],
        outdoor: [
          "Jacuzzi privativo com vista para a baía",
          "Terraço rodeado de vinhas e natureza",
          "Integrado na paisagem açoriana — falésias, vinhas e o Atlântico",
          "Acesso direto à praia",
          "Duche exterior",
          "Zona de barbecue / refeições ao ar livre",
          "Fogueira ao ar livre",
        ],
      },
    },

    // Locale
    locale: {
      heroTitle: "Santa Maria, Açores",
      heroSubtitle: "Descubra a autenticidade, a natureza e os sabores únicos da ilha mais solarenga dos Açores.",
      attractionsTitle: "Sítios a Visitar",
      attractionsSubtitle: "Os melhores lugares para explorar em Santa Maria, Açores",
      attractionsMore: "Ver mais sobre Santa Maria →",
      eatDrinkTitle: "Comer & Beber",
      viewMap: "Ver no Mapa",
      arrowPrev: "Anterior",
      arrowNext: "Próximo",
      attractions: [
        { name: "Praia Formosa", description: "A praia mais famosa da ilha, com areia clara e águas calmas." },
        { name: "Poço da Pedreira", description: "Antiga pedreira transformada em lago, rodeada por falésias avermelhadas." },
        { name: "Ribeira de Maloas", description: "Vale verdejante com falésias vulcânicas, trilhos pedestres e vistas únicas sobre o oceano." },
        { name: "Baía da Maia", description: "Praia de areia dourada numa baía tranquila, ideal para mergulho e snorkeling." },
        { name: "Baía de São Lourenço", description: "Uma das baías mais bonitas dos Açores, com águas cristalinas e falésias imponentes." },
        { name: "Barreiro da Faneca", description: "Paisagem marciana de tons avermelhados única na Europa, reserva natural protegida." },
        { name: "Cascata do Aveiro", description: "Queda de água escondida entre a vegetação densa, num dos pontos mais selvagens da ilha." },
      ],
      places: [
        { name: "Ponta Negra Restaurante e Bar de Praia", description: "Bar e restaurante mesmo na praia da baía, com peixe fresco e cocktails ao pôr do sol." },
        { name: "Central Pub", description: "Ambiente descontraído no centro da vila com petiscos, hambúrgueres e boa cerveja." },
        { name: "A Travessa", description: "Cozinha caseira açoriana com pratos do dia, ambiente acolhedor e preços acessíveis." },
        { name: "O Tibério", description: "Um dos restaurantes mais conceituados da ilha, com marisco e peixe de qualidade." },
        { name: "Bar do Blues", description: "Bar com alma, música ao vivo e cocktails num ambiente descontraído e acolhedor." },
      ],
    },

    // Contact
    contact: {
      title: "Mensagem",
      subtitle: "Esforçamo-nos por responder dentro de 24 horas.",
      namePlaceholder: "Nome",
      emailPlaceholder: "Endereço de Email",
      phonePlaceholder: "Telefone (Opcional)",
      messagePlaceholder: "Mensagem",
      sendBtn: "Enviar Mensagem",
      sendingBtn: "A Enviar...",
      successMsg: "Mensagem enviada com sucesso!",
      errorMsg: "Erro ao enviar a mensagem. Tente novamente.",
    },
  },

  en: {
    // Navbar
    nav: {
      home: "Home",
      property: "Property",
      locale: "Locale",
      contact: "Contact",
    },

    // Footer
    footer: {
      contact: "Contact",
      address: "Address",
      copyright: "© 2024 Casa da Ponta Negra. All rights reserved.",
    },

    // Home
    home: {
      heroTitle: "Your Private Escape in Santa Maria",
      heroSubtitle: "Experience the tranquility of the Azores with breathtaking ocean views.",
      scroll: "Scroll",
      propertyTitle: "Property",
      propertyText: "A private retreat among century-old vineyards, cliffs and the bay of São Lourenço. Surrounded by Azorean nature, just steps from the sea.",
      propertyBtn: "Explore Property",
      localeTitle: "Discover Santa Maria",
      localeText: "From golden beaches to scenic hiking trails, immerse yourself in island life.",
      localeBtn: "Explore Locale",
      bookTitle: "Book Your Stay",
      bookSubtitle: "Available on major booking platforms.",
      bookCta: "Check availability →",
      reviewsTitle: "Guest Experiences",
      reviewsSubtitle: "See what our guests say about their stay at Casa da Ponta Negra.",
      nights: "nights",
    },

    // Property
    property: {
      heroText: "Surrounded by century-old vineyards and untouched nature, Casa da Ponta Negra offers privacy, comfort and breathtaking views over São Lourenço bay.",
      galleryTitle: "Gallery",
      interiorTitle: "Interior",
      interiorSubtitle: "Comfort and elegance to rest and enjoy.",
      exteriorTitle: "Exterior",
      exteriorSubtitle: "Nature, views and unique privileges by the sea.",
      features: {
        indoor: [
          "2 bedrooms — double beds",
          "Air conditioning in all rooms",
          "Free WiFi",
          "Smart TV",
          "Fully equipped kitchen",
          "2 bathrooms",
          "Washing machine and dryer",
        ],
        outdoor: [
          "Private jacuzzi with bay views",
          "Terrace surrounded by vineyards and nature",
          "Integrated into the Azorean landscape — cliffs, vineyards and the Atlantic",
          "Direct beach access",
          "Outdoor shower",
          "BBQ / outdoor dining area",
          "Outdoor bonfire",
        ],
      },
    },

    // Locale
    locale: {
      heroTitle: "Santa Maria, Azores",
      heroSubtitle: "Discover the authenticity, nature and unique flavours of the sunniest island in the Azores.",
      attractionsTitle: "Places to Visit",
      attractionsSubtitle: "The best places to explore in Santa Maria, Azores",
      attractionsMore: "Explore more of Santa Maria →",
      eatDrinkTitle: "Eat & Drink",
      viewMap: "View on Map",
      arrowPrev: "Previous",
      arrowNext: "Next",
      attractions: [
        { name: "Praia Formosa", description: "The most famous beach on the island, with white sand and calm waters." },
        { name: "Poço da Pedreira", description: "An old quarry transformed into a lagoon, surrounded by reddish cliffs." },
        { name: "Ribeira de Maloas", description: "A lush valley with volcanic cliffs, hiking trails and unique ocean views." },
        { name: "Baía da Maia", description: "A golden sand beach in a tranquil bay, perfect for diving and snorkelling." },
        { name: "Baía de São Lourenço", description: "One of the most beautiful bays in the Azores, with crystal clear water and imposing cliffs." },
        { name: "Barreiro da Faneca", description: "A unique Martian-like red landscape in Europe, a protected natural reserve." },
        { name: "Cascata do Aveiro", description: "A waterfall hidden in dense vegetation, in one of the wildest corners of the island." },
      ],
      places: [
        { name: "Ponta Negra Restaurante e Bar de Praia", description: "Bar and restaurant right on the bay beach, with fresh fish and cocktails at sunset." },
        { name: "Central Pub", description: "Relaxed atmosphere in the village centre with snacks, burgers and great beer." },
        { name: "A Travessa", description: "Home-style Azorean cooking with daily specials, a welcoming atmosphere and affordable prices." },
        { name: "O Tibério", description: "One of the most renowned restaurants on the island, with quality seafood and fish." },
        { name: "Bar do Blues", description: "A soulful bar with live music and cocktails in a relaxed and welcoming atmosphere." },
      ],
    },

    // Contact
    contact: {
      title: "Message",
      subtitle: "We strive to respond within 24 hours.",
      namePlaceholder: "Name",
      emailPlaceholder: "Email Address",
      phonePlaceholder: "Phone (Optional)",
      messagePlaceholder: "Message",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successMsg: "Message sent successfully!",
      errorMsg: "Failed to send message. Please try again.",
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
