import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { lowestDirectNightly } from "../config/pricing";
import BookButton from "./BookButton";
import "../styles/BookBar.css";

// Barra fixa de reserva no telemóvel — aparece depois de passar o hero
const BookBar = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/book") return null;

  return (
    <div className={`book-bar${visible ? " book-bar--visible" : ""}`} aria-hidden={!visible}>
      <div className="book-bar__info">
        <span className="book-bar__from">{t.bookBar.from}</span>{" "}
        <strong>{lowestDirectNightly()} €</strong> <span className="book-bar__from">{t.bookBar.perNight}</span>
        <span className="book-bar__tagline">{t.bookBar.tagline}</span>
      </div>
      <BookButton className="btn btn--primary btn--sm" tabIndex={visible ? 0 : -1}>
        {t.bookBar.cta}
      </BookButton>
    </div>
  );
};

export default BookBar;
