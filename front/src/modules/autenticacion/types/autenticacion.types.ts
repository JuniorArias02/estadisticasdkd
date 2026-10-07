export interface CredencialesLogin {
  correo: string;
  contrasena: string;
}

export interface RespuestaAutenticacion {
  data: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
  statusCode: number;
}

export interface PayloadJwt {
  sub: number;
  correo: string;
  nombre: string;
  apellido: string;
  roles: string[];
  permisos: string[];
  iat: number;
  exp: number;
}
