import { useCallback, useMemo, useState } from "react";
import { PRODUCTS } from "@/data/catalog";

// Cesta en memoria: { [idPieza]: unidades }. Las líneas y el subtotal se derivan, no se guardan
export function useCart() {
  const [items, setItems] = useState({});

  const change = useCallback(
    (id, delta) =>
      setItems((current) => {
        const next = { ...current, [id]: Math.max(0, (current[id] || 0) + delta) };
        if (next[id] === 0) delete next[id];
        return next;
      }),
    []
  );

  const add = useCallback((id) => change(id, 1), [change]);

  const lines = useMemo(
    () => PRODUCTS.filter((p) => items[p.id] > 0).map((product) => ({ product, qty: items[product.id] })),
    [items]
  );
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  return { items, lines, count, subtotal, add, change };
}
