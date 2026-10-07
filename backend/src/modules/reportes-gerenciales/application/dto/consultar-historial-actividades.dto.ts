import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ConsultarHistorialActividadesDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  fechaInicio?: string;

  @IsOptional()
  @IsString()
  fechaFin?: string;
}
