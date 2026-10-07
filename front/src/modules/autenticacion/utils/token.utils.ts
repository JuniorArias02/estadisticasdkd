import { jwtDecode } from 'jwt-decode';
import type { PayloadJwt } from '../types/autenticacion.types';

export const decodificarToken = (token: string): PayloadJwt | null => {
  try {
    return jwtDecode<PayloadJwt>(token);
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
    return null;
  }
};

export const obtenerUsuarioAutenticado = (): PayloadJwt | null => {
  const token = localStorage.getItem('token_autenticacion');
  if (!token) return null;
  
  const payload = decodificarToken(token);
  if (!payload) return null;

  // Verificar si el token expiró (exp viene en segundos, Date.now() es en milisegundos)
  const tiempoActual = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < tiempoActual) {
    localStorage.removeItem('token_autenticacion');
    localStorage.removeItem('refresh_token_autenticacion');
    localStorage.removeItem('usuario_autenticado');
    return null;
  }

  return payload;
};
