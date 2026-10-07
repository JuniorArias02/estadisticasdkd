import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsultarDetalleUsuarioDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  team_id?: number;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
