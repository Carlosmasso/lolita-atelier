import Reveal from "@/components/ui/Reveal/Reveal";
import "./Fieles.css";

const FIELES = [
  "Fieles a nuestras raíces.",
  "Fieles a hacer las cosas con cariño.",
  "Fieles a la calidad y al trabajo bien hecho.",
  "Fieles a nuestra manera de entender lo artesanal.",
];

// La filosofía de Lolita: nace de la fe y la entrega de Lola y culmina en la frase de marca
export default function Fieles() {
  return (
    <Reveal as="section" className="values" aria-labelledby="fieles-title">
      <h3 id="fieles-title" className="sr">Fieles a las pequeñas cosas</h3>
      <div className="values-intro">
        <p>Lola era también una mujer de profunda fe.</p>
        <p>
          Una mujer fiel a sus creencias, pero también a los suyos, a sus valores y a una forma de vivir marcada por la
          entrega y el cuidado.
        </p>
        <p>De ella queremos conservar precisamente eso.</p>
      </div>
      <ul className="values-list">
        {FIELES.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="values-line" aria-hidden="true">
        Fieles a las <em>pequeñas cosas</em>.
      </p>
    </Reveal>
  );
}
