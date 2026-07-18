"use client";

import { useFormState } from "react-dom";
import { createTicket } from "../action/create-ticket-action";
import { useEffect, useState } from "react";
import { SubmitButton } from "./ui/FormButton";
import { formatCLP } from "@/src/schema/utils/format";
import Navbar from "./nav/Navbar";

export const TicketForm = () => {
  const [tickets, setTickets] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [rut, setRut] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");

  const fullAddress = apartment.trim()
    ? `${address}, Depto ${apartment.trim()}`
    : address;

  const handlePhoneChange = (e: { target: { value: string } }) => {
    // Solo dígitos, máximo 8 (número de celular chileno sin el +56 9)
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 8);
    setPhoneDigits(digitsOnly);
  };

  const formatRut = (value: string) => {
    // Deja solo números y K/k (el dígito verificador puede ser K)
    const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();

    if (clean.length === 0) return "";

    // Separa el cuerpo del dígito verificador (último caracter)
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);

    if (body.length === 0) return dv;

    return `${body}-${dv}`;
  };

  const handleRutChange = (e: { target: { value: string } }) => {
    setRut(formatRut(e.target.value));
  };

  const [state, formAction] = useFormState(createTicket, {
    errors: [],
    success: "",
    url: ""
  });

  useEffect(() => {
    console.log("STATE:", state);

    if (state?.url) {
      console.log("REDIRECTING TO:", state.url);
      window.location.href = state.url;
    }
  }, [state]);

  return (
    <>
      <Navbar />

      <section className="py-24 bg-gray-50">
        <div
          className="
            max-w-xl mx-auto
            bg-white
            p-8 md:p-10
            rounded-3xl
            border border-gray-200
            shadow-md
          "
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Compra tu Ticket
          </h2>

          <form action={formAction} className="space-y-6">

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Diego Hernández Mella"
                className="
                  w-full p-3 rounded-xl
                  bg-white
                  border border-gray-300
                  text-gray-900
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            {/* Rut */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                R.U.T.
              </label>
              <input
                type="text"
                name="rut"
                required
                value={rut}
                onChange={handleRutChange}
                placeholder="12345678-9"
                maxLength={12}
                className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Av. Siempre Viva 742, Santiago"
                className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Número de Depto (Opcional) */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Número de Depto (Opcional)
              </label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Depto 405"
                className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
              {/* Este es el valor real que se envía al backend, ya con el depto incluido */}
              <input type="hidden" name="address" value={fullAddress} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="diego.hernandez@ejemplo.cl"
                className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Teléfono
              </label>
              <div className="flex items-stretch rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="flex items-center px-3 bg-gray-100 text-gray-600 text-sm font-medium border-r border-gray-300 select-none">
                  +56 9
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  required
                  value={phoneDigits}
                  onChange={handlePhoneChange}
                  placeholder="1234 5678"
                  maxLength={8}
                  className="w-full p-3 text-gray-900 focus:outline-none"
                />
              </div>
              {/* Este es el valor real que se envía al backend, ya con el prefijo completo */}
              <input type="hidden" name="phone" value={`+56 9 ${phoneDigits}`} />
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Cantidad de tickets
              </label>
              <select
                name="tickets"
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} ticket{n > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            {/* Resumen */}
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tickets</span>
                <span>{tickets} × $10.000</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCLP(tickets * 10000)}
                </span>
              </div>
            </div>

            {/* Términos */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="terms"
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 accent-blue-600"
              />
              <div className="text-sm text-gray-600">
                Acepto los{" "}
                <a
                  href="/bases-concurso.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-700"
                >
                  términos y condiciones
                </a>
                <p className="text-xs text-gray-400 mt-1">
                  Participas automáticamente en el sorteo una vez confirmado el pago
                </p>
              </div>
            </div>

            {/* Errores */}
            {state.errors.map((error, index) => (
              <p key={index} className="text-red-500 text-sm font-medium">
                {error}
              </p>
            ))}

            <p className="text-xs text-gray-400 text-center">
              Serás redirigido a MercadoPago para completar el pago
            </p>

            {/* Botón */}
            <SubmitButton disabled={!acceptedTerms} />

            <p className="text-xs text-gray-400 text-center">
              Valor del ticket:{" "}
              <strong className="text-gray-900">$10.000 CLP</strong>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};