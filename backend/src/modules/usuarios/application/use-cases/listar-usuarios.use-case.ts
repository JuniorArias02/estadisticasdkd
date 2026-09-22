import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository.js';
import { Usuario } from '../../domain/entities/usuario.entity.js';

@Injectable()
export class ListarUsuariosUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async ejecutar(): Promise<Usuario[]> {
    return this.usuarioRepository.listar();
  }
}
