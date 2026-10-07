import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { PeticionAvance } from '../types/chat-box.types';

export const useChatAvances = (idPeticion?: number) => {
  return useQuery<PeticionAvance[]>({
    queryKey: ['chatbox-avances', idPeticion],
    queryFn: async () => {
      if (!idPeticion) return [];
      const response = await clienteApi.get(`/reportes-chatbox/avances/${idPeticion}`);
      return response.data.data;
    },
    enabled: !!idPeticion,
  });
};
