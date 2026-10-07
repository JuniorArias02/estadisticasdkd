import { clienteApi } from '@/lib/api';
import type { 
  DashboardManagerData, 
  RendimientoMiembro, 
  RequerimientoFrecuente,
  HistorialPersonaData
} from '../types/dashboard-gerencial.types';

export const obtenerDashboardManager = async (): Promise<DashboardManagerData> => {
  const { data } = await clienteApi.get('/reportes-tareas/task-tracking/dashboard/manager');
  return data?.data || data;
};

export const obtenerDashboardLeader = async (teamId: number): Promise<RendimientoMiembro[]> => {
  const { data } = await clienteApi.get(`/reportes-tareas/task-tracking/dashboard/leader/${teamId}`);
  return data?.data || data;
};

export const obtenerRequerimientosFrecuentes = async (): Promise<RequerimientoFrecuente[]> => {
  const { data } = await clienteApi.get('/reportes-tareas/task-tracking/frequent-requirements');
  return data?.data || data;
};

export const obtenerHistorialActividades = async (nombre: string, fechaInicio?: string, fechaFin?: string): Promise<HistorialPersonaData> => {
  const params = new URLSearchParams({ nombre });
  if (fechaInicio) params.append('fechaInicio', fechaInicio);
  if (fechaFin) params.append('fechaFin', fechaFin);
  
  const { data } = await clienteApi.get(`/reportes-gerenciales/historial-actividades?${params.toString()}`);
  return data?.data || data;
};
