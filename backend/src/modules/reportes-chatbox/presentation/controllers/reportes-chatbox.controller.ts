import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard.js';
import { ObtenerUsuariosChatboxUseCase } from '../../application/use-cases/obtener-usuarios-chatbox.use-case.js';
import { ObtenerRolesChatboxUseCase } from '../../application/use-cases/obtener-roles-chatbox.use-case.js';
import { ObtenerPeticionesActivasUseCase } from '../../application/use-cases/obtener-peticiones-activas.use-case.js';
import { ObtenerMensajesChatboxUseCase } from '../../application/use-cases/obtener-mensajes-chatbox.use-case.js';
import { ObtenerAdjuntosChatboxUseCase } from '../../application/use-cases/obtener-adjuntos-chatbox.use-case.js';
import { ObtenerArchivoChatboxUseCase } from '../../application/use-cases/obtener-archivo-chatbox.use-case.js';
import { ObtenerEstadisticasPeticionesAbiertasUseCase } from '../../application/use-cases/obtener-estadisticas-peticiones.use-case.js';
import { ObtenerEstadisticasCierreUseCase } from '../../application/use-cases/obtener-estadisticas-cierre.use-case.js';
import { ObtenerEstadisticasSoportesUseCase } from '../../application/use-cases/obtener-estadisticas-soportes.use-case.js';
import { ObtenerAvancesChatboxUseCase } from '../../application/use-cases/obtener-avances-chatbox.use-case.js';
import { ObtenerPeticionesUseCase } from '../../application/use-cases/obtener-peticiones.use-case.js';
import { ConsultarPeticionesDto } from '../../application/dto/consultar-peticiones.dto.js';
import { ObtenerResumenPeticionesUseCase } from '../../application/use-cases/obtener-resumen-peticiones.use-case.js';
import { ObtenerCierrePorClienteUseCase } from '../../application/use-cases/obtener-cierre-por-cliente.use-case.js';
import { ObtenerPeticionesPorResponsableUseCase } from '../../application/use-cases/obtener-peticiones-por-responsable.use-case.js';
import { ObtenerPeticionesPorModuloUseCase } from '../../application/use-cases/obtener-peticiones-por-modulo.use-case.js';
import { ObtenerPeticionesPorCategoriaUseCase } from '../../application/use-cases/obtener-peticiones-por-categoria.use-case.js';
import { ObtenerPeticionesPorPrioridadUseCase } from '../../application/use-cases/obtener-peticiones-por-prioridad.use-case.js';
import { ObtenerTendenciaPeticionesUseCase } from '../../application/use-cases/obtener-tendencia-peticiones.use-case.js';
import { ObtenerEmpresasUseCase } from '../../application/use-cases/obtener-empresas.use-case.js';
import { ObtenerDetalleEmpresaUseCase } from '../../application/use-cases/obtener-detalle-empresa.use-case.js';
@Controller('reportes-chatbox')
@UseGuards(JwtAuthGuard)
export class ReportesChatboxController {
  constructor(
    private readonly obtenerUsuariosChatboxUseCase: ObtenerUsuariosChatboxUseCase,
    private readonly obtenerRolesChatboxUseCase: ObtenerRolesChatboxUseCase,
    private readonly obtenerPeticionesActivasUseCase: ObtenerPeticionesActivasUseCase,
    private readonly obtenerMensajesChatboxUseCase: ObtenerMensajesChatboxUseCase,
    private readonly obtenerAdjuntosChatboxUseCase: ObtenerAdjuntosChatboxUseCase,
    private readonly obtenerArchivoChatboxUseCase: ObtenerArchivoChatboxUseCase,
    private readonly obtenerEstadisticasPeticionesAbiertasUseCase: ObtenerEstadisticasPeticionesAbiertasUseCase,
    private readonly obtenerEstadisticasCierreUseCase: ObtenerEstadisticasCierreUseCase,
    private readonly obtenerEstadisticasSoportesUseCase: ObtenerEstadisticasSoportesUseCase,
    private readonly obtenerAvancesChatboxUseCase: ObtenerAvancesChatboxUseCase,
    private readonly obtenerPeticionesUseCase: ObtenerPeticionesUseCase,
    private readonly obtenerResumenPeticionesUseCase: ObtenerResumenPeticionesUseCase,
    private readonly obtenerCierrePorClienteUseCase: ObtenerCierrePorClienteUseCase,
    private readonly obtenerPeticionesPorResponsableUseCase: ObtenerPeticionesPorResponsableUseCase,
    private readonly obtenerPeticionesPorModuloUseCase: ObtenerPeticionesPorModuloUseCase,
    private readonly obtenerPeticionesPorCategoriaUseCase: ObtenerPeticionesPorCategoriaUseCase,
    private readonly obtenerPeticionesPorPrioridadUseCase: ObtenerPeticionesPorPrioridadUseCase,
    private readonly obtenerTendenciaPeticionesUseCase: ObtenerTendenciaPeticionesUseCase,
    private readonly obtenerEmpresasUseCase: ObtenerEmpresasUseCase,
    private readonly obtenerDetalleEmpresaUseCase: ObtenerDetalleEmpresaUseCase,
  ) {}
  
