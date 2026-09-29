import monograma from "@/assets/brand/monograma.webp";
import Reveal from "@/components/ui/Reveal/Reveal";
import Capitulo from "./Capitulo";
import CartaTaller from "./CartaTaller";
import "./Historia.css";

const CAPITULOS = [
  {
    n: "Uno",
    title: "Las tardes en su mesa de costura",
    paragraphs: [
      "Pasábamos las tardes a su lado, mirando cómo enhebraba la aguja a contraluz. Nos dejaba elegir los colores y, si teníamos paciencia, nos enseñaba un punto nuevo.",
      "De ella aprendimos el cariño por las cosas hechas a mano, por los lazos y las flores bordadas. Y que lo bonito no se hace deprisa.",
    ],
    image: { src: monograma, alt: "Letra L bordada en hilo verde, con una margarita junto al trazo", width: 360, height: 339 },
    caption: "Una L, una margarita y mucha paciencia",
  },
  {
    n: "Dos",
    title: "Lazos que se volvían flores",
    paragraphs: [
      "Su flor favorita era la margarita. Cogía un trozo de cinta, lo doblaba entre los dedos y, con un par de puntadas, el lazo se convertía en flor.",
      "Nos parecía magia. Todavía nos lo parece. Por eso cada pieza de Lolita lleva una margarita bordada y se entrega cerrada con un lazo.",
    ],
    image: { src: "/brand/ramillete.webp", alt: "Ramillete bordado de margaritas atado con un lazo de cinta", width: 400, height: 500 },
    caption: "Así empezaba siempre: con un lazo",
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
            Antes de ser una marca, Lolita fue una mesa junto a la ventana, una caja de galletas llena de hilos y una
            abuela que <em>nunca tenía prisa</em>.
          </p>
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

        <Reveal className="values">
          <p className="values-line">
            Cada cosa que salía de sus manos tenía algo que hoy queremos recuperar: <em>tiempo</em>, <em>cuidado</em> y{" "}
            <em>cariño</em>.
          </p>
        </Reveal>

        <Reveal className="letter-wrap">
          <CartaTaller />
        </Reveal>
      </div>
    </section>
  );
}
