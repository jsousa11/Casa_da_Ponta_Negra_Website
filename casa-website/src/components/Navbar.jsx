import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Certifique-se de que este arquivo existe

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <img src="src/assets/V1_2.png" alt="Casa da Ponta Negra logo" />
        </Link>

        {/* Menu de navegação */}
        <div className="nav-links">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/property" onClick={() => setIsOpen(false)}>Property</Link>
          <Link to="/locale" onClick={() => setIsOpen(false)}>Locale</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
