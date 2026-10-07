import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodasPeticiones } from '../hooks/use-todas-peticiones';
import { ArrowLeft, Search, Filter, History } from 'lucide-react';
import { AvancesDrawer } from '../components/avances-drawer';

export const ChatboxRegistrosPeticionesPage: React.FC = () => {
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
    page: 1,
    limit: 50
  });

  const [filtrosAplicados, setFiltrosAplicados] = useState({
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
    page: 1,
    limit: 50
  });

  const [peticionSeleccionada, setPeticionSeleccionada] = useState<any | null>(null);

  const { data: peticiones, isLoading, isError } = useTodasPeticiones(filtrosAplicados);

  const handleFiltrar = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosFiltros = { ...filtros, page: 1 };
    setFiltros(nuevosFiltros);
    setFiltrosAplicados(nuevosFiltros);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    const nuevosFiltros = { ...filtrosAplicados, page: nuevaPagina };
    setFiltros(nuevosFiltros);
    setFiltrosAplicados(nuevosFiltros);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-screen overflow-y-auto p-4 md:p-6" style={{ backgroundColor: '#FAF9F8' }}>
      {/* Header Compacto */}
      <div className="flex flex-col gap-2 shrink-0">
        <button 
          onClick={() => navigate('/chat-box')}
          className="flex items-center gap-1.5 text-sm font-medium w-fit transition-colors hover:opacity-80 mb-2"
          style={{ color: '#A65932' }}
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Chat Box
        </button>
        
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#262626' }}>
          Registros de Peticiones
        </h1>
      </div>

      {/* Filtros */}
      <form onSubmit={handleFiltrar} className="p-6 flex flex-wrap gap-4 items-end" style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px' }}>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Ticket</label>
          <input 
            type="text"
            placeholder="Ej. TKT-12345"
            value={filtros.ticket}
            onChange={(e) => setFiltros({ ...filtros, ticket: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Fecha Inicio</label>
          <input 
            type="date"
            value={filtros.fechaInicio}
            onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Fecha Fin</label>
          <input 
            type="date"
            value={filtros.fechaFin}
            onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Estado</label>
          <select 
            value={filtros.estado}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none bg-white transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          >
            <option value="">Todos</option>
            <option value="ABIERTA">Abierta</option>
            <option value="C">Cerrada</option>
            <option value="PE">Pendiente</option>
            <option value="AS">Asignada</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Prioridad</label>
          <select 
            value={filtros.prioridad}
            onChange={(e) => setFiltros({ ...filtros, prioridad: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none bg-white transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          >
            <option value="">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Tipo / Etapa</label>
          <input 
            type="text"
            placeholder="Ej. Nuevo, En Revisión..."
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>¿Tiene Avance?</label>
          <select 
            value={filtros.tieneAvance}
            onChange={(e) => setFiltros({ ...filtros, tieneAvance: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none bg-white transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          >
            <option value="">Todos</option>
            <option value="true">Con Avance</option>
            <option value="false">Sin Avance</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Cliente / Empresa</label>
          <input 
            type="text"
            placeholder="Ej. Sanamedic"
            value={filtros.nombreUsr}
            onChange={(e) => setFiltros({ ...filtros, nombreUsr: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Proyecto</label>
          <input 
            type="text"
            placeholder="Ej. Software Kubapp"
            value={filtros.proyecto}
            onChange={(e) => setFiltros({ ...filtros, proyecto: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Teléfono</label>
          <input 
            type="text"
            placeholder="Ej. 57311..."
            value={filtros.telefono}
            onChange={(e) => setFiltros({ ...filtros, telefono: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <label className="text-xs font-medium" style={{ color: '#737373' }}>Límite / Pág</label>
          <input 
            type="number"
            min="1"
            value={filtros.limit}
            onChange={(e) => setFiltros({ ...filtros, limit: Number(e.target.value) || 1 })}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none bg-white transition-colors"
            style={{ borderColor: '#EAEAEA', color: '#262626' }}
            onFocus={(e) => e.target.style.borderColor = '#A65932'}
            onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
          />
        </div>
        <div className="flex gap-2 min-w-[150px] w-full md:w-auto">
          <button 
            type="button"
            onClick={() => {
              const resetFiltros = {
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
                page: 1,
                limit: filtros.limit
              };
              setFiltros(resetFiltros);
              setFiltrosAplicados(resetFiltros);
            }}
            className="flex-1 flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors"
            style={{ backgroundColor: '#F6EFEA', color: '#A65932' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EAEAEA'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F6EFEA'}
          >
            Limpiar
          </button>
          <button 
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors"
            style={{ backgroundColor: '#A65932', color: '#FFFFFF' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#944D2A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A65932'}
          >
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
        </div>
      </form>

      {/* Tabla de Resultados */}
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #EAEAEA',
          borderRadius: '12px',
          overflowX: 'auto'
        }}
      >
        {isLoading && <div className="p-6 text-sm" style={{ color: '#737373' }}>Cargando peticiones...</div>}
        {isError && <div className="p-6 text-sm" style={{ color: '#B33A3A' }}>Error al cargar las peticiones.</div>}
        
        {peticiones?.items && peticiones.items.length === 0 && (
          <div className="p-6 text-sm text-center" style={{ color: '#737373' }}>
            No se encontraron peticiones con los filtros seleccionados.
          </div>
        )}

        {peticiones?.items && peticiones.items.length > 0 && (
          <div className="flex flex-col">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead style={{ backgroundColor: '#FAF9F8', color: '#737373', borderBottom: '1px solid #EAEAEA' }}>
                <tr>
                  <th className="px-6 py-4 font-medium">Ticket</th>
                  <th className="px-6 py-4 font-medium">Fecha Ingreso</th>
                  <th className="px-6 py-4 font-medium">Cliente</th>
                  <th className="px-6 py-4 font-medium">Proyecto</th>
                  <th className="px-6 py-4 font-medium">Categoría</th>
                  <th className="px-6 py-4 font-medium">Subcategoría</th>
                  <th className="px-6 py-4 font-medium">Prioridad</th>
                  <th className="px-6 py-4 font-medium">Responsable</th>
                  <th className="px-6 py-4 font-medium">Fecha Asignación</th>
                  <th className="px-6 py-4 font-medium text-center">Estado</th>
                  <th className="px-6 py-4 font-medium">Etapa</th>
                  <th className="px-6 py-4 font-medium">Fecha Cierre</th>
                  <th className="px-6 py-4 font-medium text-center">Avance</th>
                  <th className="px-6 py-4 font-medium text-right sticky right-0 bg-[#FAF9F8] shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#EAEAEA', color: '#262626' }}>
                {peticiones.items.map(p => (
                  <tr key={p.Id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#A65932]">{p.Ticket}</td>
                    <td className="px-6 py-4">{new Date(p.FechaIng).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-normal min-w-[200px] break-words text-[#262626]">
                      {p.Cliente || p.NombreUsr}
                    </td>
                    <td className="px-6 py-4 whitespace-normal min-w-[150px] break-words">{p.Proyecto || '-'}</td>
                    <td className="px-6 py-4">{p.Categoria || '-'}</td>
                    <td className="px-6 py-4 whitespace-normal min-w-[150px] break-words">{p.SubCategoria || '-'}</td>
                    <td className="px-6 py-4">
                      {p.Prioridad ? (
                        <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide ${
                          p.Prioridad.toLowerCase() === 'alta' ? 'bg-[#FDF4E6] text-[#A06A22]' :
                          p.Prioridad.toLowerCase() === 'baja' ? 'bg-[#FAF9F8] text-[#737373]' :
                          'bg-[#E6F2ED] text-[#2D7A5D]'
                        }`}>
                          {p.Prioridad}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">{p.Responsable || 'Sin asignar'}</td>
                    <td className="px-6 py-4">{p.FechaAsignado ? new Date(p.FechaAsignado).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <span 
                        className="px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide"
                        style={{ 
                          backgroundColor: p.Estado === 'C' ? '#E6F2ED' : (p.Estado === 'PE' ? '#FDF4E6' : '#F6EFEA'),
                          color: p.Estado === 'C' ? '#2D7A5D' : (p.Estado === 'PE' ? '#A06A22' : '#A65932')
                        }}
                      >
                        {p.Estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">{p.Etapa}</td>
                    <td className="px-6 py-4">{p.FechaCierre ? new Date(p.FechaCierre).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4 text-center">
                      {p.tieneAvance ? (
                        <span className="px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide bg-[#E6F2ED] text-[#2D7A5D]">
                          Sí
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide bg-[#FAF9F8] text-[#737373]">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right sticky right-0 bg-white group-hover:bg-gray-50 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] transition-colors">
                      <button
                        onClick={() => setPeticionSeleccionada(p)}
                        className="text-xs font-medium px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5"
                        style={{ color: '#A65932', border: '1px solid rgba(166, 89, 50, 0.2)' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6EFEA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <History className="w-3.5 h-3.5" />
                        Trazabilidad
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Paginación */}
            {peticiones.meta && (
              <div className="flex items-center justify-between p-4 border-t border-[#EAEAEA] bg-[#FAF9F8]">
                <span className="text-sm text-[#737373]">
                  Mostrando {peticiones.items.length} de {peticiones.meta.totalItems} resultados
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    disabled={peticiones.meta.currentPage === 1}
                    onClick={() => cambiarPagina(peticiones.meta.currentPage - 1)}
                    className="px-3 py-1.5 text-sm font-medium rounded border border-[#EAEAEA] bg-white transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: '#262626' }}
                  >
                    Anterior
                  </button>
                  <span className="text-sm font-medium text-[#262626]">
                    Página {peticiones.meta.currentPage} de {peticiones.meta.totalPages}
                  </span>
                  <button 
                    disabled={peticiones.meta.currentPage === peticiones.meta.totalPages}
                    onClick={() => cambiarPagina(peticiones.meta.currentPage + 1)}
                    className="px-3 py-1.5 text-sm font-medium rounded border border-[#EAEAEA] bg-white transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: '#262626' }}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AvancesDrawer 
        isOpen={peticionSeleccionada !== null} 
        onClose={() => setPeticionSeleccionada(null)} 
        idPeticion={peticionSeleccionada?.Id ?? 0} 
        fechaCierre={peticionSeleccionada?.FechaCierre}
        fechaIngreso={peticionSeleccionada?.FechaIng}
        responsableCierre={peticionSeleccionada?.Responsable}
      />
    </div>
  );
};
