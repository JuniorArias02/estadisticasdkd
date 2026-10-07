import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Token de refresco válido y no expirado' })
  @IsString()
  @IsNotEmpty({ message: 'El refresh_token es obligatorio' })
  refresh_token: string;
}
