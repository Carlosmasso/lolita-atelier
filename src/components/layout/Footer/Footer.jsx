import "./Footer.css";

const LINKS = ["Envíos y devoluciones", "Cuidado de las piezas", "Privacidad", "Instagram", "Contacto"];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <img src="/brand/logo-sello.webp" alt="Lolita Atelier. Made in Albacete" width="500" height="280" loading="lazy" />
          <p>Hecho a mano en Albacete, con tiempo, cuidado y cariño.</p>
        </div>
        <nav aria-label="Pie">
          {LINKS.map((label) => (
            <a key={label} href="#">{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
