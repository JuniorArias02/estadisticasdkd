import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerEstadisticasSoportesUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(fi: string, ff: string, tipo: string, responsableId?: number): Promise<unknown> {
    const data = await this.reportesChatboxRepository.obtenerEstadisticasSoportesPorEmpresa(fi, ff, tipo) as any[];
    
    if (responsableId) {
      // Filtrar por gestor seleccionado
      return data.filter(d => d.ResponsableId === responsableId);
    }
    
    // Vista general: agrupar por empresa
    const grouped = data.reduce((acc: any, curr: any) => {
      const empId = curr.EmpresaId;
      if (!acc[empId]) {
        acc[empId] = {
          EmpresaId: curr.EmpresaId,
          Empresa: curr.Empresa,
          Cantidad: 0
        };
      }
      acc[empId].Cantidad += Number(curr.Cantidad);
      return acc;
    }, {});

    return Object.values(grouped);
  }
}
