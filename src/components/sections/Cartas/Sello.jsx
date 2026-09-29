// Sello dentado con el logo y matasellos circular de Albacete
export default function Sello() {
  return (
    <>
      <div className="stamp">
        <div className="stamp-in">
          <img src="/brand/logo-sello.webp" alt="" width="500" height="280" loading="lazy" />
        </div>
      </div>
      <svg className="postmark" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="postmark-arc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" />
        <text fontSize="10.5" letterSpacing="2.4" fill="currentColor" fontFamily="Questrial, sans-serif">
          <textPath href="#postmark-arc">ALBACETE · LOLITA ATELIER · </textPath>
        </text>
        <text x="60" y="64" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Questrial, sans-serif">CORREO</text>
      </svg>
    </>
  );
}
