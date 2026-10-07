import { Module } from '@nestjs/common';
import { ReportesChatboxController } from './presentation/controllers/reportes-chatbox.controller.js';
import { SoporteController } from './presentation/controllers/soporte.controller.js';
import { ReportesChatboxRepository } from './domain/repositories/reportes-chatbox.repository.js';
import { HttpReportesChatboxRepository } from './infrastructure/repositories/http-reportes-chatbox.repository.js';

import { AuthModule } from '../auth/auth.module.js';
import { ObtenerUsuariosChatboxUseCase } from './application/use-cases/obtener-usuarios-chatbox.use-case.js';
import { ObtenerRolesChatboxUseCase } from './application/use-cases/obtener-roles-chatbox.use-case.js';
import { ObtenerPeticionesActivasUseCase } from './application/use-cases/obtener-peticiones-activas.use-case.js';
import { ObtenerMensajesChatboxUseCase } from './application/use-cases/obtener-mensajes-chatbox.use-case.js';
import { ObtenerAdjuntosChatboxUseCase } from './application/use-cases/obtener-adjuntos-chatbox.use-case.js';
import { ObtenerArchivoChatboxUseCase } from './application/use-cases/obtener-archivo-chatbox.use-case.js';
import { ObtenerEstadisticasPeticionesAbiertasUseCase } from './application/use-cases/obtener-estadisticas-peticiones.use-case.js';
import { ObtenerEstadisticasCierreUseCase } from './application/use-cases/obtener-estadisticas-cierre.use-case.js';
import { ObtenerEstadisticasSoportesUseCase } from './application/use-cases/obtener-estadisticas-soportes.use-case.js';
import { ObtenerAvancesChatboxUseCase } from './application/use-cases/obtener-avances-chatbox.use-case.js';
import { ObtenerPeticionesUseCase } from './application/use-cases/obtener-peticiones.use-case.js';
import { ObtenerResumenPeticionesUseCase } from './application/use-cases/obtener-resumen-peticiones.use-case.js';
import { ObtenerCierrePorClienteUseCase } from './application/use-cases/obtener-cierre-por-cliente.use-case.js';
import { ObtenerPeticionesPorResponsableUseCase } from './application/use-cases/obtener-peticiones-por-responsable.use-case.js';
import { ObtenerPeticionesPorModuloUseCase } from './application/use-cases/obtener-peticiones-por-modulo.use-case.js';
import { ObtenerPeticionesPorCategoriaUseCase } from './application/use-cases/obtener-peticiones-por-categoria.use-case.js';
import { ObtenerPeticionesPorPrioridadUseCase } from './application/use-cases/obtener-peticiones-por-prioridad.use-case.js';
import { ObtenerTendenciaPeticionesUseCase } from './application/use-cases/obtener-tendencia-peticiones.use-case.js';
import { ObtenerAvancesEtapaUseCase } from './application/use-cases/obtener-avances-etapa.use-case.js';
import { ObtenerEstadisticasSoporteUseCase } from './application/use-cases/obtener-estadisticas-soporte.use-case.js';
import { ObtenerEmpresasUseCase } from './application/use-cases/obtener-empresas.use-case.js';
import { ObtenerDetalleEmpresaUseCase } from './application/use-cases/obtener-detalle-empresa.use-case.js';
@Module({
  imports: [AuthModule],
  controllers: [ReportesChatboxController, SoporteController],
  providers: [
    ObtenerUsuariosChatboxUseCase,
    ObtenerRolesChatboxUseCase,
    ObtenerPeticionesActivasUseCase,
    ObtenerMensajesChatboxUseCase,
    ObtenerAdjuntosChatboxUseCase,
    ObtenerArchivoChatboxUseCase,
    ObtenerEstadisticasPeticionesAbiertasUseCase,
    ObtenerEstadisticasCierreUseCase,
    ObtenerEstadisticasSoportesUseCase,
    ObtenerAvancesChatboxUseCase,
    ObtenerPeticionesUseCase,
    ObtenerResumenPeticionesUseCase,
    ObtenerCierrePorClienteUseCase,
    ObtenerPeticionesPorResponsableUseCase,
    ObtenerPeticionesPorModuloUseCase,
    ObtenerPeticionesPorCategoriaUseCase,
    ObtenerPeticionesPorPrioridadUseCase,
    ObtenerTendenciaPeticionesUseCase,
    ObtenerAvancesEtapaUseCase,
    ObtenerEstadisticasSoporteUseCase,
    ObtenerEmpresasUseCase,
    ObtenerDetalleEmpresaUseCase,
    {
      provide: ReportesChatboxRepository,
      useClass: HttpReportesChatboxRepository,
    },
  ],
  exports: [ReportesChatboxRepository],
})
export class ReportesChatboxModule {}
