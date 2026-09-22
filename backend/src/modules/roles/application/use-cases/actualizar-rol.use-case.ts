import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RolRepository } from '../../domain/repositories/rol.repository.js';
import { ActualizarRolDto } from '../dto/actualizar-rol.dto.js';
import { Rol } from '../../domain/entities/rol.entity.js';

@Injectable()
export class ActualizarRolUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async ejecutar(id: number, datos: ActualizarRolDto): Promise<Rol> {
    const rolExistente = await this.rolRepository.obtenerPorId(id);
    if (!rolExistente) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    if (datos.nombre && datos.nombre !== rolExistente.nombre) {
      const duplicado = await this.rolRepository.obtenerPorNombre(datos.nombre);
      if (duplicado) {
        throw new ConflictException(`El rol con el nombre '${datos.nombre}' ya existe`);
      }
    }

    return this.rolRepository.actualizar(id, datos);
  }
}
