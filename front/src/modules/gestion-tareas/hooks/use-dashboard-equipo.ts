import { useQuery } from '@tanstack/react-query';
import { obtenerDashboardEquipo } from '../services/gestion-tareas.service';

export const useDashboardEquipo = (teamId?: number) => {
  return useQuery({
    queryKey: ['dashboard-equipo', teamId],
    queryFn: () => obtenerDashboardEquipo(teamId!),
    enabled: !!teamId,
  });
};
