import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller.js';
import { UsuarioRepository } from './domain/repositories/usuario.repository.js';
import { PrismaUsuarioRepository } from './infrastructure/repositories/prisma-usuario.repository.js';
import { CrearUsuarioUseCase } from './application/use-cases/crear-usuario.use-case.js';
import { ObtenerUsuarioUseCase } from './application/use-cases/obtener-usuario.use-case.js';
import { ListarUsuariosUseCase } from './application/use-cases/listar-usuarios.use-case.js';
import { ActualizarUsuarioUseCase } from './application/use-cases/actualizar-usuario.use-case.js';
import { EliminarUsuarioUseCase } from './application/use-cases/eliminar-usuario.use-case.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [UsuariosController],
  providers: [
    {
      provide: UsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
    CrearUsuarioUseCase,
    ObtenerUsuarioUseCase,
    ListarUsuariosUseCase,
    ActualizarUsuarioUseCase,
    EliminarUsuarioUseCase,
  ],
  exports: [UsuarioRepository],
})
export class UsuariosModule {}
