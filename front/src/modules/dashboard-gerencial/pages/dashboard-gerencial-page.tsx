import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  useDashboardManager, 
  useRequerimientosFrecuentes,
  useCargaRealEquipo,
  useDashboardLeader
} from '../hooks/use-dashboard-gerencial';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Activity,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardGerencialPage: React.FC = () => {
  const { data: managerData, isLoading: isLoadingManager } = useDashboardManager();
  const { data: requerimientosData, isLoading: isLoadingReqs } = useRequerimientosFrecuentes();
  const { data: cargaRealData, isLoading: isLoadingCarga } = useCargaRealEquipo(1); // Asumimos teamId 1 (Soporte) por ahora como pide la fase piloto
  const { data: leaderData } = useDashboardLeader(1);

  if (isLoadingManager || isLoadingReqs || isLoadingCarga) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-[#737373]">Cargando Dashboard Gerencial...</p>
      </div>
    );
  }

  const COLORS = ['#2D7A5D', '#A06A22', '#B33A3A', '#A65932', '#737373'];

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#FAF9F8] min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#262626]">Dashboard Gerencial de Sistemas</h1>
          <p className="text-sm text-[#737373] mt-1">Análisis consolidado del rendimiento y carga del equipo</p>
        </div>
      </div>

      {managerData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F6EFEA] flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-[#A65932]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Total Recibidas</h3>
            </div>
            <p className="text-3xl font-bold text-[#262626]">{managerData.total_tareas_recibidas}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E6F2ED] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#2D7A5D]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Completadas</h3>
            </div>
            <p className="text-3xl font-bold text-[#262626]">{managerData.cerradas_exitosamente}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FDF4E6] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#A06A22]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Pendientes</h3>
            </div>
            <p className="text-3xl font-bold text-[#262626]">{managerData.pendientes}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FBEAE9] flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-[#B33A3A]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Vencidas</h3>
            </div>
            <p className="text-3xl font-bold text-[#262626]">{managerData.tareas_vencidas}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Requerimientos Frecuentes */}
        <div className="bg-white p-6 rounded-xl border border-[#EAEAEA]">
          <h3 className="text-base font-semibold text-[#262626] mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#A65932]" /> Frecuencia por Prioridad
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requerimientosData?.map(r => ({ ...r, cantidad: Number(r.cantidad) }))?.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="cantidad"
                  nameKey="priority"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {requerimientosData?.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de Carga Real del Equipo (Cruce) */}
        <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] flex flex-col h-full">
          <h3 className="text-base font-semibold text-[#262626] mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#A65932]" /> Carga Real del Equipo
          </h3>
          <div className="overflow-x-auto overflow-y-auto flex-1 max-h-[300px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA] sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-medium">Miembro</th>
                  <th className="px-4 py-3 font-medium text-center">Chatbox</th>
                  <th className="px-4 py-3 font-medium text-center">Internas</th>
                  <th className="px-4 py-3 font-medium w-1/3">Carga Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
                {cargaRealData?.map((miembro, i) => {
                  // Calcular el porcentaje para la barra visual (relativo al mayor)
                  const maxCarga = Math.max(...(cargaRealData.map(m => m.total_actividades) || [1]));
                  const porcentaje = maxCarga > 0 ? (miembro.total_actividades / maxCarga) * 100 : 0;
                  
                  return (
                    <tr key={i} className="hover:bg-[#FAF9F8]">
                      <td className="px-4 py-3 font-medium">
                        <Link 
                          to={`/dashboard-gerencial/detalle/${encodeURIComponent(miembro.nombre)}`}
                          className="flex items-center gap-2 group cursor-pointer"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#F6EFEA] text-[#A65932] flex items-center justify-center text-xs font-bold group-hover:bg-[#A65932] group-hover:text-white transition-colors">
                            {miembro.nombre.charAt(0)}
                          </div>
                          <span className="truncate max-w-[150px] group-hover:text-[#A65932] transition-colors" title={miembro.nombre}>
                            {miembro.nombre}
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center text-[#737373]">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{miembro.tickets_chatbox}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-[#737373]">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{miembro.tareas_asignadas}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#262626] w-8">{miembro.total_actividades}</span>
                          <div className="w-full bg-[#EAEAEA] rounded-full h-2">
                            <div 
                              className="bg-[#A65932] h-2 rounded-full" 
                              style={{ width: `${porcentaje}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!cargaRealData?.length && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-[#737373]">
                      No hay datos disponibles para mostrar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {leaderData && (
        <div className="bg-white p-6 rounded-xl border border-[#EAEAEA]">
          <h3 className="text-base font-semibold text-[#262626] mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#A65932]" /> Rendimiento por Miembro
          </h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaderData.map(l => ({ ...l, finalizadas: Number(l.finalizadas), pendientes: Number(l.pendientes) }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                <XAxis dataKey="name" tick={{fontSize: 10, fill: '#737373'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#737373'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#F6EFEA'}} />
                <Legend />
                <Bar dataKey="finalizadas" name="Finalizadas" fill="#2D7A5D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pendientes" name="Pendientes" fill="#A06A22" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
