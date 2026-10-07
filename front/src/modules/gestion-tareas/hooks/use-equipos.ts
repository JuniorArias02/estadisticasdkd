import { useQuery } from '@tanstack/react-query';
import { obtenerEquipos } from '../services/gestion-tareas.service';

export const useEquipos = () => {
  return useQuery({
    queryKey: ['equipos'],
    queryFn: obtenerEquipos,
  });
};
