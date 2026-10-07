import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/autenticacion.service';
import type { CredencialesLogin } from '../types/autenticacion.types';
import { useAutenticacionStore } from '@/store/autenticacion.store';

export const useAutenticacion = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { actualizarSesion } = useAutenticacionStore();

  const ejecutarLogin = async (credenciales: CredencialesLogin) => {
    try {
      setCargando(true);
      setError(null);

      const respuesta = await iniciarSesion(credenciales);
      const token = respuesta.data?.access_token;
      const refreshToken = respuesta.data?.refresh_token;

      if (token && refreshToken) {
        // Actualizar el estado global y localStorage
        actualizarSesion(token, refreshToken);
        navigate('/inicio');
      } else {
        setError('No se pudo obtener el token de autenticación.');
      }
    } catch (err: any) {
      const mensajeError =
        err.response?.data?.message ||
        err.response?.data?.mensaje ||
        'Error al iniciar sesión. Compruebe sus credenciales.';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    error,
    ejecutarLogin,
  };
};
