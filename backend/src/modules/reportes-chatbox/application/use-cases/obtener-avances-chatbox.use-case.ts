import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerAvancesChatboxUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(idPeticion: number): Promise<unknown> {
    return this.reportesChatboxRepository.obtenerAvances(idPeticion);
  }
}
