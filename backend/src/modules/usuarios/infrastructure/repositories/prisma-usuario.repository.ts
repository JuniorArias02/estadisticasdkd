import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository.js';
import { Usuario } from '../../domain/entities/usuario.entity.js';
import { PrismaService } from '../../../../prisma/prisma.service.js';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Utilidad para excluir la contraseña de las consultas de Prisma
  private excludePassword(user: any): Usuario {
    if (!user) return user;
    const { contrasena, ...userWithoutPassword } = user;
    return userWithoutPassword as Usuario;
  }

  async crear(datos: Partial<Usuario> & { contrasena: string }): Promise<Usuario> {
    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        nombre: datos.nombre!,
        apellido: datos.apellido!,
        correo: datos.correo!,
        contrasena: datos.contrasena,
        activo: datos.activo ?? true,
      },
    });
    return this.excludePassword(nuevoUsuario);
  }

  async obtenerPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return usuario ? this.excludePassword(usuario) : null;
  }

  async obtenerPorCorreo(correo: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });
    return usuario ? this.excludePassword(usuario) : null;
  }

  async listar(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios.map(u => this.excludePassword(u));
  }

  async actualizar(id: number, datos: Partial<Usuario>): Promise<Usuario> {
    const actualizado = await this.prisma.usuario.update({
      where: { id },
      data: datos,
    });
    return this.excludePassword(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id },
    });
  }
}
