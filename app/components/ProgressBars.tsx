import PrizeProgressBar from "./PrizeProgressBar"


async function getProgressData() {
  try {


    const res = await fetch(`${process.env.BACKEND_URL}/api/tickets`, {
      cache: "no-store"
    })
    if (!res.ok) {
      return 0
      throw new Error("Error al obtener progreso")
    }

    return res.json();
  } catch {
    return 0
  }
}



export default async function ProgressBar() {
  // 👉 luego esto viene del backend
  const data = await getProgressData();

  // console.log(">>> ", process.env.NEXT_PUBLIC_BACKEND_URL);


  const soldTickets = data;
  const totalTickets = 20000

  const prizes = [
    { tickets: 5000, label: "5 premios de $200.000" },
    { tickets: 10000, label: "4 premios de $500.000" },
    { tickets: 15000, label: "2 premios de $1.000.000" },
    { tickets: 20000, label: "Gran Premio 🏆" },
  ]

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Progreso del Sorteo
      </h1>

      <PrizeProgressBar
        soldTickets={soldTickets}
        totalTickets={totalTickets}
        prizes={prizes}
      />
    </main>
  )
}
