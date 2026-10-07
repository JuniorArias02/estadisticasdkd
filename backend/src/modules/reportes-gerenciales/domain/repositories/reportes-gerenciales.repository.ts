export abstract class ReportesGerencialesRepository {
  abstract obtenerPeticionesPorNombre(nombre: string, fechaInicio?: string, fechaFin?: string): Promise<any[]>;
  abstract obtenerTareasPorNombre(nombre: string, fechaInicio?: string, fechaFin?: string): Promise<any[]>;
}
