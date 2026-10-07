import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, BarChart2, PieChart, Activity, Clock, CheckCircle2, AlertCircle, Building2, Users } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

import {
  useEstadisticasResumen,
  useEstadisticasCliente,
  useEstadisticasResponsable,
  useEstadisticasModulo,
  useEstadisticasCategoria,
  useEstadisticasPrioridad,
  useEstadisticasTendencia
} from '../hooks/use-estadisticas-chatbox';
import { EstadisticasSoporteAvanzadas } from '../components/estadisticas-soporte-avanzadas';

const COLORS = ['#A65932', '#2D7A5D', '#A06A22', '#B33A3A', '#404040', '#737373', '#D4A373'];

export const ChatboxReportesPage: React.FC = () => {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: '',
    estado: '',
    tipo: '',
    tieneAvance: '',
    nombreUsr: '',
    proyecto: '',
    telefono: '',
    prioridad: '',
    ticket: '',
  });

  const [filtrosAplicados, setFiltrosAplicados] = useState({ ...filtros });
  const [agruparPor, setAgruparPor] = useState<'dia' | 'semana' | 'mes'>('mes');

  // Hooks
  const { data: resumen, isLoading: loadResumen } = useEstadisticasResumen(filtrosAplicados);
  const { data: porCliente } = useEstadisticasCliente(filtrosAplicados);
  const { data: porResponsable } = useEstadisticasResponsable(filtrosAplicados);
  const { data: porPrioridad } = useEstadisticasPrioridad(filtrosAplicados);
  const { data: porModulo } = useEstadisticasModulo(filtrosAplicados);
  const { data: porCategoria } = useEstadisticasCategoria(filtrosAplicados);
  const { data: tendencia } = useEstadisticasTendencia(filtrosAplicados, agruparPor);

  const handleFiltrar = (e: React.FormEvent) => {
    e.preventDefault();
    setFiltrosAplicados(filtros);
  };

  const clearFiltros = () => {
    const empty = {
      fechaInicio: '', fechaFin: '', estado: '', tipo: '', tieneAvance: '',
      nombreUsr: '', proyecto: '', telefono: '', prioridad: '', ticket: ''
    };
    setFiltros(empty);
    setFiltrosAplicados(empty);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto p-4 md:p-6" style={{ backgroundColor: '#FAF9F8' }}>
      
      {/* Header Compacto */}
      <div className="flex flex-col gap-2 shrink-0 mb-6">
        <button 
          onClick={() => navigate('/chat-box')}
          className="flex items-center gap-1.5 text-sm font-medium w-fit transition-colors hover:opacity-80 mb-2"
          style={{ color: '#A65932' }}
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Chat Box
        </button>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#262626' }}>
          Dashboard de Estadísticas
        </h1>
        <p className="text-sm" style={{ color: '#737373' }}>
          Análisis en tiempo real del rendimiento de soporte y gestión de peticiones.
        </p>
      </div>

      {/* Filtros */}
      <form onSubmit={handleFiltrar} className="p-6 mb-6 flex flex-wrap gap-4 items-end" style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px' }}>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Fecha Inicio</label>
          <input type="date" value={filtros.fechaInicio} onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-[#EAEAEA] focus:border-[#A65932]" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Fecha Fin</label>
          <input type="date" value={filtros.fechaFin} onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-[#EAEAEA] focus:border-[#A65932]" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Estado</label>
          <select value={filtros.estado} onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none bg-white transition-colors border-[#EAEAEA] focus:border-[#A65932]">
            <option value="">Todos</option>
            <option value="ABIERTA">Abierta</option>
            <option value="C">Cerrada</option>
            <option value="PE">Pendiente</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Proyecto</label>
          <input type="text" placeholder="Ej. Software Kubapp" value={filtros.proyecto} onChange={(e) => setFiltros({ ...filtros, proyecto: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-[#EAEAEA] focus:border-[#A65932]" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Prioridad</label>
          <select value={filtros.prioridad} onChange={(e) => setFiltros({ ...filtros, prioridad: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm outline-none bg-white transition-colors border-[#EAEAEA] focus:border-[#A65932]">
            <option value="">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div className="flex gap-2 min-w-[150px] w-full md:w-auto mt-2 md:mt-0">
          <button type="button" onClick={clearFiltros} className="flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors bg-[#F6EFEA] text-[#A65932] hover:bg-[#EAEAEA]">
            Limpiar
          </button>
          <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors bg-[#A65932] text-white hover:bg-[#944D2A]">
            <Filter className="w-4 h-4" /> Filtrar
          </button>
        </div>
      </form>

      {/* Main Grid */}
      <div className="flex flex-col gap-6">
        
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] flex flex-col gap-4 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F6EFEA] flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-[#A65932]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Total Peticiones</h3>
            </div>
            <p className="text-3xl font-bold text-[#262626]">
              {loadResumen ? '...' : resumen?.total || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] flex flex-col gap-4 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E6F2ED] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#2D7A5D]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Cerradas (Éxito)</h3>
            </div>
            <p className="text-3xl font-bold text-[#262626]">
              {loadResumen ? '...' : resumen?.cerradas || 0}
              <span className="text-sm font-normal text-[#737373] ml-2">
                ({loadResumen ? 0 : resumen?.porcentajeCierre || 0}%)
              </span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] flex flex-col gap-4 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FDF4E6] flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#A06A22]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Abiertas</h3>
            </div>
            <p className="text-3xl font-bold text-[#262626]">
              {loadResumen ? '...' : resumen?.abiertas || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] flex flex-col gap-4 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F6EFEA] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#A65932]" />
              </div>
              <h3 className="text-sm font-medium text-[#737373]">Promedio de Resolución</h3>
            </div>
            <p className="text-2xl font-bold text-[#262626]">
              {loadResumen ? '...' : resumen?.tiempoPromedioResolucion || '00:00:00'}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Evolución (Línea) */}
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#A65932]" /> Tendencia de Peticiones
              </h3>
              <select 
                value={agruparPor} 
                onChange={(e) => setAgruparPor(e.target.value as any)}
                className="text-xs px-2 py-1 border border-[#EAEAEA] rounded text-[#737373] outline-none"
              >
                <option value="dia">Por Día</option>
                <option value="semana">Por Semana</option>
                <option value="mes">Por Mes</option>
              </select>
            </div>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tendencia || []} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                  <XAxis dataKey="periodo" tick={{fontSize: 12, fill: '#737373'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 12, fill: '#737373'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="total" name="Total" stroke="#A65932" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="cerradas" name="Cerradas" stroke="#2D7A5D" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Por Prioridad (Pie) */}
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#A65932]" /> Peticiones por Prioridad
            </h3>
            <div className="h-[300px] w-full mt-2 flex items-center justify-center">
              {porPrioridad && porPrioridad.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={porPrioridad} dataKey="total" nameKey="prioridad" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}>
                      {porPrioridad.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={
                          entry.prioridad.toLowerCase() === 'alta' ? '#B33A3A' :
                          entry.prioridad.toLowerCase() === 'media' ? '#A06A22' :
                          entry.prioridad.toLowerCase() === 'baja' ? '#2D7A5D' : COLORS[index % COLORS.length]
                        } />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-[#737373]">No hay datos de prioridad disponibles.</p>
              )}
            </div>
          </div>

          {/* Por Responsable (Bar) */}
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4 lg:col-span-2">
            <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#A65932]" /> Rendimiento por Responsable
            </h3>
            <div className="h-[350px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={porResponsable || []} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                  <XAxis dataKey="responsable" tick={{fontSize: 11, fill: '#737373'}} axisLine={false} tickLine={false} angle={-25} textAnchor="end" height={60} />
                  <YAxis tick={{fontSize: 12, fill: '#737373'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="cerradas" name="Cerradas" stroke="#2D7A5D" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="abiertas" name="Abiertas" stroke="#A06A22" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>

        {/* Tablas de Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          
          {/* Tabla de Clientes */}
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#A65932]" /> Cierre por Cliente / Empresa
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Cliente</th>
                    <th className="px-4 py-3 font-medium text-center">Total</th>
                    <th className="px-4 py-3 font-medium text-center">% Cierre</th>
                    <th className="px-4 py-3 font-medium text-right">Prom. Res.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
                  {porCliente?.slice(0, 10).map((c, i) => (
                    <tr key={i} className="hover:bg-[#FAF9F8]">
                      <td className="px-4 py-3 max-w-[200px] truncate" title={c.cliente}>{c.cliente}</td>
                      <td className="px-4 py-3 text-center">{c.total}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${c.porcentajeCierre >= 90 ? 'bg-[#E6F2ED] text-[#2D7A5D]' : 'bg-[#FDF4E6] text-[#A06A22]'}`}>
                          {c.porcentajeCierre}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">{c.tiempoPromedioResolucion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {porCliente && porCliente.length === 0 && <p className="text-center text-sm text-[#737373] mt-4">No hay datos</p>}
            </div>
          </div>

          {/* Tabla de Responsables */}
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#A65932]" /> Rendimiento por Responsable (Detalle)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Responsable</th>
                    <th className="px-4 py-3 font-medium text-center">Total</th>
                    <th className="px-4 py-3 font-medium text-center">% Cierre</th>
                    <th className="px-4 py-3 font-medium text-right">Prom. Res.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
                  {porResponsable?.map((r, i) => (
                    <tr key={i} className="hover:bg-[#FAF9F8]">
                      <td className="px-4 py-3 font-medium">{r.responsable}</td>
                      <td className="px-4 py-3 text-center">{r.total}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${r.porcentajeCierre >= 90 ? 'bg-[#E6F2ED] text-[#2D7A5D]' : 'bg-[#FDF4E6] text-[#A06A22]'}`}>
                          {r.porcentajeCierre}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">{r.tiempoPromedioResolucion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {porResponsable && porResponsable.length === 0 && <p className="text-center text-sm text-[#737373] mt-4">No hay datos</p>}
            </div>
          </div>

          {/* Tabla de Módulos */}
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#A65932]" /> Cierre por Módulo
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Módulo</th>
                    <th className="px-4 py-3 font-medium text-center">Total</th>
                    <th className="px-4 py-3 font-medium text-center">% Cierre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
                  {porModulo?.slice(0, 8).map((m, i) => (
                    <tr key={i} className="hover:bg-[#FAF9F8]">
                      <td className="px-4 py-3 font-medium">{m.modulo}</td>
                      <td className="px-4 py-3 text-center">{m.total}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${m.porcentajeCierre >= 90 ? 'bg-[#E6F2ED] text-[#2D7A5D]' : 'bg-[#FDF4E6] text-[#A06A22]'}`}>
                          {m.porcentajeCierre}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {porModulo && porModulo.length === 0 && <p className="text-center text-sm text-[#737373] mt-4">No hay datos</p>}
            </div>
          </div>

          {/* Tabla de Categorías */}
          <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <h3 className="text-base font-semibold text-[#262626] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#A65932]" /> Cierre por Categoría
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Categoría</th>
                    <th className="px-4 py-3 font-medium text-center">Total</th>
                    <th className="px-4 py-3 font-medium text-center">% Cierre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
                  {porCategoria?.slice(0, 8).map((c, i) => (
                    <tr key={i} className="hover:bg-[#FAF9F8]">
                      <td className="px-4 py-3 font-medium">{c.categoria}</td>
                      <td className="px-4 py-3 text-center">{c.total}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${c.porcentajeCierre >= 90 ? 'bg-[#E6F2ED] text-[#2D7A5D]' : 'bg-[#FDF4E6] text-[#A06A22]'}`}>
                          {c.porcentajeCierre}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {porCategoria && porCategoria.length === 0 && <p className="text-center text-sm text-[#737373] mt-4">No hay datos</p>}
            </div>
          </div>

        </div>
      </div>

      <EstadisticasSoporteAvanzadas fechaInicio={filtrosAplicados.fechaInicio} fechaFin={filtrosAplicados.fechaFin} />
    </div>
  );
};
