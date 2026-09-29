import { useEffect, useRef, useState } from "react";
import Fabric from "@/components/art/Fabric/Fabric";
import { useTransitionSlug } from "@/router/hooks";
import "./Galeria.css";

// Vistas de cada pieza. Cuando haya fotografía real, se añaden aquí como otro tipo de vista
const VIEWS = [
  { key: "pieza", label: "La pieza", view: "full" },
  { key: "bordado", label: "El bordado", view: "detail" },
];

// Galería con deslizamiento nativo (scroll-snap): sigue al dedo 1:1, conserva la inercia y rebota en los
// bordes sin código de gestos. Las miniaturas llevan a cada vista y reflejan la que está en pantalla
export default function Galeria({ product }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const transitionSlug = useTransitionSlug();

  useEffect(() => {
    const track = trackRef.current;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { root: track, threshold: 0.6 }
    );
    [...track.children].forEach((slide) => io.observe(slide));
    return () => io.disconnect();
  }, []);

  const show = (i) => {
    const track = trackRef.current;
    track.scrollTo({ left: i * track.clientWidth }); // suave o instantáneo según el CSS (movimiento reducido)
  };

  return (
    <div className="gallery">
      <div className="gallery-track" ref={trackRef} tabIndex={0} role="group" aria-label={`Imágenes de ${product.name}`}>
        {VIEWS.map((v, i) => (
          <figure
            key={v.key}
            className="gallery-slide"
            data-index={i}
            // La primera vista recibe la muestra de la tarjeta en la transición compartida
            style={i === 0 && transitionSlug === product.slug ? { viewTransitionName: "pieza-media" } : undefined}
          >
            <Fabric kind={product.fabric} tone={product.tone} uid={`${product.id}-${v.key}`} view={v.view} />
            <figcaption className="sr">
              {v.label}: {product.name}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery-thumbs" role="group" aria-label="Elegir imagen">
        {VIEWS.map((v, i) => (
          <button key={v.key} type="button" className="gallery-thumb" aria-pressed={active === i} aria-label={`Ver ${v.label.toLowerCase()}`} onClick={() => show(i)}>
            <Fabric kind={product.fabric} tone={product.tone} uid={`${product.id}-${v.key}-mini`} view={v.view} />
          </button>
        ))}
      </div>
    </div>
  );
}
