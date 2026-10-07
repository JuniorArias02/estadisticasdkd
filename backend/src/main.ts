import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  // Configurar zona horaria por defecto si viene en las variables de entorno
  if (process.env.TZ) {
    process.env.TZ = process.env.TZ;
  }

  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Puerto por defecto de Vite
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro de excepciones para normalizar errores
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interceptor para normalizar respuestas exitosas
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Estadísticas DKD')
    .setDescription('Documentación de la API del sistema de Estadísticas DKD')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
