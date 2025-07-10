import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ContactPage.css";
import emailjs from "@emailjs/browser";

// Constantes mantidas diretamente no ficheiro
const SERVICE_ID = "service_78mmtgl";
const TEMPLATE_ID = "template_9etmqy9";
const PUBLIC_KEY = "Q57EjSZH_wzy6dHBf";

const ContactPage = () => {
  const form = useRef();
  // Estado melhorado para um feedback mais claro e detalhado
  const [formStatus, setFormStatus] = useState({
    status: "idle", // 'idle', 'sending', 'success', 'error'
    message: ""
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ status: "sending", message: "A enviar..." });

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setFormStatus({ status: "success", message: "Mensagem enviada com sucesso!" });
          form.current.reset();
          // Opcional: Limpar a mensagem após 5 segundos
          setTimeout(() => setFormStatus({ status: "idle", message: "" }), 5000);
        },
        () => {
          setFormStatus({ status: "error", message: "Erro ao enviar a mensagem. Tente novamente." });
        }
      );
  };

  const isSending = formStatus.status === "sending";

  return (
    <div>
      <Navbar />

      <section className="contact-section">
        <div className="contact-container">
          <h2>Message</h2>
          <p>Esforçamo-nos por responder dentro de 24 horas.</p>

          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            {/* Melhoria de Acessibilidade: Adição de <label> para leitores de ecrã */}
            <label htmlFor="name-input" className="sr-only">Nome</label>
            <input id="name-input" type="text" name="name" placeholder="Name" required />

            <label htmlFor="email-input" className="sr-only">Email</label>
            <input id="email-input" type="email" name="email" placeholder="Email Address" required />
            
            <label htmlFor="phone-input" className="sr-only">Telefone</label>
            <input id="phone-input" type="tel" name="phone" placeholder="Phone (Optional)" />
            
            <label htmlFor="message-input" className="sr-only">Mensagem</label>
            <textarea id="message-input" name="message" placeholder="Message" required></textarea>
            
            {/* Melhoria de UX: Botão desativado e texto alterado durante o envio */}
            <button type="submit" disabled={isSending}>
              {isSending ? "A Enviar..." : "Enviar Mensagem"}
            </button>
          </form>

          {/* Melhoria de UX: Mensagem de estado com estilo visual condicional */}
          {formStatus.message && (
            <p className={`status-message ${formStatus.status}`}>
              {formStatus.message}
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;