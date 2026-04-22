import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Navbar.css";

const SCROLL_THRESHOLD = 10;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  const handleNavClick = (to) => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsScrolled(false);
    }
    setIsMenuOpen(false);
  };

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <nav className={`navbar${isScrolled ? " scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => handleNavClick("/")}>
          <img src="/assets/LOGO_BLACK.png" alt="Casa da Ponta Negra logo" />
        </Link>

        {/* Desktop nav */}
        <div className="nav-links">
          <Link to="/" onClick={() => handleNavClick("/")}>{t.nav.home}</Link>
          <Link to="/property" onClick={() => handleNavClick("/property")}>{t.nav.property}</Link>
          <Link to="/locale" onClick={() => handleNavClick("/locale")}>{t.nav.locale}</Link>
          <Link to="/contact" onClick={() => handleNavClick("/contact")}>{t.nav.contact}</Link>

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

        {/* Hamburger (mobile only) */}
        <button
          className={`nav-hamburger${isMenuOpen ? ' nav-hamburger--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="nav-hamburger__bar" />
          <span className="nav-hamburger__bar" />
          <span className="nav-hamburger__bar" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`nav-mobile-overlay${isMenuOpen ? ' nav-mobile-overlay--open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
          <Link to="/" onClick={() => handleNavClick("/")}>{t.nav.home}</Link>
          <Link to="/property" onClick={() => handleNavClick("/property")}>{t.nav.property}</Link>
          <Link to="/locale" onClick={() => handleNavClick("/locale")}>{t.nav.locale}</Link>
          <Link to="/contact" onClick={() => handleNavClick("/contact")}>{t.nav.contact}</Link>
          <button
            className="lang-toggle lang-toggle--mobile"
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
            aria-label="Toggle language"
          >
            <span className={lang === "pt" ? "lang-active" : ""}>PT</span>
            <span className="lang-divider">|</span>
            <span className={lang === "en" ? "lang-active" : ""}>EN</span>
          </button>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;

