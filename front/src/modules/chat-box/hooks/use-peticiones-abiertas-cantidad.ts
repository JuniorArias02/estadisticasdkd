import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';

interface PeticionesAbiertas {
  Nombre: string;
  cantidad: number;
}

export const usePeticionesAbiertasCantidad = () => {
  return useQuery<PeticionesAbiertas[]>({
    queryKey: ['chatbox-peticiones-abiertas'],
    queryFn: async () => {
      const response = await clienteApi.get('/reportes-chatbox/statistics/peticiones-abiertas');
      return response.data.data;
    },
  });
};
