import Fabric from "@/components/art/Fabric/Fabric";
import { euro } from "@/lib/format";
import "./LineaCesta.css";

export default function LineaCesta({ product, qty, onChange }) {
  return (
    <div className="line">
      <div className="line-thumb">
        <Fabric kind={product.fabric} tone={product.tone} uid={`t-${product.id}`} withDaisy={false} />
      </div>
      <div>
        <div className="line-name">{product.name}</div>
        <div className="qty">
          <button onClick={() => onChange(product.id, -1)} aria-label={`Quitar una unidad de ${product.name}`}>−</button>
          <span aria-live="polite">{qty}</span>
          <button onClick={() => onChange(product.id, 1)} aria-label={`Añadir una unidad de ${product.name}`}>+</button>
        </div>
      </div>
      <div className="line-meta">{euro(product.price * qty)}</div>
    </div>
  );
}
