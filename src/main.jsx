import React from "react";
import ReactDOM from "react-dom/client";
// Questrial y la sustituta de Vintage Goods van incrustadas en App.jsx
import "@fontsource-variable/fraunces/full.css"; // serif editorial: historia, titulares y notas
import "@fontsource-variable/fraunces/full-italic.css";
import "./fonts.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
