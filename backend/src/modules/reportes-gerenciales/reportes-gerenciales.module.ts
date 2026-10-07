import { Module } from '@nestjs/common';
import { ReportesGerencialesController } from './reportes-gerenciales.controller.js';
import { ObtenerHistorialActividadesUseCase } from './application/use-cases/obtener-historial-actividades.use-case.js';
import { ReportesChatboxModule } from '../reportes-chatbox/reportes-chatbox.module.js';
import { ReportesTareasModule } from '../reportes-tareas/reportes-tareas.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    ReportesChatboxModule,
    ReportesTareasModule,
    AuthModule,
  ],
  controllers: [ReportesGerencialesController],
  providers: [
    ObtenerHistorialActividadesUseCase,
  ],
})
export class ReportesGerencialesModule {}
