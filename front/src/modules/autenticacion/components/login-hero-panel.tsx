import React from 'react';
import { LayoutGrid } from 'lucide-react';

export const LoginHeroPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#2D2622] text-[#F3EFEA] p-12 lg:p-16 relative overflow-hidden select-none">
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full border-[32px] border-white/[0.03] pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-[400px] h-[400px] rounded-full border-[24px] border-white/[0.04] pointer-events-none" />

      {/* Brand Header */}
      <div className="flex items-center gap-3 z-10">
        <div className="h-10 w-10 rounded-xl bg-[#C05628] flex items-center justify-center text-white shadow-md">
          <LayoutGrid className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-white leading-none">
            DKD INGENIERÍAS S.A.S
          </span>
        </div>
      </div>

      {/* Hero Body Content */}
      <div className="my-auto py-12 flex flex-col gap-6 z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#C05628]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C05628]" />
          estadisticas dkd
        </div>

        <h1 className="text-4xl lg:text-5xl font-semibold text-white leading-[1.15] tracking-tight">
          Todo los datos,{' '}
          <span className="text-[#C05628] font-normal italic">en un solo lugar.</span>
        </h1>

        <p className="text-sm lg:text-base text-[#A89D95] leading-relaxed max-w-lg font-light">
          Indicadores, trazabilidad.
        </p>

        {/* Metric Stats */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 mt-2">
          <div className="flex flex-col">
            <span className="text-2xl lg:text-3xl font-bold text-white">0</span>
            <span className="text-xs text-[#A89D95] mt-1 font-light">áreas conectadas</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl lg:text-3xl font-bold text-white">0</span>
            <span className="text-xs text-[#A89D95] mt-1 font-light">solicitudes analizadas</span>
          </div>
        </div>
      </div>

      {/* Quote Footer */}
      <div className="z-10 text-xs text-[#A89D95] font-light leading-relaxed max-w-md border-l-2 border-[#C05628] pl-4 italic">
        ““
      </div>
    </div>
  );
};
