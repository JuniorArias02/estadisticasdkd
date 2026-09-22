import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository.js';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario.dto.js';
import { Usuario } from '../../domain/entities/usuario.entity.js';

@Injectable()
export class ActualizarUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async ejecutar(id: number, datos: ActualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.obtenerPorId(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.usuarioRepository.actualizar(id, datos);
  }
}
