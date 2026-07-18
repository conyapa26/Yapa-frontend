"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

// Mercado Pago redirige aquí cuando el pago queda pendiente, o cuando el
// usuario cancela manualmente desde la pasarela ("Volver a la tienda"),
// sin importar en qué punto del proceso haya cancelado. En ambos casos
// simplemente devolvemos al usuario al inicio de la web.
function PendienteRedirectContent() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

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
