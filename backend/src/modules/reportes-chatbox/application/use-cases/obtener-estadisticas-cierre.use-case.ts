import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerEstadisticasCierreUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(fi: string, ff: string, tipo: string, responsableId?: number): Promise<unknown> {
    const data = await this.reportesChatboxRepository.obtenerEstadisticasPromedioCierre(fi, ff, tipo) as any[];
    
    if (responsableId) {
      return data.filter(d => d.ResponsableId === responsableId);
    }
    
    return data;
  }
}
