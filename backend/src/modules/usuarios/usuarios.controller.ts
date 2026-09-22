import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CrearUsuarioDto } from './application/dto/crear-usuario.dto.js';
import { ActualizarUsuarioDto } from './application/dto/actualizar-usuario.dto.js';
import { CrearUsuarioUseCase } from './application/use-cases/crear-usuario.use-case.js';
import { ObtenerUsuarioUseCase } from './application/use-cases/obtener-usuario.use-case.js';
import { ListarUsuariosUseCase } from './application/use-cases/listar-usuarios.use-case.js';
import { ActualizarUsuarioUseCase } from './application/use-cases/actualizar-usuario.use-case.js';
import { EliminarUsuarioUseCase } from './application/use-cases/eliminar-usuario.use-case.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase,
    private readonly obtenerUsuarioUseCase: ObtenerUsuarioUseCase,
    private readonly listarUsuariosUseCase: ListarUsuariosUseCase,
    private readonly actualizarUsuarioUseCase: ActualizarUsuarioUseCase,
    private readonly eliminarUsuarioUseCase: EliminarUsuarioUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.crearUsuarioUseCase.ejecutar(crearUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listar() {
    return this.listarUsuariosUseCase.ejecutar();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerUsuarioUseCase.ejecutar(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizar(@Param('id', ParseIntPipe) id: number, @Body() actualizarUsuarioDto: ActualizarUsuarioDto) {
    return this.actualizarUsuarioUseCase.ejecutar(id, actualizarUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarUsuarioUseCase.ejecutar(id);
  }
}
