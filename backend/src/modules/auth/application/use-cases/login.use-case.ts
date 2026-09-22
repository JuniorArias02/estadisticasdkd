import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto.js';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async ejecutar(datos: LoginDto): Promise<{ access_token: string }> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: datos.correo },
    });

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales inválidas o usuario inactivo');
    }

    const contrasenaValida = await bcrypt.compare(datos.contrasena, usuario.contrasena);

    if (!contrasenaValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.id, correo: usuario.correo };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
