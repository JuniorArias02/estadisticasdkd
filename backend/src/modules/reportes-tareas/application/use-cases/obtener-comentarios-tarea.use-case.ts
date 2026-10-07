import { Injectable } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';

@Injectable()
export class ObtenerComentariosTareaUseCase {
  constructor(private readonly reportesTareasRepository: ReportesTareasRepository) {}

  async ejecutar(taskId: number): Promise<unknown> {
    return this.reportesTareasRepository.obtenerComentariosTarea(taskId);
  }
}
