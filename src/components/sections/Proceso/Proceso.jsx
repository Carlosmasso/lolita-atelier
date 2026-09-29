import Reveal from "@/components/ui/Reveal/Reveal";
import { STEPS } from "@/data/content";
import "./Proceso.css";

// Cruces del hilo con el arranque de cada columna de pasos (viewBox 1160 = ancho de .wrap)
const STEP_KNOTS = [12, 310, 608, 906];

export default function Proceso() {
  return (
    <section id="proceso" className="sec">
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title">Cómo trabajamos</h2>
          <p className="sec-intro">Cuatro pasos, sin prisa. Cada pieza pasa por las mismas manos de principio a fin.</p>
        </Reveal>
        <Reveal className="steps-wrap">
          <svg className="steps-thread" viewBox="0 0 1160 60" aria-hidden="true">
            <path
              d="M0,30 C4,30 8,30 12,30 C112,6 210,54 310,30 C410,6 508,54 608,30 C708,6 806,54 906,30 C1006,6 1100,50 1160,36"
              fill="none"
              stroke="#8E9779"
              strokeWidth="2"
              strokeDasharray="10 7"
              strokeLinecap="round"
            />
            {STEP_KNOTS.map((x) => (
              <circle key={x} cx={x} cy="30" r="6" fill="#F6E3B5" stroke="#5B3F2E" strokeWidth="1.5" />
            ))}
          </svg>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
