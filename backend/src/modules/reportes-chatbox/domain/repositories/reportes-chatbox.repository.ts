export interface FiltrosPeticiones {
  fechaInicio?: string;
  fechaFin?: string;
  tipo?: string;
  estado?: string;
  nombreUsr?: string;
}

export interface FiltrosFechas {
  fechaInicio?: string;
  fechaFin?: string;
}

export abstract class ReportesChatboxRepository {
  abstract obtenerUsuarios(): Promise<unknown>;
  abstract obtenerRoles(): Promise<unknown>;
  abstract obtenerPeticionesActivas(): Promise<unknown>;
  abstract obtenerPeticiones(filtros?: FiltrosPeticiones): Promise<unknown>;
  abstract obtenerMensajes(phone: string, limit?: number, lastId?: number): Promise<unknown>;
  abstract obtenerAdjuntos(phone: string, interactionId: number): Promise<unknown>;
  abstract descargarArchivo(fileId: number): Promise<{ buffer: Buffer; mimeType: string }>;
  abstract obtenerAvances(idPeticion: number): Promise<unknown>;
  abstract obtenerAvancesPorEtapa(idEtapa: number, filtros?: FiltrosFechas): Promise<unknown>;
  
  // Estadísticas
  abstract obtenerEstadisticasPeticionesAbiertas(): Promise<unknown>;
  abstract obtenerEstadisticasPromedioCierre(fi: string, ff: string, tipo: string): Promise<unknown>;
  abstract obtenerEstadisticasSoportesPorEmpresa(fi: string, ff: string, tipo: string): Promise<unknown>;
  abstract obtenerEmpresas(): Promise<unknown>;
}