  @Get('users')
  async obtenerUsuarios() {
    return this.obtenerUsuariosChatboxUseCase.ejecutar();
  }

  @Get('users/role/:rolId')
  async obtenerUsuariosPorRol(@Param('rolId') rolId: string) {
    return this.obtenerUsuariosChatboxUseCase.ejecutar(parseInt(rolId, 10));
  }

  @Get('roles')
  async obtenerRoles() {
    return this.obtenerRolesChatboxUseCase.ejecutar();
  }

  // --- EMPRESAS ---
  @Get('empresas')
  async obtenerEmpresas() {
    return this.obtenerEmpresasUseCase.ejecutar();
  }

  @Get('empresas/:nombreEmpresa/detalle')
  async obtenerDetalleEmpresa(
    @Param('nombreEmpresa') nombreEmpresa: string,
    @Query() filtros: ConsultarPeticionesDto,
  ) {
    return this.obtenerDetalleEmpresaUseCase.ejecutar(nombreEmpresa, filtros);
  }

  @Get('peticiones/activas/:nombreResponsable')
  async obtenerPeticionesActivas(@Param('nombreResponsable') nombreResponsable: string) {
    return this.obtenerPeticionesActivasUseCase.ejecutar(nombreResponsable);
  }

  @Get('peticiones')
  async obtenerPeticiones(@Query() filtros: ConsultarPeticionesDto) {
    return this.obtenerPeticionesUseCase.ejecutar(filtros);
  }

  // --- ESTADÍSTICAS ---
  @Get('estadisticas/peticiones/resumen')
  async obtenerResumenPeticiones(@Query() filtros: ConsultarPeticionesDto) {
    return this.obtenerResumenPeticionesUseCase.ejecutar(filtros);
  }

  @Get('estadisticas/peticiones/cierre-por-cliente')
  async obtenerCierrePorCliente(@Query() filtros: ConsultarPeticionesDto) {
    return this.obtenerCierrePorClienteUseCase.ejecutar(filtros);
  }

  @Get('estadisticas/peticiones/por-responsable')
  async obtenerPeticionesPorResponsable(@Query() filtros: ConsultarPeticionesDto) {
    return this.obtenerPeticionesPorResponsableUseCase.ejecutar(filtros);
  }

  @Get('estadisticas/peticiones/por-modulo')
  async obtenerPeticionesPorModulo(@Query() filtros: ConsultarPeticionesDto) {
    return this.obtenerPeticionesPorModuloUseCase.ejecutar(filtros);
  }

  @Get('estadisticas/peticiones/por-categoria')
  async obtenerPeticionesPorCategoria(@Query() filtros: ConsultarPeticionesDto) {
    return this.obtenerPeticionesPorCategoriaUseCase.ejecutar(filtros);
  }

