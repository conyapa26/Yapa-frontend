export const formatCLP = (value: number) =>
  value.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });


  
export function cleanRut(value: string) {
  return value.replace(/[^0-9kK]/g, "").toUpperCase();
}

export function formatRut(value: string) {
  const clean = cleanRut(value);

  if (clean.length <= 1) return clean;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  const formattedBody = body
    .split("")
    .reverse()
    .reduce((acc, digit, i) => {
      return digit + (i && i % 3 === 0 ? "." : "") + acc;
    }, "");

  return `${formattedBody}-${dv}`;
}

export function validateRut(rut: string) {
  const clean = cleanRut(rut);

  if (clean.length < 2) return false;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const result = 11 - (sum % 11);

  let expected = "";

  if (result === 11) expected = "0";
  else if (result === 10) expected = "K";
  else expected = result.toString();

  return expected === dv;
}