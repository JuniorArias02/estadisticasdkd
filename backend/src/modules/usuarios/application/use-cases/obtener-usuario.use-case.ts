import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository.js';
import { Usuario } from '../../domain/entities/usuario.entity.js';

@Injectable()
export class ObtenerUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async ejecutar(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.obtenerPorId(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }
}
