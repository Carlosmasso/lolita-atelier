import SmallDaisy from "@/components/art/SmallDaisy/SmallDaisy";

// Vista previa del bordado: el nombre en punto de satén del color del hilo, sobre lino tensado en un bastidor.
// El tamaño de letra baja a partir de 6 caracteres para que el nombre quepa en el aro
export default function BastidorBordado({ name, thread }) {
  const fontSize = name.length > 6 ? 88 - (name.length - 6) * 6 : 88;
  return (
    <svg viewBox="0 0 500 400" aria-label={`Vista previa: ${name} bordado en ${thread.label.toLowerCase()}`} role="img">
      <defs>
        <pattern id="linen-p" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#FFFDF8" />
          <path d="M0,3 H6 M3,0 V6" stroke="#000" strokeOpacity=".035" />
        </pattern>
        <pattern id="mesa-p" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#EFE6D3" />
          <path d="M0,3 H6 M3,0 V6" stroke="#5B3F2E" strokeOpacity=".05" />
        </pattern>
        {/* Satén: franjas finas en diagonal con brillo y sombra, del color del hilo */}
        <pattern id="satin-p" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <rect width="2.6" height="2.6" fill={thread.hex} />
          <rect width=".8" height="2.6" fill="#fff" opacity=".24" />
          <rect x="2.05" width=".55" height="2.6" fill="#000" opacity=".2" />
        </pattern>
        <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6C8A0" />
          <stop offset=".5" stopColor="#C49A6C" />
          <stop offset="1" stopColor="#A77B50" />
        </linearGradient>
        <filter id="emb-text" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="b" />
          <feOffset in="b" dx="1.2" dy="2" result="o" />
          <feFlood floodColor="#3B2F1E" floodOpacity=".35" />
          <feComposite in2="o" operator="in" result="s" />
          <feMerge>
            <feMergeNode in="s" />
            <feMergeNode in="d" />
          </feMerge>
        </filter>
        <filter id="hoop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="500" height="400" fill="url(#mesa-p)" />
      {/* Bastidor de bordar con la tela tensada */}
      <circle cx="256" cy="210" r="168" fill="#5B3F2E" opacity=".2" filter="url(#hoop-shadow)" />
      <circle cx="250" cy="200" r="160" fill="url(#linen-p)" />
      <text
        x="250"
        y="212"
        textAnchor="middle"
        fontFamily="'Vintage Goods', 'Lolita Script Fallback', cursive"
        fontSize={fontSize}
        fill="url(#satin-p)"
        filter="url(#emb-text)"
      >
        {name}
      </text>
      <SmallDaisy x={250} y={278} s={0.26} thread={thread.hex} />
      <circle cx="250" cy="200" r="164" fill="none" stroke="url(#wood)" strokeWidth="12" />
      <circle cx="250" cy="200" r="170.5" fill="none" stroke="#7E5A36" strokeOpacity=".45" strokeWidth="1" />
      <circle cx="250" cy="200" r="157.5" fill="none" stroke="#7E5A36" strokeOpacity=".35" strokeWidth="1" />
      <g transform="translate(250 30)">
        <rect x="-16" y="-8" width="32" height="18" rx="3" fill="url(#wood)" stroke="#7E5A36" strokeOpacity=".5" />
        <rect x="-5" y="-26" width="10" height="20" rx="2" fill="#CFCFC6" stroke="#8C8C82" strokeWidth=".8" />
        <path d="M-5,-20 H5 M-5,-15 H5 M-5,-10 H5" stroke="#8C8C82" strokeWidth=".7" />
      </g>
    </svg>
  );
}
