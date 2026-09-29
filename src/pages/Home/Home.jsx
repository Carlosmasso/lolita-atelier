import { useLayoutEffect } from "react";
import Cartas from "@/components/sections/Cartas/Cartas";
import Cinta from "@/components/sections/Cinta/Cinta";
import Coleccion from "@/components/sections/Coleccion/Coleccion";
import Hero from "@/components/sections/Hero/Hero";
import Historia from "@/components/sections/Historia/Historia";
import Personaliza from "@/components/sections/Personaliza/Personaliza";
import Proceso from "@/components/sections/Proceso/Proceso";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function Home({ items, onAdd, onToast }) {
  useDocumentMeta({});

  // Entrada directa con ancla (/#coleccion): el contenido se pinta con JavaScript, así que el
  // navegador no encuentra el ancla al cargar y hay que llevar la vista hasta ella
  useLayoutEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <>
      <Hero />
      <Cinta />
      <Historia />
      <Coleccion items={items} onAdd={onAdd} />
      <Proceso />
      <Personaliza onToast={onToast} />
      <Cartas />
    </>
  );
}
