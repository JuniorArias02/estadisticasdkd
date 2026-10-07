import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { SoporteEmpresaGestor } from '../types/chat-box.types';

export const useSoportesEmpresaGestor = (fi: string, ff: string, tipo: string, responsableId?: string | number) => {
  return useQuery<SoporteEmpresaGestor[]>({
    queryKey: ['chatbox-soportes-empresa', fi, ff, tipo, responsableId],
    queryFn: async () => {
      if (!responsableId) return [];
      const response = await clienteApi.get(`/reportes-chatbox/statistics/soportes-empresa-gestor/${fi}/${ff}/${tipo}/${responsableId}`);
      return response.data.data;
    },
    enabled: !!responsableId && !!fi && !!ff && !!tipo,
  });
};
