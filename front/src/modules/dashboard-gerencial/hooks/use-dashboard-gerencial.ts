import { useQuery } from '@tanstack/react-query';
import { 
  obtenerDashboardManager, 
  obtenerDashboardLeader, 
  obtenerRequerimientosFrecuentes 
} from '../services/dashboard-gerencial.service';
import { useEstadisticasResponsable } from '@/modules/chat-box/hooks/use-estadisticas-chatbox';
import { useMemo } from 'react';
import type { CargaRealMiembro } from '../types/dashboard-gerencial.types';

export const useDashboardManager = () => {
  return useQuery({
    queryKey: ['dashboard-manager'],
    queryFn: obtenerDashboardManager,
  });
};

export const useDashboardLeader = (teamId: number) => {
  return useQuery({
    queryKey: ['dashboard-leader', teamId],
    queryFn: () => obtenerDashboardLeader(teamId),
    enabled: !!teamId,
  });
};

export const useRequerimientosFrecuentes = () => {
  return useQuery({
    queryKey: ['requerimientos-frecuentes'],
    queryFn: obtenerRequerimientosFrecuentes,
  });
};

/**
 * Hook para cruzar los datos de Chatbox y Tareas en el frontend
 * como se menciona en el análisis de cruce de datos.
 */
export const useCargaRealEquipo = (teamId: number, fechaInicio?: string, fechaFin?: string) => {
  const { data: leaderData, isLoading: isLeaderLoading } = useDashboardLeader(teamId);
  const { data: chatboxData, isLoading: isChatboxLoading } = useEstadisticasResponsable({
    fechaInicio,
    fechaFin,
  });

  const cargaReal = useMemo(() => {
    if (!leaderData || !chatboxData) return [];

    const resultado: CargaRealMiembro[] = [];

    const normalizeString = (str: string) => {
      // Remover tildes y caracteres especiales, dejar solo letras y números
      return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    };

    const wordsMatch = (name1: string, name2: string) => {
      const n1 = normalizeString(name1);
      const n2 = normalizeString(name2);
      
      if (n1 === n2) return true;

      const w1 = n1.split(' ').filter(w => w.length > 2);
      const w2 = n2.split(' ').filter(w => w.length > 2);

      let commonWords = 0;
      for (const w of w1) {
        if (w2.includes(w)) commonWords++;
      }
      
      // Exigir al menos 2 palabras en común (Ej: Un nombre y un apellido)
      // para evitar falsos positivos como "Jose Ragua" y "Jose Neptali" (que solo comparten "Jose")
      if (commonWords >= 2) return true;

      // Si uno de los sistemas solo tiene registrada 1 sola palabra válida para ese usuario, y coincide.
      if (commonWords === 1 && (w1.length === 1 || w2.length === 1)) return true;
      
      return false;
    };

    // Iterar sobre los miembros del equipo en tareas
    const miembrosTareas = Array.isArray(leaderData) ? leaderData : [];
    miembrosTareas.forEach((miembroTarea) => {
      const miembroChatbox = chatboxData.find(c => wordsMatch(c.responsable, miembroTarea.name));

      const ticketsChatbox = miembroChatbox ? miembroChatbox.total : 0; // Se actualizó a c.total según la API de chatbox

      resultado.push({
        nombre: miembroTarea.name,
        tickets_chatbox: ticketsChatbox,
        tareas_asignadas: Number(miembroTarea.tareas_asignadas) || 0,
        total_actividades: ticketsChatbox + (Number(miembroTarea.tareas_asignadas) || 0),
      });
    });

    // Ordenar por total de actividades
    return resultado.sort((a, b) => b.total_actividades - a.total_actividades);
  }, [leaderData, chatboxData]);

  return {
    data: cargaReal,
    isLoading: isLeaderLoading || isChatboxLoading,
  };
};

export const useHistorialActividades = (nombre: string, fechaInicio?: string, fechaFin?: string) => {
  return useQuery({
    queryKey: ['historial-actividades', nombre, fechaInicio, fechaFin],
    queryFn: () => {
      // Import dynamic to avoid circular dependencies if any, but regular import is fine.
      // We need to import obtenerHistorialActividades at the top.
      return import('../services/dashboard-gerencial.service').then(m => m.obtenerHistorialActividades(nombre, fechaInicio, fechaFin));
    },
    enabled: !!nombre,
  });
};
