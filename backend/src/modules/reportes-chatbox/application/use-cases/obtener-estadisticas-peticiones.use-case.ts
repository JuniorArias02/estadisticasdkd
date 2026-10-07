import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerEstadisticasPeticionesAbiertasUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(nombreGestor?: string): Promise<unknown> {
    const data = await this.reportesChatboxRepository.obtenerEstadisticasPeticionesAbiertas() as any[];
    
    if (nombreGestor) {
      return data.filter(d => d.Nombre === nombreGestor);
    }
    
    return data;
  }
}
