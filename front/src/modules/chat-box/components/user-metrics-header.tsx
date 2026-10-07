import React from 'react';
import { Loader2 } from 'lucide-react';
import type { PromedioCierreGestor } from '../types/chat-box.types';

interface UserMetricsHeaderProps {
  userName: string;
  fechaInicio: string;
  setFechaInicio: (val: string) => void;
  fechaFin: string;
  setFechaFin: (val: string) => void;
  tipoSeleccionado: string;
  setTipoSeleccionado: (val: string) => void;
  metrics: Partial<PromedioCierreGestor>;
  cantidadAbiertas: number;
  isLoadingPromedio: boolean;
  isLoadingAbiertas: boolean;
}

export const UserMetricsHeader: React.FC<UserMetricsHeaderProps> = ({
  userName,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  tipoSeleccionado,
  setTipoSeleccionado,
  metrics,
  cantidadAbiertas,
  isLoadingPromedio,
  isLoadingAbiertas
}) => {
  return (
    <>
      {/* Header & Filtros */}
      <div 
        className="p-8 relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6"
        style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #EAEAEA',
          borderRadius: '12px'
        }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: '#262626' }}>
            Métricas de {userName}
          </h1>
          <p className="text-sm max-w-2xl leading-relaxed" style={{ color: '#737373' }}>
            Desempeño y cantidad de casos atendidos por empresa para este gestor.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <select 
            value={tipoSeleccionado}
            onChange={(e) => setTipoSeleccionado(e.target.value)}
            className="px-3 py-2 text-sm bg-white border rounded-md outline-none focus:ring-2"
            style={{ borderColor: '#EAEAEA', color: '#262626', ringColor: 'rgba(166,89,50,0.2)' }}
          >
            <option value="ING">ING</option>
            <option value="RES">RES</option>
          </select>
          <input 
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="px-3 py-2 text-sm bg-white border rounded-md outline-none"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
          />
          <span className="text-[#737373] text-sm">a</span>
          <input 
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="px-3 py-2 text-sm bg-white border rounded-md outline-none"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
          />
        </div>
      </div>
      
      {/* Tarjetas de KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl flex flex-col gap-2 relative overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA' }}>
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#737373' }}>Total de Casos (Rango)</span>
          <span className="text-3xl font-bold" style={{ color: '#262626' }}>
            {isLoadingPromedio ? <Loader2 className="w-6 h-6 animate-spin mt-1" /> : (metrics.TotalCasos || 0)}
          </span>
        </div>
        <div className="p-6 rounded-xl flex flex-col gap-2" style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA' }}>
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#737373' }}>Casos Abiertos Actuales</span>
          <span className="text-3xl font-bold" style={{ color: '#2D7A5D' }}>
            {isLoadingAbiertas ? <Loader2 className="w-6 h-6 animate-spin mt-1 text-[#2D7A5D]" /> : cantidadAbiertas}
          </span>
        </div>
        <div className="p-6 rounded-xl flex flex-col gap-2" style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA' }}>
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#737373' }}>Tiempo Prom. Cierre</span>
          <span className="text-3xl font-bold flex items-end gap-1" style={{ color: '#A65932' }}>
            {isLoadingPromedio ? (
              <Loader2 className="w-6 h-6 animate-spin mt-1 text-[#A65932]" />
            ) : (
              <>
                {metrics.PromedioMinutosCierre ? parseFloat(metrics.PromedioMinutosCierre).toFixed(1) : 0} 
                <span className="text-sm font-medium mb-1">min</span>
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
};
