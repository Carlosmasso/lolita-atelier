import logo from "@/assets/brand/logo.webp";
import { useScrolled } from "@/hooks/useScrolled";
import "./Header.css";

const NAV = [
  { href: "#historia", label: "Nuestra historia" },
  { href: "#coleccion", label: "Colección" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#bordado", label: "Bordar un nombre" },
];

export default function Header({ count, onOpenBag }) {
  const scrolled = useScrolled();

  return (
    <header className="head" data-scrolled={scrolled}>
      <div className="wrap head-in">
        <a href="#inicio" className="logo">
          <img src={logo} alt="Lolita Atelier, inicio" width="480" height="209" />
        </a>
        <nav className="nav" aria-label="Principal">
          {NAV.map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <button className="bag-btn" onClick={onOpenBag} aria-label={`Abrir cesta, ${count} artículos`}>
          Cesta <span className="bag-count">{count}</span>
        </button>
      </div>
    </header>
  );
}
