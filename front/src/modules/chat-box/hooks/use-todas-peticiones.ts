import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { PeticionesPaginadas } from '../types/chat-box.types';

interface PeticionesFilters {
  fechaInicio?: string;
  fechaFin?: string;
  tipo?: string;
  estado?: string;
  tieneAvance?: string;
  nombreUsr?: string;
  proyecto?: string;
  telefono?: string;
  prioridad?: string;
  ticket?: string;
  page?: number;
  limit?: number;
}

export const useTodasPeticiones = (filtros?: PeticionesFilters) => {
  return useQuery<PeticionesPaginadas>({
    queryKey: ['chatbox-todas-peticiones', filtros],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filtros?.fechaInicio) params.append('fechaInicio', filtros.fechaInicio);
      if (filtros?.fechaFin) params.append('fechaFin', filtros.fechaFin);
      if (filtros?.tipo) params.append('tipo', filtros.tipo);
      if (filtros?.estado) params.append('estado', filtros.estado);
      if (filtros?.tieneAvance) params.append('tieneAvance', filtros.tieneAvance);
      if (filtros?.nombreUsr) params.append('nombreUsr', filtros.nombreUsr);
      if (filtros?.proyecto) params.append('proyecto', filtros.proyecto);
      if (filtros?.telefono) params.append('telefono', filtros.telefono);
      if (filtros?.prioridad) params.append('prioridad', filtros.prioridad);
      if (filtros?.ticket) params.append('ticket', filtros.ticket);
      if (filtros?.page) params.append('page', filtros.page.toString());
      if (filtros?.limit) params.append('limit', filtros.limit.toString());

      const response = await clienteApi.get(`/reportes-chatbox/peticiones?${params.toString()}`);
      return response.data.data;
    },
  });
};
