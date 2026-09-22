import { Injectable } from '@nestjs/common';
import { RolRepository } from '../../domain/repositories/rol.repository.js';
import { Rol } from '../../domain/entities/rol.entity.js';
import { PrismaService } from '../../../../prisma/prisma.service.js';

@Injectable()
export class PrismaRolRepository implements RolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: Partial<Rol> & { nombre: string }): Promise<Rol> {
    return this.prisma.rol.create({
      data: {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        activo: datos.activo ?? true,
      },
    });
  }

  async obtenerPorId(id: number): Promise<Rol | null> {
    return this.prisma.rol.findUnique({
      where: { id },
    });
  }

  async obtenerPorNombre(nombre: string): Promise<Rol | null> {
    return this.prisma.rol.findUnique({
      where: { nombre },
    });
  }

  async listar(): Promise<Rol[]> {
    return this.prisma.rol.findMany();
  }

  async actualizar(id: number, datos: Partial<Rol>): Promise<Rol> {
    return this.prisma.rol.update({
      where: { id },
      data: datos,
    });
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.rol.delete({
      where: { id },
    });
  }
}
