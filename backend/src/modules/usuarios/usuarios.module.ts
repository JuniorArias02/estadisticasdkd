import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller.js';
import { UsuarioRepository } from './domain/repositories/usuario.repository.js';
import { PrismaUsuarioRepository } from './infrastructure/repositories/prisma-usuario.repository.js';
import { CrearUsuarioUseCase } from './application/use-cases/crear-usuario.use-case.js';
import { ObtenerUsuarioUseCase } from './application/use-cases/obtener-usuario.use-case.js';
import { ListarUsuariosUseCase } from './application/use-cases/listar-usuarios.use-case.js';
import { ActualizarUsuarioUseCase } from './application/use-cases/actualizar-usuario.use-case.js';
import { EliminarUsuarioUseCase } from './application/use-cases/eliminar-usuario.use-case.js';
import { CambiarClaveUseCase } from './application/use-cases/cambiar-clave.use-case.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, AuthModule, PassportModule],
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
    CambiarClaveUseCase,
  ],
  exports: [UsuarioRepository],
})
export class UsuariosModule {}
