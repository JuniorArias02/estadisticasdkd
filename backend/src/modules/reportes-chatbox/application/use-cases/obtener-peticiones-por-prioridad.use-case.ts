import { Injectable, Logger } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';
import { ConsultarPeticionesDto } from '../dto/consultar-peticiones.dto.js';
import { calcularDiferenciaSegundos, formatoTiempo } from '../../../../common/utils/time.util.js';

@Injectable()
export class ObtenerPeticionesPorPrioridadUseCase {
  private readonly logger = new Logger(ObtenerPeticionesPorPrioridadUseCase.name);
  private cache = new Map<string, { data: any[]; timestamp: number }>();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000;

  constructor(
    private readonly reportesChatboxRepository: ReportesChatboxRepository,
  ) {}

  async ejecutar(filtros: ConsultarPeticionesDto) {
    this.logger.log('Ejecutando caso de uso: ObtenerPeticionesPorPrioridadUseCase');

    const cacheKey = JSON.stringify({
      fechaInicio: filtros.fechaInicio,
      fechaFin: filtros.fechaFin,
      tipo: filtros.tipo,
      estado: filtros.estado,
    });

    let peticiones: any[];
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL_MS) {
      peticiones = cached.data;
    } else {
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

      this.cache.set(cacheKey, { data: peticiones, timestamp: Date.now() });
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
    const mapa = new Map<string, any>();

    for (const p of peticiones) {
      const prioridad = p.Prioridad || 'Sin asignar';
      if (!mapa.has(prioridad)) {
        mapa.set(prioridad, {
          prioridad,
          total: 0,
          cerradas: 0,
          abiertas: 0,
          tiempoTotalResolucion: 0,
          countResolucion: 0,
        });
      }

      const stats = mapa.get(prioridad);
      stats.total++;

      if (p.Estado === 'C') {
        stats.cerradas++;
        if (p.FechaIng && p.FechaCierre) {
          stats.tiempoTotalResolucion += calcularDiferenciaSegundos(p.FechaIng, p.FechaCierre);
          stats.countResolucion++;
        }
      } else {
        stats.abiertas++;
      }
    }

    return Array.from(mapa.values()).map(stats => ({
      prioridad: stats.prioridad,
      total: stats.total,
      cerradas: stats.cerradas,
      abiertas: stats.abiertas,
      porcentajeCierre: stats.total > 0 ? Number(((stats.cerradas / stats.total) * 100).toFixed(2)) : 0,
      tiempoPromedioResolucion: formatoTiempo(stats.countResolucion > 0 ? stats.tiempoTotalResolucion / stats.countResolucion : 0),
    })).sort((a, b) => b.total - a.total);
  }
}
