import "./CartaTaller.css";

// Carta del taller en papel pautado, con el sello dentro para que el texto lo rodee.
// Todo el texto va a 36 px de interlineado para caer sobre las líneas del papel
export default function CartaTaller() {
  return (
    <aside className="letter" aria-labelledby="carta-title">
      <img className="letter-stamp" src="/brand/logo-sello.webp" alt="" width="500" height="280" loading="lazy" />
      <h3 id="carta-title" className="letter-title">Una historia que continúa</h3>
      <p>Lolita no nace para intentar volver al pasado.</p>
      <p>Nace para llevar algo de él hacia delante.</p>
      <p>
        La fortaleza de Lola. Su delicadeza. Su fe. Sus historias. Sus comidas alrededor de una mesa. Sus lazos. Sus
        margaritas. Y, sobre todo, aquella forma tan intensa de querer y cuidar a los suyos.
      </p>
      <p>
        Hoy transformamos ese recuerdo en piezas textiles para los más pequeños, hechas con mimo y pensadas para
        permanecer.
      </p>
      <p>
        Porque nos gusta imaginar que algún día, muchos años después, alguien abrirá un cajón, encontrará una de ellas
        y dirá:
      </p>
      <p className="letter-quote">«Esto era mío cuando era bebé».</p>
      <p>Y entonces una pieza volverá a convertirse en un recuerdo.</p>
      <footer className="letter-sign">
        <span className="letter-sign-name">Lolita Atelier</span>
        <span className="letter-sign-line">Para los recuerdos que empiezan.</span>
        <span className="letter-sign-name">Made in Albacete</span>
      </footer>
    </aside>
  );
}
