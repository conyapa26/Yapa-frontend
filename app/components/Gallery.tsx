"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const images = [
    "/gallery/1.jpeg",
    "/gallery/2.jpeg",
    "/gallery/3.jpeg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/7.jpg",
    "/gallery/8.jpg",
    "/gallery/9.jpg",
    "/gallery/10.jpg",
    "/gallery/11.jpg",
    "/gallery/12.jpg",
    "/gallery/13.jpg",
    "/gallery/14.jpg",
    "/gallery/15.jpg",
    "/gallery/16.jpg",
    "/gallery/17.jpg",

  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      id="galeria"
      className="py-24 bg-gray-50"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Galería de la Parcela
      </h2>

      <div className="relative max-w-5xl mx-auto px-6">

        {/* IMAGEN */}
        <div
          className="
            overflow-hidden
            rounded-3xl
            border border-gray-200
            bg-white
            shadow-md
          "
        >
          <img
            src={images[index]}
            alt="Parcela en La Serena"
            className="
              w-full h-[420px] md:h-[480px]
              object-cover
              transition-all duration-700 ease-in-out
            "
          />
        </div>

        {/* FLECHA IZQUIERDA */}
        <button
          onClick={prev}
          className="
            absolute top-1/2 left-6 -translate-y-1/2
            p-3 rounded-full
            bg-white
            border border-gray-300
            text-gray-700
            transition
            hover:scale-110
            hover:shadow-lg
          "
        >
          <ChevronLeft size={26} />
        </button>

        {/* FLECHA DERECHA */}
        <button
          onClick={next}
          className="
            absolute top-1/2 right-6 -translate-y-1/2
            p-3 rounded-full
            bg-white
            border border-gray-300
            text-gray-700
            transition
            hover:scale-110
            hover:shadow-lg
          "
        >
          <ChevronRight size={26} />
        </button>

        {/* INDICADORES */}
        <div className="flex justify-center mt-6 gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                w-3.5 h-3.5 rounded-full transition-all
                ${
                  index === i
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}