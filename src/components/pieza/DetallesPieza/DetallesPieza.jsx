import { FREE_SHIPPING_FROM } from "@/data/catalog";
import { STEPS } from "@/data/content";
import { euro } from "@/lib/format";
import Link from "@/router/Link";
import "./DetallesPieza.css";

// Lo que se sabe de cada pieza, sin inventar ni repetir la ficha: la tela, cómo trabaja el taller y cómo llega.
// Medidas, composición exacta y cuidados se añadirán aquí cuando el taller los facilite
export default function DetallesPieza() {
  return (
    <div className="pdp-details">
      <details open>
        <summary>La tela</summary>
        <div className="pdp-detail-body">
          <p>{STEPS[0].text}</p>
        </div>
      </details>
      <details>
        <summary>Cómo la hacemos</summary>
        <div className="pdp-detail-body">
          <p>Se corta y se cose a mano en nuestro taller de Albacete, en series de veinte piezas.</p>
          <p>La margarita se borda punto a punto, así que ninguna sale exactamente igual a otra.</p>
        </div>
      </details>
      <details>
        <summary>Envío y entrega</summary>
        <div className="pdp-detail-body">
          <p>Envío gratuito a partir de {euro(FREE_SHIPPING_FROM)}. La pieza llega envuelta en papel de seda y cerrada con un lazo.</p>
          <p>
            Si le bordamos un nombre, tarda cinco días más en salir del taller.{" "}
            <Link to="/#bordado" className="pdp-inline-link">Bordar un nombre</Link>
          </p>
        </div>
      </details>
    </div>
  );
}
