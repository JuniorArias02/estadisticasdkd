import { Injectable, Logger } from '@nestjs/common';
import { ObtenerAvancesEtapaUseCase } from './obtener-avances-etapa.use-case.js';
import { FiltroFechasDto } from '../dto/filtro-fechas.dto.js';

@Injectable()
export class ObtenerEstadisticasSoporteUseCase {
  private readonly logger = new Logger(ObtenerEstadisticasSoporteUseCase.name);

  private readonly ETAPAS: Record<number, string> = {
    1: 'Nuevo',
    2: 'En Revisión',
    3: 'Escalar a Enkube',
    4: 'Escalar a Geovanny',
    5: 'DERCAS - Documentar',
    6: 'Cerrar caso',
    7: 'Reasignación',
  };

  constructor(private readonly obtenerAvancesEtapaUseCase: ObtenerAvancesEtapaUseCase) {}

  async ejecutar(filtros?: FiltroFechasDto) {
    this.logger.log('Ejecutando caso de uso: ObtenerEstadisticasSoporteUseCase');

    // 1. Obtener todos los datos concurrentemente
    const promesas = [1, 2, 3, 4, 5, 6, 7].map(async idEtapa => {
      const avances = await this.obtenerAvancesEtapaUseCase.ejecutar(idEtapa, filtros);
      // Agregar idEtapa para identificar de dónde vino
      return avances.map(a => ({ ...a, idEtapa }));
    });

    const resultados = await Promise.all(promesas);
    const todosAvances = resultados.flat();

    // 2. Métricas Generales (Resumen)
    const totalAvances = todosAvances.length;
    const setPeticiones = new Set(todosAvances.map(a => a.PeticionId));
    const totalTickets = setPeticiones.size;
    
    const setClientes = new Set(todosAvances.map(a => a.Cliente).filter(c => c && c.trim() !== ''));
    const totalEmpresas = setClientes.size;
    
    const promedioAvancesPorTicket = totalTickets > 0 ? Number((totalAvances / totalTickets).toFixed(2)) : 0;

    // 3. Por Etapa
    const porEtapaMap = new Map<number, { idEtapa: number, etapa: string, totalAvances: number, tickets: Set<number> }>();
    for (let i = 1; i <= 7; i++) {
      porEtapaMap.set(i, { idEtapa: i, etapa: this.ETAPAS[i], totalAvances: 0, tickets: new Set() });
    }

    todosAvances.forEach(a => {
      const e = porEtapaMap.get(a.idEtapa);
      if (e) {
        e.totalAvances++;
        e.tickets.add(a.PeticionId);
      }
    });

    const porEtapa = Array.from(porEtapaMap.values()).map(e => ({
      idEtapa: e.idEtapa,
      etapa: e.etapa,
      totalAvances: e.totalAvances,
      totalTickets: e.tickets.size,
    }));

    // 4. Por Empresa
    const porEmpresaMap = new Map<string, any>();
    
    todosAvances.forEach(a => {
      if (!a.Cliente || a.Cliente.trim() === '') return;
      const cliente = a.Cliente.trim();
      
      if (!porEmpresaMap.has(cliente)) {
        porEmpresaMap.set(cliente, {
          empresa: cliente,
          totalAvances: 0,
          tickets: new Set<number>(),
          etapas: {
            "Nuevo": 0,
            "En Revisión": 0,
            "Escalar a Enkube": 0,
            "Escalar a Geovanny": 0,
            "DERCAS - Documentar": 0,
            "Cerrar caso": 0,
            "Reasignación": 0
          }
        });
      }
      
      const e = porEmpresaMap.get(cliente);
      e.totalAvances++;
      e.tickets.add(a.PeticionId);
      
      const nombreEtapa = this.ETAPAS[a.idEtapa];
      if (nombreEtapa) {
        e.etapas[nombreEtapa]++;
      }
    });

    const porEmpresa = Array.from(porEmpresaMap.values()).map(e => ({
      empresa: e.empresa,
      totalAvances: e.totalAvances,
      totalTickets: e.tickets.size,
      promedioAvancesPorTicket: e.tickets.size > 0 ? Number((e.totalAvances / e.tickets.size).toFixed(2)) : 0,
      etapas: e.etapas
    }));

    // 5. Por Responsable
    const porResponsableMap = new Map<string, any>();
    todosAvances.forEach(a => {
      if (!a.Responsable || a.Responsable.trim() === '') return;
      const responsable = a.Responsable.trim();
      
      if (!porResponsableMap.has(responsable)) {
        porResponsableMap.set(responsable, {
          responsable,
          totalAvances: 0,
          tickets: new Set<number>()
        });
      }
      
      const r = porResponsableMap.get(responsable);
      r.totalAvances++;
      r.tickets.add(a.PeticionId);
    });

    const porResponsable = Array.from(porResponsableMap.values()).map(r => ({
      responsable: r.responsable,
      totalAvances: r.totalAvances,
      totalTickets: r.tickets.size
    }));

    // 6. Escalamientos (Etapas 3 y 4)
    const escalamientos = {
      enkube: porEtapaMap.get(3)?.totalAvances || 0,
      geovanny: porEtapaMap.get(4)?.totalAvances || 0,
      total: (porEtapaMap.get(3)?.totalAvances || 0) + (porEtapaMap.get(4)?.totalAvances || 0)
    };

    // 7. Reasignaciones (Etapa 7)
    const etapaReasignacion = porEtapaMap.get(7);
    const reasignaciones = {
      totalAvances: etapaReasignacion?.totalAvances || 0,
      ticketsAfectados: etapaReasignacion?.tickets.size || 0
    };

    // 8. Cierres (Etapa 6)
    const etapaCierre = porEtapaMap.get(6);
    const cierres = {
      totalAvances: etapaCierre?.totalAvances || 0,
      ticketsAfectados: etapaCierre?.tickets.size || 0
    };

    // 9. Evolución Temporal
    const evolucionMap = new Map<string, any>();
    todosAvances.forEach(a => {
      if (!a.FechaIng) return;
      const fecha = a.FechaIng.split(' ')[0]; // YYYY-MM-DD
      
      if (!evolucionMap.has(fecha)) {
        evolucionMap.set(fecha, {
          fecha,
          totalAvances: 0,
          tickets: new Set<number>(),
          cerrados: 0
        });
      }
      
      const ev = evolucionMap.get(fecha);
      ev.totalAvances++;
      ev.tickets.add(a.PeticionId);
      if (a.idEtapa === 6) {
        ev.cerrados++;
      }
    });

    const evolucion = Array.from(evolucionMap.values()).map(ev => ({
      fecha: ev.fecha,
      totalAvances: ev.totalAvances,
      totalTickets: ev.tickets.size,
      cerrados: ev.cerrados
    })).sort((a, b) => a.fecha.localeCompare(b.fecha)); // Orden cronológico

    return {
      filtros: filtros || {},
      resumen: {
        totalAvances,
        totalTickets,
        totalEmpresas,
        promedioAvancesPorTicket,
      },
      porEtapa,
      porEmpresa,
      porResponsable,
      escalamientos,
      reasignaciones,
      cierres,
      evolucion
    };
  }
}
