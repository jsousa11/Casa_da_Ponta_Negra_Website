import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import usePageMeta from "../hooks/usePageMeta";
import { useLanguage } from "../context/LanguageContext";
import "../styles/PrivacyPage.css";

const PrivacyPage = () => {
  const { t } = useLanguage();
  usePageMeta(t.privacy.title, null);

  return (
    <div className="page">
      <Navbar />
      <main className="privacy">
        <article className="privacy__inner">
          <h1 className="section-title">{t.privacy.title}</h1>
          <p className="privacy__updated">{t.privacy.updated}</p>
          {t.privacy.sections.map(({ h, p }) => (
            <section key={h}>
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
