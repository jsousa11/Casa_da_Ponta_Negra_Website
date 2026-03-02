import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PropertyPage from "./pages/PropertyPage";
import ContactPage from "./pages/ContactPage";
import LocalePage from "./pages/LocalePage";
import { LanguageProvider } from "./context/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
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
