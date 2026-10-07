import React from 'react';
import type { ResumenHistorial } from '../types/dashboard-gerencial.types';
import { Activity, Briefcase, MessagesSquare } from 'lucide-react';

interface Props {
  resumen: ResumenHistorial;
  empleado: string;
}

export const HistorialResumen: React.FC<Props> = ({ resumen, empleado }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-[#262626]">Historial de Actividades</h1>
        <p className="text-sm text-[#737373] mt-1">Reporte detallado para: <span className="font-semibold text-[#A65932]">{empleado}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F6EFEA] flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#A65932]" />
            </div>
            <h3 className="text-sm font-medium text-[#737373]">Total Actividades</h3>
          </div>
          <p className="text-3xl font-bold text-[#262626]">{resumen.total_actividades}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E6F2ED] flex items-center justify-center">
              <MessagesSquare className="w-4 h-4 text-[#2D7A5D]" />
            </div>
            <h3 className="text-sm font-medium text-[#737373]">Tickets Chatbox</h3>
          </div>
          <p className="text-3xl font-bold text-[#262626]">{resumen.total_tickets}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FDF4E6] flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-[#A06A22]" />
            </div>
            <h3 className="text-sm font-medium text-[#737373]">Tareas Internas</h3>
          </div>
          <p className="text-3xl font-bold text-[#262626]">{resumen.total_tareas}</p>
        </div>
      </div>
    </div>
  );
};
