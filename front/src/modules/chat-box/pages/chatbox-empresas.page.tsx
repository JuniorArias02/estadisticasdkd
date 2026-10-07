import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmpresas } from '../hooks/use-empresas';
import { ArrowLeft, Search, Building2, Loader2, AlertCircle, ChevronRight } from 'lucide-react';

export const ChatboxEmpresasPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: empresas, isLoading, isError } = useEmpresas();
  const [searchTerm, setSearchTerm] = useState('');

  const empresasFiltradas = empresas?.filter(emp => 
    emp.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.NumeroNit.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-6 w-full h-screen overflow-y-auto p-4 md:p-6" style={{ backgroundColor: '#FAF9F8' }}>
      {/* Header */}
      <div className="flex flex-col gap-4 shrink-0">
        <button 
          onClick={() => navigate('/chat-box')}
          className="flex items-center gap-2 text-sm font-medium w-fit transition-colors hover:text-[#A65932]"
          style={{ color: '#737373' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#F6EFEA]">
              <Building2 className="w-6 h-6 text-[#A65932]" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold" style={{ color: '#262626' }}>Directorio de Empresas</h1>
              <p className="text-sm" style={{ color: '#737373' }}>
                Selecciona una empresa para ver sus métricas y detalles
              </p>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <div className="relative w-full max-w-md mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input 
            type="text"
            placeholder="Buscar por nombre o NIT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border outline-none transition-colors focus:border-[#A65932] focus:ring-1 focus:ring-[#A65932]"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#EAEAEA', color: '#262626' }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-[#A65932] min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Cargando empresas...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-[#B33A3A] bg-[#FBEAE9] p-8 rounded-xl border border-[#B33A3A]/20 min-h-[300px]">
            <AlertCircle className="w-8 h-8" />
            <p className="text-sm font-medium">No se pudo cargar el listado de empresas.</p>
          </div>
        ) : !empresasFiltradas || empresasFiltradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-[#737373] bg-white p-12 rounded-xl border border-[#EAEAEA] min-h-[300px]">
            <Building2 className="w-12 h-12 opacity-30" />
            <p className="text-base font-medium">No se encontraron empresas</p>
            <p className="text-sm">Intenta con otro término de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {empresasFiltradas.map((empresa) => (
              <button
                key={empresa.Id}
                onClick={() => navigate(`/chat-box/empresas/${encodeURIComponent(empresa.Nombre)}/detalle`)}
                className="flex flex-col text-left gap-3 p-5 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg group bg-white border-[#EAEAEA] hover:border-[#A65932]/30"
              >
                <div className="flex justify-between items-start w-full">
                  <div className="p-2 rounded-lg bg-[#FAF9F8] text-[#A65932] transition-colors group-hover:bg-[#F6EFEA]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#EAEAEA] transition-colors group-hover:text-[#A65932]" />
                </div>
                
                <div className="flex flex-col gap-1 mt-1">
                  <h3 className="font-semibold text-[#262626] line-clamp-2 leading-tight group-hover:text-[#A65932] transition-colors">
                    {empresa.Nombre}
                  </h3>
                  <p className="text-xs font-medium text-[#737373]">
                    NIT: {empresa.NumeroNit || 'N/A'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
