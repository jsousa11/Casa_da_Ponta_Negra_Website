import React from "react";
import { FaInstagram, FaTiktok, FaTripadvisor, FaFacebook } from "react-icons/fa";
import "../styles/Footer.css"; // Certifique-se de que este arquivo existe

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>@BastionFlinders</h2>
        <p>Follow us for updates.</p>

        <div className="footer-gallery">
          <img src="/gallery-1.jpg" alt="Food" />
          <img src="/gallery-2.jpg" alt="Fireplace" />
          <img src="/gallery-3.jpg" alt="Beach" />
          <img src="/gallery-4.jpg" alt="Cabin" />
        </div>

        <div className="footer-social">
          <a href="#"><FaInstagram /> Instagram</a>
          <a href="#"><FaTiktok /> Tiktok</a>
          <a href="#"><FaTripadvisor /> Tripadvisor</a>
          <a href="#"><FaFacebook /> Facebook</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <h1>BASTION</h1>
          <p>Far away from the suburbs.</p>
        </div>

        <div className="footer-links">
          <a href="#">Property</a>
          <a href="#">Locale</a>
          <a href="#">Reviews</a>
          <a href="#">Journal</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>hello@website.com</p>
          <p>+613 (03) 4298 2180</p>
        </div>

        <div className="footer-address">
          <h3>Address</h3>
          <p>358 Lenora Road</p>
          <p>Flinders, Victoria 3929</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
