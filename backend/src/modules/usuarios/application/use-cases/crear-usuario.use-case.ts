import { ConflictException, Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository.js';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto.js';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../domain/entities/usuario.entity.js';

@Injectable()
export class CrearUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async ejecutar(datos: CrearUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioRepository.obtenerPorCorreo(datos.correo);
    if (existe) {
      throw new ConflictException('El correo ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(datos.contrasena, salt);

    return this.usuarioRepository.crear({
      ...datos,
      contrasena: contrasenaEncriptada,
    });
  }
}
