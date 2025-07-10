import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ContactPage.css";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_78mmtgl";
const TEMPLATE_ID = "template_9etmqy9";
const PUBLIC_KEY = "Q57EjSZH_wzy6dHBf";

const ContactPage = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus("Message sent!");
          form.current.reset();
        },
        () => {
          setStatus("Error sending message.");
        }
      );
  };

  return (
    <div>
      <Navbar />

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="contact-container">
          <h2>Message</h2>
          <p>We endeavour to respond within 24 hours.</p>

          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="tel" name="phone" placeholder="Phone (Optional)" />
            <textarea name="message" placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
          {status && <p>{status}</p>}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
