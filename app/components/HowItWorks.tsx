import { FileCheck, ShoppingCart, Ticket, Trophy } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <ShoppingCart size={40} className="text-blue-600" />,
      title: "1. Compra tu número",
      desc: "Selecciona la cantidad de números que deseas y realiza tu pago de forma segura."
    },
    {
      icon: <Trophy size={40} className="text-indigo-600" />,
      title: "2. Desbloqueo de premios intermedios",
      desc: "Al alcanzar los hitos establecidos se activa la entrega de la Yapa."
    },
    {
      icon: <Ticket size={40} className="text-cyan-600" />,
      title: "3. Sorteo en vivo ante notario",
      desc: "Realizaremos el sorteo en vivo con total transparencia y anuncio del ganador."
    },
    {
      icon: <FileCheck size={40} className="text-emerald-600" />,
      title: "4. Entrega legal del Premio Principal",
      desc: "El terreno se transfiere mediante escritura pública, coordinada directamente con el ganador."
    }
  ];

  return (
    <section
      id="comofunciona"
      className="py-20 bg-gray-50"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
        ¿Cómo Funciona?
      </h2>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="
              bg-white
              border border-gray-200
              rounded-2xl p-6
              transition-all duration-300
              hover:scale-105
              hover:shadow-lg
            "
          >
            <div className="mb-5 flex justify-center">
              <div className="p-4 rounded-xl bg-gray-100">
                {step.icon}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center">
              {step.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed text-center">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}