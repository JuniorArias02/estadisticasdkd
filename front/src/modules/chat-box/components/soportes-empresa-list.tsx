import React, { useState } from 'react';
import { Loader2, AlertCircle, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import type { SoporteEmpresaGestor } from '../types/chat-box.types';

interface SoportesEmpresaListProps {
  soportes: SoporteEmpresaGestor[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const SoportesEmpresaList: React.FC<SoportesEmpresaListProps> = ({ soportes, isLoading, isError }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsToShow = 10;

  const displaySoportes = isExpanded ? soportes : soportes?.slice(0, itemsToShow);
  const hasMore = soportes && soportes.length > itemsToShow;
  
  const totalSoportes = soportes?.reduce((acc, curr) => acc + curr.Cantidad, 0) || 0;

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA' }}>
      <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#262626' }}>
        <Building2 className="w-5 h-5 text-[#A65932]" />
        Soportes por Empresa
      </h2>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-[#A65932] animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 p-12 text-[#B33A3A]">
          <AlertCircle className="w-6 h-6" />
          <p className="text-sm">Hubo un error cargando las métricas de empresas.</p>
        </div>
      ) : !soportes || soportes.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 p-12 text-[#737373]">
          <Building2 className="w-8 h-8 opacity-50" />
          <p className="text-sm">No hay soportes registrados en este rango de fechas.</p>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-5 mt-2">
          {displaySoportes?.map((sop) => {
            const porcentaje = totalSoportes > 0 ? (sop.Cantidad / totalSoportes) * 100 : 0;
            return (
              <div key={sop.EmpresaId} className="flex flex-col gap-1.5 group">
                <div className="flex justify-between items-end text-sm">
                  <span className="font-medium text-[#262626] truncate pr-4 transition-colors group-hover:text-[#A65932]">{sop.Empresa}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-[#A65932]">{sop.Cantidad}</span>
                    <span className="text-xs font-medium text-[#737373] w-12 text-right">{porcentaje.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#F6EFEA] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#A65932] rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${porcentaje}%` }} 
                  />
                </div>
              </div>
            );
          })}
          
          {hasMore && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium py-2.5 rounded-md transition-colors w-full hover:bg-[#F6EFEA]"
              style={{ backgroundColor: '#FAF9F8', color: '#A65932', border: '1px solid #EAEAEA' }}
            >
              {isExpanded ? (
                <><ChevronUp className="w-4 h-4" /> Ver menos</>
              ) : (
                <><ChevronDown className="w-4 h-4" /> Ver todas ({soportes.length})</>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
