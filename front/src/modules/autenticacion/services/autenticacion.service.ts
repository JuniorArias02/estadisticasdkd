import { clienteApi } from '@/lib/api';
import type { CredencialesLogin, RespuestaAutenticacion } from '../types/autenticacion.types';

export const iniciarSesion = async (
  credenciales: CredencialesLogin
): Promise<RespuestaAutenticacion> => {
  const respuesta = await clienteApi.post<RespuestaAutenticacion>(
    '/auth/login',
    credenciales
  );
  return respuesta.data;
};
