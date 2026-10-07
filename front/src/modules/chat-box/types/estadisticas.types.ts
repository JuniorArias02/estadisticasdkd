export interface ResumenEstadisticas {
  total: number;
  cerradas: number;
  abiertas: number;
  porcentajeCierre: number;
  tiempoPromedioResolucion: string;
  tiempoPromedioAsignacion: string;
  conAvance: number;
  sinAvance: number;
}

export interface CierrePorCliente {
  cliente: string;
  total: number;
  cerradas: number;
  abiertas: number;
  porcentajeCierre: number;
  tiempoPromedioResolucion: string;
  tiempoPromedioAsignacion: string;
}

export interface PeticionesPorResponsable {
  responsable: string;
  total: number;
  cerradas: number;
  abiertas: number;
  porcentajeCierre: number;
  tiempoPromedioResolucion: string;
  tiempoPromedioAsignacion: string;
}

export interface PeticionesPorModulo {
  modulo: string;
  total: number;
  cerradas: number;
  abiertas: number;
  porcentajeCierre: number;
  tiempoPromedioResolucion: string;
}

export interface PeticionesPorCategoria {
  categoria: string;
  total: number;
  cerradas: number;
  abiertas: number;
  porcentajeCierre: number;
  tiempoPromedioResolucion: string;
}

export interface PeticionesPorPrioridad {
  prioridad: string;
  total: number;
  cerradas: number;
  abiertas: number;
  porcentajeCierre: number;
  tiempoPromedioResolucion: string;
}

export interface TendenciaTemporal {
  periodo: string;
  total: number;
  cerradas: number;
  abiertas: number;
}
