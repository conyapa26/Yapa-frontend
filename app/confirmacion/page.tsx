"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "loading" | "success" | "pending" | "error";

function ConfirmacionContent() {
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();
  const called = useRef(false);

  useEffect(() => {
    // Mercado Pago redirige a la back_url agregando estos parámetros
    // al query string (no "token_ws", eso es de Webpay/Transbank).
    const mpStatus = searchParams.get("status"); // approved | pending | rejected | in_process
    const externalReference = searchParams.get("external_reference");

    console.log("MP status:", mpStatus, "external_reference:", externalReference);

    if (!externalReference) {
      setStatus("error");
      setMessage("No se recibió la referencia del pago");
      return;
    }

    const confirmPayment = async () => {
      try {
        // No confiamos solo en el query string (el usuario podría editarlo):
        // consultamos al backend, que a su vez confirma el estado real
        // consultando la API de Mercado Pago vía el webhook.
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/status/${externalReference}`,
          { cache: "no-store" }
        );

        const data = await res.json();

        if (!res.ok || !data.found) {
          setStatus("error");
          setMessage("No pudimos encontrar tu pago. Si el cargo se realizó, contáctanos.");
          return;
        }

        if (data.status === "approved") {
          setStatus("success");
          setMessage("🎉 Pago realizado con éxito. Revisa tu correo para ver tus tickets.");
        } else if (data.status === "rejected") {
          setStatus("error");
          setMessage("El pago fue rechazado. Intenta nuevamente.");
        } else {
          // pending / in_process, o el webhook de MP aún no llega
          setStatus("pending");
          setMessage("Tu pago está siendo procesado. Esto puede tardar unos minutos.");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Error al confirmar el pago");
      }
    };

    if (called.current) return;
    called.current = true;

    confirmPayment();
  }, [searchParams]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {status === "loading" && (
        <>
          <h2>Procesando pago...</h2>
          <p>Por favor espera</p>
        </>
      )}

      {status === "success" && (
        <>
          <h2>✅ Pago exitoso</h2>
          <p>{message}</p>
        </>
      )}

      {status === "pending" && (
        <>
          <h2>⏳ Pago pendiente</h2>
          <p>{message}</p>
        </>
      )}

      {status === "error" && (
        <>
          <h2>❌ Error en el pago</h2>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={<p>Procesando confirmación...</p>}>
      <ConfirmacionContent />
    </Suspense>
  );
}