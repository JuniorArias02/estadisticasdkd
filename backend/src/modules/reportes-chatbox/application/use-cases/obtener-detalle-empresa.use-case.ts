import { Injectable, Logger } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';
import { ConsultarPeticionesDto } from '../dto/consultar-peticiones.dto.js';
import { calcularDiferenciaSegundos, formatoTiempo } from '../../../../common/utils/time.util.js';

@Injectable()
export class ObtenerDetalleEmpresaUseCase {
  private readonly logger = new Logger(ObtenerDetalleEmpresaUseCase.name);
  private cache = new Map<string, { data: any[]; timestamp: number }>();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000;

  constructor(
    private readonly reportesChatboxRepository: ReportesChatboxRepository,
  ) {}

  async ejecutar(empresa: string, filtros: ConsultarPeticionesDto) {
    this.logger.log(`Ejecutando caso de uso: ObtenerDetalleEmpresaUseCase para ${empresa}`);

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

    // Filtrar peticiones por empresa (ignorando mayúsculas/minúsculas)
    const terminoEmpresa = empresa.toLowerCase();
    const peticionesEmpresa = peticiones.filter(p => {
      const cliente = (p.Cliente || p.NombreUsr || '').toLowerCase();
      if (!cliente.includes(terminoEmpresa)) return false;

      // Filtro manual de fechas
      if (filtros.fechaInicio) {
        const dateIng = new Date(p.FechaIng);
        const start = new Date(filtros.fechaInicio);
        start.setHours(0, 0, 0, 0);
        if (dateIng < start) return false;
      }
      if (filtros.fechaFin) {
        const dateIng = new Date(p.FechaIng);
        const end = new Date(filtros.fechaFin);
        end.setHours(23, 59, 59, 999);
        if (dateIng > end) return false;
      }

      return true;
    });

    return this.calcularEstadisticas(peticionesEmpresa);
  }

  private async calcularEstadisticas(peticiones: any[]) {
    const gestores = new Map<string, { asignadas: number; cerradas: number; tiempoResolucion: number }>();
    
    let totalTickets = 0;
    let cerradas = 0;
    let abiertas = 0;
    let tiempoTotalResolucion = 0;
    let countResolucion = 0;
    let totalAvancesExacto = 0; 
    
    let prioridadAlta = 0;
    let prioridadMedia = 0;
    let prioridadBaja = 0;
    
    const ticketsConAvance: any[] = [];

    for (const p of peticiones) {
      totalTickets++;

      // Gestores
      const responsable = p.Responsable || 'Sin Asignar';
      if (!gestores.has(responsable)) {
        gestores.set(responsable, { asignadas: 0, cerradas: 0, tiempoResolucion: 0 });
      }
      const gestorStats = gestores.get(responsable)!;
      gestorStats.asignadas++;

      // Estados y tiempos
      if (p.Estado === 'C') {
        cerradas++;
        gestorStats.cerradas++;
        if (p.FechaIng && p.FechaCierre) {
          const diff = calcularDiferenciaSegundos(p.FechaIng, p.FechaCierre);
          tiempoTotalResolucion += diff;
          countResolucion++;
          gestorStats.tiempoResolucion += diff;
        }
      } else {
        abiertas++;
      }

      // Prioridades
      const prioridad = (p.Prioridad || '').toLowerCase();
      if (prioridad === 'alta') prioridadAlta++;
      else if (prioridad === 'media' || prioridad === 'normal') prioridadMedia++;
      else if (prioridad === 'baja') prioridadBaja++;

    }

    // Obtener la cantidad real de avances por ticket consultando TODOS los tickets filtrados
    // para no depender del campo UltimoAvance que a veces viene vacío.
    const BATCH_SIZE = 20;
    for (let i = 0; i < peticiones.length; i += BATCH_SIZE) {
      const batch = peticiones.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (p) => {
        try {
          const res: any = await this.reportesChatboxRepository.obtenerAvances(p.Id);
          const arr = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
          
          if (arr.length > 0) {
            totalAvancesExacto += arr.length;
            
            // Buscar el último avance real (el más reciente en el arreglo, asumiendo el último elemento o el primero)
            // Si la API base devolvió algo en UltimoAvance, lo usamos, sino usamos el texto del avance real si existe.
            const ultimoAvanceReal = p.UltimoAvance || (arr[arr.length - 1]?.Avance || 'Avance registrado');

            ticketsConAvance.push({
              ticket: p.Ticket,
              estado: p.Estado,
              responsable: p.Responsable,
              fechaIngreso: p.FechaIng,
              ultimoAvance: ultimoAvanceReal
            });
          }
        } catch (error) {
          // Si falla, al menos verificamos si tenía el flag original
          if (p.tieneAvance) {
            totalAvancesExacto += 1;
            ticketsConAvance.push({
              ticket: p.Ticket,
              estado: p.Estado,
              responsable: p.Responsable,
              fechaIngreso: p.FechaIng,
              ultimoAvance: p.UltimoAvance || 'Avance registrado'
            });
          }
        }
      }));
    }

    // Gestores mejor desempeñados (ordenados por cerradas)
    const rankingGestores = Array.from(gestores.entries())
      .map(([nombre, stats]) => ({
        nombre,
        asignadas: stats.asignadas,
        cerradas: stats.cerradas,
        tiempoPromedioResolucion: formatoTiempo(stats.cerradas > 0 ? stats.tiempoResolucion / stats.cerradas : 0)
      }))
      .sort((a, b) => b.cerradas - a.cerradas);

    return {
      cantidadesTickets: totalTickets,
      gestoresMejorDesempeno: rankingGestores,
      tiempoPromedioCierre: formatoTiempo(countResolucion > 0 ? tiempoTotalResolucion / countResolucion : 0),
      totalAvances: totalAvancesExacto,
      casosAbiertos: abiertas,
      prioridades: {
        alta: prioridadAlta,
        media: prioridadMedia,
        baja: prioridadBaja
      },
      ticketsConAvance
    };
  }
}
