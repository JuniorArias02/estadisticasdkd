import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerPeticionesActivasUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(nombreResponsable?: string): Promise<unknown> {
    const peticiones = await this.reportesChatboxRepository.obtenerPeticionesActivas() as any[];
    
    if (nombreResponsable) {
      return peticiones.filter(p => p.Responsable === nombreResponsable);
    }
    
    return peticiones;
  }
}
