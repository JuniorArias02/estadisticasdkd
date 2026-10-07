import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { usePromedioCierreGestor } from '../hooks/use-promedio-cierre-gestor';
import { useSoportesEmpresaGestor } from '../hooks/use-soportes-empresa-gestor';
import { usePeticionesAbiertasCantidad } from '../hooks/use-peticiones-abiertas-cantidad';
import { SoportesEmpresaList } from '../components/soportes-empresa-list';
import { UserMetricsHeader } from '../components/user-metrics-header';
import type { PromedioCierreGestor } from '../types/chat-box.types';

export const ChatboxUserDetailPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || `Usuario ${userId}`;

  // Filtros por defecto (en un entorno real podrían venir de un DatePicker)
  const [fechaInicio, setFechaInicio] = useState('2026-09-01');
  const [fechaFin, setFechaFin] = useState('2026-09-30');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('ING');

  const { data: promedios, isLoading: isLoadingPromedio } = usePromedioCierreGestor(fechaInicio, fechaFin, tipoSeleccionado, userId);
  const { data: soportes, isLoading: isLoadingSoportes, isError: isErrorSoportes } = useSoportesEmpresaGestor(fechaInicio, fechaFin, tipoSeleccionado, userId);
  const { data: abiertas, isLoading: isLoadingAbiertas } = usePeticionesAbiertasCantidad();

  // El backend a veces podría devolver la data directamente como objeto si es un solo registro, o un array.
  const metricsArray = Array.isArray(promedios) ? promedios : (promedios ? [promedios] : []);
  const metrics = (metricsArray[0] || {}) as Partial<PromedioCierreGestor>; 
  
  // Buscar las peticiones abiertas del gestor usando su nombre en la lista general de abiertas
  const cantidadAbiertas = abiertas?.find(a => a.Nombre === userName)?.cantidad || metrics.TotalCasosAbiertos || 0;

  return (
    <div className="flex flex-col gap-6" style={{ backgroundColor: '#FAF9F8', minHeight: '100%' }}>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium w-fit transition-colors hover:opacity-80"
        style={{ color: '#A65932' }}
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Usuarios
      </button>

      <UserMetricsHeader 
        userName={userName}
        fechaInicio={fechaInicio}
        setFechaInicio={setFechaInicio}
        fechaFin={fechaFin}
        setFechaFin={setFechaFin}
        tipoSeleccionado={tipoSeleccionado}
        setTipoSeleccionado={setTipoSeleccionado}
        metrics={metrics}
        cantidadAbiertas={cantidadAbiertas}
        isLoadingPromedio={isLoadingPromedio}
        isLoadingAbiertas={isLoadingAbiertas}
      />

      {/* Soportes por Empresa */}
      <SoportesEmpresaList 
        soportes={soportes} 
        isLoading={isLoadingSoportes} 
        isError={isErrorSoportes} 
      />
    </div>
  );
};
