import { Rol } from '../entities/rol.entity.js';

export abstract class RolRepository {
  abstract crear(datos: Partial<Rol> & { nombre: string }): Promise<Rol>;
  abstract obtenerPorId(id: number): Promise<Rol | null>;
  abstract obtenerPorNombre(nombre: string): Promise<Rol | null>;
  abstract listar(): Promise<Rol[]>;
  abstract actualizar(id: number, datos: Partial<Rol>): Promise<Rol>;
  abstract eliminar(id: number): Promise<void>;
}
