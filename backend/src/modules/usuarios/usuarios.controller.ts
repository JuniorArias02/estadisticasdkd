import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpCode, HttpStatus, Req } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CrearUsuarioDto } from './application/dto/crear-usuario.dto.js';
import { ActualizarUsuarioDto } from './application/dto/actualizar-usuario.dto.js';
import { CrearUsuarioUseCase } from './application/use-cases/crear-usuario.use-case.js';
import { ObtenerUsuarioUseCase } from './application/use-cases/obtener-usuario.use-case.js';
import { ListarUsuariosUseCase } from './application/use-cases/listar-usuarios.use-case.js';
import { ActualizarUsuarioUseCase } from './application/use-cases/actualizar-usuario.use-case.js';
import { EliminarUsuarioUseCase } from './application/use-cases/eliminar-usuario.use-case.js';
import { CambiarClaveUseCase } from './application/use-cases/cambiar-clave.use-case.js';
import { CambiarClaveDto } from './application/dto/cambiar-clave.dto.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase,
    private readonly obtenerUsuarioUseCase: ObtenerUsuarioUseCase,
    private readonly listarUsuariosUseCase: ListarUsuariosUseCase,
    private readonly actualizarUsuarioUseCase: ActualizarUsuarioUseCase,
    private readonly eliminarUsuarioUseCase: EliminarUsuarioUseCase,
    private readonly cambiarClaveUseCase: CambiarClaveUseCase,
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
  @Get('perfil')
  async obtenerMiPerfil(@Req() req: Request) {
    const userId = (req.user as any).sub;
    return this.obtenerUsuarioUseCase.ejecutar(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('perfil')
  async actualizarMiPerfil(@Req() req: Request, @Body() actualizarUsuarioDto: ActualizarUsuarioDto) {
    const userId = (req.user as any).sub;
    return this.actualizarUsuarioUseCase.ejecutar(userId, actualizarUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('perfil/cambiar-clave')
  async cambiarMiClave(@Req() req: Request, @Body() cambiarClaveDto: CambiarClaveDto) {
    const userId = (req.user as any).sub;
    return this.cambiarClaveUseCase.ejecutar(userId, cambiarClaveDto);
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
  @Patch(':id/cambiar-clave')
  async cambiarClave(@Param('id', ParseIntPipe) id: number, @Body() cambiarClaveDto: CambiarClaveDto) {
    return this.cambiarClaveUseCase.ejecutar(id, cambiarClaveDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.eliminarUsuarioUseCase.ejecutar(id);
  }
}
