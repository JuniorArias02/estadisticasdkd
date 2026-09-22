import { ConflictException, Injectable } from '@nestjs/common';
import { RolRepository } from '../../domain/repositories/rol.repository.js';
import { CrearRolDto } from '../dto/crear-rol.dto.js';
import { Rol } from '../../domain/entities/rol.entity.js';

@Injectable()
export class CrearRolUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async ejecutar(datos: CrearRolDto): Promise<Rol> {
    const existe = await this.rolRepository.obtenerPorNombre(datos.nombre);
    if (existe) {
      throw new ConflictException(`El rol con el nombre '${datos.nombre}' ya existe`);
    }

    return this.rolRepository.crear(datos);
  }
}
