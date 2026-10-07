import React from 'react';
import { useAutenticacion } from '../hooks/use-autenticacion';
import { LoginHeroPanel } from '../components/login-hero-panel';
import { LoginHeader } from '../components/login-header';
import { LoginForm } from '../components/login-form';
import { LoginFooter } from '../components/login-footer';

export const LoginPage: React.FC = () => {
  const { cargando, error, ejecutarLogin } = useAutenticacion();

  return (
    <div className="min-h-screen w-full flex bg-white font-sans antialiased selection:bg-[#C05628] selection:text-white">
      {/* Panel Izquierdo: Hero Branding (Oscuro/Terracota) */}
      <LoginHeroPanel />

      {/* Panel Derecho: Formulario y Acceso (Limpio/Blanco) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 overflow-y-auto">
        <div className="max-w-md w-full mx-auto my-auto flex flex-col justify-center py-6">
          <LoginHeader />
          <LoginForm cargando={cargando} error={error} onLogin={ejecutarLogin} />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};
