import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from '../dto/refresh-token.dto.js';

@Injectable()
export class RefreshUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async ejecutar(datos: RefreshTokenDto): Promise<{ access_token: string; refresh_token: string }> {
    let payload: any;
    try {
      payload = this.jwtService.verify(datos.refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET as string,
      });
    } catch (e) {
      throw new UnauthorizedException('Refresh token expirado o inválido');
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
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
      throw new UnauthorizedException('Usuario inactivo o no existe');
    }

    // Si el usuario no tiene refresh token almacenado (por ejemplo hizo logout manual o se le invalidó)
    if (!usuario.refresh_token) {
      throw new UnauthorizedException('Refresh token no encontrado');
    }

    const tokenValido = await bcrypt.compare(datos.refresh_token, usuario.refresh_token);
    if (!tokenValido) {
      throw new UnauthorizedException('Refresh token inválido o revocado');
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

    const newPayload = { 
      sub: usuario.id, 
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      roles: nombresRoles,
      permisos: nombresPermisos
    };

    const access_token = this.jwtService.sign(newPayload);
    
    // Opcional: Generar un nuevo refresh token cada vez (Rotation) para más seguridad
    const new_refresh_token = this.jwtService.sign(
      { sub: usuario.id },
      {
        secret: process.env.JWT_REFRESH_SECRET as string,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION as any,
      },
    );

    const hashRefresh = await bcrypt.hash(new_refresh_token, 10);
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { refresh_token: hashRefresh },
    });

    return {
      access_token,
      refresh_token: new_refresh_token,
    };
  }
}
