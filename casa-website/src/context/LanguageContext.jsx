import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

export { translations };

const LanguageContext = createContext();
const STORAGE_KEY = "cpn-lang";

// Idioma guardado → idioma do browser → inglês
const detectLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch { /* storage bloqueado */ }
  const nav = (navigator.languages?.[0] || navigator.language || "").toLowerCase();
  return nav.startsWith("pt") ? "pt" : "en";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(detectLang);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage bloqueado */ }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
