import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerAdjuntosChatboxUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(phone: string, interactionId: number): Promise<unknown> {
    return this.reportesChatboxRepository.obtenerAdjuntos(phone, interactionId);
  }
}
