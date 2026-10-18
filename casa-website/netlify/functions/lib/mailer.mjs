// Envio dos emails pela conta Gmail (palavra-passe de app)
import process from "node:process";
import nodemailer from "nodemailer";
import { ownerEmail, guestEmail } from "./emails.mjs";

const HOST_NAME = "Paulo";

export const mailConfigured = () => Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

/** Envia a ficha aos anfitriões e a mensagem ao hóspede. kind: "request" | "confirmed" | "processing" */
export const sendBookingEmails = async ({ b, q, kind, payUrl = null, test = false }) => {
  const user = process.env.GMAIL_USER;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: process.env.GMAIL_APP_PASSWORD },
  });
  const siteUrl = (process.env.URL || "").replace(/\/$/, "");
  const from = `"Casa da Ponta Negra" <${user}>`;

  // Pagamentos de teste do Stripe: assinala no assunto
  const tag = test ? "[TESTE] " : "";
  const owner = ownerEmail({ b, q, siteUrl, payUrl, kind });
  await transport.sendMail({ from, to: user, replyTo: `"${b.name}" <${b.email}>`, ...owner, subject: tag + owner.subject });
  const guest = guestEmail({ b, q, siteUrl, hostName: HOST_NAME, kind });
  await transport.sendMail({ from, to: b.email, replyTo: user, ...guest, subject: tag + guest.subject });
};
