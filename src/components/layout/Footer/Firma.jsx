import { useState } from "react";
import MiniFlower from "@/components/art/MiniFlower/MiniFlower";
import "./Firma.css";

// Cierre de toda la web. La margarita es la «margarita secreta»: no se anuncia, se descubre.
// Al pulsarla, la dedicatoria se funde en otra más íntima; al volver a pulsarla, regresa
export default function Firma() {
  const [open, setOpen] = useState(false);
  return (
    <div className="firma">
      <p className="firma-name">lolita</p>
      <p className="firma-origin">Made in Albacete</p>
      <button
        type="button"
        className="firma-daisy"
        aria-label="Margarita"
        aria-expanded={open}
        aria-controls="firma-note"
        onClick={() => setOpen((o) => !o)}
      >
        <MiniFlower />
      </button>
      <p id="firma-note" className="firma-note" aria-live="polite">
        <span aria-hidden={open} data-shown={!open}>En recuerdo de Lola.</span>
        <span aria-hidden={!open} data-shown={open}>
          Para Lola.
          <br />
          Todo esto lleva un poquito de ti.
        </span>
      </p>
    </div>
  );
}
