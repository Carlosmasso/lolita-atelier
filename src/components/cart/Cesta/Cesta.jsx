import { useEffect } from "react";
import { FREE_SHIPPING_FROM } from "@/data/catalog";
import { euro } from "@/lib/format";
import LineaCesta from "../LineaCesta/LineaCesta";
import "./Cesta.css";

// Panel lateral de la cesta. Se cierra con Escape, con el velo o con «Cerrar»; `leaving` activa su salida
export default function Cesta({ lines, subtotal, onClose, onChange, leaving }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="veil" onClick={onClose} data-leaving={leaving} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cesta-title" data-leaving={leaving}>
        <div className="drawer-head">
          <h2 id="cesta-title">Tu cesta</h2>
          <button className="close" onClick={onClose} autoFocus>Cerrar</button>
        </div>
        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="empty">
              <p>Todavía no has elegido ninguna pieza.</p>
              <a href="#coleccion" className="btn btn-line" onClick={onClose}>Ver la colección</a>
            </div>
          ) : (
            lines.map(({ product, qty }) => <LineaCesta key={product.id} product={product} qty={qty} onChange={onChange} />)
          )}
        </div>
        {lines.length > 0 && (
          <div className="drawer-foot">
            <div className="total"><span>Subtotal</span><span>{euro(subtotal)}</span></div>
            <p className="ship">
              {subtotal >= FREE_SHIPPING_FROM
                ? "El envío es gratuito en este pedido."
                : `Te faltan ${euro(FREE_SHIPPING_FROM - subtotal)} para el envío gratuito.`}
            </p>
            <button className="btn btn-solid">Ir al pago</button>
          </div>
        )}
      </aside>
    </>
  );
}
