import { Injectable } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';

@Injectable()
export class ObtenerTeamsUseCase {
  constructor(private readonly reportesTareasRepository: ReportesTareasRepository) {}

  async ejecutar(): Promise<unknown> {
    return this.reportesTareasRepository.obtenerTeams();
  }
}
