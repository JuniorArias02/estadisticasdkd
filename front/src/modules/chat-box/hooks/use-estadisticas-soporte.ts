import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { EstadisticasSoporteResponse, FiltrosSoporte } from '../types/estadisticas-soporte.types';

export const useEstadisticasSoporteGlobal = (filtros?: FiltrosSoporte) => {
  return useQuery<EstadisticasSoporteResponse>({
    queryKey: ['estadisticas-soporte-global', filtros],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filtros?.fechaInicio) params.append('fechaInicio', filtros.fechaInicio);
      if (filtros?.fechaFin) params.append('fechaFin', filtros.fechaFin);
      
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await clienteApi.get<EstadisticasSoporteResponse>(
        `/soporte/estadisticas${queryString}`
      );
      // Asumiendo que el backend retorna directamente el JSON o envuelto en { data }
      return (response.data as any).data || response.data;
    },
  });
};
