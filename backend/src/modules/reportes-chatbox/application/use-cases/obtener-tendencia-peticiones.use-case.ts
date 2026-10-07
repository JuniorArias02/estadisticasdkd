import { Injectable, Logger } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';
import { ConsultarPeticionesDto } from '../dto/consultar-peticiones.dto.js';

@Injectable()
export class ObtenerTendenciaPeticionesUseCase {
  private readonly logger = new Logger(ObtenerTendenciaPeticionesUseCase.name);
  private cache = new Map<string, { data: any[]; timestamp: number }>();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000;

  constructor(
    private readonly reportesChatboxRepository: ReportesChatboxRepository,
  ) {}

  async ejecutar(filtros: ConsultarPeticionesDto & { agruparPor?: 'dia' | 'semana' | 'mes' }) {
    this.logger.log('Ejecutando caso de uso: ObtenerTendenciaPeticionesUseCase');

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

    return this.calcularEstadisticas(peticionesFiltradas, filtros.agruparPor || 'dia');
  }

  private calcularEstadisticas(peticiones: any[], agruparPor: 'dia' | 'semana' | 'mes') {
    const mapa = new Map<string, any>();

    for (const p of peticiones) {
      if (!p.FechaIng) continue;
      
      const d = new Date(p.FechaIng);
      if (isNaN(d.getTime())) continue;

      let periodo = '';
      if (agruparPor === 'dia') {
        periodo = d.toISOString().split('T')[0]; // YYYY-MM-DD
      } else if (agruparPor === 'mes') {
        periodo = d.toISOString().substring(0, 7); // YYYY-MM
      } else if (agruparPor === 'semana') {
        // Obtenemos el inicio de la semana (Lunes)
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
        const startOfWeek = new Date(d.setDate(diff));
        periodo = startOfWeek.toISOString().split('T')[0];
      }

      if (!mapa.has(periodo)) {
        mapa.set(periodo, {
          periodo,
          total: 0,
          cerradas: 0,
          abiertas: 0,
        });
      }

      const stats = mapa.get(periodo);
      stats.total++;
      if (p.Estado === 'C') {
        stats.cerradas++;
      } else {
        stats.abiertas++;
      }
    }

    return Array.from(mapa.values()).sort((a, b) => a.periodo.localeCompare(b.periodo));
  }
}
