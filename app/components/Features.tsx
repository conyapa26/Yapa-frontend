export default function Features() {
  const data = [
    {
      icon: "📐",
      title: "6.128 m² de terreno",
      desc: "Amplio espacio para tu proyecto"
    },
    {
      icon: "📍",
      title: "Ubicación privilegiada",
      desc: "A solo 20 minutos del centro"
    },
    {
      icon: "🌃",
      title: "Vista nocturna maravillosa y unica",
      desc: "Cielos despejados y paisajes increibles"
    },
    {
      icon: "🌵",
      title: "Entorno natural",
      desc: "Zona tranquila y clima estable"
    },
    {
      icon: "💧",
      title: "Servicios básicos",
      desc: "Factibilidad de agua y electricidad"
    },
    {
      icon: "🚗",
      title: "Acceso rápido",
      desc: "y expedito desde ruta de acceso al Valle del Elqui"
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
        Características
      </h2>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {data.map((f, i) => (
          <div
            key={i}
            className="
              group
              bg-white
              border border-gray-200
              rounded-2xl p-8
              text-center
              transition-all duration-300
              hover:-translate-y-2
              hover:shadow-xl
            "
          >
            <div
              className="
                text-4xl mb-5
                transition-transform duration-300
                group-hover:scale-110
              "
            >
              {f.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {f.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}