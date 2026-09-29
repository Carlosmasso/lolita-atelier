import Cesta from "@/components/cart/Cesta/Cesta";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Cartas from "@/components/sections/Cartas/Cartas";
import Cinta from "@/components/sections/Cinta/Cinta";
import Coleccion from "@/components/sections/Coleccion/Coleccion";
import Hero from "@/components/sections/Hero/Hero";
import Historia from "@/components/sections/Historia/Historia";
import Personaliza from "@/components/sections/Personaliza/Personaliza";
import Proceso from "@/components/sections/Proceso/Proceso";
import Aviso from "@/components/ui/Aviso/Aviso";
import { productById } from "@/data/catalog";
import { useCart } from "@/hooks/useCart";
import { usePresence } from "@/hooks/usePresence";
import { useToast } from "@/hooks/useToast";

/* ------------------------------------------------------------------
   LOLITA ATELIER
   Textiles para acompañar los primeros recuerdos.
   Sistema: lino + hoja + un único acento (el centro de la margarita).

   App solo compone la página y guarda el estado que comparten varias
   partes: la cesta, si su panel está abierto y el aviso en pantalla.
------------------------------------------------------------------- */
export default function App() {
  const cart = useCart();
  const bag = usePresence();
  const toast = useToast();

  const addToCart = (id) => {
    cart.add(id);
    toast.show(`Añadido a la cesta: ${productById(id).name}`);
  };

  return (
    <div className="la">
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header count={cart.count} onOpenBag={bag.show} />
      <main id="contenido">
        <Hero />
        <Cinta />
        <Historia />
        <Coleccion items={cart.items} onAdd={addToCart} />
        <Proceso />
        <Personaliza onToast={toast.show} />
        <Cartas />
      </main>
      <Footer />
      {bag.mounted && (
        <Cesta lines={cart.lines} subtotal={cart.subtotal} onClose={bag.hide} onChange={cart.change} leaving={bag.leaving} />
      )}
      <Aviso message={toast.message} leaving={toast.leaving} />
    </div>
  );
}
