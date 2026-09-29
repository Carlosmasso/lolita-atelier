import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Link from "@/router/Link";
import "./NoEncontrada.css";

// Dirección que no existe (o pieza retirada): explicar y devolver a la colección
export default function NoEncontrada() {
  useDocumentMeta({ title: "Página no encontrada" });
  return (
    <section className="wrap notfound">
      <h1 className="sec-title">No encontramos esta página</h1>
      <p className="sec-intro">Puede que el enlace no sea correcto o que la pieza ya no esté en el taller.</p>
      <Link to="/#coleccion" className="btn btn-line">Ver la colección</Link>
    </section>
  );
}
