export interface ChatboxUser {
  id: number;
  name: string;
  state: string;
  email: string;
  rolId: number;
  rolName: string;
}

export interface ChatboxRole {
  id: number;
  name: string;
}

export interface PeticionChat {
  Id: number;
  Ticket: string;
  Asunto: string;
  Telefono: string;
  InteraccionId: number;
  Responsable: string;
  Estado: string;
  Etapa: string;
  FechaAsignado: string;
}

export interface PeticionRegistro extends PeticionChat {
  FechaIng: string;
  Correo: string | null;
  NombreUsr: string;
  Nombre: string | null;
  Modulo: string;
  Proyecto: string;
  Categoria: string;
  SubCategoria: string;
  Prioridad: string;
  Cliente: string;
  UltimoResponsable: string | null;
  UltimaAsignacion: string | null;
  UltimoAvance: string | null;
  FechaCierre: string | null;
  tieneAvance: boolean;
}

export interface MetaPaginacion {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PeticionesPaginadas {
  items: PeticionRegistro[];
  meta: MetaPaginacion;
}

export interface MensajeChat {
  id: number;
  message_type: 'RECEIVED' | 'SENT';
  content_type: string;
  content: string;
  status: string;
  creation_date: string;
  from_user_name?: string;
}

export interface ChatAttachment {
  id: number;
  message_type: 'RECEIVED' | 'SENT';
  content_type: string;
  ws_message: string;
  attach_id: number;
  creation_date: string;
  file_name: string;
  mime_type: string;
}

export interface PromedioCierreGestor {
  ResponsableId: number;
  NombreResponsable: string;
  TotalCasos: number;
  TotalCasosAbiertos: string | number;
  PromedioMinutosCierre: string;
}

export interface SoporteEmpresaGestor {
  ResponsableId: number;
  Responsable: string;
  EmpresaId: number;
  Empresa: string;
  Cantidad: number;
}

export interface PeticionAvance {
  Id: number;
  PeticionId: number;
  Responsable: string;
  Etapa: string;
  Comentario: string;
  FechaIng: string;
}
