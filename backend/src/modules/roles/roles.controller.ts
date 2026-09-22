import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CrearRolDto } from './application/dto/crear-rol.dto.js';
import { ActualizarRolDto } from './application/dto/actualizar-rol.dto.js';
import { CrearRolUseCase } from './application/use-cases/crear-rol.use-case.js';
import { ObtenerRolUseCase } from './application/use-cases/obtener-rol.use-case.js';
import { ListarRolesUseCase } from './application/use-cases/listar-roles.use-case.js';
import { ActualizarRolUseCase } from './application/use-cases/actualizar-rol.use-case.js';
import { EliminarRolUseCase } from './application/use-cases/eliminar-rol.use-case.js';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(
    private readonly crearRolUseCase: CrearRolUseCase,
    private readonly obtenerRolUseCase: ObtenerRolUseCase,
    private readonly listarRolesUseCase: ListarRolesUseCase,
    private readonly actualizarRolUseCase: ActualizarRolUseCase,
    private readonly eliminarRolUseCase: EliminarRolUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearRolDto: CrearRolDto) {
    return this.crearRolUseCase.ejecutar(crearRolDto);
  }

  @Get()
  async listar() {
    return this.listarRolesUseCase.ejecutar();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerRolUseCase.ejecutar(id);
  }

  @Patch(':id')
  async actualizar(@Param('id', ParseIntPipe) id: number, @Body() actualizarRolDto: ActualizarRolDto) {
    return this.actualizarRolUseCase.ejecutar(id, actualizarRolDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarRolUseCase.ejecutar(id);
  }
}