  @Get('estadisticas/peticiones/por-prioridad')
  async obtenerPeticionesPorPrioridad(@Query() filtros: ConsultarPeticionesDto) {
    return this.obtenerPeticionesPorPrioridadUseCase.ejecutar(filtros);
  }

  @Get('estadisticas/peticiones/tendencia')
  async obtenerTendenciaPeticiones(@Query() filtros: ConsultarPeticionesDto & { agruparPor?: 'dia' | 'semana' | 'mes' }) {
    return this.obtenerTendenciaPeticionesUseCase.ejecutar(filtros);
  }


  @Get('messages/:phone')
  async obtenerMensajes(
    @Param('phone') phone: string,
    @Query('limit') limit?: string,
    @Query('last_id') lastId?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const parsedLastId = lastId ? parseInt(lastId, 10) : undefined;
    return this.obtenerMensajesChatboxUseCase.ejecutar(phone, parsedLimit, parsedLastId);
  }

  @Get('attachments/:phone/:interactionId')
  async obtenerAdjuntos(
    @Param('phone') phone: string,
    @Param('interactionId') interactionId: string,
  ) {
    return this.obtenerAdjuntosChatboxUseCase.ejecutar(phone, parseInt(interactionId, 10));
  }

  @Get('upload/:fileId')
  async descargarArchivo(
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ) {
    const { buffer, mimeType } = await this.obtenerArchivoChatboxUseCase.ejecutar(parseInt(fileId, 10));
    res.set({
      'Content-Type': mimeType,
      'Content-Length': buffer.length,
    });
    res.send(buffer);
  }

  @Get('avances/:idPeticion')
  async obtenerAvances(
    @Param('idPeticion') idPeticion: string,
  ) {
    return this.obtenerAvancesChatboxUseCase.ejecutar(parseInt(idPeticion, 10));
  }

  // --- Estadísticas ---
  @Get('statistics/peticiones-abiertas')
  async obtenerEstadisticasPeticionesAbiertas() {
    return this.obtenerEstadisticasPeticionesAbiertasUseCase.ejecutar();
  }

  @Get('statistics/peticiones-abiertas/:nombreGestor')
  async obtenerEstadisticasPeticionesAbiertasPorGestor(
    @Param('nombreGestor') nombreGestor: string,
  ) {
    return this.obtenerEstadisticasPeticionesAbiertasUseCase.ejecutar(nombreGestor);
  }

  @Get('statistics/promedio-cierre/:fi/:ff/:tipo')
  async obtenerEstadisticasCierre(
    @Param('fi') fi: string,
    @Param('ff') ff: string,
    @Param('tipo') tipo: string,
  ) {
    return this.obtenerEstadisticasCierreUseCase.ejecutar(fi, ff, tipo);
  }

  @Get('statistics/promedio-cierre-gestor/:fi/:ff/:tipo/:responsableId')
  async obtenerEstadisticasCierrePorGestor(
    @Param('fi') fi: string,
    @Param('ff') ff: string,
    @Param('tipo') tipo: string,
    @Param('responsableId') responsableId: string,
  ) {
    return this.obtenerEstadisticasCierreUseCase.ejecutar(fi, ff, tipo, parseInt(responsableId, 10));
  }

  @Get('statistics/soportes-empresa/:fi/:ff/:tipo')
  async obtenerEstadisticasSoportes(
    @Param('fi') fi: string,
    @Param('ff') ff: string,
    @Param('tipo') tipo: string,
  ) {
    return this.obtenerEstadisticasSoportesUseCase.ejecutar(fi, ff, tipo);
  }

  @Get('statistics/soportes-empresa-gestor/:fi/:ff/:tipo/:responsableId')
  async obtenerEstadisticasSoportesPorGestor(
    @Param('fi') fi: string,
    @Param('ff') ff: string,
    @Param('tipo') tipo: string,
    @Param('responsableId') responsableId: string,
  ) {
    return this.obtenerEstadisticasSoportesUseCase.ejecutar(fi, ff, tipo, parseInt(responsableId, 10));
  }
}
