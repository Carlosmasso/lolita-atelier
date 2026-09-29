import "./CartaTaller.css";

// Carta del taller en papel pautado, con el sello dentro para que el texto lo rodee
export default function CartaTaller() {
  return (
    <aside className="letter" aria-label="Carta del taller">
      <img className="letter-stamp" src="/brand/logo-sello.webp" alt="" width="500" height="280" loading="lazy" />
      <p>
        Hoy cosemos en un pequeño taller de Albacete, en series de veinte piezas, con la misma calma que
        aprendimos de ella.
      </p>
      <p>
        Nos gusta pensar que cada manta y cada babero guardan un poco de aquellas tardes. Y que, dentro de muchos
        años, alguien los encontrará doblados en un cajón y dirá: «esto era mío cuando era bebé».
      </p>
      <p>De ahí nace Lolita Atelier: textiles para acompañar los primeros recuerdos de una nueva generación.</p>
      <p className="letter-sign">Con cariño, desde su mesa de costura</p>
    </aside>
  );
}
