import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';

@Injectable()
export class HttpReportesTareasRepository implements ReportesTareasRepository {
  private readonly logger = new Logger(HttpReportesTareasRepository.name);
  private token: string | null = null;
  private readonly baseUrl = process.env.API_TAREAS_URL;

  private async autenticar(): Promise<void> {
    this.logger.log('Autenticacion api externa');
    const response = await fetch(this.baseUrl + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: process.env.API_TAREAS_USER,
        password: process.env.API_TAREAS_PASSWORD,
      }),
    });

    if (!response.ok) {
      this.logger.error('Error al autenticarse en la API de reportes');
      throw new UnauthorizedException('Error al autenticarse en la API de reportes');
    }

    const data = await response.json();
    this.token = data.access_token;
  }

  private async fetchConToken(endpoint: string, options: RequestInit = {}): Promise<unknown> {
    if (!this.token) await this.autenticar();

    let response = await fetch(this.baseUrl + '/' + endpoint, {
      ...options,
      headers: { ...options.headers, Authorization: 'Bearer ' + this.token },
    });

    if (response.status === 401) {
      this.logger.log('Token expirado, reautenticando');
      await this.autenticar();
      response = await fetch(this.baseUrl + '/' + endpoint, {
        ...options,
        headers: { ...options.headers, Authorization: 'Bearer ' + this.token },
      });
    }

    if (!response.ok) {
      this.logger.error('Error al obtener el reporte: ' + endpoint);
      throw new Error('Error al obtener el reporte: ' + endpoint);
    }
    return response.json();
  }

  async obtenerTeams(): Promise<unknown> {
    this.logger.log('Obteniendo teams');
    return this.fetchConToken('reports/teams');
  }

  async obtenerDashboardTeam(teamId: number, startDate?: string, endDate?: string): Promise<unknown> {
    this.logger.log(`Obteniendo dashboard para el team ${teamId}`);
    const query = new URLSearchParams({ team_id: teamId.toString() });
    if (startDate) query.append('start_date', startDate);
    if (endDate) query.append('end_date', endDate);
    return this.fetchConToken(`reports/team-performance?${query.toString()}`);
  }

  async obtenerDetalleUsuario(userId: number, teamId?: number, startDate?: string, endDate?: string): Promise<unknown> {
    this.logger.log(`Obteniendo detalle exhaustivo para el usuario ${userId}`);
    const query = new URLSearchParams();
    if (teamId) query.append('team_id', teamId.toString());
    if (startDate) query.append('start_date', startDate);
    if (endDate) query.append('end_date', endDate);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.fetchConToken(`reports/users/${userId}${queryString}`);
  }

  async obtenerComentariosTarea(taskId: number): Promise<unknown> {
    this.logger.log(`Obteniendo comentarios para la tarea ${taskId}`);
    return this.fetchConToken(`reports/tasks/${taskId}/comments`);
  }

  async obtenerTaskDashboardManager(startDate?: string, endDate?: string): Promise<unknown> {
    this.logger.log(`Obteniendo task dashboard manager`);
    const query = new URLSearchParams();
    if (startDate) query.append('start_date', startDate);
    if (endDate) query.append('end_date', endDate);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.fetchConToken(`task-tracking/dashboard/manager${queryString}`);
  }

  async obtenerTaskDashboardLeader(teamId: number, startDate?: string, endDate?: string): Promise<unknown> {
    this.logger.log(`Obteniendo task dashboard leader para team ${teamId}`);
    const query = new URLSearchParams();
    if (startDate) query.append('start_date', startDate);
    if (endDate) query.append('end_date', endDate);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.fetchConToken(`task-tracking/dashboard/leader/${teamId}${queryString}`);
  }

  async obtenerTaskFrequentRequirements(startDate?: string, endDate?: string): Promise<unknown> {
    this.logger.log(`Obteniendo frequent requirements`);
    const query = new URLSearchParams();
    if (startDate) query.append('start_date', startDate);
    if (endDate) query.append('end_date', endDate);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.fetchConToken(`task-tracking/frequent-requirements${queryString}`);
  }

  async obtenerHistorialTareasPorNombre(nombre: string, startDate?: string, endDate?: string): Promise<unknown> {
    this.logger.log(`Obteniendo historial de tareas para el usuario ${nombre}`);
    const query = new URLSearchParams({ nombre });
    if (startDate) query.append('start_date', startDate);
    if (endDate) query.append('end_date', endDate);
    return this.fetchConToken(`task-tracking/historial-usuario?${query.toString()}`);
  }
}
