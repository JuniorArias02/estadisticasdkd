import { Injectable, Logger } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';
import { ConsultarPeticionesDto } from '../dto/consultar-peticiones.dto.js';
import { calcularDiferenciaSegundos, formatoTiempo } from '../../../../common/utils/time.util.js';

@Injectable()
export class ObtenerResumenPeticionesUseCase {
  private readonly logger = new Logger(ObtenerResumenPeticionesUseCase.name);
  private cache = new Map<string, { data: any[]; timestamp: number }>();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000;

  constructor(
    private readonly reportesChatboxRepository: ReportesChatboxRepository,
  ) {}

  async ejecutar(filtros: ConsultarPeticionesDto) {
    this.logger.log('Ejecutando caso de uso: ObtenerResumenPeticionesUseCase');

    const cacheKey = JSON.stringify({
      fechaInicio: filtros.fechaInicio,
      fechaFin: filtros.fechaFin,
      tipo: filtros.tipo,
      estado: filtros.estado,
    });

    let peticiones: any[];
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL_MS) {
      this.logger.log('Retornando datos base desde caché para estadísticas');
      peticiones = cached.data;
    } else {
      this.logger.log('Obteniendo datos base desde la API para estadísticas');
      const response: any = await this.reportesChatboxRepository.obtenerPeticiones({
        fechaInicio: filtros.fechaInicio,
        fechaFin: filtros.fechaFin,
        tipo: filtros.tipo,
        estado: filtros.estado,
      });

      let peticionesArray = [];
      if (response && response.data && Array.isArray(response.data)) {
        peticionesArray = response.data;
      } else if (Array.isArray(response)) {
        peticionesArray = response;
      }

      peticiones = peticionesArray.map((p: any) => ({
        ...p,
        tieneAvance: p.UltimoAvance !== null && p.UltimoAvance !== undefined && p.UltimoAvance !== ''
      }));

      this.cache.set(cacheKey, {
        data: peticiones,
        timestamp: Date.now()
      });
    }

    let peticionesFiltradas = peticiones;
    if (filtros.tieneAvance === 'true') {
      peticionesFiltradas = peticionesFiltradas.filter(p => p.tieneAvance === true);
    } else if (filtros.tieneAvance === 'false') {
      peticionesFiltradas = peticionesFiltradas.filter(p => p.tieneAvance === false);
    }

    if (filtros.nombreUsr) {
      const termino = filtros.nombreUsr.toLowerCase();
      peticionesFiltradas = peticionesFiltradas.filter(p => p.NombreUsr?.toLowerCase().includes(termino));
    }
    if (filtros.proyecto) {
      const termino = filtros.proyecto.toLowerCase();
      peticionesFiltradas = peticionesFiltradas.filter(p => p.Proyecto?.toLowerCase().includes(termino));
    }
    if (filtros.telefono) {
      const termino = filtros.telefono.toLowerCase();
      peticionesFiltradas = peticionesFiltradas.filter(p => p.Telefono?.toLowerCase().includes(termino));
    }
    if (filtros.prioridad) {
      const termino = filtros.prioridad.toLowerCase();
      peticionesFiltradas = peticionesFiltradas.filter(p => p.Prioridad?.toLowerCase() === termino);
    }
    if (filtros.ticket) {
      const termino = filtros.ticket.toLowerCase();
      peticionesFiltradas = peticionesFiltradas.filter(p => p.Ticket?.toLowerCase().includes(termino));
    }

    return this.calcularEstadisticas(peticionesFiltradas);
  }

  private calcularEstadisticas(peticiones: any[]) {
    let cerradas = 0;
    let abiertas = 0;
    let conAvance = 0;
    let sinAvance = 0;
    
    let tiempoTotalResolucion = 0;
    let countResolucion = 0;
    let tiempoTotalAsignacion = 0;
    let countAsignacion = 0;

    for (const p of peticiones) {
      if (p.Estado === 'C') {
        cerradas++;
        if (p.FechaIng && p.FechaCierre) {
          tiempoTotalResolucion += calcularDiferenciaSegundos(p.FechaIng, p.FechaCierre);
          countResolucion++;
        }
      } else {
        abiertas++;
      }
      
      if (p.tieneAvance) {
        conAvance++;
      } else {
        sinAvance++;
      }

      if (p.FechaIng && p.FechaAsignado) {
        tiempoTotalAsignacion += calcularDiferenciaSegundos(p.FechaIng, p.FechaAsignado);
        countAsignacion++;
      }
    }

    const total = peticiones.length;
    const porcentajeCierre = total > 0 ? (cerradas / total) * 100 : 0;
    const tiempoPromedioResolucionSeg = countResolucion > 0 ? tiempoTotalResolucion / countResolucion : 0;
    const tiempoPromedioAsignacionSeg = countAsignacion > 0 ? tiempoTotalAsignacion / countAsignacion : 0;

    return {
      total,
      cerradas,
      abiertas,
      porcentajeCierre: Number(porcentajeCierre.toFixed(2)),
      tiempoPromedioResolucion: formatoTiempo(tiempoPromedioResolucionSeg),
      tiempoPromedioAsignacion: formatoTiempo(tiempoPromedioAsignacionSeg),
      conAvance,
      sinAvance
    };
  }
}
