import React from "react";
import { FaInstagram, FaFacebook, FaAirbnb } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Footer.css";

const Footer = () => {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo">
          <img src="/assets/LOGO_WHITE.png" alt="Casa da Ponta Negra logo" />
        </div>

        {/* Contato */}
        <div className="footer-contact">
          <h3>{t.footer.contact}</h3>
          <a href="mailto:pontanegrahouse@gmail.com" className="footer-contact-link">pontanegrahouse@gmail.com</a>
          <a href="tel:+351963504856" className="footer-contact-link">(+351) 963 504 856</a>
        </div>

        {/* Endereço */}
        <div className="footer-address">
          <h3>{t.footer.address}</h3>
          <a
            href="https://maps.app.goo.gl/8nCDUXo3fRSxScvWA"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address-link"
          >
            <p>Ponta Negra - Baía de São Lourenço</p>
            <p>9580-114 Vila do Porto</p>
            <p>Santa Maria, Açores</p>
          </a>
        </div>

        {/* Redes Sociais */}
        <div className="footer-social">
          <a href="https://www.instagram.com/casapontanegra.sma/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram className="footer-icon" /></a>
          <a href="https://www.facebook.com/profile.php?id=61552277438053" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook className="footer-icon" /></a>
          <a href="https://www.booking.com/hotel/pt/casa-da-ponta-negra-vila-do-porto.html?label=gen173nr-1BCAsouwFCIWNhc2EtZGEtcG9udGEtbmVncmEtdmlsYS1kby1wb3J0b0gxWARouwGIAQGYATG4ARnIAQzYAQHoAQGIAgGoAgO4AtCMnb4GwAIB0gIkYjg0MjNiMGQtNzk2Ny00OWUyLTlhNmQtYjA2NjQ2NzYxN2Jm2AIF4AIB&sid=f5b17de40a0a0b3cfcbc0a915bd5935b&dist=0&group_adults=2&group_children=0&keep_landing=1&no_rooms=1&sb_price_type=total&type=total&"><TbBrandBooking className="footer-icon" /></a>
          <a href="https://www.airbnb.pt/rooms/993976971668808205?source_impression_id=p3_1741112895_P3Q_U5wSEDpjFoix"><FaAirbnb className="footer-icon" /></a>
        </div>
      </div>

      {/* Direitos Autorais */}
      <div className="footer-copy">
        <p>© {year} Casa da Ponta Negra. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
      </div>
    </footer>
  );
};

export default Footer;
