# Prompt para el Agente de Frontend

Actúa como un desarrollador frontend experto. Tu tarea es implementar los servicios de peticiones HTTP (API Client) y la integración correspondiente en el **Módulo de Soporte** de nuestra aplicación frontend.

A continuación te detallo la lista completa de endpoints que el backend expone para los reportes de tareas. Debes crear los métodos necesarios para consumir cada uno de estos endpoints y crear las **Interfaces o Tipos de TypeScript** correspondientes basándote en la estructura de JSON real proporcionada para cada endpoint.

Ten en cuenta que todas las peticiones son de tipo `GET` y requieren autenticación (envío de token Bearer en las cabeceras). 

### Consideraciones Generales:
1. **Tipado (TypeScript):** Usa los JSON de ejemplo proporcionados en cada endpoint para crear las interfaces de respuesta. Si los datos retornados son un arreglo, el JSON de ejemplo mostrará la estructura de al menos un ítem de dicho arreglo para que puedas inferir los tipos correctos.
2. **Manejo de Errores:** Implementa un manejo de errores adecuado para cada petición.
3. **Autenticación:** Asegúrate de incluir el token de autorización en cada petición.
4. **Módulo:** Todo esto debe quedar estructurado dentro del módulo de **Soporte**.

---

### Lista de Endpoints a Implementar:

#### 1. obtenerResumenProductividad
- **Método:** `obtenerResumenProductividad`
- **Endpoint:** `/reports/productivity`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 18,
    "colaborador": "VANESSA TORRADO",
    "email": "mercadeo@dkdingenierias.com.co",
    "rol_sistema": "admin",
    "total_asignadas": "50",
    "finalizadas": "43",
    "pendientes": "6",
    "en_proceso": "0",
    "en_validacion": "0",
    "retrasadas": "0",
    "canceladas": "1",
    "total_activas": "6",
    "tasa_cierre_pct": "86.0",
    "progreso_promedio_pct": "88.0"
  }
]
```

#### 2. obtenerProductividadFiltro
- **Método:** `obtenerProductividadFiltro`
- **Endpoint:** `/reports/productivity/filter?fecha_inicio=2026-08-01&fecha_fin=2026-08-31`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 25,
    "colaborador": "MELANY ORTIZ",
    "tareas_periodo": "11",
    "finalizadas_periodo": "10",
    "pendientes_periodo": "1",
    "efectividad_cierre_pct": "90.9",
    "avance_promedio": "100.0"
  }
]
```

#### 3. obtenerEvolucionMensual
- **Método:** `obtenerEvolucionMensual`
- **Endpoint:** `/reports/productivity/monthly-evolution`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "mes": "2026-05",
    "colaborador": "JOSE RAGUA",
    "asignadas": "6",
    "cerradas": "6",
    "pendientes": "0",
    "porcentaje_exito": "100.0"
  }
]
```

#### 4. obtenerSemaforoTareas
- **Método:** `obtenerSemaforoTareas`
- **Endpoint:** `/reports/productivity/traffic-light`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 20,
    "colaborador": "ANGIE MARKETING",
    "task_id": 19,
    "titulo_tarea": "adicionales de cortes del quinto video 05 RESOLUCION 2284 DE 2023",
    "area": "MARKETING",
    "prioridad": "alta",
    "estado_asignado": "en_validacion",
    "progreso_individual": 100,
    "fecha_creacion": "2026-05-29T05:00:00.000Z",
    "fecha_compromiso": "2026-05-29T05:00:00.000Z",
    "dias_transcurridos": 118,
    "estado_semaforo": "VENCIDA (118 días de mora)",
    "actividad_asignada": "Adicionales de cortes - EDICIÓN",
    "ultima_observacion": null
  }
]
```

