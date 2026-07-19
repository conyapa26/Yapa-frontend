"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TicketForm } from "../components/TicketForm";

type Raffle = {
  id: number;
  title: string;
  price: number;
  drawDate: string;
  status: string;
  totalTickets: number;
};

function BuyTicketContent() {
  const searchParams = useSearchParams();
  const raffleIdParam = searchParams.get("raffleId");
  const raffleId = raffleIdParam ? Number(raffleIdParam) : 1;

  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRaffle = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/raffles/${raffleId}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setError("No pudimos encontrar esta rifa.");
          return;
        }

        const data: Raffle = await res.json();
        setRaffle(data);
      } catch (err) {
        console.error(err);
        setError("No pudimos encontrar esta rifa.");
      }
    };

    fetchRaffle();
  }, [raffleId]);

  if (error) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <p>{error}</p>
      </div>
    );
  }

  return <TicketForm raffleId={raffleId} />;
}

export default function BuyTicketPage() {
  return (
    <Suspense fallback={<p style={{ padding: "3rem", textAlign: "center" }}>Cargando...</p>}>
      <BuyTicketContent />
    </Suspense>
  );
}
