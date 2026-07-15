"use client";
import { useRouter } from "next/navigation";

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section className="w-full py-24 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Tu oportunidad empieza hoy
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Compra tu ticket y participa por el terreno <br />
          y todas las{" "}
          <span className="font-semibold text-blue-600">
            Yapas intermedias
          </span>.
        </p>

        <button
          onClick={() => router.push("/comprar")}
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
          Comprar Ticket 🎟️
        </button>

      </div>
    </section>
  );
}