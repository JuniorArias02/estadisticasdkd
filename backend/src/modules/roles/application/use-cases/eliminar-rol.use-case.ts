import { Injectable, NotFoundException } from '@nestjs/common';
import { RolRepository } from '../../domain/repositories/rol.repository.js';

@Injectable()
export class EliminarRolUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async ejecutar(id: number): Promise<void> {
    const rol = await this.rolRepository.obtenerPorId(id);
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    await this.rolRepository.eliminar(id);
  }
}
