import { useCallback, useEffect, useRef, useState } from "react";

// Duración de las animaciones de salida (cesta, aviso). Debe coincidir con el CSS de cada uno
export const EXIT_MS = 300;

// Mantiene montado un elemento mientras hace su animación de salida y lo desmonta al terminar.
// `leaving` activa el CSS de salida; `show` durante la salida la cancela y lo vuelve a abrir.
export function usePresence(exitMs = EXIT_MS) {
  const [state, setState] = useState("closed"); // closed | open | leaving
  const timer = useRef();

  const show = useCallback(() => {
    clearTimeout(timer.current);
    setState("open");
  }, []);

  const hide = useCallback(() => {
    clearTimeout(timer.current);
    setState((s) => (s === "closed" ? s : "leaving"));
    timer.current = setTimeout(() => setState("closed"), exitMs);
  }, [exitMs]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { mounted: state !== "closed", leaving: state === "leaving", show, hide };
}
