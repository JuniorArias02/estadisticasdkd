import { Injectable } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';
import { ConsultarDashboardTeamDto } from '../dto/consultar-dashboard-team.dto.js';

@Injectable()
export class ObtenerTaskDashboardLeaderUseCase {
  constructor(private readonly reportesTareasRepository: ReportesTareasRepository) {}

  async ejecutar(teamId: number, dto: { start_date?: string; end_date?: string }): Promise<unknown> {
    return this.reportesTareasRepository.obtenerTaskDashboardLeader(teamId, dto.start_date, dto.end_date);
  }
}
