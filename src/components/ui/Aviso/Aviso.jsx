import "./Aviso.css";

// Aviso breve en la parte baja de la pantalla; `leaving` activa su animación de salida
export default function Aviso({ message, leaving }) {
  if (!message) return null;
  return (
    <div className="toast" role="status" data-leaving={leaving}>
      {message}
    </div>
  );
}
