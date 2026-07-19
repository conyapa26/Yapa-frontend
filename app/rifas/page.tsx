"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/nav/Navbar";
import { formatCLP } from "@/src/schema/utils/format";

type Raffle = {
  id: number;
  title: string;
  price: number;
  drawDate: string;
  status: string;
  totalTickets: number;
};

export default function RifasPage() {
  const [raffles, setRaffles] = useState<Raffle[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/raffles`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setError("No pudimos cargar las rifas disponibles.");
          return;
        }

        const data: Raffle[] = await res.json();

        // Solo mostramos las rifas activas al público.
        setRaffles(data.filter((r) => r.status === "active"));
      } catch (err) {
        console.error(err);
        setError("No pudimos cargar las rifas disponibles.");
      }
    };

    fetchRaffles();
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-24 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Rifas disponibles
          </h1>

          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}

          {!error && raffles === null && (
            <p className="text-center text-gray-500">Cargando rifas...</p>
          )}

          {!error && raffles !== null && raffles.length === 0 && (
            <p className="text-center text-gray-500">
              No hay rifas activas en este momento.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {raffles?.map((raffle) => (
              <div
                key={raffle.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {raffle.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    Sorteo:{" "}
                    {new Date(raffle.drawDate).toLocaleDateString("es-CL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCLP(raffle.price)}
                  </p>
                  <p className="text-gray-500 text-sm mb-6">por ticket</p>
                </div>

                <Link
                  href={`/comprar?raffleId=${raffle.id}`}
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  Comprar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
