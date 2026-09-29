import Reveal from "@/components/ui/Reveal/Reveal";
import "./Capitulo.css";

// Un capítulo de la historia: texto y una foto pegada con cinta. `flip` cambia el lado de la foto
// y su inclinación, para que los capítulos alternen como en un álbum
export default function Capitulo({ n, title, paragraphs, image, caption, flip = false }) {
  return (
    <Reveal as="article" className={flip ? "chapter chapter--flip" : "chapter"}>
      <div className="chapter-text">
        <span className="chapter-n">{n}</span>
        <h3>{title}</h3>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <figure className={flip ? "snap snap--r" : "snap"}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
        <figcaption>{caption}</figcaption>
      </figure>
    </Reveal>
  );
}
