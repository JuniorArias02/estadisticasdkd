import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { CambiarClaveDto } from '../dto/cambiar-clave.dto.js';

@Injectable()
export class CambiarClaveUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async ejecutar(id: number, cambiarClaveDto: CambiarClaveDto): Promise<{ mensaje: string }> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(cambiarClaveDto.nuevaContrasena, salt);

    await this.prisma.usuario.update({
      where: { id },
      data: { contrasena: hash },
    });

    return { mensaje: 'Contraseña actualizada correctamente' };
  }
}
