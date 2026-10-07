import React, { useState } from 'react';
import { Activity, Building2, Ticket, Users, TrendingUp, AlertTriangle, CheckCircle2, RotateCw, Info } from 'lucide-react';
import { useEstadisticasSoporteGlobal } from '../hooks/use-estadisticas-soporte';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush } from 'recharts';

interface Props {
  fechaInicio?: string;
  fechaFin?: string;
}

export const EstadisticasSoporteAvanzadas: React.FC<Props> = ({ fechaInicio, fechaFin }) => {
  const { data: stats, isLoading } = useEstadisticasSoporteGlobal({ fechaInicio, fechaFin });
  const [mostrarTodasEmpresas, setMostrarTodasEmpresas] = useState(false);

  if (isLoading) {
    return <div className="p-6 text-center text-[#737373]">Cargando analíticas avanzadas de soporte...</div>;
  }

  if (!stats) return null;

  return (
    <div className="flex flex-col gap-6 mt-6">
      
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold tracking-tight text-[#262626]">
          Análisis de Avances y Etapas
        </h2>
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F6EFEA] text-[#A65932]">
          Vista Avanzada
        </span>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F6EFEA] flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#A65932]" />
            </div>
            <h3 className="text-sm font-medium text-[#737373]">Total Avances</h3>
          </div>
          <p className="text-2xl font-bold text-[#262626]">{stats.resumen.totalAvances}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E6F2ED] flex items-center justify-center">
              <Ticket className="w-4 h-4 text-[#2D7A5D]" />
            </div>
            <h3 className="text-sm font-medium text-[#737373]">Total Tickets</h3>
          </div>
          <p className="text-2xl font-bold text-[#262626]">{stats.resumen.totalTickets}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FDF4E6] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#A06A22]" />
            </div>
            <h3 className="text-sm font-medium text-[#737373]">Empresas Involucradas</h3>
          </div>
          <p className="text-2xl font-bold text-[#262626]">{stats.resumen.totalEmpresas}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F6EFEA] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#A65932]" />
            </div>
            <h3 className="text-sm font-medium text-[#737373] flex items-center gap-1.5 relative group cursor-help">
              Promedio Avances/Ticket
              <Info className="w-3.5 h-3.5 text-[#A65932]" />
              <div className="absolute z-10 w-72 p-3 text-xs bg-white border border-[#EAEAEA] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all right-0 top-full mt-2 font-normal text-[#737373] text-left">
                <p className="font-semibold text-[#262626] mb-1">¿Qué significa esto?</p>
                <p>Es la cantidad de intervenciones promedio que requiere un ticket para ser gestionado.</p>
                <p className="mt-1"><i>Ejemplo:</i> Si una empresa generó <b>25 peticiones (tickets)</b>, y el equipo de soporte registró <b>82 interacciones</b> para resolverlas, el cálculo es 82 / 25 = <b>3.28</b>.</p>
                <p className="mt-1">Esto nos dice, de forma operativa, que cada caso reportado por esta empresa requiere en promedio 3.28 pasos o intervenciones.</p>
              </div>
            </h3>
          </div>
          <p className="text-2xl font-bold text-[#262626]">{stats.resumen.promedioAvancesPorTicket.toFixed(2)}</p>
        </div>
      </div>

      {/* Indicadores Especiales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FBEAE9] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#B33A3A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#737373]">Escalamientos</p>
              <p className="text-xs text-[#737373] mt-0.5">Enkube: {stats.escalamientos.enkube} · Geovanny: {stats.escalamientos.geovanny}</p>
            </div>
          </div>
          <span className="text-xl font-bold text-[#262626]">{stats.escalamientos.total}</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FDF4E6] flex items-center justify-center">
              <RotateCw className="w-5 h-5 text-[#A06A22]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#737373]">Reasignaciones</p>
              <p className="text-xs text-[#737373] mt-0.5">{stats.reasignaciones.ticketsAfectados} tickets</p>
            </div>
          </div>
          <span className="text-xl font-bold text-[#262626]">{stats.reasignaciones.totalAvances}</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E6F2ED] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#2D7A5D]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#737373]">Cierres</p>
              <p className="text-xs text-[#737373] mt-0.5">{stats.cierres.ticketsAfectados} tickets</p>
            </div>
          </div>
          <span className="text-xl font-bold text-[#262626]">{stats.cierres.totalAvances}</span>
        </div>
      </div>

      {/* Gráfica Evolución y Distribución de Etapas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
          <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#A65932]" /> Evolución Temporal
          </h3>
          <div className="h-[250px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.evolucion} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                <XAxis dataKey="fecha" tick={{fontSize: 12, fill: '#737373'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#737373'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="totalAvances" name="Avances" stroke="#A65932" strokeWidth={3} dot={{r: 4}} />
                <Line type="monotone" dataKey="totalTickets" name="Tickets" stroke="#A06A22" strokeWidth={3} dot={{r: 4}} />
                <Line type="monotone" dataKey="cerrados" name="Cerrados" stroke="#2D7A5D" strokeWidth={3} dot={{r: 4}} />
                <Brush dataKey="fecha" height={30} stroke="#A65932" fill="#FAF9F8" tickFormatter={(value) => ''} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
          <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#A65932]" /> Distribución por Etapas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
                <tr>
                  <th className="px-4 py-2 font-medium">Etapa</th>
                  <th className="px-4 py-2 font-medium text-center">Avances</th>
                  <th className="px-4 py-2 font-medium text-center">Tickets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
                {stats.porEtapa.map((e, i) => (
                  <tr key={i} className="hover:bg-[#FAF9F8]">
                    <td className="px-4 py-2 font-medium">{e.etapa}</td>
                    <td className="px-4 py-2 text-center">{e.totalAvances}</td>
                    <td className="px-4 py-2 text-center">{e.totalTickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tablas de Empresas y Responsables */}
      <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4 overflow-x-auto">
        <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#A65932]" /> Detalle por Empresa
        </h3>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
            <tr>
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3 font-medium text-center">Tickets</th>
              <th className="px-4 py-3 font-medium text-center">Avances</th>
              <th className="px-4 py-3 font-medium text-center relative group cursor-help">
                <div className="flex items-center justify-center gap-1.5">
                  Prom. Av/Tkt
                  <Info className="w-3.5 h-3.5 text-[#A65932]" />
                </div>
                <div className="absolute z-10 w-72 p-3 text-xs bg-white border border-[#EAEAEA] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all left-1/2 -translate-x-1/2 top-full mt-2 font-normal text-[#737373] text-left whitespace-normal">
                  <p className="font-semibold text-[#262626] mb-1">¿Qué significa esto?</p>
                  <p>Es la cantidad de intervenciones promedio que requiere un ticket para ser gestionado.</p>
                  <p className="mt-1"><i>Ejemplo:</i> Si una empresa generó <b>25 peticiones (tickets)</b>, y el equipo de soporte registró <b>82 interacciones</b> para resolverlas, el cálculo es 82 / 25 = <b>3.28</b>.</p>
                  <p className="mt-1">Esto nos dice, de forma operativa, que cada caso reportado por esta empresa requiere en promedio 3.28 pasos o intervenciones.</p>
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-center text-[#2D7A5D]">Nuevo</th>
              <th className="px-4 py-3 font-medium text-center text-[#A06A22]">En Rev</th>
              <th className="px-4 py-3 font-medium text-center text-[#B33A3A]">Enkube</th>
              <th className="px-4 py-3 font-medium text-center text-[#B33A3A]">Geovanny</th>
              <th className="px-4 py-3 font-medium text-center">DERCAS</th>
              <th className="px-4 py-3 font-medium text-center text-[#2D7A5D]">Cierre</th>
              <th className="px-4 py-3 font-medium text-center text-[#A06A22]">Reasig</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
            {(mostrarTodasEmpresas ? stats.porEmpresa : stats.porEmpresa.slice(0, 20)).map((emp, i) => (
              <tr key={i} className="hover:bg-[#FAF9F8]">
                <td className="px-4 py-3 font-medium truncate max-w-[200px]" title={emp.empresa}>{emp.empresa}</td>
                <td className="px-4 py-3 text-center">{emp.totalTickets}</td>
                <td className="px-4 py-3 text-center">{emp.totalAvances}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{emp.promedioAvancesPorTicket.toFixed(1)}</span>
                </td>
                <td className="px-4 py-3 text-center text-[#2D7A5D]">{emp.etapas['Nuevo'] || 0}</td>
                <td className="px-4 py-3 text-center text-[#A06A22]">{emp.etapas['En Revisión'] || 0}</td>
                <td className="px-4 py-3 text-center text-[#B33A3A]">{emp.etapas['Escalar a Enkube'] || 0}</td>
                <td className="px-4 py-3 text-center text-[#B33A3A]">{emp.etapas['Escalar a Geovanny'] || 0}</td>
                <td className="px-4 py-3 text-center">{emp.etapas['DERCAS - Documentar'] || 0}</td>
                <td className="px-4 py-3 text-center text-[#2D7A5D]">{emp.etapas['Cerrar caso'] || 0}</td>
                <td className="px-4 py-3 text-center text-[#A06A22]">{emp.etapas['Reasignación'] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {stats.porEmpresa.length > 20 && (
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setMostrarTodasEmpresas(!mostrarTodasEmpresas)}
              className="px-4 py-2 text-sm font-medium text-[#A65932] bg-[#F6EFEA] border border-[#EAEAEA] rounded-md hover:bg-[#A65932] hover:text-white transition-colors"
            >
              {mostrarTodasEmpresas ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
