import Accordion, { AccordionItemData } from "./Acordeon";


export default function Acordeon() {
  const items: AccordionItemData[] = [
    {
      id: "1",
      title: "¿El terreno incluye agua o luz?",
      content: `Tiene por escritura acceso a 2 pozos que hay en el condominio,
          que en estos momentos debido a la reciente sequía aún están sin agua,
          y que antes de ellos se abastecían de agua los vecinos. Actualmente el abastecimiento
          de agua se realiza mediante la compra de agua a camiones aljibes.
          El terreno cuenta con factibilidad de energía eléctrica, la que debe ser instalada por
           el propietario mediante la extensión de la red existente que hay dentro del condominio hasta la propiedad. 
          `,
    },
    {
      id: "2",
      title: "¿La casa incluye instalación?",
      content: "No cuenta con instalación. La casa se entrega en las bodegas del fabricante.",
    },
    {
      id: "3",
      title: "¿Qué pasa si no se venden los 20.000 números?",
      content: "El sorteo final se realizará cuando se consiga la venta de los 20.000 números, para lo cual se irá extendiendo la fecha de realización del sorteo final de acuerdo a lo indicado en las Bases del Concurso.",
    },
    {
      id: "4",
      title: "¿Cómo se asigna el número correlativo al comprar el Sticker?",
      content: "El número correlativo se asigna automáticamente y de forma aleatoria al momento de completar la compra del Informativo Digital. Una vez confirmado el pago, recibirás tu número asignado junto con el comprobante correspondiente.",
    },
    {
      id: "5",
      title: "¿Puedo comprar más de un número?",
      content: "Puedes comprar todos los numeros que quieras",
    },
  ];

  return (
    <main className="p-10">
      <Accordion items={items} allowMultiple />
    </main>
  );
} 