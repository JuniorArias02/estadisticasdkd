import React from 'react';

export const LoginFooter: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-6 mt-12 text-center text-xs text-[#A8A29E]">
      <p>
        ¿ha presentado algun error?{' '}
        <a href="#" className="font-bold text-[#C05628] hover:underline">
          Contacta el administrador
        </a>
      </p>

      <div className="flex items-center gap-4 text-[11px] text-[#A8A29E]/80">
        <span>&copy; {new Date().getFullYear()} DKD - ESTADISTICAS</span>
      </div>
    </div>
  );
};
