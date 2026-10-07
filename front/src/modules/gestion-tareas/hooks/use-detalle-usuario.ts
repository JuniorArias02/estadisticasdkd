import { useQuery } from '@tanstack/react-query';
import { obtenerDetalleUsuario } from '../services/gestion-tareas.service';

export const useDetalleUsuario = (userId?: number, teamId?: number) => {
  return useQuery({
    queryKey: ['detalle-usuario', userId, teamId],
    queryFn: () => obtenerDetalleUsuario(userId!, teamId),
    enabled: !!userId,
  });
};
