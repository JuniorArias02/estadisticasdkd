import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';
import { FiltroFechasDto } from '../dto/filtro-fechas.dto.js';

@Injectable()
export class ObtenerAvancesEtapaUseCase {
  private readonly logger = new Logger(ObtenerAvancesEtapaUseCase.name);
  private cache = new Map<number, { data: any[]; timestamp: number }>();
  private readonly TTL = 1000 * 60 * 5; // 5 minutos

  constructor(private readonly repository: ReportesChatboxRepository) {}

  async ejecutar(idEtapa: number, filtros?: FiltroFechasDto): Promise<any[]> {
    this.logger.log(`Ejecutando caso de uso: ObtenerAvancesEtapaUseCase para etapa ${idEtapa}`);

    // Validar etapa
    if (!idEtapa || idEtapa < 1 || idEtapa > 7) {
      throw new BadRequestException('IdEtapa inválido. Debe ser un número entre 1 y 7.');
    }

    // Validar fechas si ambas existen
    let inicio: Date | null = null;
    let fin: Date | null = null;

    if (filtros?.fechaInicio) {
      inicio = new Date(filtros.fechaInicio);
      inicio.setHours(0, 0, 0, 0);
    }
    if (filtros?.fechaFin) {
      fin = new Date(filtros.fechaFin);
      fin.setHours(23, 59, 59, 999);
    }

    if (inicio && fin && inicio > fin) {
      throw new BadRequestException('La fechaInicio no puede ser mayor que la fechaFin');
    }

    // Obtener datos (con caché en memoria)
    let avances = await this.obtenerDatosDeApi(idEtapa);

    // Aplicar filtro de fechas localmente (ya que la API externa podría no soportarlo perfectamente)
    if (inicio || fin) {
      avances = avances.filter(avance => {
        if (!avance.FechaIng) return false;
        const fechaAvance = new Date(avance.FechaIng.replace(' ', 'T')); // Handle potential 'YYYY-MM-DD HH:mm:ss' to ISO format
        
        let cumpleInicio = true;
        let cumpleFin = true;

        if (inicio) {
          cumpleInicio = fechaAvance >= inicio;
        }
        if (fin) {
          cumpleFin = fechaAvance <= fin;
        }

        return cumpleInicio && cumpleFin;
      });
    }

    return avances;
  }

  private async obtenerDatosDeApi(idEtapa: number): Promise<any[]> {
    const cached = this.cache.get(idEtapa);
    const ahora = Date.now();

    if (cached && ahora - cached.timestamp < this.TTL) {
      this.logger.log(`Retornando avances etapa ${idEtapa} desde caché`);
      return cached.data;
    }

    this.logger.log(`Consultando avances etapa ${idEtapa} desde API externa`);
    const data = await this.repository.obtenerAvancesPorEtapa(idEtapa) as any[];
    
    this.cache.set(idEtapa, { data, timestamp: ahora });
    return data;
  }
}