#### 5. obtenerDrillDownColaborador
- **Método:** `obtenerDrillDownColaborador`
- **Endpoint:** `/reports/productivity/drill-down/18`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "tarea_id": 181,
    "titulo": "EDICIÓN DE VIDEOS Y REDES SOCIALES",
    "descripcion_general": "",
    "area": "MARKETING",
    "prioridad": "media",
    "estado_persona": "pendiente",
    "avance_persona": 0,
    "actividad_especifica": "",
    "observacion_entrega": null,
    "fecha_creacion": "2026-09-17T05:00:00.000Z",
    "fecha_limite": "2026-09-17T05:00:00.000Z",
    "fecha_cierre_o_actualizacion": "2026-09-17T05:00:00.000Z",
    "dictamen_cumplimiento": "PENDIENTE RETRASADA (+7 días)",
    "dias_dedicados": 0,
    "asignado_por": "VANESSA TORRADO"
  }
]
```

#### 6. obtenerProductividadCruzada
- **Método:** `obtenerProductividadCruzada`
- **Endpoint:** `/reports/productivity/cross-role-team`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "equipo_pertenencia": "MARKETING",
    "rol": "admin",
    "cantidad_colaboradores": "3",
    "total_tareas_asignadas": "56",
    "tareas_finalizadas": "49",
    "tareas_pendientes": "7",
    "tasa_cierre_equipo_pct": "87.5",
    "promedio_avance_equipo": "89.3"
  }
]
```

#### 7. obtenerCumplimientoPlazos
- **Método:** `obtenerCumplimientoPlazos`
- **Endpoint:** `/reports/times/cycle-compliance`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 18,
    "colaborador": "VANESSA TORRADO",
    "total_tareas_asignadas": "50",
    "total_finalizadas": "43",
    "finalizadas_a_tiempo": "18",
    "finalizadas_vencidas": "25",
    "pct_cumplimiento_en_tiempo": "41.9",
    "pendientes_en_plazo": "1",
    "pendientes_vencidas_activas": "5"
  }
]
```

#### 8. obtenerTiemposPromedioCierre
- **Método:** `obtenerTiemposPromedioCierre`
- **Endpoint:** `/reports/times/average-closing`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 5,
    "colaborador": "DAREN CABALLERO",
    "tareas_finalizadas_analizadas": "2",
    "dias_promedio_cierre": "5.0",
    "horas_promedio_cierre": "117.0",
    "dias_min_cierre": "5",
    "dias_max_cierre": "5"
  }
]
```

#### 9. obtenerTiempoPrimeraRespuesta
- **Método:** `obtenerTiempoPrimeraRespuesta`
- **Endpoint:** `/reports/times/first-response`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 18,
    "colaborador": "VANESSA TORRADO",
    "tareas_asignadas": "50",
    "tareas_con_interaccion": "50",
    "horas_promedio_primera_respuesta": "5.9",
    "dias_promedio_primera_respuesta": "0.2"
  }
]
```

#### 10. obtenerDesviacionFechaLimite
- **Método:** `obtenerDesviacionFechaLimite`
- **Endpoint:** `/reports/times/deviation`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador": "JOSE RAGUA",
    "tareas_evaluadas_con_limite": "6",
    "dias_desviacion_promedio": "2.5",
    "max_dias_retraso": "38",
    "max_dias_anticipacion": "21"
  }
]
```

#### 11. obtenerTiemposCierrePrioridad
- **Método:** `obtenerTiemposCierrePrioridad`
- **Endpoint:** `/reports/times/closing-by-priority`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "prioridad": "alta",
    "total_asignaciones": "24",
    "finalizadas": "19",
    "dias_promedio_cierre": "24.8",
    "horas_promedio_cierre": "592.1",
    "pct_cumplimiento_plazos": "10.5"
  }
]
```

#### 12. obtenerAntiguedadCasosPendientes
- **Método:** `obtenerAntiguedadCasosPendientes`
- **Endpoint:** `/reports/times/aging`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "tarea_id": 16,
    "titulo_caso": "Seguimiento pendientes ocaña",
    "colaborador_responsable": "MAIRA GOMEZ",
    "prioridad": "media",
    "estado_actual": "pendiente",
    "avance_reportado": 0,
    "fecha_ingreso": "2026-05-28T05:00:00.000Z",
    "fecha_vencimiento": "2026-06-12T05:00:00.000Z",
    "dias_abierta_sin_cerrar": 119,
    "dias_de_retraso_vencida": 104
  }
]
```

