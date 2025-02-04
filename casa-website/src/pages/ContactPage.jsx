import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ContactPage.css"; // Criar o CSS correspondente

const ContactPage = () => {
  return (
    <div>
      <Navbar />

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="contact-container">
          <h2>Message</h2>
          <p>We endeavour to respond within 24 hours.</p>

          <form className="contact-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone (Optional)" />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
