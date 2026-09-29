import { flushSync } from "react-dom";

/* ------------------------------------------------------------------
   Router mínimo sobre la History API: dos tipos de página (inicio y
   pieza) no justifican una dependencia. Se encarga de:
   - URLs reales (/piezas/manta-campo) que se pueden compartir
   - Volver atrás al mismo punto de la página (scroll guardado en el historial)
   - Anclas entre páginas (/#coleccion desde una pieza)
   - Transición de continuidad con la View Transitions API, si existe
     y no se ha pedido movimiento reducido
------------------------------------------------------------------- */

function createStore(read) {
  const listeners = new Set();
  let value = read();
  return {
    get: () => value,
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    refresh: () => {
      value = read();
      listeners.forEach((fn) => fn());
    },
  };
}

export const locationStore = createStore(() => ({ pathname: window.location.pathname, hash: window.location.hash }));

// Pieza cuya muestra de tela hace la transición compartida (tarjeta ⇄ galería). Solo un elemento de la
// página puede llevar el nombre de transición a la vez, así que se decide aquí y no en cada componente
let transitionSlug = null;
export const transitionStore = createStore(() => transitionSlug);
export function setTransitionSlug(slug) {
  if (slug === transitionSlug) return;
  transitionSlug = slug;
  flushSync(transitionStore.refresh);
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function withViewTransition(update) {
  if (!document.startViewTransition || prefersReducedMotion()) update();
  else document.startViewTransition(update);
}

// Tras cambiar de página: al ancla si la hay; si no, a la posición guardada (atrás) o arriba (nueva página)
function placeScroll(hash, y) {
  const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (target) target.scrollIntoView({ behavior: "instant" });
  else window.scrollTo({ top: y, behavior: "instant" });
}

export function navigate(to) {
  const url = new URL(to, window.location.href);

  // Misma página: solo desplazarse (suave, salvo movimiento reducido, que lo resuelve el CSS)
  if (url.pathname === window.location.pathname) {
    window.history.pushState(window.history.state, "", url);
    locationStore.refresh();
    const target = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0 });
    return;
  }

  window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, "");
  withViewTransition(() => {
    flushSync(() => {
      window.history.pushState({ scrollY: 0 }, "", url);
      locationStore.refresh();
    });
    placeScroll(url.hash, 0);
  });
}

export function initRouter() {
  window.history.scrollRestoration = "manual";
  let lastPath = window.location.pathname;
  window.addEventListener("popstate", (e) => {
    const changedPage = window.location.pathname !== lastPath;
    lastPath = window.location.pathname;
    const apply = () => {
      flushSync(locationStore.refresh);
      placeScroll(changedPage ? "" : window.location.hash, e.state?.scrollY ?? 0);
    };
    if (changedPage) withViewTransition(apply);
    else apply();
  });
  // Mantener lastPath al navegar desde la app
  locationStore.subscribe(() => {
    lastPath = window.location.pathname;
  });
}
