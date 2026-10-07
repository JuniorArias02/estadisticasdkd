import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerArchivoChatboxUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(fileId: number): Promise<{ buffer: Buffer; mimeType: string }> {
    return this.reportesChatboxRepository.descargarArchivo(fileId);
  }
}
