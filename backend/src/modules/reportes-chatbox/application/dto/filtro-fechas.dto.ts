import { IsOptional, IsString } from 'class-validator';

export class FiltroFechasDto {
  @IsOptional()
  @IsString()
  fechaInicio?: string;

  @IsOptional()
  @IsString()
  fechaFin?: string;
}
