"use client";
import Link from "next/link";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-5 justify-center mt-6 mb-12">

      {/* Botón primario */}
      <Link href="/comprar">
        <button
          className="
            px-10 py-4 rounded-full
            text-lg font-semibold text-white
            bg-blue-600
            transition-all duration-300
            hover:bg-blue-700
            hover:scale-105
            shadow-md hover:shadow-lg
          "
        >
          🚀 Comprar mi ticket ahora
        </button>
      </Link>

      {/* Botón secundario */}
      <Link href="/bases-concurso.pdf" target="_blank">
        <button
          className="
            px-10 py-4 rounded-full
            text-lg font-semibold
            text-gray-700
            bg-white
            border border-gray-300
            transition-all duration-300
            hover:bg-gray-100
            hover:scale-105
          "
        >
          📄 Ver bases del concurso
        </button>
      </Link>

    </div>
  );
}