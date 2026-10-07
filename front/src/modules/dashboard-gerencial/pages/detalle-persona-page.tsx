import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useHistorialActividades } from '../hooks/use-dashboard-gerencial';
import { HistorialResumen } from '../components/historial-resumen';
import { HistorialActividadesTabla } from '../components/historial-actividades-tabla';

export const DetallePersonaPage: React.FC = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const navigate = useNavigate();
  
  // Opcional: filtros de fecha (pueden ser manejados en estado si se agrega un date picker)
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');

  const { data, isLoading } = useHistorialActividades(nombre || '', fechaInicio, fechaFin);

  const handleVolver = () => {
    navigate('/dashboard-gerencial');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF9F8]">
        <p className="text-[#737373]">Cargando historial de {nombre}...</p>
      </div>
    );
  }

  if (!data && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-[#FAF9F8]">
        <p className="text-[#737373]">No se pudo cargar la información para este empleado.</p>
        <button 
          onClick={handleVolver}
          className="px-4 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#262626] font-medium"
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#FAF9F8] min-h-screen">
      {/* Cabecera */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <button 
          onClick={handleVolver}
          className="flex items-center gap-2 text-[#737373] hover:text-[#262626] transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver al Dashboard</span>
        </button>
        
        {/* Aquí irían los inputs de filtro de fecha (simplificado por ahora) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-[#EAEAEA] rounded-lg px-3 py-2 text-sm text-[#737373] shadow-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Filtros de tiempo (Opcional)</span>
          </div>
        </div>
      </div>

      {data && (
        <>
          <HistorialResumen resumen={data.resumen} empleado={data.empleado} />
          <HistorialActividadesTabla actividades={data.actividades} />
        </>
      )}
    </div>
  );
};
