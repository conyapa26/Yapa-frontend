"use client";


import { cleanRut, formatRut } from "@/src/schema/utils/format";
import { useRef } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RutInput({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = cleanRut(e.target.value);
    const formatted = formatRut(raw);

    onChange(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed =
      /[0-9kK]/.test(e.key) ||
      ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key);

    if (!allowed) {
      e.preventDefault();
    }
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="12.345.678-5"
      className="border rounded p-2 w-full"
    />
  );
}