#### 13. obtenerResumenEjecutivoArea
- **Método:** `obtenerResumenEjecutivoArea`
- **Endpoint:** `/reports/areas/executive-summary`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "area_equipo": "MARKETING",
    "descripcion_area": "",
    "total_tareas_creadas": "101",
    "total_asignaciones": "99",
    "colaboradores_activos": "6",
    "tareas_finalizadas": "88",
    "tareas_activas": "13",
    "tasa_cierre_area_pct": "87.1",
    "avance_ponderado_pct": "90.7"
  }
]
```

#### 14. obtenerMapaColaboradoresArea
- **Método:** `obtenerMapaColaboradoresArea`
- **Endpoint:** `/reports/areas/collaborator-map`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "area": "SIN EQUIPO FORMAL",
    "colaborador": "ADMINISTRADOR ADMIN",
    "rol_institucional": "admin",
    "tareas_asignadas": "0",
    "finalizadas": "0",
    "pendientes": "0",
    "progreso_medio": null
  }
]
```

#### 15. obtenerClasificacionTareasProyecto
- **Método:** `obtenerClasificacionTareasProyecto`
- **Endpoint:** `/reports/areas/classification-by-company`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "cliente_empresa": "Proyectos Generales / Operación Interna",
    "total_requerimientos": "115",
    "cerrados": "84",
    "pendientes": "34",
    "cumplimiento_pct": "73.0",
    "personal_asignado": "14"
  }
]
```

#### 16. obtenerDrillDownCliente
- **Método:** `obtenerDrillDownCliente`
- **Endpoint:** `/reports/areas/drill-down-client?clienteKeyword=a`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "ticket_o_tarea_id": 182,
    "fecha_recepcion": "2026-09-17T05:00:00.000Z",
    "cliente_detectado": "a",
    "asunto": "feat en siscontra",
    "descripcion_resumen": "1. Agregar un campo para fecha para la generación de hoja de vida en contratista de manera individual. Se debe permitir seleccionar una fecha personalizada al momento de generar la",
    "prioridad": "alta",
    "estado_general": "finalizada",
    "colaborador_responsable": "JUNIOR ARIAS",
    "estado_colaborador": "finalizada",
    "avance_pct": 100,
    "fecha_compromiso": "2026-09-21T05:00:00.000Z",
    "fecha_cierre_gestion": "2026-09-21T05:00:00.000Z",
    "dias_atencion": 4,
    "ultima_gestion_observaciones": "se completa la implementacion, falta subir a produccion"
  }
]
```

#### 17. obtenerTrazabilidadReuniones
- **Método:** `obtenerTrazabilidadReuniones`
- **Endpoint:** `/reports/areas/meetings-traceability`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "acta_reunion_id": 68,
    "titulo_reunion": "Seguimiento Desarrollo",
    "fecha_reunion": "2026-08-19T06:19:00.000Z",
    "area_comite": "DESARROLLO",
    "organizador": "JOSE RAGUA",
    "total_asistentes": "5",
    "compromisos_generados": "2",
    "compromisos_cerrados": "5",
    "compromisos_pendientes": "5",
    "cumplimiento_reunion_pct": "250.0"
  }
]
```

#### 18. obtenerParticipacionComite
- **Método:** `obtenerParticipacionComite`
- **Endpoint:** `/reports/areas/meetings-participation`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 10,
    "colaborador": "JOSE RAGUA",
    "rol": "admin",
    "reuniones_asistidas": "78",
    "areas_involucradas": "4",
    "tareas_asignadas": "6",
    "tareas_cerradas": "468"
  }
]
```

#### 19. obtenerPromedioActividades
- **Método:** `obtenerPromedioActividades`
- **Endpoint:** `/reports/traceability/average-activities`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 18,
    "colaborador": "VANESSA TORRADO",
    "total_actividades_registradas": "235",
    "dias_con_actividad_efectiva": "40",
    "promedio_actividades_por_dia_activo": "5.88",
    "primera_actividad_registrada": "2026-05-28T05:00:00.000Z",
    "ultima_actividad_registrada": "2026-09-17T05:00:00.000Z"
  }
]
```

#### 20. obtenerBitacoraEventos
- **Método:** `obtenerBitacoraEventos`
- **Endpoint:** `/reports/traceability/event-log/1`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "tarea_id": 1,
    "titulo_tarea": "Ajuste SisContra",
    "fecha_evento": "2026-05-27T22:18:51.042Z",
    "mensaje_evento": "Tarea creada",
    "autor_evento": "ADMINISTRADOR ADMIN",
    "rol_autor": "admin"
  }
]
```

