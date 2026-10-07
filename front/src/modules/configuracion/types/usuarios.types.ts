export interface Rol {
  id: number;
  nombre: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  activo: boolean;
  roles?: Rol[];
}

export interface CrearUsuarioDto {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
}

export interface ActualizarPerfilDto {
  nombre?: string;
  apellido?: string;
}

export interface ActualizarUsuarioDto {
  nombre?: string;
  apellido?: string;
  correo?: string;
  activo?: boolean;
}

export interface CambiarClaveDto {
  nuevaContrasena: string;
}
