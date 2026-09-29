import { useEffect } from "react";

const SITE = "Lolita Atelier";

// Título de pestaña y descripción para buscadores de cada página; al salir, vuelven los de la web
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    const prev = { title: document.title, description: meta?.content };
    document.title = title ? `${title} | ${SITE}` : SITE;
    if (meta && description) meta.content = description;
    return () => {
      document.title = prev.title;
      if (meta && prev.description) meta.content = prev.description;
    };
  }, [title, description]);
}
