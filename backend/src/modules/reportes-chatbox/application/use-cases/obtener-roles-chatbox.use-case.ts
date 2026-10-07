import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerRolesChatboxUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(): Promise<unknown> {
    return this.reportesChatboxRepository.obtenerRoles();
  }
}
