import monograma from "@/assets/brand/monograma.webp";
import Reveal from "@/components/ui/Reveal/Reveal";
import Capitulo from "./Capitulo";
import CartaTaller from "./CartaTaller";
import Fieles from "./Fieles";
import "./Historia.css";

// Quién era Lola, antes de contar qué hacía con las manos
const RETRATO = [
  "Lola era una mujer fuerte, luchadora y valiente. Pero también profundamente cariñosa, delicada y atenta.",
  "Siempre cuidó de los suyos. Y tenía una manera muy suya de decir te quiero: a veces era un plato de comida esperando en la mesa; otras, una de esas historias de vida que podíamos escuchar una y otra vez. Y muchas veces eran sus manos, siempre ocupadas creando, cuidando o haciendo algo para alguien.",
  "Porque Lola no necesitaba decir demasiado para demostrar amor.",
];

const CAPITULOS = [
  {
    n: "Uno",
    title: "El amor también está en las manos",
    paragraphs: [
      "De sus manos salían comidas, labores, lazos y pequeñas flores. Cosas sencillas que se volvían especiales porque detrás había tiempo, paciencia y alguien pensando en ti.",
      "Con los años entendimos que aquello era mucho más que hacer cosas bonitas.",
      "Era su manera de cuidar.",
      "Y esa forma de entender el cariño es la que hoy queremos recuperar en Lolita: crear con intención, cuidar los detalles y hacer piezas que puedan acompañar algunos de los primeros recuerdos de una familia.",
    ],
    image: { src: "/brand/ramillete.webp", alt: "Ramillete bordado de margaritas atado con un lazo de cinta", width: 400, height: 500 },
    caption: "Comidas, labores, lazos y pequeñas flores",
  },
  {
    n: "Dos",
    title: "Lazos que se volvían flores",
    paragraphs: [
      "Su flor favorita era la margarita.",
      "Y los lazos formaban parte de muchas de sus labores.",
      "Por eso nuestra margarita nace de una cinta. No es simplemente un elemento del logo: es una pequeña forma de recordar sus manos y todo aquello que hacía con ellas.",
      "Una cinta. Unas puntadas. Una flor.",
    ],
    image: { src: monograma, alt: "Letra L bordada en hilo verde, con una margarita junto al trazo", width: 360, height: 339 },
    caption: "Una L, una margarita y una historia que continúa",
    flip: true,
  },
];

export default function Historia() {
  return (
    <section id="historia" className="sec story-sec">
      <div className="wrap">
        <Reveal as="header" className="story-head">
          <p className="eyebrow">Nuestra historia</p>
          <h2 className="sec-title">Lolita nace de un recuerdo</h2>
          <p className="story-lead">
            Antes de ser una marca, Lolita fue nuestra <em>yaya Lola</em>.
          </p>
        </Reveal>

        <Reveal className="story-intro">
          {RETRATO.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="story-beat">Lo hacía.</p>
          <p>Y quizá esa sea una de las cosas más importantes que hemos heredado de ella.</p>
        </Reveal>

        <div className="chapters">
          {/* Hilo en punto de hilván que se va cosiendo al bajar */}
          <svg className="story-thread" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M20,0 C34,120 6,240 20,360 S34,600 20,720 S6,900 20,1000"
              fill="none"
              stroke="#8E9779"
              strokeWidth="2"
              strokeDasharray="10 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {CAPITULOS.map((c) => (
            <Capitulo key={c.n} {...c} />
          ))}
        </div>

        <Fieles />

        <Reveal className="letter-wrap">
          <CartaTaller />
        </Reveal>

        {/* La frase más íntima de la web: sola, sin nada alrededor */}
        <Reveal as="p" className="story-coda">
          Yaya, ojalá pudieras verlo.
          <br />
          Todo esto lleva un poquito de ti.
        </Reveal>
      </div>
    </section>
  );
}
