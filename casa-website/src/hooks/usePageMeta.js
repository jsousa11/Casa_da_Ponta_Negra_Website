import { useEffect } from "react";
import { site } from "../config/site";

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el && value) el.setAttribute(attr, value);
};

// Título e descrição por página (Google e pré-visualizações de partilha)
const usePageMeta = (title, description) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : site.name;
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
  }, [title, description]);
};

export default usePageMeta;
