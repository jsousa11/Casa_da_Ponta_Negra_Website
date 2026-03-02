import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ContactPage.css";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

// Constantes mantidas diretamente no ficheiro
const SERVICE_ID = "service_78mmtgl";
const TEMPLATE_ID = "template_9etmqy9";
const PUBLIC_KEY = "Q57EjSZH_wzy6dHBf";

const ContactPage = () => {
  const form = useRef();
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState({
    status: "idle",
    message: ""
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ status: "sending", message: t.contact.sendingBtn });

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setFormStatus({ status: "success", message: t.contact.successMsg });
          form.current.reset();
          setTimeout(() => setFormStatus({ status: "idle", message: "" }), 5000);
        },
        () => {
          setFormStatus({ status: "error", message: t.contact.errorMsg });
        }
      );
  };

  const isSending = formStatus.status === "sending";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <section className="contact-section" style={{ flex: 1 }}>
        <div className="contact-wrapper">

          {/* Left — Info */}
          <div className="contact-left">
            <h2>{t.contact.title}</h2>
            <p className="contact-subtitle">{t.contact.subtitle}</p>

            <ul className="contact-info-list">
              <li className="contact-info-row">
                <FaMapMarkerAlt className="contact-info-icon" />
                <div>
                  <span className="contact-info-label">{t.contact.addressLabel}</span>
                  <a
                    href="https://maps.app.goo.gl/8nCDUXo3fRSxScvWA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-value"
                  >
                    Ponta Negra - Baía de São Lourenço<br />
                    9580-114 Vila do Porto <br />
                    Santa Maria, Açores
                  </a>
                </div>
              </li>

              <li className="contact-info-row">
                <FaPhone className="contact-info-icon" />
                <div>
                  <span className="contact-info-label">{t.contact.phoneLabel}</span>
                  <a href="tel:+351963504856" className="contact-info-value">(+351) 963 504 856</a>
                </div>
              </li>

              <li className="contact-info-row">
                <FaEnvelope className="contact-info-icon" />
                <div>
                  <span className="contact-info-label">{t.contact.emailLabel}</span>
                  <a href="mailto:pontanegrahouse@gmail.com" className="contact-info-value">pontanegrahouse@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right — Form */}
          <div className="contact-right">
            <h3 className="contact-form-title">{t.contact.formTitle}</h3>
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <label htmlFor="name-input" className="sr-only">{t.contact.namePlaceholder}</label>
              <input id="name-input" type="text" name="name" placeholder={t.contact.namePlaceholder} required />

              <label htmlFor="email-input" className="sr-only">{t.contact.emailPlaceholder}</label>
              <input id="email-input" type="email" name="email" placeholder={t.contact.emailPlaceholder} required />

              <label htmlFor="phone-input" className="sr-only">{t.contact.phonePlaceholder}</label>
              <input id="phone-input" type="tel" name="phone" placeholder={t.contact.phonePlaceholder} />

              <label htmlFor="message-input" className="sr-only">{t.contact.messagePlaceholder}</label>
              <textarea id="message-input" name="message" placeholder={t.contact.messagePlaceholder} required></textarea>

              <button type="submit" disabled={isSending}>
                {isSending ? t.contact.sendingBtn : t.contact.sendBtn}
              </button>
            </form>

            {formStatus.message && (
              <p className={`status-message ${formStatus.status}`}>
                {formStatus.message}
              </p>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;