import SmallDaisy from "../SmallDaisy/SmallDaisy";

// Encuadres de la muestra: la pieza entera, o un detalle de la esquina con la margarita y el pespunte
const VIEWBOX = { full: "0 0 400 500", detail: "230 288 170 212" };

// Muestras textiles generadas en SVG (sin imágenes externas)
export default function Fabric({ kind, tone, uid, withDaisy = true, view = "full" }) {
  const id = `f-${uid}`;
  let pattern;
  if (kind === "vichy") {
    pattern = (
      <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="#F8F4EA" />
        <rect width="14" height="28" fill={tone} opacity=".45" />
        <rect width="28" height="14" fill={tone} opacity=".45" />
      </pattern>
    );
  } else if (kind === "raya") {
    pattern = (
      <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
        <rect width="18" height="18" fill="#F8F4EA" />
        <rect width="5" height="18" fill={tone} opacity=".75" />
      </pattern>
    );
  } else if (kind === "muselina") {
    pattern = (
      <pattern id={id} width="40" height="12" patternUnits="userSpaceOnUse">
        <rect width="40" height="12" fill={tone} />
        <path d="M0,6 Q10,2 20,6 T40,6" fill="none" stroke="#000" strokeOpacity=".05" strokeWidth="1.2" />
      </pattern>
    );
  } else {
    pattern = (
      <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill={tone} />
        <path d="M0,3 H6 M3,0 V6" stroke="#000" strokeOpacity=".035" strokeWidth="1" />
      </pattern>
    );
  }
  return (
    <svg viewBox={VIEWBOX[view]} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>{pattern}</defs>
      <rect width="400" height="500" fill={`url(#${id})`} />
      {/* Dobladillo con pespunte */}
      <rect x="22" y="22" width="356" height="456" fill="none" stroke="#5B3F2E" strokeOpacity=".3" strokeWidth="1.4" strokeDasharray="6 5" />
      {withDaisy && <SmallDaisy x={318} y={410} s={0.42} />}
    </svg>
  );
}
