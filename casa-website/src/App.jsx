import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import PropertyPage from "./pages/PropertyPage";
import ContactPage from "./pages/ContactPage";
import LocalePage from "./pages/LocalePage";
import { LanguageProvider } from "./context/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

const RevealObserver = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal--visible");
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <RevealObserver />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/locale" element={<LocalePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
