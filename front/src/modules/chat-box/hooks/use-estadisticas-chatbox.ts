import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { 
  ResumenEstadisticas, 
  CierrePorCliente, 
  PeticionesPorResponsable,
  PeticionesPorModulo,
  PeticionesPorCategoria,
  PeticionesPorPrioridad,
  TendenciaTemporal
} from '../types/estadisticas.types';

interface FiltrosEstadisticas {
  fechaInicio?: string;
  fechaFin?: string;
  tipo?: string;
  estado?: string;
  nombreUsr?: string;
  proyecto?: string;
  telefono?: string;
  prioridad?: string;
  ticket?: string;
  tieneAvance?: string;
}

const buildParams = (filtros?: FiltrosEstadisticas) => {
  const params = new URLSearchParams();
  if (filtros?.fechaInicio) params.append('fechaInicio', filtros.fechaInicio);
  if (filtros?.fechaFin) params.append('fechaFin', filtros.fechaFin);
  if (filtros?.tipo) params.append('tipo', filtros.tipo);
  if (filtros?.estado) params.append('estado', filtros.estado);
  if (filtros?.nombreUsr) params.append('nombreUsr', filtros.nombreUsr);
  if (filtros?.proyecto) params.append('proyecto', filtros.proyecto);
  if (filtros?.telefono) params.append('telefono', filtros.telefono);
  if (filtros?.prioridad) params.append('prioridad', filtros.prioridad);
  if (filtros?.ticket) params.append('ticket', filtros.ticket);
  if (filtros?.tieneAvance) params.append('tieneAvance', filtros.tieneAvance);
  return params;
};

export const useEstadisticasResumen = (filtros?: FiltrosEstadisticas) => {
  return useQuery<ResumenEstadisticas>({
    queryKey: ['estadisticas-resumen', filtros],
    queryFn: async () => {
      const params = buildParams(filtros);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<{ data: ResumenEstadisticas }>(
        `/reportes-chatbox/estadisticas/peticiones/resumen${queryString}`
      );
      return response.data.data;
    },
  });
};

export const useEstadisticasCliente = (filtros?: FiltrosEstadisticas) => {
  return useQuery<CierrePorCliente[]>({
    queryKey: ['estadisticas-cliente', filtros],
    queryFn: async () => {
      const params = buildParams(filtros);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<{ data: CierrePorCliente[] }>(
        `/reportes-chatbox/estadisticas/peticiones/cierre-por-cliente${queryString}`
      );
      return response.data.data;
    },
  });
};

export const useEstadisticasResponsable = (filtros?: FiltrosEstadisticas) => {
  return useQuery<PeticionesPorResponsable[]>({
    queryKey: ['estadisticas-responsable', filtros],
    queryFn: async () => {
      const params = buildParams(filtros);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<{ data: PeticionesPorResponsable[] }>(
        `/reportes-chatbox/estadisticas/peticiones/por-responsable${queryString}`
      );
      return response.data.data;
    },
  });
};

export const useEstadisticasModulo = (filtros?: FiltrosEstadisticas) => {
  return useQuery<PeticionesPorModulo[]>({
    queryKey: ['estadisticas-modulo', filtros],
    queryFn: async () => {
      const params = buildParams(filtros);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<{ data: PeticionesPorModulo[] }>(
        `/reportes-chatbox/estadisticas/peticiones/por-modulo${queryString}`
      );
      return response.data.data;
    },
  });
};

export const useEstadisticasCategoria = (filtros?: FiltrosEstadisticas) => {
  return useQuery<PeticionesPorCategoria[]>({
    queryKey: ['estadisticas-categoria', filtros],
    queryFn: async () => {
      const params = buildParams(filtros);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<{ data: PeticionesPorCategoria[] }>(
        `/reportes-chatbox/estadisticas/peticiones/por-categoria${queryString}`
      );
      return response.data.data;
    },
  });
};

export const useEstadisticasPrioridad = (filtros?: FiltrosEstadisticas) => {
  return useQuery<PeticionesPorPrioridad[]>({
    queryKey: ['estadisticas-prioridad', filtros],
    queryFn: async () => {
      const params = buildParams(filtros);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<{ data: PeticionesPorPrioridad[] }>(
        `/reportes-chatbox/estadisticas/peticiones/por-prioridad${queryString}`
      );
      return response.data.data;
    },
  });
};

export const useEstadisticasTendencia = (filtros?: FiltrosEstadisticas, agruparPor: 'dia' | 'semana' | 'mes' = 'dia') => {
  return useQuery<TendenciaTemporal[]>({
    queryKey: ['estadisticas-tendencia', filtros, agruparPor],
    queryFn: async () => {
      const params = buildParams(filtros);
      params.append('agruparPor', agruparPor);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<{ data: TendenciaTemporal[] }>(
        `/reportes-chatbox/estadisticas/peticiones/tendencia${queryString}`
      );
      return response.data.data;
    },
  });
};
