export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  activo: boolean;
  ultimo_acceso?: Date | null;
  creado_en: Date;
  actualizado_en: Date;
  
  // Omitimos la contraseña intencionalmente en la entidad principal
  // para evitar fugas de información.
}
