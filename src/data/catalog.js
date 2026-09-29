// Piezas del taller. `fabric` y `tone` alimentan la muestra textil generada en SVG (Fabric)
export const PRODUCTS = [
  { id: "campo", name: "Manta Campo", material: "Muselina doble de algodón, margarita bordada en la esquina", price: 58, cat: "Dormir", fabric: "muselina", tone: "#FFFDF8", fabricLabel: "Muselina", moment: "Para la primera siesta en casa" },
  { id: "siesta", name: "Juego de cuna Siesta", material: "Sábana bajera, encimera y funda de almohada en lino lavado", price: 89, cat: "Dormir", fabric: "lino", tone: "#D9DCCB", fabricLabel: "Lino lavado", moment: "Para dormir oliendo a limpio" },
  { id: "huerto", name: "Chichonera Huerto", material: "Vichy verde salvia con ribete a mano", price: 72, cat: "Dormir", fabric: "vichy", tone: "#8E9779", fabricLabel: "Vichy", moment: "Para que la cuna sea un nido" },
  { id: "viaje", name: "Bolsa Primer viaje", material: "Loneta de algodón con asas de lazo y bolsillo interior", price: 64, cat: "Paseo", fabric: "raya", tone: "#B8926B", fabricLabel: "Loneta", moment: "Para el primer viaje a casa" },
  { id: "lazo", name: "Babero Lazo", material: "Rizo de algodón, cierre con lazo en el cuello", price: 22, cat: "Pequeños detalles", fabric: "lino", tone: "#EAD9C4", fabricLabel: "Rizo", moment: "Para las primeras papillas" },
  { id: "margarita", name: "Lazo de pelo Margarita", material: "Batista bordada, flor hecha con un solo lazo", price: 14, cat: "Pequeños detalles", fabric: "muselina", tone: "#F6E3B5", fabricLabel: "Batista", moment: "Para cuando hay más lazo que pelo" },
];

export const CATEGORIES = ["Todo", "Dormir", "Paseo", "Pequeños detalles"];

// A partir de este subtotal el envío es gratuito
export const FREE_SHIPPING_FROM = 80;

export const productById = (id) => PRODUCTS.find((p) => p.id === id);
