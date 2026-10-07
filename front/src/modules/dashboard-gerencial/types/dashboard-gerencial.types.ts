export interface RendimientoMiembro {
  user_id: number;
  name: string;
  tareas_asignadas: string;
  pendientes: string;
  en_proceso: string;
  finalizadas: string;
  tareas_vencidas: string;
  progreso_promedio: string;
}

export interface DashboardManagerData {
  total_tareas_recibidas: string;
  pendientes: string;
  en_proceso: string;
  en_validacion: string;
  retroalimentacion: string;
  cerradas_exitosamente: string;
  canceladas: string;
  retrasadas: string;
  tareas_vencidas: string;
}

export interface RequerimientoFrecuente {
  priority: string;
  cantidad: string;
}

export interface CargaRealMiembro {
  nombre: string;
  tickets_chatbox: number;
  tareas_asignadas: number;
  total_actividades: number;
}

export interface ActividadHistorial {
  id_origen: string;
  tipo: 'Ticket' | 'Tarea';
  fuente: string;
  cliente: string;
  actividad: string;
  estado: string;
  fecha: string;
  tiempo_dedicado: string;
}

export interface ResumenHistorial {
  total_actividades: number;
  total_tickets: number;
  total_tareas: number;
}

export interface HistorialPersonaData {
  empleado: string;
  resumen: ResumenHistorial;
  actividades: ActividadHistorial[];
}
