import React from "react";
import ReactDOM from "react-dom/client";
// Estilos globais primeiro, para os estilos de cada página os poderem ajustar
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
