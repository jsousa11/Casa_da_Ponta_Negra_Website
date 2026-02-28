import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Navbar.css";

const SCROLL_THRESHOLD = 10;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolled && window.scrollY > SCROLL_THRESHOLD) {
        setIsScrolled(true);
      } else if (isScrolled && window.scrollY <= 0) {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <nav className={`navbar${isScrolled ? " scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setIsScrolled(false)}>
          <img src="src/assets/LOGO_BLACK.png" alt="Casa da Ponta Negra logo" />
        </Link>

        {/* Menu de navegação */}
        <div className="nav-links">
          <Link to="/" onClick={() => setIsScrolled(false)}>{t.nav.home}</Link>
          <Link to="/property" onClick={() => setIsScrolled(false)}>{t.nav.property}</Link>
          <Link to="/locale" onClick={() => setIsScrolled(false)}>{t.nav.locale}</Link>
          <Link to="/contact" onClick={() => setIsScrolled(false)}>{t.nav.contact}</Link>

          {/* Language Toggle */}
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
            aria-label="Toggle language"
          >
            <span className={lang === "pt" ? "lang-active" : ""}>PT</span>
            <span className="lang-divider">|</span>
            <span className={lang === "en" ? "lang-active" : ""}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

