import { useCallback, useEffect, useRef, useState } from "react";
import { usePresence } from "./usePresence";

const VISIBLE_MS = 2600;

// Un único aviso a la vez: uno nuevo sustituye el texto del actual y reinicia su tiempo en pantalla
export function useToast() {
  const [message, setMessage] = useState(null);
  const { mounted, leaving, show: open, hide } = usePresence();
  const timer = useRef();

  const show = useCallback(
    (text) => {
      clearTimeout(timer.current);
      setMessage(text);
      open();
      timer.current = setTimeout(hide, VISIBLE_MS);
    },
    [open, hide]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message: mounted ? message : null, leaving, show };
}
