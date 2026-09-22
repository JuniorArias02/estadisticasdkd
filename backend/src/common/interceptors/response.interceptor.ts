import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  message: string;
  statusCode: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        // Si el controlador ya devolvió un formato con 'message' y 'data', lo respetamos
        if (data && typeof data === 'object' && 'data' in data && 'message' in data) {
          return {
            ...data,
            statusCode: response.statusCode,
          };
        }
        
        // Formato estándar por defecto
        return {
          data: data || {},
          message: 'Operación exitosa',
          statusCode: response.statusCode,
        };
      }),
    );
  }
}
