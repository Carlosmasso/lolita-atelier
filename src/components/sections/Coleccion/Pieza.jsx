import Fabric from "@/components/art/Fabric/Fabric";
import { euro } from "@/lib/format";
import "./Pieza.css";

// Tarjeta de una pieza: muestra de tela, datos y el botón para añadirla (dice cuántas hay ya en la cesta)
export default function Pieza({ product, qty, onAdd }) {
  const inBag = qty > 0;
  return (
    <article>
      <div className="item-media">
        <Fabric kind={product.fabric} tone={product.tone} uid={product.id} />
        <span className="item-tag">{product.fabricLabel}</span>
      </div>
      <div className="item-body">
        <h3 className="item-name">{product.name}</h3>
        <span className="item-price">{euro(product.price)}</span>
        <p className="item-moment">{product.moment}</p>
        <p className="item-mat">{product.material}</p>
        <button className="item-add" data-added={inBag} onClick={() => onAdd(product.id)}>
          {inBag ? `En la cesta (${qty}). Añadir otra` : "Añadir a la cesta"}
        </button>
      </div>
    </article>
  );
}
