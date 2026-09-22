import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller.js';
import { RolRepository } from './domain/repositories/rol.repository.js';
import { PrismaRolRepository } from './infrastructure/repositories/prisma-rol.repository.js';
import { CrearRolUseCase } from './application/use-cases/crear-rol.use-case.js';
import { ObtenerRolUseCase } from './application/use-cases/obtener-rol.use-case.js';
import { ListarRolesUseCase } from './application/use-cases/listar-roles.use-case.js';
import { ActualizarRolUseCase } from './application/use-cases/actualizar-rol.use-case.js';
import { EliminarRolUseCase } from './application/use-cases/eliminar-rol.use-case.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController],
  providers: [
    {
      provide: RolRepository,
      useClass: PrismaRolRepository,
    },
    CrearRolUseCase,
    ObtenerRolUseCase,
    ListarRolesUseCase,
    ActualizarRolUseCase,
    EliminarRolUseCase,
  ],
  exports: [RolRepository],
})
export class RolesModule {}
