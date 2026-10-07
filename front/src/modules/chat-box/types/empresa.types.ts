export interface Empresa {
  Id: number;
  Nombre: string;
  NumeroNit: string;
}

export interface GestorDesempeno {
  nombre: string;
  asignadas: number;
  cerradas: number;
  tiempoPromedioResolucion: string;
}

export interface TicketConAvance {
  ticket: string;
  estado: string;
  responsable: string;
  fechaIngreso: string;
  ultimoAvance: string;
}

export interface DetalleEmpresa {
  cantidadesTickets: number;
  gestoresMejorDesempeno: GestorDesempeno[];
  tiempoPromedioCierre: string;
  totalAvances: number;
  casosAbiertos: number;
  prioridades: {
    alta: number;
    media: number;
    baja: number;
  };
  ticketsConAvance: TicketConAvance[];
}

export interface DetalleEmpresaFiltros {
  fechaInicio?: string;
  fechaFin?: string;
  tipo?: string;
  estado?: string;
}
