import Pieza from "@/components/pieza/Pieza/Pieza";
import Reveal from "@/components/ui/Reveal/Reveal";
import { PRODUCTS } from "@/data/catalog";
import "./OtrasPiezas.css";

// Tres piezas más: primero las de la misma categoría, después el resto en el orden del catálogo
export default function OtrasPiezas({ current, items, onAdd }) {
  const others = PRODUCTS.filter((p) => p.id !== current.id)
    .sort((a, b) => (b.cat === current.cat) - (a.cat === current.cat))
    .slice(0, 3);

  return (
    <Reveal as="section" className="pdp-related" aria-labelledby="otras-title">
      <h2 id="otras-title" className="sec-title">Otras piezas del taller</h2>
      <div className="grid">
        {others.map((p) => (
          <Pieza key={p.id} product={p} qty={items[p.id] || 0} onAdd={onAdd} />
        ))}
      </div>
    </Reveal>
  );
}
