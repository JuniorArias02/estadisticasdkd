export interface FiltrosSoporte {
  fechaInicio?: string;
  fechaFin?: string;
}

export interface ResumenSoporte {
  totalAvances: number;
  totalTickets: number;
  totalEmpresas: number;
  promedioAvancesPorTicket: number;
}

export interface PorEtapaSoporte {
  idEtapa: number;
  etapa: string;
  totalAvances: number;
  totalTickets: number;
}

export interface PorEmpresaSoporte {
  empresa: string;
  totalAvances: number;
  totalTickets: number;
  promedioAvancesPorTicket: number;
  etapas: Record<string, number>;
}

export interface PorResponsableSoporte {
  responsable: string;
  totalAvances: number;
  totalTickets: number;
}

export interface EscalamientosSoporte {
  enkube: number;
  geovanny: number;
  total: number;
}

export interface ReasignacionesSoporte {
  totalAvances: number;
  ticketsAfectados: number;
}

export interface CierresSoporte {
  totalAvances: number;
  ticketsAfectados: number;
}

export interface EvolucionSoporte {
  fecha: string;
  totalAvances: number;
  totalTickets: number;
  cerrados: number;
}

export interface EstadisticasSoporteResponse {
  filtros: FiltrosSoporte;
  resumen: ResumenSoporte;
  porEtapa: PorEtapaSoporte[];
  porEmpresa: PorEmpresaSoporte[];
  porResponsable: PorResponsableSoporte[];
  escalamientos: EscalamientosSoporte;
  reasignaciones: ReasignacionesSoporte;
  cierres: CierresSoporte;
  evolucion: EvolucionSoporte[];
}
