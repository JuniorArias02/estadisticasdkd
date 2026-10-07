import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { PromedioCierreGestor } from '../types/chat-box.types';

export const usePromedioCierreGestor = (fi: string, ff: string, tipo: string, responsableId?: string | number) => {
  return useQuery<PromedioCierreGestor[]>({
    queryKey: ['chatbox-promedio-cierre', fi, ff, tipo, responsableId],
    queryFn: async () => {
      if (!responsableId) return [];
      const response = await clienteApi.get(`/reportes-chatbox/statistics/promedio-cierre-gestor/${fi}/${ff}/${tipo}/${responsableId}`);
      return response.data.data;
    },
    enabled: !!responsableId && !!fi && !!ff && !!tipo,
  });
};
