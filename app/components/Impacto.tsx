"use client";

export default function ImpactoSocial() {
  return (
    <div className="bg-gray-50 py-24 px-6">
      <div
        className="max-w-7xl mx-auto
        grid grid-cols-1 lg:grid-cols-2
        gap-12 lg:gap-24
        items-center"
      >

        {/* COLUMNA VIDEO */}
        <div className="flex justify-center">
          <div
            className="relative w-full aspect-video
            rounded-2xl overflow-hidden
            border border-gray-200
            shadow-md"
          >
            <iframe
              src="https://www.youtube.com/embed/5Y5-kb9qVPs?si=9s5olHIqL9Fy4NUx"
              title="Impacto social"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* COLUMNA TEXTO */}
        <div className="max-w-xl text-gray-700">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Participar también genera impacto
          </h2>

          <p className="text-lg mb-4">
            Parte de lo recaudado se destina a la fundación{" "}
            <strong>Tu mundo es mi mundo</strong>, organización que brinda apoyo
            y terapias a bajo costo a niños con autismo. Actualmente más de 200
            familias reciben ayuda gracias a esta iniciativa. Para más
            información{" "}
            <a
              className="text-blue-600 font-semibold hover:underline"
              href="https://tumundoesmimundo.cl/"
              target="_blank"
            >
              haz click aquí
            </a>
          </p>

          <p className="text-lg font-semibold text-blue-600 mb-6">
            Mientras más personas participan, mayor es el impacto positivo que
            logramos juntos.
          </p>

          <p className="text-lg mb-4">
            Además, se entregan{" "}
            <strong>cursos profesionales orientados al área minera</strong>,
            impulsando el desarrollo de habilidades y la empleabilidad.
          </p>

          <div className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            “Estas oportunidades cambian vidas. La capacitación abre puertas
            reales al trabajo y al desarrollo personal.”
          </div>
        </div>

      </div>
    </div>
  );
}