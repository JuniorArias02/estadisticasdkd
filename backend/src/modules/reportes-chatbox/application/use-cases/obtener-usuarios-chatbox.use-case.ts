import { Injectable } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';

@Injectable()
export class ObtenerUsuariosChatboxUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(rolId?: number): Promise<unknown> {
    const usuarios = await this.reportesChatboxRepository.obtenerUsuarios() as any[];
    
    if (rolId) {
      return usuarios.filter(usuario => usuario.rolId === rolId);
    }
    
    return usuarios;
  }
}
