import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CambiarClaveDto {
  @IsString()
  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  nuevaContrasena: string;
}
