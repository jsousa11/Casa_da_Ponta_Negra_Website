import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaAirbnb } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { useLanguage } from "../context/LanguageContext";
import { site } from "../config/site";
import "../styles/Footer.css";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const external = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + redes */}
        <div className="footer-brand">
          <img src="/assets/LOGO_WHITE.png" alt="Casa da Ponta Negra" className="footer-logo" />
          <div className="footer-social">
            <a href={site.social.instagram} {...external} aria-label="Instagram"><FaInstagram /></a>
            <a href={site.social.facebook} {...external} aria-label="Facebook"><FaFacebook /></a>
            <a href={site.platforms.booking} {...external} aria-label="Booking.com"><TbBrandBooking /></a>
            <a href={site.platforms.airbnb} {...external} aria-label="Airbnb"><FaAirbnb /></a>
          </div>
        </div>

        {/* Explorar */}
        <div className="footer-col">
          <h3>{t.footer.explore}</h3>
          <Link to="/property">{t.nav.property}</Link>
          <Link to="/locale">{t.nav.locale}</Link>
          <Link to="/info">{t.nav.info}</Link>
          <Link to="/book">{t.nav.book}</Link>
        </div>

        {/* Contacto */}
        <div className="footer-col">
          <h3>{t.footer.contact}</h3>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
        </div>

        {/* Morada */}
        <div className="footer-col">
          <h3>{t.footer.address}</h3>
          <a href={site.mapsUrl} {...external}>
            Ponta Negra · Baía de São Lourenço<br />
            9580-114 Vila do Porto<br />
            Santa Maria, Açores
          </a>
        </div>
      </div>

      {/* Linha legal */}
      <div className="footer-legal">
        <p>© {year} {site.name}. {t.footer.rights}</p>
        <div className="footer-legal__links">
          {site.rnal && <span>{t.footer.rnal}: {site.rnal}</span>}
          <a href="https://www.livroreclamacoes.pt" {...external}>{t.footer.complaints}</a>
          <Link to="/privacy">{t.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
