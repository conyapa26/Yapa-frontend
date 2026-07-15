import { z } from 'zod'
import { validateRut } from './utils/format';


export const RutSchema = z
  .string()
  .refine((rut) => validateRut(rut), {
    message: "RUT no válido",
  });

export const RegisterSchema = z.object({
    email: z.string()
        .min(1, { message: 'El email es obligatorio' })
        .email({ message: 'Email no válido' }),
    name: z.string()
        .min(1, { message: 'El nombre es obligatorio' }),
    phone: z.string()
        .min(8, { message: 'Numero de telefono no válido' }),
    rut: RutSchema,
    address: z.string()
        .min(5, { message: 'La dirección es obligatoria' }),


});