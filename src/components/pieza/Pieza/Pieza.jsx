import Fabric from "@/components/art/Fabric/Fabric";
import { productPath } from "@/data/catalog";
import { euro } from "@/lib/format";
import { useTransitionSlug } from "@/router/hooks";
import Link from "@/router/Link";
import "./Pieza.css";

// Tarjeta de una pieza. Toda la tarjeta lleva a su ficha (un único enlace, estirado sobre ella);
// el botón de añadir queda por encima y dice cuántas hay ya en la cesta
export default function Pieza({ product, qty, onAdd }) {
  const inBag = qty > 0;
  const transitionSlug = useTransitionSlug();

  return (
    <article className="pieza">
      <div
        className="item-media"
        // La muestra de esta tarjeta viaja hasta la galería de la ficha (y vuelve al retroceder)
        style={transitionSlug === product.slug ? { viewTransitionName: "pieza-media" } : undefined}
      >
        <Fabric kind={product.fabric} tone={product.tone} uid={product.id} />
        <span className="item-tag">{product.fabricLabel}</span>
      </div>
      <div className="item-body">
        <h3 className="item-name">
          <Link to={productPath(product)} transition={product.slug} className="item-link">
            {product.name}
          </Link>
        </h3>
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