#### 21. obtenerTrazabilidadCronologica
- **Método:** `obtenerTrazabilidadCronologica`
- **Endpoint:** `/reports/traceability/chronological/1`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "registro_id": 1,
    "task_id": 1,
    "fecha_hora_registro": "2026-05-27T22:18:51.075Z",
    "colaborador": "ADMINISTRADOR ADMIN",
    "rol": "admin",
    "tipo_registro": "Actualización de Etapa / Estado",
    "contenido_detalle": "[Etapa — Brandon Buendia] Asignado a la tarea"
  }
]
```

#### 22. obtenerAuditoriaReasignaciones
- **Método:** `obtenerAuditoriaReasignaciones`
- **Endpoint:** `/reports/traceability/reassignment-audit`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "tarea_id": 173,
    "titulo_tarea": "realizar desarrollo",
    "estado_general_tarea": "pendiente",
    "progreso_global": 0,
    "total_responsables_involucrados": "2",
    "secuencia_responsables_y_estados": "NEPTALI GELVEZ [Estado: pendiente, Avance: 0%] -> DAREN CABALLERO [Estado: en_proceso, Avance: 0%]",
    "creador_original": "RAFAEL ALVAREZ",
    "fecha_creacion": "2026-09-14T05:00:00.000Z"
  }
]
```

#### 23. obtenerAuditoriaActividad
- **Método:** `obtenerAuditoriaActividad`
- **Endpoint:** `/reports/traceability/qualitative-vs-quantitative`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "colaborador_id": 18,
    "colaborador": "VANESSA TORRADO",
    "total_interacciones": "235",
    "actualizaciones_etapa_sistema": "235",
    "comentarios_manuales_cualitativos": "0",
    "pct_aporte_cualitativo": "0.0"
  }
]
```

#### 24. obtenerVistaCanonicaProductividad
- **Método:** `obtenerVistaCanonicaProductividad`
- **Endpoint:** `/reports/canonical/productivity`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "sistema_fuente": "GESTION_TAREAS",
    "colaborador_id": 18,
    "colaborador_nombre": "VANESSA TORRADO",
    "colaborador_email": "mercadeo@dkdingenierias.com.co",
    "rol_institucional": "admin",
    "areas_pertenencia": "MARKETING, TALENTO HUMANO",
    "total_casos": "139",
    "casos_cerrados": "128",
    "casos_abiertos": "6",
    "cerrados_en_tiempo": "46",
    "cerrados_vencidos": "82",
    "tasa_cumplimiento_pct": "35.9",
    "dias_promedio_cierre": "10.9",
    "horas_promedio_cierre": "261.9",
    "total_actividades_registradas": "139",
    "avance_ponderado_pct": "95.7"
  }
]
```

#### 25. obtenerVistaCanonicaDetalleCasos
- **Método:** `obtenerVistaCanonicaDetalleCasos`
- **Endpoint:** `/reports/canonical/case-detail`
- **Respuesta Esperada (Ejemplo de estructura real):**
```json
[
  {
    "sistema_fuente": "GESTION_TAREAS",
    "caso_id": 3,
    "tipo_requerimiento": "OTRAS_TAREAS / GESTION INTERNA",
    "cliente_empresa": "Digiturno",
    "area_asignada": "DESARROLLO",
    "asunto": "Documento Digiturno",
    "prioridad": "media",
    "estado_unificado": "Cerrado",
    "estado_original": "finalizada",
    "responsable_id": 4,
    "responsable_nombre": "DANIEL CAÑATE",
    "porcentaje_avance": 100,
    "fecha_creacion": "2026-05-27T22:25:06.454Z",
    "fecha_compromiso": "2026-05-29T05:00:00.000Z",
    "fecha_cierre_o_actualizacion": "2026-08-03T05:05:24.000Z",
    "dias_atencion": "68",
    "horas_atencion": "1614",
    "estado_cumplimiento": "Vencida",
    "actividad_especifica": "",
    "observacion_cierre": "Correcciones realizadas por el Ing Geovanny."
  }
]
```

---
**Instrucción Final:** Por favor, entrégame el código base para el servicio (por ejemplo, `ReportesSoporteService.ts` o equivalente). Debes incluir todas las **Interfaces TypeScript** generadas a partir de los ejemplos JSON (asegurándote de que los tipos de datos como number, string, boolean calcen perfecto con los ejemplos), y los métodos correspondientes que consuman los endpoints haciendo uso de nuestro cliente HTTP (como Axios o fetch). Asegúrate de manejar correctamente la URL base, los Path Params y los Query Params (si aplican en los paths dados).
