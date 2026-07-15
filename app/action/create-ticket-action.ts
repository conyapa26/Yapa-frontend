"use server";
import { RegisterSchema } from "@/src/schema";

export type TicketFormState = {
  errors: string[];
  success: string;
  url?: string;
};

export async function createTicket(
  prevState: TicketFormState,
  formData: FormData
): Promise<TicketFormState> {

  // 🔹 Validar usuario con Zod
  const parsedUser = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    rut: formData.get('rut'),
    address: formData.get('address'),
  });

  // console.log(parsedUser)

  if (!parsedUser.success) {
    return {
      errors: parsedUser.error.issues.map(issue => issue.message),
      success: '',
    };
  }

  // 🔹 Validar tickets
  const tickets = Number(formData.get('tickets'));
  if (isNaN(tickets) || tickets < 1) {
    return {
      errors: ['Cantidad de tickets inválida'],
      success: '',
    };
  }

  // 🔹 Validar términos
  const terms = formData.get('terms') === 'on';
  if (!terms) {
    return {
      errors: ['Debes aceptar los términos y condiciones'],
      success: '',
    };
  }

  // 🔹 Payload EXACTO que espera el backend
  const payload = {
    user: parsedUser.data, // 👈 SOLO los datos
    raffleId: 1,
    tickets,
  };
  console.log(payload)
  // 🔹 Request al backend
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        errors: [errorData.message ?? 'Error al crear el pago'],
        success: '',
      };
    }

    const data = await res.json();

    console.log(data)

    return {
      errors: [],
      success: '🎉 Pago creado correctamente',
      url: data.url,
    };

  } catch (error) {

    return {
      errors: ['No se pudo conectar con el servidor: ' + error],
      success: '',
    };
  }
}