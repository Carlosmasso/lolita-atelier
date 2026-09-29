import Firma from "./Firma";
import "./Footer.css";

const LINKS = ["Envíos y devoluciones", "Cuidado de las piezas", "Privacidad", "Instagram", "Contacto"];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-in">
          <div className="foot-brand">
            <p>Hecho a mano en Albacete, con tiempo, cuidado y cariño.</p>
          </div>
          <nav aria-label="Pie">
            {LINKS.map((label) => (
              <a key={label} href="#">{label}</a>
            ))}
          </nav>
        </div>
        <Firma />
      </div>
    </footer>
  );
}
