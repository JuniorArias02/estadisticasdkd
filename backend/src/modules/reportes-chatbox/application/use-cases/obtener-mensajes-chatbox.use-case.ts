import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportesChatboxRepository } from '../../domain/repositories/reportes-chatbox.repository.js';
import * as crypto from 'crypto';

@Injectable()
export class ObtenerMensajesChatboxUseCase {
  constructor(private readonly reportesChatboxRepository: ReportesChatboxRepository) {}

  async ejecutar(phone: string, limit?: number, lastId?: number): Promise<unknown> {
    const data = await this.reportesChatboxRepository.obtenerMensajes(phone, limit, lastId) as any;
    
    if (!data || !data.messages) {
      return data;
    }

    const keyString = process.env.ENCRYPTION_KEY;
    if (!keyString || keyString.length !== 32) {
      throw new InternalServerErrorException('Falta configurar ENCRYPTION_KEY de 32 caracteres en .env');
    }

    const key = Buffer.from(keyString, 'utf-8');

    const encryptContent = (text: string | null) => {
      if (!text) return text;
      
      const iv = crypto.randomBytes(12); // GCM recomienda 12 bytes
      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
      
      let encrypted = cipher.update(text, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      const authTag = cipher.getAuthTag().toString('base64');
      
      // Formato: iv:authTag:encryptedContent
      return `${iv.toString('base64')}:${authTag}:${encrypted}`;
    };

    data.messages = data.messages.map((msg: any) => {
      if (msg.content) {
        msg.content = encryptContent(msg.content);
      }
      return msg;
    });

    return data;
  }
}
