import { Injectable, Logger } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';
import { ConsultarPeticionesDto } from '../dto/consultar-peticiones.dto.js';

@Injectable()
export class ObtenerPeticionesUseCase {
  private readonly logger = new Logger(ObtenerPeticionesUseCase.name);

  private cache = new Map<string, { data: any[]; timestamp: number }>();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(filtros: ConsultarPeticionesDto): Promise<unknown> {
    this.logger.log('Ejecutando caso de uso: ObtenerPeticionesUseCase');

    const limit = filtros.limit ? parseInt(filtros.limit, 10) : 100;
    const page = filtros.page ? parseInt(filtros.page, 10) : 1;

    const cacheKey = JSON.stringify({
      fechaInicio: filtros.fechaInicio,
      fechaFin: filtros.fechaFin,
      tipo: filtros.tipo,
      estado: filtros.estado,
    });

    let peticiones: any[];
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL_MS) {
      this.logger.log('Retornando peticiones desde caché en memoria');
      peticiones = cached.data;
    } else {
      this.logger.log('Consultando peticiones desde API externa para actualizar caché');
      const rawData = await this.reportesChatboxRepository.obtenerPeticiones(filtros);
      
      const peticionesArray = Array.isArray(rawData) ? rawData : [];

      peticiones = peticionesArray.map((p: any) => ({
        ...p,
        tieneAvance: p.UltimoAvance !== null && p.UltimoAvance !== undefined && p.UltimoAvance !== ''
      }));

      this.cache.set(cacheKey, {
        data: peticiones,
        timestamp: Date.now()
      });
    }

    // Filtrar localmente según los filtros proporcionados
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

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = peticionesFiltradas.slice(startIndex, endIndex);

    return {
      items: paginatedData,
      meta: {
        totalItems: peticionesFiltradas.length,
        itemCount: paginatedData.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(peticionesFiltradas.length / limit),
        currentPage: page,
      }
    };
  }
}
