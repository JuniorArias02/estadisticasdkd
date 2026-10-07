# Estadísticas Generales DKD — Backend API

API REST del sistema de estadísticas generales de DKD. Construida con **NestJS 12**, **Prisma 5** y **MySQL 8**, siguiendo una arquitectura modular por capas (Domain → Application → Infrastructure).

## Stack técnico

| Capa          | Tecnología                          |
| ------------- | ----------------------------------- |
| Framework     | NestJS 12                           |
| Lenguaje      | TypeScript 6                        |
| ORM           | Prisma 5                            |
| Base de datos | MySQL 8                             |
| Autenticación | JWT + Passport                      |
| Validación    | class-validator / class-transformer |
| Tests         | Vitest                              |
| Runtime       | Node.js 24                          |

---

## Módulos del sistema

- **`auth`** — Login, generación y validación de JWT
- **`usuarios`** — CRUD de usuarios, asignación de roles
- **`roles`** — Gestión de roles y sus permisos asociados

### Modelo de datos

```
Usuario ──── UsuarioRol ──── Rol ──── RolPermiso ──── Permiso
```

Cada usuario puede tener múltiples roles, y cada rol puede tener múltiples permisos agrupados por módulo y acción.

---

## Requisitos

- **Docker** y **Docker Compose** _(para el despliegue recomendado)_
- **Node.js >= 24** y **npm >= 10** _(solo si corres el proyecto localmente sin Docker)_

---

## Despliegue con Docker (recomendado)

No necesitas instalar Node, MySQL ni ninguna dependencia local. Docker levanta todo: la base de datos, las migraciones y la API.

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd backend

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores reales (ver sección Variables de entorno)

# 3. Levantar los servicios
docker compose up -d --build
```

Eso es todo. La API quedará disponible en `http://localhost:3000`.

Al iniciar, el contenedor de la API ejecuta automáticamente `prisma migrate deploy`, aplicando todas las migraciones pendientes.

### Comandos útiles de Docker

```bash
# Ver los logs en tiempo real
docker compose logs -f

# Detener los servicios (conserva los volúmenes de datos)
docker compose down

# Detener y eliminar los volúmenes (resetea la BD)
docker compose down -v

# Reconstruir solo la imagen de la API
docker compose up -d --build api

docker compose up -d

```

---

## Desarrollo local (sin Docker)

Si prefieres correr el proyecto directamente en tu máquina:

```bash
# Instalar dependencias
npm install

# Generar el cliente de Prisma
npm run prisma:generate

# Aplicar migraciones en la BD local
npm run prisma:migrate

# Iniciar en modo watch (hot-reload)
npm run start:dev
```

> Asegúrate de tener MySQL 8 corriendo localmente y el `DATABASE_URL` en tu `.env` apuntando a él.

---

## Variables de entorno

Copia `.env.example` como `.env` y completa los valores:

```bash
cp .env.example .env
```

| Variable           | Descripción                                 | Ejemplo                                            |
| ------------------ | ------------------------------------------- | -------------------------------------------------- |
| `DATABASE_URL`     | Cadena de conexión a MySQL                  | `mysql://root:pass@localhost:3306/estadisticasDkd` |
| `DB_ROOT_PASSWORD` | Contraseña root de MySQL (usada por Docker) | `password`                                         |
| `DB_NAME`          | Nombre de la base de datos                  | `estadisticasDkd`                                  |
| `JWT_SECRET`       | Clave secreta para firmar los tokens JWT    | `un_secreto_largo_y_seguro`                        |
| `JWT_EXPIRATION`   | Tiempo de vida del token JWT                | `4h`                                               |

> ⚠️ El archivo `.env` está en `.gitignore` y nunca debe subirse al repositorio.

---

## Prisma

```bash
# Generar el cliente (obligatorio después de modificar schema.prisma)
npm run prisma:generate

# Crear una nueva migración en desarrollo
npm run prisma:migrate

# Explorar la base de datos visualmente
npm run prisma:studio

# Poblar la base de datos con datos iniciales
npm run seed
```

---

## Documentación (Swagger)

La API cuenta con documentación interactiva generada automáticamente mediante `@nestjs/swagger`.

Para acceder a la interfaz gráfica de Swagger UI:
1. Asegúrate de tener la API corriendo (`npm run start:dev` o mediante Docker).
2. Abre tu navegador y navega a: [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

> 💡 **Nota**: Gracias al plugin de compilación de Swagger habilitado en `nest-cli.json`, los DTOs y tipos de retorno son inferidos directamente desde el código TypeScript sin necesidad de decoradores manuales por cada controlador.

---

## Tests

```bash
# Correr todos los tests unitarios
npm test

# Modo watch
npm run test:watch

# Reporte de cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e
```

---

## Estructura del proyecto

```
src/
├── common/           # Guards, decoradores y utilidades compartidas
├── modules/
│   ├── auth/         # Autenticación JWT
│   ├── roles/        # Gestión de roles y permisos
│   └── usuarios/     # Gestión de usuarios
│       ├── application/   # DTOs y casos de uso
│       ├── domain/        # Entidades e interfaces
│       └── infrastructure/ # Repositorios y controladores
prisma/
├── schema.prisma     # Definición del esquema de la BD
├── migrations/       # Historial de migraciones
└── seed.ts           # Datos iniciales
```
