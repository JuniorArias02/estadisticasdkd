import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsuariosModule } from './modules/usuarios/usuarios.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { RolesModule } from './modules/roles/roles.module.js';
import { ReportesTareasModule } from './modules/reportes-tareas/reportes-tareas.module.js';
import { ReportesChatboxModule } from './modules/reportes-chatbox/reportes-chatbox.module.js';
import { ReportesGerencialesModule } from './modules/reportes-gerenciales/reportes-gerenciales.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, 
    UsuariosModule, 
    AuthModule,
    RolesModule,
    ReportesTareasModule,
    ReportesChatboxModule,
    ReportesGerencialesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
