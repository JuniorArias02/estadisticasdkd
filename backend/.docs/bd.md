usuarios
├── id
├── nombre
├── apellido
├── correo
├── contrasena
├── activo
├── ultimo_acceso
├── creado_en
└── actualizado_en

roles
├── id
├── nombre
├── descripcion
├── activo
├── creado_en
└── actualizado_en

permisos
├── id
├── nombre
├── descripcion
├── modulo
├── accion
└── activo

usuario_rol
├── id
├── usuario_id
└── rol_id

rol_permiso
├── id
├── rol_id
└── permiso_id