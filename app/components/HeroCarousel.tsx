"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
};

const slides: Slide[] = [
  { src: "/Banner3.png" },
  { src: "/Banner4.png" },
];

export default function HeroCarousel() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // Autoplay del carrusel
  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-carousel">
      {/* IMÁGENES */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.src}
          alt={`Banner ${index + 1}`}
          className={`hero-image cursor-pointer ${index === current ? "active" : ""
            }`}
          onClick={() => router.push("/comprar")}
        />
      ))}

      {/* Overlay opcional */}
      {/* <div className="hero-overlay" /> */}

      {/* Flecha izquierda */}
      <button
        className="hero-arrow left"
        onClick={prev}
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Flecha derecha */}
      <button
        className="hero-arrow right"
        onClick={next}
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={i === current ? "active" : ""}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}