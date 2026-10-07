import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ObtenerTeamsUseCase } from './application/use-cases/obtener-teams.use-case.js';
import { ObtenerDashboardTeamUseCase } from './application/use-cases/obtener-dashboard-team.use-case.js';
import { ObtenerDetalleUsuarioUseCase } from './application/use-cases/obtener-detalle-usuario.use-case.js';
import { ObtenerComentariosTareaUseCase } from './application/use-cases/obtener-comentarios-tarea.use-case.js';
import { ObtenerTaskDashboardManagerUseCase } from './application/use-cases/obtener-task-dashboard-manager.use-case.js';
import { ObtenerTaskDashboardLeaderUseCase } from './application/use-cases/obtener-task-dashboard-leader.use-case.js';
import { ObtenerTaskFrequentRequirementsUseCase } from './application/use-cases/obtener-task-frequent-requirements.use-case.js';
import { ConsultarDashboardTeamDto } from './application/dto/consultar-dashboard-team.dto.js';
import { ConsultarDetalleUsuarioDto } from './application/dto/consultar-detalle-usuario.dto.js';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@Controller('reportes-tareas')
@UseGuards(JwtAuthGuard)
export class ReportesTareasController {
  constructor(
    private readonly obtenerTeamsUseCase: ObtenerTeamsUseCase,
    private readonly obtenerDashboardTeamUseCase: ObtenerDashboardTeamUseCase,
    private readonly obtenerDetalleUsuarioUseCase: ObtenerDetalleUsuarioUseCase,
    private readonly obtenerComentariosTareaUseCase: ObtenerComentariosTareaUseCase,
    private readonly obtenerTaskDashboardManagerUseCase: ObtenerTaskDashboardManagerUseCase,
    private readonly obtenerTaskDashboardLeaderUseCase: ObtenerTaskDashboardLeaderUseCase,
    private readonly obtenerTaskFrequentRequirementsUseCase: ObtenerTaskFrequentRequirementsUseCase,
  ) {}

  @Get('teams')
  async obtenerTeams() {
    return this.obtenerTeamsUseCase.ejecutar();
  }

  @Get('team-performance')
  async obtenerDashboardTeam(@Query() query: ConsultarDashboardTeamDto) {
    return this.obtenerDashboardTeamUseCase.ejecutar(query);
  }

  @Get('users/:userId')
  async obtenerDetalleUsuario(
    @Param('userId') userId: string,
    @Query() query: ConsultarDetalleUsuarioDto,
  ) {
    return this.obtenerDetalleUsuarioUseCase.ejecutar(+userId, query);
  }

  @Get('tasks/:taskId/comments')
  async obtenerComentariosTarea(@Param('taskId') taskId: string) {
    return this.obtenerComentariosTareaUseCase.ejecutar(+taskId);
  }

  @Get('task-tracking/dashboard/manager')
  async obtenerTaskDashboardManager(
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
  ) {
    return this.obtenerTaskDashboardManagerUseCase.ejecutar({ start_date, end_date });
  }

  @Get('task-tracking/dashboard/leader/:teamId')
  async obtenerTaskDashboardLeader(
    @Param('teamId') teamId: string,
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
  ) {
    return this.obtenerTaskDashboardLeaderUseCase.ejecutar(+teamId, { start_date, end_date });
  }

  @Get('task-tracking/frequent-requirements')
  async obtenerTaskFrequentRequirements(
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
  ) {
    return this.obtenerTaskFrequentRequirementsUseCase.ejecutar({ start_date, end_date });
  }
}
