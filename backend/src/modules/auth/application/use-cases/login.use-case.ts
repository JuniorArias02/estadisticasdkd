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

  async ejecutar(datos: LoginDto): Promise<{ access_token: string; refresh_token: string }> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: datos.correo },
      include: {
        roles: {
          select: {
            rol: {
              select: {
                nombre: true,
                permisos: {
                  select: {
                    permiso: {
                      select: { nombre: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales inválidas o usuario inactivo');
    }

    const contrasenaValida = await bcrypt.compare(datos.contrasena, usuario.contrasena);

    if (!contrasenaValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Extraer nombres de roles
    const nombresRoles = usuario.roles.map((ur) => ur.rol.nombre);
    
    // Extraer nombres de permisos (usando Set para evitar duplicados)
    const permisosSet = new Set<string>();
    usuario.roles.forEach((ur) => {
      ur.rol.permisos.forEach((rp) => {
        permisosSet.add(rp.permiso.nombre);
      });
    });
    const nombresPermisos = Array.from(permisosSet);

    const payload = { 
      sub: usuario.id, 
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      roles: nombresRoles,
      permisos: nombresPermisos
    };

    const access_token = this.jwtService.sign(payload);
    
    // Generar Refresh Token
    const refresh_token = this.jwtService.sign(
      { sub: usuario.id },
      {
        secret: process.env.JWT_REFRESH_SECRET as string,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION as any,
      },
    );

    // Hashear y guardar en BD
    const hashRefresh = await bcrypt.hash(refresh_token, 10);
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { refresh_token: hashRefresh },
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
