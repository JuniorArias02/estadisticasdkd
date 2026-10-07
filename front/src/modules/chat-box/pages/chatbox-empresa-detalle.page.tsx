import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmpresaDetalle } from '../hooks/use-empresas';
import { 
  ArrowLeft, Building2, Calendar, Loader2, AlertCircle, 
  Ticket, Clock, Activity, CheckCircle, Flame, Target
} from 'lucide-react';

export const ChatboxEmpresaDetallePage: React.FC = () => {
  const { nombreEmpresa } = useParams<{ nombreEmpresa: string }>();
  const navigate = useNavigate();

  // Filtros simples por ahora, se pueden mejorar con un date picker real
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: ''
  });

  const { data: detalle, isLoading, isError } = useEmpresaDetalle(nombreEmpresa || '', filtros);

  return (
    <div className="flex flex-col gap-6 w-full h-screen overflow-y-auto p-4 md:p-6" style={{ backgroundColor: '#FAF9F8' }}>
      {/* Header */}
      <div className="flex flex-col gap-4 shrink-0">
        <button 
          onClick={() => navigate('/chat-box/empresas')}
          className="flex items-center gap-2 text-sm font-medium w-fit transition-colors hover:text-[#A65932]"
          style={{ color: '#737373' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Directorio
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#F6EFEA] border border-[#A65932]/10">
              <Building2 className="w-8 h-8 text-[#A65932]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A65932] mb-1">
                Detalle de Empresa
              </span>
              <h1 className="text-2xl font-bold text-[#262626] break-words">
                {nombreEmpresa}
              </h1>
            </div>
          </div>
          
          {/* Filtros Básicos */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-[#EAEAEA]">
            <Calendar className="w-4 h-4 text-[#737373] ml-2" />
            <input 
              type="date" 
              value={filtros.fechaInicio}
              onChange={(e) => setFiltros(f => ({ ...f, fechaInicio: e.target.value }))}
              className="text-sm outline-none bg-transparent text-[#262626]"
            />
            <span className="text-[#EAEAEA]">|</span>
            <input 
              type="date" 
              value={filtros.fechaFin}
              onChange={(e) => setFiltros(f => ({ ...f, fechaFin: e.target.value }))}
              className="text-sm outline-none bg-transparent text-[#262626]"
            />
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#A65932]">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-sm font-medium">Analizando métricas de la empresa...</p>
        </div>
      ) : isError ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-[#B33A3A] bg-[#FBEAE9] p-8 rounded-xl border border-[#B33A3A]/20">
          <AlertCircle className="w-10 h-10" />
          <p className="text-base font-medium">Error al cargar los detalles</p>
          <p className="text-sm">Por favor, intenta nuevamente más tarde.</p>
        </div>
      ) : !detalle ? (
        <div className="flex-1 flex items-center justify-center text-[#737373]">
          No hay datos disponibles para esta empresa.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          
          {/* KPIs Principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2 p-5 rounded-xl bg-white border border-[#EAEAEA]">
              <div className="flex items-center gap-2 text-[#737373]">
                <Ticket className="w-4 h-4" />
                <h3 className="text-sm font-semibold">Total Tickets</h3>
              </div>
              <p className="text-3xl font-bold text-[#262626]">{detalle.cantidadesTickets}</p>
            </div>
            
            <div className="flex flex-col gap-2 p-5 rounded-xl bg-white border border-[#EAEAEA]">
              <div className="flex items-center gap-2 text-[#737373]">
                <Clock className="w-4 h-4" />
                <h3 className="text-sm font-semibold">Tiempo Promedio</h3>
              </div>
              <p className="text-2xl font-bold text-[#262626]">{detalle.tiempoPromedioCierre || 'N/A'}</p>
            </div>

            <div className="flex flex-col gap-2 p-5 rounded-xl bg-[#FDF4E6] border border-[#A06A22]/20">
              <div className="flex items-center gap-2 text-[#A06A22]">
                <AlertCircle className="w-4 h-4" />
                <h3 className="text-sm font-semibold">Casos Abiertos</h3>
              </div>
              <p className="text-3xl font-bold text-[#A06A22]">{detalle.casosAbiertos}</p>
            </div>

            <div className="flex flex-col gap-2 p-5 rounded-xl bg-[#F6EFEA] border border-[#A65932]/20">
              <div className="flex items-center gap-2 text-[#A65932]">
                <Activity className="w-4 h-4" />
                <h3 className="text-sm font-semibold">Total Avances</h3>
              </div>
              <p className="text-3xl font-bold text-[#A65932]">{detalle.totalAvances}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Columna Izquierda (Prioridades y Gestores) */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              
              {/* Prioridades */}
              <div className="bg-white rounded-xl border border-[#EAEAEA] p-5">
                <h3 className="text-sm font-semibold text-[#262626] flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-[#A65932]" />
                  Clasificación por Prioridad
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#FBEAE9]">
                    <span className="text-sm font-medium text-[#B33A3A]">Alta</span>
                    <span className="text-base font-bold text-[#B33A3A]">{detalle.prioridades?.alta || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#FDF4E6]">
                    <span className="text-sm font-medium text-[#A06A22]">Media</span>
                    <span className="text-base font-bold text-[#A06A22]">{detalle.prioridades?.media || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#E6F2ED]">
                    <span className="text-sm font-medium text-[#2D7A5D]">Baja</span>
                    <span className="text-base font-bold text-[#2D7A5D]">{detalle.prioridades?.baja || 0}</span>
                  </div>
                </div>
              </div>

              {/* Mejores Gestores */}
              <div className="bg-white rounded-xl border border-[#EAEAEA] p-5">
                <h3 className="text-sm font-semibold text-[#262626] flex items-center gap-2 mb-4">
                  <Flame className="w-4 h-4 text-[#A65932]" />
                  Desempeño de Gestores
                </h3>
                {detalle.gestoresMejorDesempeno?.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {detalle.gestoresMejorDesempeno.map((gestor, i) => (
                      <div key={i} className="flex flex-col gap-2 pb-4 border-b border-[#EAEAEA] last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#262626] text-sm">{gestor.nombre}</span>
                          <span className="text-xs bg-[#E6F2ED] text-[#2D7A5D] px-2 py-1 rounded font-bold">
                            {gestor.cerradas} / {gestor.asignadas} Cerradas
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Promedio resolución: <strong>{gestor.tiempoPromedioResolucion}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#737373] italic">No hay gestores con datos suficientes.</p>
                )}
              </div>
            </div>

            {/* Columna Derecha (Tickets con Avance) */}
            <div className="flex flex-col gap-4 lg:col-span-2 bg-white rounded-xl border border-[#EAEAEA] p-5">
              <h3 className="text-sm font-semibold text-[#262626] flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-[#A65932]" />
                Casos con Avance Reciente
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EAEAEA]">
                      <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">Ticket</th>
                      <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">Estado</th>
                      <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">Responsable</th>
                      <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">Último Avance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalle.ticketsConAvance?.length > 0 ? (
                      detalle.ticketsConAvance.map((ticket, idx) => (
                        <tr key={idx} className="border-b border-[#F5F5F5] hover:bg-[#FAF9F8] transition-colors">
                          <td className="py-3 px-2 text-sm font-semibold text-[#A65932] whitespace-nowrap">
                            {ticket.ticket}
                          </td>
                          <td className="py-3 px-2">
                            <span className="px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide bg-[#FDF4E6] text-[#A06A22]">
                              {ticket.estado}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm font-medium text-[#262626] whitespace-nowrap">
                            {ticket.responsable}
                          </td>
                          <td className="py-3 px-2 text-sm text-[#737373] min-w-[200px]">
                            <p className="line-clamp-2">{ticket.ultimoAvance}</p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-sm text-[#737373]">
                          No se encontraron tickets con avances para esta empresa.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
