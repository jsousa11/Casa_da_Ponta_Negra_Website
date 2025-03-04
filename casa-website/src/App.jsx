import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PropertyPage from "./pages/PropertyPage";
import ContactPage from "./pages/ContactPage";
import LocalePage from "./pages/LocalePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/locale" element={<LocalePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
