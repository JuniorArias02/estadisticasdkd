import { Injectable } from '@nestjs/common';
import { ReportesTareasRepository } from '../../domain/repositories/reportes-tareas.repository.js';
import { ConsultarDetalleUsuarioDto } from '../dto/consultar-detalle-usuario.dto.js';

@Injectable()
export class ObtenerDetalleUsuarioUseCase {
  constructor(private readonly reportesTareasRepository: ReportesTareasRepository) {}

  async ejecutar(userId: number, dto: ConsultarDetalleUsuarioDto): Promise<unknown> {
    return this.reportesTareasRepository.obtenerDetalleUsuario(userId, dto.team_id, dto.start_date, dto.end_date);
  }
}
