"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Mercado Pago redirige aquí cuando el pago queda pendiente (ej. pago en
// efectivo, transferencia que tarda en confirmarse). Reusamos toda la
// lógica de /confirmacion en vez de duplicarla, así el resultado es
// siempre consistente sin importar por cuál back_url llegue el usuario.
function PendienteRedirectContent() {
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

export default function PendientePage() {
  return (
    <Suspense fallback={<p>Redirigiendo...</p>}>
      <PendienteRedirectContent />
    </Suspense>
  );
}
