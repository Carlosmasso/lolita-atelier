import { useEffect } from "react";

// Desplazamiento horizontal continuo y lento de una pista con dos copias de su contenido.
// La velocidad nunca salta: arranca desde parado cuando termina la entrada del hero, frena hasta
// pararse al pasar el ratón y vuelve a arrancar al salir. Con movimiento reducido no se crea la
// animación y la pista queda quieta.
const DRIFT_PX_PER_S = 22;
const DRIFT_START_MS = 1000;
const DRIFT_EASE_MS = 450; // constante de tiempo con la que la velocidad se acerca a su objetivo

export function useDrift(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !el.animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Una vuelta recorre una copia (la mitad de la pista) a velocidad constante
    const copyWidth = el.scrollWidth / 2;
    const anim = el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: (copyWidth / DRIFT_PX_PER_S) * 1000,
      iterations: Infinity,
    });
    anim.playbackRate = 0;

    let rate = 0;
    let target = 0;
    let raf = null;
    let last = 0;
    const tick = (now) => {
      const dt = last ? now - last : 16;
      last = now;
      rate += (target - rate) * (1 - Math.exp(-dt / DRIFT_EASE_MS));
      if (Math.abs(target - rate) < 0.002) rate = target;
      anim.playbackRate = rate;
      raf = rate === target ? null : requestAnimationFrame(tick);
    };
    const glideTo = (t) => {
      target = t;
      if (raf === null) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const start = setTimeout(() => glideTo(1), DRIFT_START_MS);
    const holder = el.parentElement;
    const slow = () => glideTo(0);
    const resume = () => glideTo(1);
    holder.addEventListener("pointerenter", slow);
    holder.addEventListener("pointerleave", resume);
    return () => {
      clearTimeout(start);
      if (raf !== null) cancelAnimationFrame(raf);
      holder.removeEventListener("pointerenter", slow);
      holder.removeEventListener("pointerleave", resume);
      anim.cancel();
    };
  }, [ref]);
}
