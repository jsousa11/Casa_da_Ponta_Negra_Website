import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const SCROLL_THRESHOLD = 10; // margem de tolerância

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Link to="/" onClick={() => setIsScrolled(false)}>Home</Link>
          <Link to="/property" onClick={() => setIsScrolled(false)}>Property</Link>
          <Link to="/locale" onClick={() => setIsScrolled(false)}>Locale</Link>
          <Link to="/contact" onClick={() => setIsScrolled(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
