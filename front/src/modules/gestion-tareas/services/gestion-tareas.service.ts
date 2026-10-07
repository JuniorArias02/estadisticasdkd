import { clienteApi } from '@/lib/api';
import type { Equipo, MetricasUsuario, DetalleUsuario, ApiResponse } from '../types/gestion-tareas.types';

const BASE_URL = '/reportes-tareas';

export const obtenerEquipos = async (): Promise<Equipo[]> => {
  const respuesta = await clienteApi.get<ApiResponse<Equipo[]>>(`${BASE_URL}/teams`);
  return respuesta.data.data;
};

export const obtenerDashboardEquipo = async (teamId: number): Promise<MetricasUsuario[]> => {
  const respuesta = await clienteApi.get<ApiResponse<MetricasUsuario[]>>(`${BASE_URL}/team-performance`, {
    params: { team_id: teamId }
  });
  return respuesta.data.data;
};

export const obtenerDetalleUsuario = async (userId: number, teamId?: number): Promise<DetalleUsuario> => {
  const respuesta = await clienteApi.get<ApiResponse<DetalleUsuario>>(`${BASE_URL}/users/${userId}`, {
    params: { team_id: teamId }
  });
  return respuesta.data.data;
};
