import React from "react";
import ReactDOM from "react-dom/client";
// Fraunces, la serif editorial (historia, titulares y notas). Questrial y la sustituta de Vintage Goods
// van incrustadas: ver styles/fonts.css
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
// Estilos globales, en orden: fuentes, tokens y base, piezas de interfaz compartidas y movimiento.
// Cada componente importa su propio CSS
import "./styles/fonts.css";
import "./styles/base.css";
import "./styles/ui.css";
import "./styles/motion.css";
import App from "./App.jsx";
import { initRouter } from "./router/router";

initRouter();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
