import { Injectable } from '@nestjs/common';
import { RolRepository } from '../../domain/repositories/rol.repository.js';
import { Rol } from '../../domain/entities/rol.entity.js';

@Injectable()
export class ListarRolesUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async ejecutar(): Promise<Rol[]> {
    return this.rolRepository.listar();
  }
}
