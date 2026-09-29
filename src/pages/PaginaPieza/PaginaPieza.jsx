import DetallesPieza from "@/components/pieza/DetallesPieza/DetallesPieza";
import Galeria from "@/components/pieza/Galeria/Galeria";
import OtrasPiezas from "@/components/pieza/OtrasPiezas/OtrasPiezas";
import { productPath } from "@/data/catalog";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { euro } from "@/lib/format";
import Link from "@/router/Link";
import "./PaginaPieza.css";

// Entrada de la ficha (MOTION.md §16): primero la imagen, que ya está en pantalla (llega con la
// transición compartida); después, con 70 ms entre bloques, nombre, descripción, precio y compra
const delay = (ms) => ({ "--d": `${ms}ms` });

// Datos estructurados para buscadores (schema.org/Product)
function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.material,
    brand: { "@type": "Brand", name: "Lolita Atelier" },
    url: `${window.location.origin}${productPath(product)}`,
    offers: { "@type": "Offer", price: product.price, priceCurrency: "EUR" },
  };
}

export default function PaginaPieza({ product, items, onAdd, onAddOther, onOpenBag }) {
  const qty = items[product.id] || 0;
  useDocumentMeta({ title: product.name, description: `${product.name}. ${product.material}. Cosida y bordada a mano en Albacete.` });

  return (
    <article className="wrap pdp" aria-labelledby="pdp-name">
      <Link to="/#coleccion" className="pdp-back">
        <span aria-hidden="true">←</span> La colección
      </Link>

      <div className="pdp-main">
        <Galeria product={product} />

        <div className="pdp-info">
          <p className="pdp-moment enter" style={delay(300)}>{product.moment}</p>
          <h1 id="pdp-name" className="pdp-name enter" style={delay(300)}>{product.name}</h1>
          <p className="pdp-material enter" style={delay(370)}>{product.material}.</p>
          <p className="pdp-price enter" style={delay(440)}>{euro(product.price)}</p>

          <div className="pdp-buy enter" style={delay(510)}>
            <button type="button" className="btn btn-solid" onClick={() => onAdd(product.id)}>
              {qty > 0 ? "Añadir otra" : "Añadir a la cesta"}
            </button>
            {/* Confirmación discreta en la propia ficha (MOTION.md §13), sin aviso flotante */}
            <p className="pdp-status" role="status">
              {qty > 0 && (
                <>
                  {qty === 1 ? "Ya está en tu cesta." : `Tienes ${qty} en tu cesta.`}{" "}
                  <button type="button" className="pdp-open-bag" onClick={onOpenBag}>Ver la cesta</button>
                </>
              )}
            </p>
          </div>

          <div className="enter" style={delay(580)}>
            <DetallesPieza />
          </div>
        </div>
      </div>

      <OtrasPiezas current={product} items={items} onAdd={onAddOther} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product)) }} />
    </article>
  );
}
