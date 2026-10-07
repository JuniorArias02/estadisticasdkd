export abstract class ReportesTareasRepository {
  abstract obtenerTeams(): Promise<unknown>;
  abstract obtenerDashboardTeam(teamId: number, startDate?: string, endDate?: string): Promise<unknown>;
  abstract obtenerDetalleUsuario(userId: number, teamId?: number, startDate?: string, endDate?: string): Promise<unknown>;
  abstract obtenerComentariosTarea(taskId: number): Promise<unknown>;
  abstract obtenerTaskDashboardManager(startDate?: string, endDate?: string): Promise<unknown>;
  abstract obtenerTaskDashboardLeader(teamId: number, startDate?: string, endDate?: string): Promise<unknown>;
  abstract obtenerTaskFrequentRequirements(startDate?: string, endDate?: string): Promise<unknown>;
  abstract obtenerHistorialTareasPorNombre(nombre: string, startDate?: string, endDate?: string): Promise<unknown>;
}
