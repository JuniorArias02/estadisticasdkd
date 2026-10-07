import React from 'react';
import type { ActividadHistorial } from '../types/dashboard-gerencial.types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  actividades: ActividadHistorial[];
}

export const HistorialActividadesTabla: React.FC<Props> = ({ actividades }) => {
  const formatearFecha = (fechaStr: string) => {
    try {
      return format(new Date(fechaStr), "d MMM yyyy, h:mm a", { locale: es });
    } catch {
      return fechaStr;
    }
  };

  const obtenerColorTipo = (tipo: string) => {
    if (tipo === 'Ticket') return 'bg-[#F6EFEA] text-[#A65932] border-[#F6EFEA]';
    return 'bg-[#E6F2ED] text-[#2D7A5D] border-[#E6F2ED]';
  };

  const obtenerColorEstado = (estado: string) => {
    const normalize = estado.toLowerCase();
    if (normalize.includes('cerrad') || normalize.includes('finaliz') || normalize.includes('resuelt')) {
      return 'bg-[#E6F2ED] text-[#2D7A5D]';
    }
    if (normalize.includes('proces') || normalize.includes('seguimient')) {
      return 'bg-[#FDF4E6] text-[#A06A22]';
    }
    if (normalize.includes('pendient') || normalize.includes('abiert')) {
      return 'bg-[#FBEAE9] text-[#B33A3A]';
    }
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl border border-[#EAEAEA] overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#EAEAEA]">
        <h3 className="text-base font-semibold text-[#262626]">Detalle Cronológico</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
            <tr>
              <th className="px-6 py-3 font-medium">Fecha</th>
              <th className="px-6 py-3 font-medium">Tipo / ID</th>
              <th className="px-6 py-3 font-medium">Fuente</th>
              <th className="px-6 py-3 font-medium">Cliente/Proyecto</th>
              <th className="px-6 py-3 font-medium min-w-[250px]">Actividad</th>
              <th className="px-6 py-3 font-medium">Estado</th>
              <th className="px-6 py-3 font-medium text-right">Tiempo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
            {actividades.map((actividad, index) => (
              <tr key={`${actividad.id_origen}-${index}`} className="hover:bg-[#FAF9F8]">
                <td className="px-6 py-4 text-[#737373] text-xs">
                  {formatearFecha(actividad.fecha)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit border ${obtenerColorTipo(actividad.tipo)}`}>
                      {actividad.tipo}
                    </span>
                    <span className="text-xs text-[#737373] font-mono">{actividad.id_origen}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{actividad.fuente}</td>
                <td className="px-6 py-4 font-medium">{actividad.cliente}</td>
                <td className="px-6 py-4">
                  <p className="truncate max-w-[300px]" title={actividad.actividad}>
                    {actividad.actividad}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${obtenerColorEstado(actividad.estado)}`}>
                    {actividad.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-[#737373]">
                  {actividad.tiempo_dedicado}
                </td>
              </tr>
            ))}
            {actividades.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-[#737373]">
                  No se encontraron actividades registradas para este empleado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
