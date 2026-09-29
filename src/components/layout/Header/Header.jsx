import logo from "@/assets/brand/logo.webp";
import { useScrolled } from "@/hooks/useScrolled";
import Link from "@/router/Link";
import "./Header.css";

// Las anclas llevan "/" delante para que funcionen también desde la ficha de una pieza
const NAV = [
  { href: "/#historia", label: "Nuestra historia" },
  { href: "/#coleccion", label: "Colección" },
  { href: "/#proceso", label: "Cómo trabajamos" },
  { href: "/#bordado", label: "Bordar un nombre" },
];

export default function Header({ count, onOpenBag }) {
  const scrolled = useScrolled();

  return (
    <header className="head" data-scrolled={scrolled}>
      <div className="wrap head-in">
        <Link to="/" className="logo">
          <img src={logo} alt="Lolita Atelier, inicio" width="480" height="209" />
        </Link>
        <nav className="nav" aria-label="Principal">
          {NAV.map(({ href, label }) => (
            <Link key={href} to={href}>{label}</Link>
          ))}
        </nav>
        <button className="bag-btn" onClick={onOpenBag} aria-label={`Abrir cesta, ${count} artículos`}>
          Cesta <span className="bag-count">{count}</span>
        </button>
      </div>
    </header>
  );
}
