'use client';

import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  const isDisabled = disabled || pending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`
        w-full py-4 rounded-xl font-semibold
        flex items-center justify-center gap-3
        transition-all duration-300

        ${
          !isDisabled
            ? `
              text-white
              bg-blue-600
              hover:bg-blue-700
              hover:scale-[1.02]
              active:scale-[0.98]
              shadow-md hover:shadow-lg
            `
            : `
              bg-gray-200
              text-gray-400
              cursor-not-allowed
            `
        }
      `}
    >
      {pending ? (
        <>
          <span
            className="
              animate-spin
              rounded-full
              h-5 w-5
              border-2
              border-white
              border-t-transparent
            "
          />
          Redirigiendo a MercadoPago...
        </>
      ) : (
        'Comprar Ticket 🎟️'
      )}
    </button>
  );
};