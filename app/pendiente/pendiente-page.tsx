"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Mercado Pago redirige aquí cuando el pago queda pendiente (ej. pago en
// efectivo, transferencia que tarda en confirmarse), o cuando el usuario
// cancela manualmente desde la pasarela ("Volver a la tienda").
//
// En el caso de cancelación manual, Mercado Pago NO manda datos reales
// (status, external_reference, etc. llegan como "null" en el query
// string) — ahí simplemente devolvemos al usuario al inicio, sin mostrar
// ningún mensaje de error/pendiente que sería confuso.
//
// Si en cambio sí hay un external_reference real, es un pago que
// efectivamente quedó pendiente: en ese caso reusamos la lógica de
// /confirmacion para mostrar el estado real.
function PendienteRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const externalReference = searchParams.get("external_reference");
    const hasRealPaymentData = externalReference && externalReference !== "null";

    if (!hasRealPaymentData) {
      router.replace("/");
      return;
    }

    const query = searchParams.toString();
    router.replace(`/confirmacion${query ? `?${query}` : ""}`);
  }, [router, searchParams]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Redirigiendo...</h2>
      <p>Un momento por favor</p>
    </div>
  );
}

export default function PendientePage() {
  return (
    <Suspense fallback={<p>Redirigiendo...</p>}>
      <PendienteRedirectContent />
    </Suspense>
  );
}
