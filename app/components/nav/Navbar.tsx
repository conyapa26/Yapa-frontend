"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Inicio", href: "/#hero" },
    { name: "Premios", href: "/#premios" },
    { name: "La Parcela", href: "/#caracteristicas" },
    { name: "Galería", href: "/#galeria" },
    { name: "Cómo Funciona", href: "/#comofunciona" },
    { name: "Impacto Social", href: "/#impacto" },
    { name: "Preguntas Frecuentes", href: "/#faq" },
    { name: "Comprar", href: "/comprar", cta: true },
  ];

  return (
    <nav
      className="
      fixed top-0 left-0 w-full z-50
      bg-white/90
      backdrop-blur
      border-b border-gray-200
    "
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-h-20">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Con Yapa"
            width={200}
            height={200}
          />
        </div>

        {/* LINKS DESKTOP */}
        <ul className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={
                  link.cta
                    ? `
                      px-5 py-2 rounded-xl
                      bg-blue-600
                      text-white font-semibold
                      transition-all duration-300
                      hover:bg-blue-700
                      hover:scale-105
                      shadow-md hover:shadow-lg
                    `
                    : `
                      text-gray-700
                      hover:text-blue-600
                      transition
                    `
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* BOTÓN HAMBURGUESA */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div
          className="
          md:hidden
          bg-white
          border-t border-gray-200
        "
        >
          <ul className="flex flex-col text-center py-6 gap-6">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  onClick={() => setOpen(false)}
                  href={link.href}
                  className={
                    link.cta
                      ? `
                        inline-block
                        px-6 py-3 rounded-xl
                        bg-blue-600
                        text-white font-semibold
                        shadow-md
                      `
                      : `
                        text-gray-700
                        text-lg
                        hover:text-blue-600
                        transition
                      `
                  }
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}