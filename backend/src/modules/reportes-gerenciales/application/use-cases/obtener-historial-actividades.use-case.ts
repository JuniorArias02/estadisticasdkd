import { Injectable, Logger } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../../reportes-chatbox/domain/repositories/reportes-chatbox.repository.js';
import { ReportesTareasRepository } from '../../../reportes-tareas/domain/repositories/reportes-tareas.repository.js';
import { ConsultarHistorialActividadesDto } from '../dto/consultar-historial-actividades.dto.js';

@Injectable()
export class ObtenerHistorialActividadesUseCase {
  private readonly logger = new Logger(ObtenerHistorialActividadesUseCase.name);

  constructor(
    private readonly reportesChatboxRepository: ReportesChatboxRepository,
    private readonly reportesTareasRepository: ReportesTareasRepository,
  ) {}

  private normalizeString(str: string): string {
    if (!str) return '';
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  private wordsMatch(name1: string, name2: string): boolean {
    const n1 = this.normalizeString(name1);
    const n2 = this.normalizeString(name2);
    
    if (n1 === n2) return true;

    const w1 = n1.split(' ').filter(w => w.length > 2);
    const w2 = n2.split(' ').filter(w => w.length > 2);

    let commonWords = 0;
    for (const w of w1) {
      if (w2.includes(w)) commonWords++;
    }
    
    if (commonWords >= 2) return true;
    if (commonWords === 1 && (w1.length === 1 || w2.length === 1)) return true;
    
    return false;
  }

  async ejecutar(dto: ConsultarHistorialActividadesDto): Promise<any> {
    const { nombre, fechaInicio, fechaFin } = dto;
    this.logger.log(`Consultando historial de actividades para: ${nombre}`);

    // Ejecutar consultas en paralelo
    const [resultadoChatbox, resultadoTareas] = await Promise.allSettled([
      this.reportesChatboxRepository.obtenerPeticiones({
        fechaInicio,
        fechaFin,
      }),
      this.reportesTareasRepository.obtenerHistorialTareasPorNombre(nombre, fechaInicio, fechaFin),
    ]);

    const actividades: any[] = [];
    let totalTickets = 0;
    let totalTareas = 0;

    // Procesar Peticiones de Chatbox
    if (resultadoChatbox.status === 'fulfilled') {
      let peticiones = Array.isArray(resultadoChatbox.value) ? resultadoChatbox.value : ((resultadoChatbox.value as any)?.data || []);
      
      // Filtrar localmente usando el mismo algoritmo avanzado del frontend
      if (nombre) {
        peticiones = peticiones.filter((p: any) => 
          this.wordsMatch(p.NombreUsr || '', nombre) || 
          this.wordsMatch(p.Responsable || '', nombre)
        );
      }

      peticiones.forEach((peticion: any) => {
        actividades.push({
          id_origen: peticion.Ticket || peticion.IdPeticion || 'N/A',
          tipo: 'Ticket',
          fuente: peticion.Fuente || 'Chatbox',
          cliente: peticion.Cliente || 'N/A',
          actividad: peticion.Asunto || peticion.Observacion || 'N/A',
          estado: peticion.Estado || peticion.Etapa || 'N/A',
          fecha: peticion.FechaIng || peticion.FechaCierre || peticion.createdAt || new Date().toISOString(),
          tiempo_dedicado: peticion.TiempoSolucion ? `${peticion.TiempoSolucion} min` : 'N/A',
        });
        totalTickets++;
      });
    } else {
      this.logger.error('Error al consultar historial en Chatbox', resultadoChatbox.reason);
    }

    // Procesar Tareas
    if (resultadoTareas.status === 'fulfilled') {
      const tareas = Array.isArray(resultadoTareas.value) ? resultadoTareas.value : ((resultadoTareas.value as any)?.data || []);
      tareas.forEach((tarea: any) => {
        actividades.push({
          id_origen: (tarea.task_id || tarea.id)?.toString() || 'N/A',
          tipo: 'Tarea',
          fuente: 'Gestión Tareas',
          cliente: tarea.project_name || 'Interno',
          actividad: tarea.title || tarea.description || 'N/A',
          estado: tarea.task_status || tarea.status || 'N/A',
          fecha: tarea.updated_at || tarea.history?.date || tarea.created_at || new Date().toISOString(),
          tiempo_dedicado: 'N/A',
        });
        totalTareas++;
      });
    } else {
      this.logger.error('Error al consultar historial en Tareas', resultadoTareas.reason);
    }

    // Ordenar por fecha descendente
    actividades.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    return {
      empleado: nombre,
      resumen: {
        total_actividades: actividades.length,
        total_tickets: totalTickets,
        total_tareas: totalTareas,
      },
      actividades,
    };
  }
}
