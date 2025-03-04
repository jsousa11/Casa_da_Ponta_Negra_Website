import React from "react";
import { FaInstagram, FaFacebook, FaAirbnb } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo */}
        <div className="footer-logo">
          <img src="src/assets/V1_WHITE.png" alt="Casa da Ponta Negra logo" />
        </div>

        {/* Contato */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>pontanegrahouse@gmail.com</p>
          <p>(+351) 963 504 856</p>
        </div>

        {/* Endereço */}
        <div className="footer-address">
          <h3>Address</h3>
          <p>358 Lenora Road</p>
          <p>Flinders, Victoria 3929</p>
        </div>

        {/* Redes Sociais */}
        <div className="footer-social">
          <a href="https://www.instagram.com/casapontanegra.sma/"><FaInstagram className="footer-icon" /></a>
          <a href="https://www.facebook.com/profile.php?id=61552277438053"><FaFacebook className="footer-icon" /></a>
          <a href="https://www.booking.com/hotel/pt/casa-da-ponta-negra-vila-do-porto.html?label=gen173nr-1BCAsouwFCIWNhc2EtZGEtcG9udGEtbmVncmEtdmlsYS1kby1wb3J0b0gxWARouwGIAQGYATG4ARnIAQzYAQHoAQGIAgGoAgO4AtCMnb4GwAIB0gIkYjg0MjNiMGQtNzk2Ny00OWUyLTlhNmQtYjA2NjQ2NzYxN2Jm2AIF4AIB&sid=f5b17de40a0a0b3cfcbc0a915bd5935b&dist=0&group_adults=2&group_children=0&keep_landing=1&no_rooms=1&sb_price_type=total&type=total&"><TbBrandBooking className="footer-icon" /></a>
          <a href="https://www.airbnb.pt/rooms/993976971668808205?source_impression_id=p3_1741112895_P3Q_U5wSEDpjFoix"><FaAirbnb className="footer-icon" /></a>
        </div>
      </div>

      {/* Direitos Autorais */}
      <div className="footer-copy">
        <p>&copy; 2024 Casa da Ponta Negra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
