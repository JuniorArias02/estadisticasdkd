import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { decodificarToken } from '@/modules/autenticacion/utils/token.utils';
import type { PayloadJwt } from '@/modules/autenticacion/types/autenticacion.types';

interface AutenticacionContextType {
  usuario: PayloadJwt | null;
  estaAutenticado: boolean;
  cargando: boolean;
  actualizarSesion: (token: string, refreshToken: string) => void;
  cerrarSesion: () => void;
}

const AutenticacionContext = createContext<AutenticacionContextType | undefined>(undefined);

export const AutenticacionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<PayloadJwt | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    validarSesion();
  }, []);

  const validarSesion = () => {
    const token = localStorage.getItem('token_autenticacion');
    if (!token) {
      setUsuario(null);
      setCargando(false);
      return;
    }

    const payload = decodificarToken(token);
    const tiempoActual = Math.floor(Date.now() / 1000);
    
    if (payload && payload.exp && payload.exp >= tiempoActual) {
      setUsuario(payload);
    } else {
      cerrarSesion(); // Si expiró, cerramos sesión
    }
    setCargando(false);
  };

  const actualizarSesion = (token: string, refreshToken: string) => {
    const payload = decodificarToken(token);
    if (payload) {
      localStorage.setItem('token_autenticacion', token);
      localStorage.setItem('refresh_token_autenticacion', refreshToken);
      localStorage.setItem('usuario_autenticado', JSON.stringify(payload));
      setUsuario(payload);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token_autenticacion');
    localStorage.removeItem('refresh_token_autenticacion');
    localStorage.removeItem('usuario_autenticado');
    setUsuario(null);
  };

  return (
    <AutenticacionContext.Provider value={{
      usuario,
      estaAutenticado: !!usuario,
      cargando,
      actualizarSesion,
      cerrarSesion
    }}>
      {children}
    </AutenticacionContext.Provider>
  );
};

export const useAutenticacionStore = () => {
  const context = useContext(AutenticacionContext);
  if (context === undefined) {
    throw new Error('useAutenticacionStore debe ser usado dentro de un AutenticacionProvider');
  }
  return context;
};
