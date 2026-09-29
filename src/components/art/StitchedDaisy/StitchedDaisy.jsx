import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { fishboneLeaf, r2, satinPetal, seeded, stemStitch } from "@/lib/stitches";
import "./StitchedDaisy.css";

// Margarita grande del hero, bordada en punto de satén y revelada pétalo a pétalo
// Capas ya rasterizadas, por número de pétalos y resolución: al volver a la portada desde una pieza
// la margarita no se vuelve a pintar. Viven lo que dura la visita, por eso no se liberan
const layerCache = new Map();

export default function StitchedDaisy({ size = 420, petals = 14 }) {
  const uid = useMemo(() => Math.random().toString(36).slice(2, 8), []);
  const art = useMemo(() => {
    const rand = seeded(1942);
    const step = 360 / petals;
    const light = 225; // luz desde arriba a la izquierda
    const makePetal = (angle, back) => {
      const length = (back ? 62 : 70) + (rand() - 0.5) * 7;
      const width = (back ? 9 : 10.5) + (rand() - 0.5) * 1.6;
      const bend = (rand() - 0.5) * 7;
      // El satén brilla distinto según hacia dónde mira la puntada
      const facing = (Math.cos(((angle - light) * Math.PI) / 180) + 1) / 2;
      return { angle, back, width, length, sheen: back ? 0.2 + facing * 0.3 : 0.55 + facing * 0.45, ...satinPetal(rand, { base: 14, length, width, bend }) };
    };
    const list = [
      ...Array.from({ length: petals }, (_, i) => makePetal(step * i + step / 2 + (rand() - 0.5) * 6, true)),
      ...Array.from({ length: petals }, (_, i) => makePetal(step * i + (rand() - 0.5) * 5, false)),
    ];
    const knots = Array.from({ length: 96 }, (_, i) => {
      const r = 1.58 * Math.sqrt(i + 0.5);
      const a = i * 2.39996 + (rand() - 0.5) * 0.3;
      const edge = r / 15.5;
      return {
        x: r2(Math.cos(a) * r),
        y: r2(Math.sin(a) * r),
        r: r2(1.55 - edge * 0.35 + rand() * 0.3),
        tone: edge > 0.82 || rand() < 0.12 ? "d" : edge > 0.5 || rand() < 0.3 ? "m" : "l",
        twist: r2(rand() * 360),
      };
    });
    return { list, knots };
  }, [petals]);

  const id = (name) => `${name}-${uid}`;
  const stem = stemStitch([0, 30], [4, 62], [-5, 88], [2, 112], 34);
  const leaf = fishboneLeaf(26, 6.2);

  // Rendimiento: el filtro de hilo (ruido, relieve y luz especular) es carísimo. Si se aplica a pétalos
  // que se revelan con máscaras animadas, Chrome lo recalcula en cada fotograma y la entrada va a
  // trompicones. Por eso la flor se dibuja una sola vez en una plantilla oculta y cada capa (tallo,
  // pétalos de atrás, de delante y centro) se convierte en un PNG a la resolución de la pantalla.
  // Lo que se anima son solo las máscaras sobre esos mapas de bits. (Una imagen SVG no basta: Chrome
  // la guarda como vectores y vuelve a pasar los filtros en cada repintado.)
  const sourceRef = useRef(null);
  const shownRef = useRef(null);
  const [layers, setLayers] = useState(null);
  useLayoutEffect(() => {
    const src = sourceRef.current;
    const xml = new XMLSerializer();
    const defs = xml.serializeToString(src.querySelector("defs"));
    const shown = shownRef.current.getBoundingClientRect().width || 420;
    const px = Math.round(Math.min(1600, Math.max(512, shown * (window.devicePixelRatio || 1))));
    const cacheKey = `${petals}-${px}`;
    if (layerCache.has(cacheKey)) {
      setLayers(layerCache.get(cacheKey));
      return;
    }
    const names = ["stem", "back", "front", "center"];
    const svgUrls = names.map((name) => {
      const markup = xml.serializeToString(src.querySelector(`[data-layer="${name}"]`));
      const doc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-110 -110 220 220" width="${px}" height="${px}">${defs}${markup}</svg>`;
      return URL.createObjectURL(new Blob([doc], { type: "image/svg+xml" }));
    });
    const toPng = async (svgUrl) => {
      const img = new Image();
      img.src = svgUrl;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = px;
      canvas.getContext("2d").drawImage(img, 0, 0, px, px);
      const blob = await new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject()), "image/png"));
      return URL.createObjectURL(blob);
    };

    let cancelled = false;
    let inUse = [];
    Promise.all(svgUrls.map(toPng))
      .then((pngUrls) => {
        svgUrls.forEach((u) => URL.revokeObjectURL(u));
        return pngUrls;
      })
      .catch(() => svgUrls) // si el lienzo falla, las capas vectoriales siguen viéndose bien (solo más lentas)
      .then((urls) => {
        inUse = urls;
        if (cancelled) {
          urls.forEach((u) => URL.revokeObjectURL(u));
          return;
        }
        const ready = Object.fromEntries(names.map((n, i) => [n, urls[i]]));
        layerCache.set(cacheKey, ready);
        setLayers(ready);
      });
    return () => {
      cancelled = true;
      if (!layerCache.has(cacheKey)) inUse.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [art, petals]);

  const source = (
    <svg ref={sourceRef} viewBox="-110 -110 220 220" width="0" height="0" aria-hidden="true" style={{ display: "none" }}>
      <defs>
        {/* Relieve del hilo: la luminancia hace de mapa de alturas y cada puntada recibe su brillo */}
        <filter id={id("thread")} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.6" xChannelSelector="R" yChannelSelector="G" result="src" />
          <feColorMatrix in="src" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.3 0.59 0.11 0 0" result="height" />
          <feGaussianBlur in="height" stdDeviation="0.35" result="bump" />
          <feSpecularLighting in="bump" surfaceScale="2.2" specularConstant="0.6" specularExponent="16" lightingColor="#FFF8EA" result="spec">
            <feDistantLight azimuth="225" elevation="52" />
          </feSpecularLighting>
          <feComposite in="spec" in2="src" operator="in" result="specIn" />
          <feComposite in="src" in2="specIn" operator="arithmetic" k2="1" k3="0.45" result="lit" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.3" result="blur" />
          <feOffset in="blur" dx="0.9" dy="1.6" result="drop" />
          <feFlood floodColor="#2E2616" floodOpacity="0.42" />
          <feComposite in2="drop" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="lit" />
          </feMerge>
        </filter>
        <filter id={id("soft")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.9" />
        </filter>

        {/* Satén abombado: más claro en el lomo, más oscuro en los bordes */}
        {art.list.map((p, i) => (
          <linearGradient key={i} id={id(`sat-${i}`)} gradientUnits="userSpaceOnUse" x1={-p.width} y1="0" x2={p.width} y2="0">
            <stop offset="0" stopColor={p.back ? "#CFC2A6" : "#DCD0B6"} />
            <stop offset=".45" stopColor={p.back ? "#E9DFCB" : "#FFFDF7"} stopOpacity="1" />
            <stop offset=".6" stopColor={p.back ? "#E4D9C3" : "#FBF6EC"} />
            <stop offset="1" stopColor={p.back ? "#C5B797" : "#D6C8AB"} />
          </linearGradient>
        ))}

        <radialGradient id={id("dome")} cx=".42" cy=".4" r=".62">
          <stop offset="0" stopColor="#F4D98F" />
          <stop offset=".7" stopColor="#D9AE5E" />
          <stop offset="1" stopColor="#A57A45" />
        </radialGradient>
        {[
          ["l", "#FFF1C4", "#F2CF78", "#C79A4E"],
          ["m", "#F7DC93", "#DDAF55", "#A97B3C"],
          ["d", "#E2B866", "#B8864A", "#7E5A33"],
        ].map(([k, a, b, c]) => (
          <radialGradient key={k} id={id(`knot-${k}`)} cx=".38" cy=".34" r=".7">
            <stop offset="0" stopColor={a} />
            <stop offset=".55" stopColor={b} />
            <stop offset="1" stopColor={c} />
          </radialGradient>
        ))}

      </defs>

      {/* Tallo en punto de tallo y hoja en punto de espiga */}
      <g data-layer="stem" filter={`url(#${id("thread")})`}>
        <g fill="none" strokeLinecap="round">
          <path d={stem} stroke="#4E5A39" strokeWidth="2.1" />
          <path d={stem} stroke="#76845A" strokeWidth="0.9" transform="translate(-0.35 -0.2)" />
        </g>
        <g transform="translate(-0.5 94) rotate(-158)" fill="none" strokeLinecap="round">
          <path d={leaf} stroke="#4A5636" strokeWidth="1.5" />
          <path d={leaf} stroke="#7F8D60" strokeWidth="0.6" transform="translate(0 -0.25)" />
          <path d="M0,0 L25,0" stroke="#3F4A2E" strokeWidth="0.5" />
        </g>
      </g>

      {/* Pétalos y centro en el espacio de la flor (translate(0 -12) scale(0.9) se aplica al mostrarlos) */}
      {[true, false].map((back) => (
        <g key={String(back)} data-layer={back ? "back" : "front"}>
          {art.list.map((p, i) =>
            p.back === back ? (
              <g key={i} transform={`rotate(${r2(p.angle)})`} filter={`url(#${id("thread")})`}>
                {/* Sombra propia de cada pétalo sobre los de atrás */}
                {!p.back && <path d={p.outline} fill="#3B2F1E" opacity=".28" transform="translate(0.8 1.4)" filter={`url(#${id("soft")})`} />}
                {/* Relleno: asoma entre puntadas y crea las estrías del hilo */}
                <path d={p.outline} fill={p.back ? "#A99A7C" : "#BFB194"} />
                <path d={p.stitches} fill="none" stroke={`url(#${id(`sat-${i}`)})`} strokeWidth="1.12" strokeLinecap="round" opacity={0.82 + p.sheen * 0.18} />
              </g>
            ) : null
          )}
        </g>
      ))}

      {/* Centro: cúpula de nudos franceses */}
      <g data-layer="center" filter={`url(#${id("thread")})`}>
        <circle r="17.5" fill="#3B2F1E" opacity=".3" transform="translate(0.8 1.3)" filter={`url(#${id("soft")})`} />
        <circle r="16.5" fill={`url(#${id("dome")})`} />
        {art.knots.map((k, i) => (
          <g key={i} transform={`translate(${k.x} ${k.y}) rotate(${k.twist})`}>
            <circle r={k.r} fill={`url(#${id(`knot-${k.tone}`)})`} />
            <path d={`M${-k.r * 0.55},${-k.r * 0.2} Q0,${k.r * 0.45} ${k.r * 0.55},${-k.r * 0.2}`} fill="none" stroke="#6E4E2C" strokeOpacity=".45" strokeWidth=".28" />
          </g>
        ))}
      </g>
    </svg>
  );

  // Cada pétalo se revela con un trazo animado sobre su eje. Los trazos de una misma capa comparten máscara
  const stitchMask = (back) => (
    <mask id={id(back ? "m-back" : "m-front")} maskUnits="userSpaceOnUse" x="-110" y="-110" width="220" height="220">
      {art.list.map((p, i) =>
        p.back === back ? (
          <path
            key={i}
            d={`M0,-10 L0,${-(14 + p.length + 4)}`}
            pathLength="1"
            fill="none"
            stroke="#fff"
            strokeWidth={p.width * 2 + 10}
            className="stitch-mask"
            transform={`rotate(${p.angle})`}
            style={{ animationDelay: `${p.back ? 0.3 + (i % petals) * 0.04 : 0.6 + (i % petals) * 0.05}s` }}
          />
        ) : null
      )}
    </mask>
  );
  const layer = (name) => <image href={layers[name]} x="-110" y="-110" width="220" height="220" />;

  return (
    <>
      {!layers && source}
      <svg ref={shownRef} viewBox="-110 -110 220 220" width={size} height={size} role="img" aria-label="Margarita bordada a mano">
        {/* Las máscaras se montan con las capas: así el bordado empieza a coserse cuando todo está listo */}
        {layers && (
          <defs>
            {stitchMask(true)}
            {stitchMask(false)}
          </defs>
        )}
        {layers && (
          <>
            {layer("stem")}
            <g transform="translate(0 -12) scale(0.9)">
              <g mask={`url(#${id("m-back")})`}>{layer("back")}</g>
              <g mask={`url(#${id("m-front")})`}>{layer("front")}</g>
              <g className="daisy-center" style={{ animationDelay: `${0.6 + petals * 0.05}s` }}>{layer("center")}</g>
            </g>
          </>
        )}
      </svg>
    </>
  );
}
