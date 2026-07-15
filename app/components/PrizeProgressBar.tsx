"use client";

type Prize = {
  tickets: number;
  label: string;
};

type Props = {
  soldTickets: number;
  totalTickets: number;
  prizes: Prize[];
};

export default function PrizeProgressBar({
  soldTickets,
  totalTickets,
  prizes,
}: Props) {
  const progressPercent = Math.min(
    (soldTickets / totalTickets) * 100,
    100
  );

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">

      {/* Barra */}
      <div
        className="
        relative h-4 rounded-full overflow-hidden
        bg-gray-200
        border border-gray-300
      "
      >
        <div
          className="
            h-full
            bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400
            transition-all duration-700
          "
          style={{ width: `${progressPercent}%` }}
        />

        {/* Etapas */}
        {prizes.map((prize) => {
          const left = (prize.tickets / totalTickets) * 100;
          const unlocked = soldTickets >= prize.tickets;

          return (
            <div
              key={prize.tickets}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${left}%` }}
            >
              <div
                className={`
                  w-4 h-4 rounded-full border-2
                  transition-all duration-300
                  ${
                    unlocked
                      ? "bg-blue-500 border-blue-600 shadow-md"
                      : "bg-white border-gray-300"
                  }
                `}
              />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs">
        {prizes.map((prize) => {
          const unlocked = soldTickets >= prize.tickets;
          return (
            <span
              key={prize.tickets}
              className={
                unlocked
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500"
              }
            >
              {prize.label}
            </span>
          );
        })}
      </div>

      {/* Contador */}
      <p className="text-center text-sm text-gray-600">
        🎟️{" "}
        <span className="text-gray-900 font-semibold">
          {soldTickets}
        </span>{" "}
        / {totalTickets} tickets vendidos
      </p>
    </div>
  );
}