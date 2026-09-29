import MiniFlower from "@/components/art/MiniFlower/MiniFlower";
import StitchedDaisy from "@/components/art/StitchedDaisy/StitchedDaisy";
import "./Hero.css";

const FACTS = ["Series de veinte piezas", "Telas naturales", "Bordado a mano"];

// La entrada escalona los bloques con --d (ver .enter en motion.css): titular, texto, datos y la llamada al final
const delay = (ms) => ({ "--d": `${ms}ms` });

export default function Hero() {
  return (
    <section id="inicio" className="wrap hero">
      <div>
        <p className="eyebrow enter" style={delay(300)}>Taller de costura en Albacete</p>
        <h1 className="enter" style={delay(300)}>
          <span className="h-serif">Textiles para los</span>
          <span className="h-script">primeros recuerdos</span>
        </h1>
        <p className="hero-lead enter" style={delay(370)}>
          Mantas, baberos y ropa de cuna cosidos y bordados a mano, en series pequeñas y con telas naturales. Como los
          hacía la abuela.
        </p>
        <div className="hero-actions enter" style={delay(510)}>
          <a href="#coleccion" className="btn btn-solid">Ver la colección</a>
          <a href="#historia" className="link-arrow">Cómo empezó todo <span aria-hidden="true">→</span></a>
        </div>
        <ul className="hero-facts enter" style={delay(440)}>
          {FACTS.map((t) => (
            <li key={t}><MiniFlower />{t}</li>
          ))}
        </ul>
      </div>
      <figure className="hero-figure">
        <div className="hero-art">
          <StitchedDaisy size="78%" />
        </div>
        <figcaption className="hero-note">
          su flor favorita
          <svg viewBox="0 0 80 62" aria-hidden="true">
            <path d="M4,6 C26,2 52,14 66,48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M56,44 L67,51 L70,38" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </figcaption>
      </figure>
    </section>
  );
}
