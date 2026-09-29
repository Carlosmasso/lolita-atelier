import { navigate, setTransitionSlug } from "./router";

// Enlace interno: navega sin recargar. Con cmd/ctrl/clic central se comporta como un enlace normal
// (nueva pestaña). `transition` indica qué pieza hace la transición compartida al navegar
export default function Link({ to, transition, onClick, ...rest }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (transition) setTransitionSlug(transition);
    navigate(to);
  };
  return <a href={to} onClick={handleClick} {...rest} />;
}
