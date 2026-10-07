import React from 'react';

export const LoginHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 text-left mb-6">
      <h2 className="text-3xl font-semibold text-[#1C1917] tracking-tight">
        Bienvenido de nuevo
      </h2>
      <p className="text-xs text-[#78716C] font-normal">
        Ingresa tus credenciales para continuar al panel.
      </p>
    </div>
  );
};
