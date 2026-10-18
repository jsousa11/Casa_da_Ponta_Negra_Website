import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ContactPage.css";
import emailjs from "@emailjs/browser";
import usePageMeta from "../hooks/usePageMeta";
import { useLanguage } from "../context/LanguageContext";
import { site, emailjsConfig } from "../config/site";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";

const ContactPage = () => {
  const form = useRef();
  const { t } = useLanguage();
  usePageMeta(t.nav.contact, t.contact.metaDescription);

  const [formStatus, setFormStatus] = useState({ status: "idle", message: "" });

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ status: "sending", message: "" });

    emailjs
      .sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, form.current, emailjsConfig.publicKey)
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

  const rows = [
    {
      Icon: FaMapMarkerAlt,
      label: t.contact.addressLabel,
      href: site.mapsUrl,
      external: true,
      value: <>Ponta Negra · Baía de São Lourenço<br />9580-114 Vila do Porto<br />Santa Maria, Açores</>,
    },
    { Icon: FaPhone, label: t.contact.phoneLabel, href: `tel:${site.phone}`, value: site.phoneDisplay },
    { Icon: FaEnvelope, label: t.contact.emailLabel, href: `mailto:${site.email}`, value: site.email },
    { Icon: FaInstagram, label: "Instagram", href: site.social.instagram, external: true, value: "@casapontanegra.sma" },
    { Icon: FaFacebook, label: "Facebook", href: site.social.facebook, external: true, value: "Casa da Ponta Negra" },
  ];

  return (
    <div className="page">
      <Navbar />

      <main className="contact-section">
        <div className="contact-wrapper">

          {/* Esquerda — info */}
          <div className="contact-left reveal">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h1 className="section-title">{t.contact.title}</h1>
            <p className="section-lead">{t.contact.subtitle}</p>

            <ul className="contact-info-list">
              {rows.map(({ Icon, label, href, external, value }) => (
                <li key={label} className="contact-info-row">
                  <span className="contact-info-icon"><Icon /></span>
                  <div>
                    <span className="contact-info-label">{label}</span>
                    <a href={href} className="contact-info-value" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-book-hint">
              <span>{t.contact.bookHint}</span>
              <Link to="/book" className="text-link">{t.contact.bookHintCta} →</Link>
            </div>
          </div>

          {/* Direita — formulário */}
          <div className="contact-right reveal">
            <h2 className="contact-form-title">{t.contact.formTitle}</h2>
            <form ref={form} className="form" onSubmit={sendEmail}>
              <div className="form__row">
                <label className="form__field">
                  <span className="form__label">{t.contact.namePlaceholder}</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className="form__field">
                  <span className="form__label">{t.contact.emailPlaceholder}</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
              </div>
              <label className="form__field">
                <span className="form__label">{t.contact.phonePlaceholder}</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className="form__field">
                <span className="form__label">{t.contact.messagePlaceholder}</span>
                <textarea name="message" required></textarea>
              </label>

              <p className="form__legal">
                {t.legal.consent} <Link to="/privacy">{t.legal.privacy}</Link>.
              </p>
              <button type="submit" className="btn btn--blue" disabled={isSending}>
                {isSending ? t.contact.sendingBtn : t.contact.sendBtn}
              </button>
            </form>

            {formStatus.message && (
              <p className={`status-message ${formStatus.status}`} role="status">
                {formStatus.message}
              </p>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
