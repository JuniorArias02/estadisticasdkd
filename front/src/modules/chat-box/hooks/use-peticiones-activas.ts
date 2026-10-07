import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { PeticionChat } from '../types/chat-box.types';

export const usePeticionesActivas = (nombreResponsable?: string) => {
  return useQuery<PeticionChat[]>({
    queryKey: ['chatbox-peticiones-activas', nombreResponsable],
    queryFn: async () => {
      if (!nombreResponsable) return [];
      const response = await clienteApi.get(`/reportes-chatbox/peticiones/activas/${encodeURIComponent(nombreResponsable)}`);
      return response.data.data;
    },
    enabled: !!nombreResponsable,
  });
};
