import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import BookButton from "./BookButton";
import "../styles/Navbar.css";

const SCROLL_THRESHOLD = 10;
// Páginas com imagem grande no topo — nas restantes a navbar é sempre sólida
const HERO_PAGES = ["/", "/property", "/locale", "/info"];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const solid = isScrolled || !HERO_PAGES.includes(location.pathname);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/property", label: t.nav.property },
    { to: "/locale", label: t.nav.locale },
    { to: "/info", label: t.nav.info },
    { to: "/contact", label: t.nav.contact },
  ];

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const langToggle = (extraClass = "") => (
    <button
      className={`lang-toggle ${extraClass}`}
      onClick={() => setLang(lang === "en" ? "pt" : "en")}
      aria-label={t.nav.language}
    >
      <span className={lang === "pt" ? "lang-active" : ""}>PT</span>
      <span className="lang-divider">|</span>
      <span className={lang === "en" ? "lang-active" : ""}>EN</span>
    </button>
  );

  return (
    <nav className={`navbar${solid ? " scrolled" : ""}${isMenuOpen ? " menu-open" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => handleNavClick("/")}>
          <img src="/assets/LOGO_BLACK.png" alt="Casa da Ponta Negra" />
        </Link>

        {/* Desktop nav */}
        <div className="nav-links">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end onClick={() => handleNavClick(to)}>{label}</NavLink>
          ))}
          {langToggle()}
          <BookButton className="btn btn--primary btn--sm nav-book">{t.nav.book}</BookButton>
        </div>

        {/* Mobile: reservar + hamburger */}
        <div className="nav-mobile-actions">
          <BookButton className="btn btn--primary btn--sm nav-book">{t.nav.book}</BookButton>
          <button
            className={`nav-hamburger${isMenuOpen ? ' nav-hamburger--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isMenuOpen}
          >
            <span className="nav-hamburger__bar" />
            <span className="nav-hamburger__bar" />
            <span className="nav-hamburger__bar" />
          </button>
        </div>
      </div>

      {/* Mobile overlay — em portal, porque o backdrop-filter da navbar prenderia o position:fixed */}
      {createPortal(<div
        className={`nav-mobile-overlay${isMenuOpen ? ' nav-mobile-overlay--open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end onClick={() => handleNavClick(to)}>{label}</NavLink>
          ))}
          <BookButton className="btn btn--primary" onClick={() => setIsMenuOpen(false)}>{t.nav.book}</BookButton>
          {langToggle("lang-toggle--mobile")}
        </nav>
      </div>, document.body)}
    </nav>
  );
};

export default Navbar;
