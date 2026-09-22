import { Usuario } from '../entities/usuario.entity.js';

export abstract class UsuarioRepository {
  abstract crear(datos: Partial<Usuario> & { contrasena: string }): Promise<Usuario>;
  abstract obtenerPorId(id: number): Promise<Usuario | null>;
  abstract obtenerPorCorreo(correo: string): Promise<Usuario | null>;
  abstract listar(): Promise<Usuario[]>;
  abstract actualizar(id: number, datos: Partial<Usuario>): Promise<Usuario>;
  abstract eliminar(id: number): Promise<void>;
}
