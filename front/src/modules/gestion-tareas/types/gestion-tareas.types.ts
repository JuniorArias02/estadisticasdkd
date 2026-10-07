export interface Equipo {
  id: number;
  name: string;
  description: string;
  active: number;
  created_at: string;
}

export interface MetricasUsuario {
  user_id: number;
  name: string;
  email: string;
  role: string;
  total_asignadas: number;
  pendientes: number;
  en_proceso: number;
  en_validacion: number;
  retroalimentacion: number;
  finalizadas: number;
  canceladas: number;
  retrasadas: number;
  progreso_promedio: number;
  tareas_vencidas: number;
  finalizadas_a_tiempo: number;
  finalizadas_retrasadas: number;
  dias_mora_acumulados: number;
}

export interface TareaHistory {
  date: string;
  msg: string;
  userId: number;
}

export interface TareaComment {
  id: number;
  task_id: number;
  user_id: number;
  user_name: string;
  message: string;
  created_at: string;
}

export interface TareaAsignada {
  task_id: number;
  title: string;
  description: string;
  task_status: string;
  priority: string;
  task_progress: number;
  due_date: string;
  created_at: string;
  updated_at: string;
  assign_status: string;
  assign_progress: number;
  observation: string;
  specific_activity: string;
  history: TareaHistory[];
  comments: TareaComment[];
}

export interface DetalleUsuario {
  summary: MetricasUsuario;
  tasks: TareaAsignada[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}
