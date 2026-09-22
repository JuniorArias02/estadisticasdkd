import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Error interno del servidor', error: 'Internal Server Error' };

    let message =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as any).message || 'Ocurrió un error inesperado';
        
    const errorTitle = typeof errorResponse === 'object' ? (errorResponse as any).error : 'Error';

    response.status(status).json({
      statusCode: status,
      message,
      error: errorTitle,
    });
  }
}
