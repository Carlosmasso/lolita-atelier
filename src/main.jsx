import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/questrial/400.css";
import "@fontsource/dancing-script/500.css"; // sustituta temporal de Vintage Goods
import "@fontsource-variable/fraunces/full.css"; // serif editorial: historia, titulares y notas
import "@fontsource-variable/fraunces/full-italic.css";
import "./fonts.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
