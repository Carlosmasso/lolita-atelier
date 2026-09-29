import { useState } from "react";
import Reveal from "@/components/ui/Reveal/Reveal";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import Pieza from "@/components/pieza/Pieza/Pieza";
import "./Coleccion.css";

export default function Coleccion({ items, onAdd }) {
  const [cat, setCat] = useState("Todo");
  const list = cat === "Todo" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <section id="coleccion" className="sec">
      <div className="wrap">
        <Reveal className="col-head">
          <div>
            <h2 className="sec-title">La colección</h2>
            <p className="sec-intro">Piezas pensadas para usarse cada día y guardarse después, cuando ya no quepan.</p>
          </div>
          <div className="chips" role="group" aria-label="Filtrar por categoría">
            {CATEGORIES.map((c) => (
              <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>
        {/* key={cat}: al cambiar de categoría la rejilla se vuelve a montar y se funde (ver .grid) */}
        <div className="grid" key={cat}>
          {list.map((p) => (
            <Pieza key={p.id} product={p} qty={items[p.id] || 0} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}
