import { Injectable } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';
import { ConsultarDashboardTeamDto } from '../dto/consultar-dashboard-team.dto.js';

@Injectable()
export class ObtenerTaskDashboardManagerUseCase {
  constructor(private readonly reportesTareasRepository: ReportesTareasRepository) {}

  async ejecutar(dto: { start_date?: string; end_date?: string }): Promise<unknown> {
    return this.reportesTareasRepository.obtenerTaskDashboardManager(dto.start_date, dto.end_date);
  }
}
