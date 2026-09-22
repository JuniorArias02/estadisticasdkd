import { Injectable, NotFoundException } from '@nestjs/common';
import { RolRepository } from '../../domain/repositories/rol.repository.js';
import { Rol } from '../../domain/entities/rol.entity.js';

@Injectable()
export class ObtenerRolUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async ejecutar(id: number): Promise<Rol> {
    const rol = await this.rolRepository.obtenerPorId(id);
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return rol;
  }
}
