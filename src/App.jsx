import Cesta from "@/components/cart/Cesta/Cesta";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Aviso from "@/components/ui/Aviso/Aviso";
import { productById, productBySlug } from "@/data/catalog";
import { useCart } from "@/hooks/useCart";
import { usePresence } from "@/hooks/usePresence";
import { useToast } from "@/hooks/useToast";
import Home from "@/pages/Home/Home";
import NoEncontrada from "@/pages/NoEncontrada/NoEncontrada";
import PaginaPieza from "@/pages/PaginaPieza/PaginaPieza";
import { useLocation } from "@/router/hooks";

/* ------------------------------------------------------------------
   LOLITA ATELIER
   Textiles para acompañar los primeros recuerdos.
   Sistema: lino + hoja + un único acento (el centro de la margarita).

   App elige la página según la dirección y guarda el estado que
   comparten todas: la cesta, si su panel está abierto y el aviso.
------------------------------------------------------------------- */
const PIEZA_PATH = /^\/piezas\/([^/]+)\/?$/;

export default function App() {
  const { pathname } = useLocation();
  const cart = useCart();
  const bag = usePresence();
  const toast = useToast();

  const addWithToast = (id) => {
    cart.add(id);
    toast.show(`Añadido a la cesta: ${productById(id).name}`);
  };

  let page;
  const piezaMatch = pathname.match(PIEZA_PATH);
  if (pathname === "/") {
    page = <Home items={cart.items} onAdd={addWithToast} onToast={toast.show} />;
  } else if (piezaMatch && productBySlug(piezaMatch[1])) {
    const product = productBySlug(piezaMatch[1]);
    page = (
      <PaginaPieza
        key={product.id}
        product={product}
        items={cart.items}
        onAdd={cart.add} // en la ficha la confirmación va junto al botón, sin aviso flotante
        onAddOther={addWithToast}
        onOpenBag={bag.show}
      />
    );
  } else {
    page = <NoEncontrada />;
  }

  return (
    <div className="la">
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header count={cart.count} onOpenBag={bag.show} />
      <main id="contenido">{page}</main>
      <Footer />
      {bag.mounted && (
        <Cesta lines={cart.lines} subtotal={cart.subtotal} onClose={bag.hide} onChange={cart.change} leaving={bag.leaving} />
      )}
      <Aviso message={toast.message} leaving={toast.leaving} />
    </div>
  );
}
