import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ReportesChatboxRepository, FiltrosPeticiones, FiltrosFechas } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class HttpReportesChatboxRepository implements ReportesChatboxRepository {
  private readonly logger = new Logger(HttpReportesChatboxRepository.name);
  private token: string | null = null;
  private userId: number | null = null;
  private readonly baseUrl = process.env.API_CHATBOX_URL;

  private async autenticar(): Promise<void> {
    this.logger.log('Autenticacion api externa Chatbox');
    const response = await fetch(this.baseUrl + 'auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: process.env.API_CHATBOX_USER,
        password: process.env.API_CHATBOX_PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Error al autenticarse en la API de Chatbox: ${response.status} ${errorText}`);
      throw new UnauthorizedException('Error al autenticarse en la API de Chatbox');
    }

    const data = await response.json();
    this.token = data.token;
    this.userId = data.userId;
  }

  protected async fetchConToken(endpoint: string, options: RequestInit = {}): Promise<unknown> {
    if (!this.token) await this.autenticar();

    let response = await fetch(this.baseUrl + endpoint, {
      ...options,
      headers: { ...options.headers, Authorization: 'Bearer ' + this.token },
    });

    if (response.status === 401) {
      this.logger.log('Token expirado, reautenticando en Chatbox');
      await this.autenticar();
      response = await fetch(this.baseUrl + endpoint, {
        ...options,
        headers: { ...options.headers, Authorization: 'Bearer ' + this.token },
      });
    }

    if (!response.ok) {
      this.logger.error('Error al obtener el reporte de Chatbox: ' + endpoint);
      throw new Error('Error al obtener el reporte de Chatbox: ' + endpoint);
    }
    
    return response.json();
  }

  async obtenerUsuarios(): Promise<unknown> {
    this.logger.log('Obteniendo usuarios de Chatbox');
    return this.fetchConToken('users');
  }

  async obtenerRoles(): Promise<unknown> {
    this.logger.log('Obteniendo roles de Chatbox');
    return this.fetchConToken('roles');
  }

  async obtenerPeticionesActivas(): Promise<unknown> {
    this.logger.log('Obteniendo peticiones activas de Chatbox');
    return this.fetchConToken('soporte/peticiones?estado=AS,PE&tipo=ALL');
  }

  async obtenerPeticiones(filtros?: FiltrosPeticiones): Promise<unknown> {
    this.logger.log('Obteniendo peticiones con filtros de Chatbox');
    const query = new URLSearchParams();
    if (filtros?.fechaInicio) query.append('fechaInicio', filtros.fechaInicio);
    if (filtros?.fechaFin) query.append('fechaFin', filtros.fechaFin);
    if (filtros?.tipo) query.append('tipo', filtros.tipo);
    if (filtros?.estado) query.append('estado', filtros.estado);
    if (filtros?.nombreUsr) query.append('nombreUsr', filtros.nombreUsr);
    
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.fetchConToken(`soporte/peticiones${queryString}`);
  }

  async obtenerMensajes(phone: string, limit?: number, lastId?: number): Promise<unknown> {
    this.logger.log(`Obteniendo mensajes de Chatbox para ${phone}`);
    const query = new URLSearchParams();
    if (limit) query.append('limit', limit.toString());
    if (lastId) query.append('last_id', lastId.toString());
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.fetchConToken(`whatsapp/messages/${phone}${queryString}`);
  }

  async obtenerAdjuntos(phone: string, interactionId: number): Promise<unknown> {
    this.logger.log(`Obteniendo adjuntos de Chatbox para ${phone}, interaccion: ${interactionId}`);
    return this.fetchConToken(`whatsapp/attachments/${phone}/${interactionId}`);
  }

  protected async descargarArchivoConToken(endpoint: string, options: RequestInit = {}): Promise<Response> {
    if (!this.token) await this.autenticar();

    let response = await fetch(this.baseUrl + endpoint, {
      ...options,
      headers: { ...options.headers, Authorization: 'Bearer ' + this.token },
    });

    if (response.status === 401) {
      this.logger.log('Token expirado, reautenticando en Chatbox para descarga');
      await this.autenticar();
      response = await fetch(this.baseUrl + endpoint, {
        ...options,
        headers: { ...options.headers, Authorization: 'Bearer ' + this.token },
      });
    }

    if (!response.ok) {
      this.logger.error('Error al descargar el archivo de Chatbox: ' + endpoint);
      throw new Error('Error al descargar el archivo de Chatbox: ' + endpoint);
    }
    
    return response;
  }

  async descargarArchivo(fileId: number): Promise<{ buffer: Buffer; mimeType: string }> {
    this.logger.log(`Descargando archivo ${fileId} de Chatbox`);
    const response = await this.descargarArchivoConToken(`upload/${fileId}`);
    const arrayBuffer = await response.arrayBuffer();
    const mimeType = response.headers.get('content-type') || 'application/octet-stream';
    
    return {
      buffer: Buffer.from(arrayBuffer),
      mimeType,
    };
  }

  async obtenerAvances(idPeticion: number): Promise<unknown> {
    this.logger.log(`Obteniendo avances de la petición ${idPeticion}`);
    return this.fetchConToken(`soporte/avances/${idPeticion}`);
  }

  async obtenerAvancesPorEtapa(idEtapa: number, filtros?: FiltrosFechas): Promise<unknown> {
    this.logger.log(`Obteniendo avances de etapa ${idEtapa}`);
    const query = new URLSearchParams();
    if (filtros?.fechaInicio) query.append('fechaInicio', filtros.fechaInicio);
    if (filtros?.fechaFin) query.append('fechaFin', filtros.fechaFin);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.fetchConToken(`soporte/avances-etapa/${idEtapa}${queryString}`);
  }

  // --- Estadísticas ---
  async obtenerEstadisticasPeticionesAbiertas(): Promise<unknown> {
    this.logger.log('Obteniendo estadísticas de peticiones abiertas por gestor');
    return this.fetchConToken('statistics/selecionar-cantidad-peticiones-abiertas-por-gestor');
  }

  async obtenerEstadisticasPromedioCierre(fi: string, ff: string, tipo: string): Promise<unknown> {
    this.logger.log(`Obteniendo estadísticas de promedio de cierre (${fi} - ${ff} - ${tipo})`);
    return this.fetchConToken(`statistics/promedio-cierre-gestores/${fi}/${ff}/${tipo}`);
  }

  async obtenerEstadisticasSoportesPorEmpresa(fi: string, ff: string, tipo: string): Promise<unknown> {
    this.logger.log(`Obteniendo estadísticas de soportes por empresa (${fi} - ${ff} - ${tipo})`);
    return this.fetchConToken(`statistics/soportes-por-gestor-empresa/${fi}/${ff}/${tipo}`);
  }

  async obtenerEmpresas(): Promise<unknown> {
    this.logger.log('Obteniendo empresas de Chatbox');
    return this.fetchConToken('soporte/empresas');
  }
}
