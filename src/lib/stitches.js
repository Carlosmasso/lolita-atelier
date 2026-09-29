// Geometría de las puntadas de bordado: funciones puras que devuelven trazados SVG

// Un pétalo: bucle alargado, como el punto de margarita (lazy daisy)
export const PETAL = "M0,-14 C-11,-34 -12,-70 0,-86 C12,-70 11,-34 0,-14 Z";

// PRNG determinista: la margarita sale idéntica en cada render
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const r2 = (n) => Math.round(n * 100) / 100;

// Pétalo en punto de satén: puntadas paralelas y algo inclinadas sobre un relleno de hilo
export function satinPetal(rand, { base, length, width, bend }) {
  const hw = (t) => width * Math.pow(Math.sin(Math.PI * Math.min(t, 0.995)), 0.7) * (0.55 + 0.45 * t);
  const at = (t, side) => [side * hw(t) + bend * t * t, -(base + t * length)];
  const n = Math.round(length / 1.3);
  const stitches = [];
  for (let i = 0; i <= n; i++) {
    const t = 0.015 + (i / n) * 0.965;
    const [x1, y1] = at(t, -1);
    const [x2, y2] = at(Math.min(t + 0.07, 0.985), 1);
    const j = () => (rand() - 0.5) * 0.35;
    // Leve curvatura: el hilo se abomba sobre el relleno
    const cx = (x1 + x2) / 2 + bend * 0.05;
    const cy = (y1 + y2) / 2 - 0.7;
    stitches.push(`M${r2(x1 + j())},${r2(y1 + j())}Q${r2(cx)},${r2(cy)} ${r2(x2 + j())},${r2(y2 + j())}`);
  }
  const outline = [];
  for (let i = 0; i <= 24; i++) outline.push(at(i / 24, -1));
  for (let i = 24; i >= 0; i--) outline.push(at(i / 24, 1));
  return {
    stitches: stitches.join(""),
    outline: "M" + outline.map(([x, y]) => `${r2(x)},${r2(y)}`).join("L") + "Z",
  };
}

// Punto de tallo: puntadas cortas que se solapan a lo largo de una curva
export function stemStitch(p0, p1, p2, p3, count) {
  const pt = (t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]);
  };
  const out = [];
  for (let i = 0; i < count; i++) {
    const a = pt(i / count);
    const b = pt(Math.min(1, (i + 1.7) / count));
    out.push(`M${r2(a[0] - 0.6)},${r2(a[1])}L${r2(b[0] + 0.6)},${r2(b[1])}`);
  }
  return out.join("");
}

// Hoja en punto de espiga: puntadas alternas desde el borde hacia el nervio central
export function fishboneLeaf(length, width) {
  const hw = (t) => width * Math.pow(Math.sin(Math.PI * t), 0.8);
  const n = Math.round(length / 1.1);
  const out = [];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const side = i % 2 ? 1 : -1;
    const tv = Math.min(t + 0.12, 0.98);
    out.push(`M${r2(t * length)},${r2(side * hw(t))}L${r2(tv * length)},${r2(side * 0.4)}`);
  }
  return out.join("");
}
