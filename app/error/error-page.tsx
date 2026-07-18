"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Mercado Pago redirige aquí cuando el pago falla o el usuario cancela
// desde la pasarela ("Volver a la tienda"). Reusamos toda la lógica de
// /confirmacion (que ya sabe interpretar status y external_reference)
// en vez de duplicarla, así el resultado es siempre consistente.
function ErrorRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
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

export default function ErrorPage() {
  return (
    <Suspense fallback={<p>Redirigiendo...</p>}>
      <ErrorRedirectContent />
    </Suspense>
  );
}
