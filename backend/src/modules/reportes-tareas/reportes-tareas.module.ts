import { Module } from '@nestjs/common';
import { ReportesTareasController } from './reportes-tareas.controller.js';
import { ReportesTareasRepository } from './domain/repositories/reportes-tareas.repository.js';
import { HttpReportesTareasRepository } from './infrastructure/repositories/http-reportes-tareas.repository.js';
import { ObtenerTeamsUseCase } from './application/use-cases/obtener-teams.use-case.js';
import { ObtenerDashboardTeamUseCase } from './application/use-cases/obtener-dashboard-team.use-case.js';
import { ObtenerDetalleUsuarioUseCase } from './application/use-cases/obtener-detalle-usuario.use-case.js';
import { ObtenerComentariosTareaUseCase } from './application/use-cases/obtener-comentarios-tarea.use-case.js';
import { ObtenerTaskDashboardManagerUseCase } from './application/use-cases/obtener-task-dashboard-manager.use-case.js';
import { ObtenerTaskDashboardLeaderUseCase } from './application/use-cases/obtener-task-dashboard-leader.use-case.js';
import { ObtenerTaskFrequentRequirementsUseCase } from './application/use-cases/obtener-task-frequent-requirements.use-case.js';

import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [ReportesTareasController],
  providers: [
    ObtenerTeamsUseCase,
    ObtenerDashboardTeamUseCase,
    ObtenerDetalleUsuarioUseCase,
    ObtenerComentariosTareaUseCase,
    ObtenerTaskDashboardManagerUseCase,
    ObtenerTaskDashboardLeaderUseCase,
    ObtenerTaskFrequentRequirementsUseCase,
    {
      provide: ReportesTareasRepository,
      useClass: HttpReportesTareasRepository,
    },
  ],
  exports: [ReportesTareasRepository],
})
export class ReportesTareasModule {}
