import { PETAL } from "@/lib/stitches";

// Margarita pequeña: pétalos rellenos con puntadas largas, sin contorno discontinuo
export default function SmallDaisy({ x = 0, y = 0, s = 1, thread = "#8E9779", center = "#F6E3B5" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} transform={`rotate(${30 * i})`}>
          <path d={PETAL} fill="#5B3F2E" opacity=".13" transform="translate(2.5 3.5)" />
          <path d={PETAL} fill="#FFFDF8" stroke="#D9CBB0" strokeWidth="1.4" />
          <path d="M-3.5,-24 Q-5,-50 -1.5,-76 M3.5,-24 Q5,-50 1.5,-76 M0,-20 L0,-80" fill="none" stroke={thread} strokeOpacity=".28" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ))}
      <circle r="16" fill={center} stroke="#B8926B" strokeWidth="2.2" />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = i * 2.4;
        const r = 2 + (i % 3) * 3.6;
        return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r="2.2" fill="#B8926B" />;
      })}
    </g>
  );
}
