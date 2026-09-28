# Lolita Atelier

Web de marca y tienda para Lolita Atelier, construida con React + Vite.

## Arrancar

```bash
npm install
npm run dev
```

## Estructura

- `src/App.jsx` — toda la web: estilos, datos de producto e ilustraciones SVG en un solo archivo.
- Los componentes están separados dentro del archivo (Header, Hero, Cinta, Historia, Coleccion, Proceso, Personaliza, Cartas, Footer, Cesta) para poder moverlos a `src/components/` cuando el proyecto crezca.

## Sistema visual

| Token        | Hex       | Uso                                                        |
|--------------|-----------|------------------------------------------------------------|
| Marfil       | `#F8F4EA` | Fondo principal                                            |
| Mantequilla  | `#F6E3B5` | Acentos cálidos: centro de la margarita, lazos, cartas     |
| Salvia       | `#8E9779` | Color de marca: cúpula del hero, hilos, puntadas, estados  |
| Avellana     | `#B8926B` | Textiles, colecciones, lazos ilustrados                    |
| Cacao        | `#5B3F2E` | Textos, botones y contraste                                |

Salvia y avellana no llevan texto encima ni se usan como color de texto: no llegan al contraste mínimo de accesibilidad (WCAG AA). El texto siempre va en cacao.

## Tipografías

- **Vintage Goods** (50Fox, de pago): caligráfica de marca. Se usa solo en titulares cortos, en el título de la cesta y en la vista previa del bordado. Nunca en párrafos, botones ni precios, porque en tamaños pequeños o textos largos una caligráfica cuesta de leer.
- **Fraunces** (libre, variable): la voz cálida de la marca. Historia, carta del taller, antetítulos, notas de producto y números de los pasos. Se usa con el eje `SOFT` al máximo (remates redondeados) y, en cursiva, con `WONK` para darle un aire más manual. Se sirve desde el proyecto con `@fontsource-variable/fraunces`.
- **Questrial** (libre): interfaz, precios y textos funcionales. Se sirve desde el propio proyecto con `@fontsource/questrial`, sin llamadas a Google (más rápido y sin ceder datos de visitantes a terceros, algo relevante con el RGPD).

### Activar Vintage Goods

1. Con la licencia web de Vintage Goods, copiad el archivo en `public/fonts/VintageGoods.woff2` (y `VintageGoods.woff` si lo tenéis).
2. No hay que tocar código: `src/fonts.css` ya lo carga.
3. Cuando esté, podéis quitar la sustituta temporal (`@fontsource/dancing-script`) de `src/main.jsx` y de `package.json`.

## Identidad (public/brand)

| Archivo                        | Dónde se usa                                  |
|--------------------------------|-----------------------------------------------|
| `logo-horizontal.webp`         | Cabecera                                      |
| `ramillete.webp`               | Historia, capítulo «Lazos que se volvían flores» |
| `monograma.webp`               | Historia, capítulo «Las tardes en su mesa de costura» (incrustado en App.jsx) |
| `logo-sello.webp`              | Sello de la carta del taller, sello de la postal y pie |
| `logo-horizontal-salvia.webp`, `logo-sello-salvia.webp` | Reservados (redes, packaging, página de contacto) |
| `favicon-32.png`, `favicon-180.png` | Pestaña del navegador y acceso directo en móvil |

Los logos claros se han procesado para que su fondo sea blanco puro y se muestran con `mix-blend-mode: multiply`: así se funden con el marfil sin cajas visibles. Si la agencia entrega versiones en PNG o SVG con fondo transparente, basta con sustituir los archivos manteniendo el nombre.
# lolita-atelier
