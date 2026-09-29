import { useState } from "react";
import Reveal from "@/components/ui/Reveal/Reveal";
import { THREADS } from "@/data/content";
import BastidorBordado from "./BastidorBordado";
import "./Personaliza.css";

export default function Personaliza({ onToast }) {
  const [name, setName] = useState("Lola");
  const [thread, setThread] = useState(THREADS[0]);
  const shown = name.trim() || "Tu nombre";

  return (
    <section id="bordado" className="sec">
      <div className="wrap perso">
        <Reveal className="perso-preview" aria-live="polite">
          <BastidorBordado name={shown} thread={thread} />
        </Reveal>
        <Reveal>
          <h2 className="sec-title">Bordar un nombre</h2>
          <p className="sec-intro">
            Cualquier pieza puede llevar un nombre o una fecha, bordado a mano junto a la margarita. Escríbelo y elige el hilo.
          </p>
          <div className="field">
            <label htmlFor="bordado-nombre">Nombre o fecha</label>
            <input
              id="bordado-nombre"
              className="input"
              value={name}
              maxLength={12}
              onChange={(e) => setName(e.target.value)}
              placeholder="Por ejemplo, Martina"
              aria-describedby="bordado-hint"
            />
            <p id="bordado-hint" className="hint">Hasta 12 caracteres. {12 - name.length} disponibles.</p>
          </div>
          <div className="field">
            <fieldset>
              <legend>Color del hilo</legend>
              <div className="threads" role="radiogroup">
                {THREADS.map((t) => (
                  <button
                    key={t.id}
                    role="radio"
                    aria-checked={thread.id === t.id}
                    className="thread"
                    onClick={() => setThread(t)}
                  >
                    <span className="thread-dot" style={{ background: t.hex }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="field">
            <button
              className="btn btn-solid"
              disabled={!name.trim()}
              onClick={() => onToast(`Bordado de «${name.trim()}» en ${thread.label.toLowerCase()} guardado para tu pedido`)}
            >
              Guardar bordado
            </button>
            <p className="hint">Se añade a cualquier pieza por 9 €. Tarda cinco días más en salir del taller.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
