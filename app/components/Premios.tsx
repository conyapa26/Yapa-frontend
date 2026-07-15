"use client";

const yapas = [
  {
    etapa: "Hito 1: 5.000 tickets",
    premios: ["5 premios de $200.000"],
  },
  {
    etapa: "Hito 2: 10.000 tickets",
    premios: [
      "4 premios de $500.000",
      "Curso Profesional de Soldadura (INDURA)",
    ],
  },
  {
    etapa: "Hito 3: 15.000 tickets",
    premios: [
      "2 premios de $1.000.000",
      "Curso Profesional de Soldadura (INDURA)",
    ],
  },
  {
    etapa: "Hito 4: 20.000 tickets",
    final: true,
    premios: [
      "Parcela Lote 59",
      "Kit Intermedio Plus",
      "Modelo Clásico L – 72 m²",
    ],
  },
];

export default function YapasFinal() {
  return (
    <section id="yapas" className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        🎁 Yapas en cada hito
      </h2>

      <div className="space-y-6">
        {yapas.map((item, i) => (
          <div
            key={i}
            className={`
              rounded-xl p-6 border transition-all duration-300
              ${
                item.final
                  ? "bg-blue-50 border-blue-200 shadow-md"
                  : "bg-white border-gray-200 hover:shadow-md"
              }
            `}
          >
            <h3
              className={`
                text-xl font-semibold mb-3
                ${
                  item.final
                    ? "text-blue-700"
                    : "text-gray-900"
                }
              `}
            >
              {item.final ? "🏁 ETAPA FINAL" : "🎯"} {item.etapa}
            </h3>

            <ul className="space-y-2">
              {item.premios.map((premio, idx) => (
                <li key={idx} className="text-gray-700 flex gap-2">
                  <span>{item.final ? "🏆" : "🎁"}</span>
                  <span>{premio}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}