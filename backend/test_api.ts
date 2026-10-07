import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ObtenerHistorialActividadesUseCase } from './src/modules/reportes-gerenciales/application/use-cases/obtener-historial-actividades.use-case';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const useCase = app.get(ObtenerHistorialActividadesUseCase);
  
  try {
    const result = await useCase.ejecutar({
      nombre: 'SOPORTE.DESARROLLO',
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31'
    });
    console.log(JSON.stringify(result.resumen, null, 2));
    if (result.actividades.length > 0) {
      console.log('Sample ticket:', result.actividades[0]);
    }
  } catch (error) {
    console.error(error);
  }
  
  await app.close();
}
bootstrap();
