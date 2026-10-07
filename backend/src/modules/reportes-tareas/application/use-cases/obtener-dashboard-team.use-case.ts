import { Injectable } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';
import { ConsultarDashboardTeamDto } from '../dto/consultar-dashboard-team.dto.js';

@Injectable()
export class ObtenerDashboardTeamUseCase {
  constructor(private readonly reportesTareasRepository: ReportesTareasRepository) {}

  async ejecutar(dto: ConsultarDashboardTeamDto): Promise<unknown> {
    return this.reportesTareasRepository.obtenerDashboardTeam(dto.team_id, dto.start_date, dto.end_date);
  }
}
