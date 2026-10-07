import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { ObtenerHistorialActividadesUseCase } from './application/use-cases/obtener-historial-actividades.use-case.js';
import { ConsultarHistorialActividadesDto } from './application/dto/consultar-historial-actividades.dto.js';

@Controller('reportes-gerenciales')
@UseGuards(JwtAuthGuard)
export class ReportesGerencialesController {
  constructor(
    private readonly obtenerHistorialActividadesUseCase: ObtenerHistorialActividadesUseCase,
  ) {}

  @Get('historial-actividades')
  async obtenerHistorialActividades(@Query() query: ConsultarHistorialActividadesDto) {
    return this.obtenerHistorialActividadesUseCase.ejecutar(query);
  }
}
