import React from 'react';
import type { MetricasUsuario } from '../types/gestion-tareas.types';

interface Props {
  usuario: MetricasUsuario;
  onVerMas: (usuarioId: number) => void;
}

export const UserMetricsCard: React.FC<Props> = ({ usuario, onVerMas }) => {
  return (
    <div 
      className="p-6 flex flex-col gap-4"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: '12px',
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: '#262626' }}>{usuario.name}</h3>
          <p className="text-sm" style={{ color: '#737373' }}>{usuario.role}</p>
        </div>
        <div 
          className="px-2 py-1 rounded text-xs font-medium"
          style={{ backgroundColor: '#F6EFEA', color: '#A65932' }}
        >
          {Number(usuario.progreso_promedio || 0).toFixed(0)}% Progreso
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-2">
        <div className="flex flex-col">
          <span style={{ color: '#737373' }}>Asignadas</span>
          <span className="font-semibold" style={{ color: '#262626' }}>{usuario.total_asignadas}</span>
        </div>
        <div className="flex flex-col">
          <span style={{ color: '#737373' }}>Finalizadas</span>
          <span className="font-semibold" style={{ color: '#262626' }}>{usuario.finalizadas}</span>
        </div>
        <div className="flex flex-col">
          <span style={{ color: '#737373' }}>Pendientes</span>
          <span className="font-semibold" style={{ color: '#262626' }}>{usuario.pendientes}</span>
        </div>
        <div className="flex flex-col">
          <span style={{ color: '#737373' }}>En proceso</span>
          <span className="font-semibold" style={{ color: '#262626' }}>{usuario.en_proceso}</span>
        </div>
        <div className="flex flex-col">
          <span style={{ color: '#737373' }}>Retrasadas</span>
          <span className="font-semibold" style={{ color: '#B33A3A' }}>{usuario.retrasadas}</span>
        </div>
      </div>

      <button
        onClick={() => onVerMas(usuario.user_id)}
        className="mt-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors w-full"
        style={{ backgroundColor: '#A65932', color: '#FFFFFF' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8a4827'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A65932'}
      >
        Ver más
      </button>
    </div>
  );
};
