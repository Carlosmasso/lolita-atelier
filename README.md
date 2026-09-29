# Lolita Atelier

Web de marca y tienda para Lolita Atelier, construida con React + Vite.

## Arrancar

```bash
npm install
npm run dev
```

## Estructura

```
src/
  main.jsx            Arranque: fuentes, estilos globales y App
  App.jsx             Compone la página y guarda el estado compartido (cesta, panel de la cesta, aviso)
  assets/             Logo, monograma y fuentes de marca (se incrustan en el bundle, ver vite.config.js)
  styles/             fonts · base (tokens, fondo, tipografía, .wrap, .sec) · ui (botones, campos) · motion
  data/               Contenido: catálogo, hilos, pasos del taller, frases de la cinta
  lib/                Funciones puras: formato de precios, validación, geometría de las puntadas
  hooks/              useCart, usePresence, useToast, useInView, useScrolled, useDrift
  components/
    layout/           Header, Footer
    sections/         Hero, Cinta, Historia (Capitulo, CartaTaller), Coleccion (Pieza), Proceso,
                      Personaliza (BastidorBordado), Cartas (Sello)
    cart/             Cesta, LineaCesta
    art/              StitchedDaisy, SmallDaisy, MiniFlower, Fabric (ilustraciones SVG)
    ui/               Reveal, Aviso
```

- Cada componente vive en su carpeta con su CSS al lado; los estilos compartidos están en `src/styles/`.
- Las importaciones usan el alias `@/` para `src/` (configurado en `vite.config.js` y `jsconfig.json`).
- El movimiento sigue `MOTION.md`. Las animaciones de salida (cesta, aviso) duran `EXIT_MS` (`hooks/usePresence.js`), que debe coincidir con su CSS.

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
- **Questrial** (libre): interfaz, precios y textos funcionales. Va incrustada en el propio proyecto (`src/assets/fonts/questrial.woff2`), sin llamadas a Google (más rápido y sin ceder datos de visitantes a terceros, algo relevante con el RGPD).

### Activar Vintage Goods

Mientras no esté, los titulares caligráficos usan una sustituta incrustada (`src/assets/fonts/lolita-script-fallback.woff2`).

1. Con la licencia web de Vintage Goods, copiad el archivo en `public/fonts/VintageGoods.woff2` (y `VintageGoods.woff` si lo tenéis).
2. En `src/styles/fonts.css`, añadid las líneas `url(...)` que se indican en el comentario de la regla `@font-face` de Vintage Goods. No las dejéis puestas sin el archivo: cada visita haría peticiones fallidas.
3. `@fontsource/dancing-script` y `@fontsource/questrial` ya no se usan: podéis quitarlos de `package.json`.

## Identidad (public/brand)

| Archivo                        | Dónde se usa                                  |
|--------------------------------|-----------------------------------------------|
| `logo-horizontal.webp`         | Original del logo de la cabecera (la web usa una versión reducida, `src/assets/brand/logo.webp`, incrustada) |
| `ramillete.webp`               | Historia, capítulo «Lazos que se volvían flores» |
| `monograma.webp`               | Original del capítulo «Las tardes en su mesa de costura» (la web usa una versión reducida, `src/assets/brand/monograma.webp`, incrustada) |
| `logo-sello.webp`              | Sello de la carta del taller, sello de la postal y pie |
| `logo-horizontal-salvia.webp`, `logo-sello-salvia.webp` | Reservados (redes, packaging, página de contacto) |
| `favicon-32.png`, `favicon-180.png` | Pestaña del navegador y acceso directo en móvil |

Los logos claros se han procesado para que su fondo sea blanco puro y se muestran con `mix-blend-mode: multiply`: así se funden con el marfil sin cajas visibles. Si la agencia entrega versiones en PNG o SVG con fondo transparente, basta con sustituir los archivos manteniendo el nombre.
# lolita-atelier
