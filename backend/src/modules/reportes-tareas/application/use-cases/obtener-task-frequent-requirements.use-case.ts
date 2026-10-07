import { Injectable } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';

@Injectable()
export class ObtenerTaskFrequentRequirementsUseCase {
  constructor(private readonly reportesTareasRepository: ReportesTareasRepository) {}

  async ejecutar(dto: { start_date?: string; end_date?: string }): Promise<unknown> {
    return this.reportesTareasRepository.obtenerTaskFrequentRequirements(dto.start_date, dto.end_date);
  }
}
