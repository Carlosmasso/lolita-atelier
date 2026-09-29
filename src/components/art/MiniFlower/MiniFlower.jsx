import "./MiniFlower.css";

// Margarita de viñeta: a 20px necesita contorno propio para no perderse sobre el marfil
export default function MiniFlower() {
  return (
    <svg className="mini-flower" viewBox="-12 -12 24 24" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cy="-5.6" rx="2.5" ry="5" transform={`rotate(${45 * i})`} fill="#FFFDF8" stroke="#B8926B" strokeWidth=".9" />
      ))}
      <circle r="2.9" fill="#E9C77E" stroke="#B8926B" strokeWidth=".8" />
    </svg>
  );
}
