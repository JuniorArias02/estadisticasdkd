import { Injectable, Logger } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerEmpresasUseCase {
  private readonly logger = new Logger(ObtenerEmpresasUseCase.name);

  constructor(
    private readonly reportesChatboxRepository: ReportesChatboxRepository,
  ) {}

  async ejecutar() {
    this.logger.log('Ejecutando caso de uso: ObtenerEmpresasUseCase');
    return this.reportesChatboxRepository.obtenerEmpresas();
  }
}
