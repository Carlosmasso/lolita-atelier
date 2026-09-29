import { useRef } from "react";
import MiniFlower from "@/components/art/MiniFlower/MiniFlower";
import { CINTA } from "@/data/content";
import { useDrift } from "@/hooks/useDrift";
import "./Cinta.css";

// Cinta de grosgrain entre el hero y la historia. La fila va dos veces para que el bucle no tenga costura;
// la copia se oculta a los lectores de pantalla
export default function Cinta() {
  const railRef = useRef(null);
  useDrift(railRef);

  return (
    <div className="cinta">
      <div className="cinta-track">
        <div className="cinta-rail" ref={railRef}>
          {[false, true].map((copy) => (
            <ul className="cinta-row" key={String(copy)} aria-hidden={copy || undefined}>
              {CINTA.map((t) => (
                <li key={t}>{t}<MiniFlower /></li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
