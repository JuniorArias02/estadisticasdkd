import { Controller, Get, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard.js';
import { FiltroFechasDto } from '../../application/dto/filtro-fechas.dto.js';
import { ObtenerAvancesEtapaUseCase } from '../../application/use-cases/obtener-avances-etapa.use-case.js';
import { ObtenerEstadisticasSoporteUseCase } from '../../application/use-cases/obtener-estadisticas-soporte.use-case.js';

@Controller('soporte')
@UseGuards(JwtAuthGuard)
export class SoporteController {
  constructor(
    private readonly obtenerAvancesEtapaUseCase: ObtenerAvancesEtapaUseCase,
    private readonly obtenerEstadisticasSoporteUseCase: ObtenerEstadisticasSoporteUseCase,
  ) {}

  @Get('estadisticas')
  async obtenerEstadisticas(@Query() filtros: FiltroFechasDto) {
    return this.obtenerEstadisticasSoporteUseCase.ejecutar(filtros);
  }

  @Get('avances-etapa/:IdEtapa')
  async obtenerAvancesEtapa(
    @Param('IdEtapa', ParseIntPipe) IdEtapa: number,
    @Query() filtros: FiltroFechasDto,
  ) {
    return this.obtenerAvancesEtapaUseCase.ejecutar(IdEtapa, filtros);
  }
}
