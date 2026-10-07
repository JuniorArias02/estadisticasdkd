import { z } from 'zod';

export const esquemaLogin = z.object({
  correo: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingrese un correo electrónico válido'),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type FormularioLoginValues = z.infer<typeof esquemaLogin>;
