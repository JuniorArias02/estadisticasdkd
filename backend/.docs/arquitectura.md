# Reglas de Arquitectura y Estándares para el Backend

Este documento establece las reglas arquitectónicas, estructurales y de desarrollo para el backend construido con **NestJS**, buscando mantener un código limpio, modular, escalable, testeable y mantenible.

La arquitectura se basa en principios de **Clean Architecture**, **Arquitectura Hexagonal**, **Separación de Responsabilidades** y **Casos de Uso (Use Cases)**.

---

## 1. Convenciones de Nomenclatura e Idioma

### 1.1. Idioma del código

Todo el código fuente debe estar escrito en **español**, incluyendo:

- Clases.
- Variables.
- Métodos.
- Interfaces.
- Entidades.
- Casos de uso.
- Repositorios.
- DTOs.
- Lógica de negocio.
- Mensajes de error relacionados con el negocio.

Ejemplo:

```typescript
export class ObtenerIndicadorUseCase {
  async ejecutar(id: number): Promise<Indicador> {
    // ...
  }
}
```

### 1.2. Estructura técnica

Los directorios correspondientes a conceptos técnicos o propios del framework deben utilizar nombres en **inglés**.

Ejemplos:

```text
common/
config/
domain/
application/
infrastructure/
repositories/
decorators/
filters/
guards/
interceptors/
```

### 1.3. Módulos de negocio

Los módulos funcionales del sistema deben utilizar nombres en **español**, representando directamente el dominio del negocio.

Ejemplos:

```text
usuarios/
indicadores/
trazabilidad/
contratistas/
proyectos/
documentos/
facturacion/
```

---

# 2. Principios Arquitectónicos

El código debe seguir los siguientes principios:

- **Single Responsibility Principle (SRP)**.
- **Open/Closed Principle (OCP)**.
- **Liskov Substitution Principle (LSP)**.
- **Interface Segregation Principle (ISP)**.
- **Dependency Inversion Principle (DIP)**.
- Separación entre dominio, aplicación e infraestructura.
- Bajo acoplamiento.
- Alta cohesión.
- Inyección de dependencias.
- Preferencia por composición sobre herencia cuando sea apropiado.

La arquitectura debe permitir modificar infraestructura sin modificar las reglas principales del negocio.

---

# 3. Estructura General del Proyecto

La estructura base será:

```text
src/
├── app.module.ts
├── main.ts
│
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
│
├── config/
│   ├── database.config.ts
│   └── environment.config.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
└── modules/
    │
    └── [modulo-negocio]/
        ├── domain/
        │   ├── entities/
        │   └── repositories/
        │
        ├── application/
        │   ├── dto/
        │   └── use-cases/
        │
        ├── infrastructure/
        │   └── repositories/
        │
        ├── [modulo-negocio].controller.ts
        └── [modulo-negocio].module.ts
```

Ejemplo:

```text
modules/
└── indicadores/
    ├── domain/
    │   ├── entities/
    │   │   └── indicador.entity.ts
    │   └── repositories/
    │       └── indicador.repository.ts
    │
    ├── application/
    │   ├── dto/
    │   │   ├── crear-indicador.dto.ts
    │   │   └── consultar-indicador.dto.ts
    │   └── use-cases/
    │       ├── crear-indicador.use-case.ts
    │       └── obtener-indicador.use-case.ts
    │
    ├── infrastructure/
    │   └── repositories/
    │       └── prisma-indicador.repository.ts
    │
    ├── indicadores.controller.ts
    └── indicadores.module.ts
```

---

# 4. Capas de la Arquitectura

## 4.1. Domain

Contiene las reglas y conceptos principales del negocio.

Puede contener:

- Entidades.
- Objetos de valor.
- Interfaces de repositorios.
- Reglas de negocio.

El dominio **no debe depender de NestJS, Prisma ni de infraestructura externa**.

---

## 4.2. Application

Contiene los casos de uso de la aplicación.

Aquí se encuentran:

- Casos de uso.
- DTOs relacionados con operaciones.
- Orquestación de reglas de negocio.
- Coordinación entre repositorios y servicios externos.

Los casos de uso representan acciones concretas que el sistema puede ejecutar.

Ejemplos:

```text
crear-indicador.use-case.ts
obtener-indicador.use-case.ts
actualizar-indicador.use-case.ts
eliminar-indicador.use-case.ts
generar-reporte.use-case.ts
```

---

## 4.3. Infrastructure

Contiene las implementaciones técnicas necesarias para que el sistema funcione.

Ejemplos:

- Prisma.
- Bases de datos.
- Redis.
- APIs externas.
- Servicios de correo.
- Almacenamiento de archivos.
- Implementaciones de repositorios.

La infraestructura implementa contratos definidos por las capas superiores.

---

## 4.4. Presentation

Está representada principalmente por los controladores y elementos relacionados con HTTP.

Su responsabilidad es:

1. Recibir la petición.
2. Validar los datos.
3. Ejecutar el caso de uso correspondiente.
4. Transformar la respuesta a HTTP.

---

# 5. Controladores

Los archivos `*.controller.ts` deben tener una responsabilidad limitada.

### Permitido

- Definir endpoints.
- Recibir parámetros.
- Recibir DTOs.
- Ejecutar casos de uso.
- Definir códigos HTTP.
- Retornar respuestas.

### Prohibido

Los controladores no deben:

- Contener lógica de negocio.
- Consultar Prisma directamente.
- Ejecutar consultas SQL.
- Realizar cálculos complejos.
- Contener múltiples condiciones relacionadas con reglas de negocio.
- Procesar grandes cantidades de datos.
- Implementar operaciones que correspondan a un caso de uso.

Ejemplo:

```typescript
@Get(':id')
async obtener(@Param('id') id: number) {
  return this.obtenerIndicadorUseCase.ejecutar(id);
}
```

---

# 6. Casos de Uso

Cada operación de negocio importante debe estar representada por un caso de uso independiente.

Ejemplos:

```text
CrearIndicadorUseCase
ObtenerIndicadorUseCase
ActualizarIndicadorUseCase
EliminarIndicadorUseCase
GenerarReporteUseCase
```

Cada caso de uso debe tener una única responsabilidad principal.

### Reglas

- Deben ser fácilmente testeables.
- Deben ser inyectables.
- No deben depender directamente de Prisma.
- No deben contener lógica HTTP.
- No deben utilizar `Request`, `Response` ni objetos propios del controlador.
- Deben comunicarse con infraestructura mediante abstracciones.

Ejemplo:

```typescript
@Injectable()
export class ObtenerIndicadorUseCase {
  constructor(
    private readonly indicadorRepository: IndicadorRepository,
  ) {}

  async ejecutar(id: number): Promise<Indicador> {
    const indicador = await this.indicadorRepository.obtenerPorId(id);

    if (!indicador) {
      throw new NotFoundException('Indicador no encontrado');
    }

    return indicador;
  }
}
```

---

# 7. Repositorios

Los repositorios representan el acceso a los datos.

La interfaz o contrato del repositorio debe encontrarse en `domain`.

Ejemplo:

```typescript
export abstract class IndicadorRepository {
  abstract obtenerPorId(id: number): Promise<Indicador | null>;
  abstract listar(): Promise<Indicador[]>;
  abstract crear(indicador: Indicador): Promise<Indicador>;
}
```

La implementación concreta debe encontrarse en `infrastructure`.

```text
domain/
└── repositories/
    └── indicador.repository.ts

infrastructure/
└── repositories/
    └── prisma-indicador.repository.ts
```

---

# 8. Regla de Prisma

**Prisma debe utilizarse únicamente desde la capa de infraestructura.**

Los siguientes componentes no deben acceder directamente a `PrismaService`:

- Controladores.
- Casos de uso.
- Entidades de dominio.
- DTOs.

El acceso a Prisma debe realizarse mediante repositorios.

Incorrecto:

```typescript
@Injectable()
export class CrearIndicadorUseCase {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
}
```

Correcto:

```typescript
@Injectable()
export class CrearIndicadorUseCase {
  constructor(
    private readonly indicadorRepository: IndicadorRepository,
  ) {}
}
```

---

# 9. DTOs y Validación

Todas las entradas provenientes de HTTP deben estar representadas mediante DTOs.

Los DTOs deben utilizar `class-validator` y, cuando sea necesario, `class-transformer`.

Ejemplo:

```typescript
export class CrearIndicadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsPositive()
  meta: number;
}
```

No se deben recibir objetos sin tipado definido.

Prohibido:

```typescript
crear(@Body() datos: any)
```

Preferido:

```typescript
crear(@Body() datos: CrearIndicadorDto)
```

---

# 10. Tipado Estricto

El uso de `any` está prohibido salvo casos excepcionales técnicamente justificados.

Todas las entradas, salidas, parámetros y estructuras internas deben estar correctamente tipadas.

Se debe preferir:

```typescript
unknown
```

sobre:

```typescript
any
```

cuando no se conozca el tipo de un dato.

También se recomienda mantener habilitadas las opciones estrictas de TypeScript.

---

# 11. Validación Global

La aplicación debe utilizar un `ValidationPipe` global.

Se recomienda configurar:

```typescript
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
```

Esto permite:

- Eliminar propiedades no declaradas.
- Rechazar propiedades desconocidas.
- Transformar tipos cuando corresponda.
- Centralizar la validación de entrada.

---

# 12. Manejo de Errores

No se deben replicar bloques `try-catch` innecesarios.

NestJS debe encargarse del manejo de excepciones mediante sus mecanismos nativos y filtros globales.

Se deben utilizar excepciones apropiadas:

```typescript
NotFoundException
BadRequestException
UnauthorizedException
ForbiddenException
ConflictException
UnprocessableEntityException
```

Ejemplo:

```typescript
if (!usuario) {
  throw new NotFoundException('Usuario no encontrado');
}
```

Los `try-catch` deben utilizarse cuando exista una razón concreta para:

- Transformar una excepción.
- Recuperarse de un error.
- Registrar información adicional.
- Ejecutar una acción alternativa.

---

# 13. Filtros Globales

Los errores HTTP y errores inesperados deben manejarse mediante filtros globales ubicados en:

```text
common/filters/
```

Los filtros deben proporcionar respuestas consistentes y evitar exponer:

- Stack traces.
- Consultas SQL.
- Credenciales.
- Tokens.
- Información interna de infraestructura.

---

# 14. Respuestas HTTP

Las APIs deben mantener una estructura de respuesta consistente.

Ejemplo:

```json
{
  "data": {},
  "message": "Indicador obtenido correctamente",
  "statusCode": 200
}
```

Para asegurar esto, el proyecto cuenta con un **`ResponseInterceptor` global** que envuelve automáticamente cualquier objeto retornado por un controlador en esta estructura, y un **`HttpExceptionFilter` global** que normaliza las respuestas de error.

**Regla obligatoria:** Los controladores simplemente deben retornar la `data` pura (o un objeto con `{ data, message }` si desean personalizar el mensaje), sin preocuparse por construir la estructura completa de la respuesta HTTP, ya que los interceptores lo harán automáticamente.

Las respuestas deben utilizar códigos HTTP apropiados.

Ejemplos:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

No se deben utilizar códigos HTTP incorrectos únicamente para simplificar la implementación.

---

# 15. Reglas de Negocio

Las reglas de negocio deben permanecer fuera de:

- Controladores.
- DTOs.
- Repositorios.
- Configuración.
- Infraestructura.

Ejemplo de regla de negocio:

```text
Un contratista no puede ser asignado a un proyecto si no cumple los requisitos obligatorios.
```

Esta regla debe ser gestionada desde el dominio o caso de uso correspondiente.

---

# 16. Dependencias entre Módulos

Los módulos deben estar desacoplados.

Un módulo no debe acceder directamente a:

- Tablas de otro módulo.
- Repositorios internos de otro módulo.
- Prisma para consultar información perteneciente a otro módulo.
- Archivos internos de otro módulo.

Si un módulo necesita información de otro, debe utilizar una interfaz o servicio/caso de uso expuesto mediante el contrato correspondiente.

---

# 17. Transacciones

Las operaciones que modifiquen múltiples registros o entidades y requieran atomicidad deben ejecutarse dentro de una transacción.

Ejemplo:

```typescript
await prisma.$transaction(async (transaccion) => {
  // operaciones relacionadas
});
```

Las transacciones deben utilizarse únicamente cuando sean necesarias y deben evitarse para operaciones simples.

---

# 18. Consultas y Optimización

Las consultas deben diseñarse teniendo en cuenta:

- Índices.
- Relaciones.
- Paginación.
- Cantidad de datos.
- Campos realmente necesarios.
- Consultas N+1.
- Agregaciones.

Las consultas utilizadas frecuentemente para filtros, relaciones o búsquedas deben contar con índices apropiados en la base de datos cuando corresponda.

No se debe cargar información innecesaria.

Incorrecto:

```typescript
await prisma.usuario.findMany();
```

si únicamente se necesitan tres campos.

Preferible:

```typescript
await prisma.usuario.findMany({
  select: {
    id: true,
    nombre: true,
    correo: true,
  },
});
```

---

# 19. Paginación

Los endpoints que puedan retornar grandes cantidades de información deben utilizar paginación.

Se debe evitar devolver colecciones potencialmente ilimitadas.

Ejemplo:

```text
GET /usuarios?page=1&limit=20
```

La implementación debe establecer límites razonables para evitar consultas excesivamente grandes.

---

# 20. Configuración y Variables de Entorno

Los valores configurables deben manejarse mediante variables de entorno.

Ejemplo:

```env
DATABASE_URL=
JWT_SECRET=
API_KEY=
REDIS_URL=
```

Está prohibido almacenar directamente en el código:

- Contraseñas.
- Tokens.
- API Keys.
- Secretos.
- Credenciales.
- URLs sensibles de infraestructura.

La configuración debe validarse al iniciar la aplicación.

---

# 21. Seguridad

La aplicación debe aplicar como mínimo:

- Autenticación.
- Autorización.
- Control de roles y permisos.
- Hash seguro de contraseñas.
- Validación de entradas.
- Protección de endpoints sensibles.
- Configuración adecuada de CORS.
- Rate limiting cuando corresponda.

Nunca se deben retornar contraseñas, tokens internos u otros secretos en respuestas HTTP.

---

# 22. Logs y Auditoría

No se debe utilizar `console.log` como mecanismo principal de logging en producción.

Se debe utilizar el sistema de logging de NestJS o una solución de logging definida por el proyecto.

Los logs deben:

- Incluir contexto suficiente.
- Evitar información sensible.
- Permitir rastrear errores.
- Diferenciar niveles de severidad.

Nunca registrar:

```text
Contraseñas
Tokens
API Keys
Secretos
Información sensible innecesaria
```

---

# 23. Integraciones Externas

Las APIs y servicios externos deben estar aislados de la lógica principal.

Ejemplos:

```text
infrastructure/
├── http/
├── correo/
├── almacenamiento/
└── servicios-externos/
```

Los casos de uso no deben depender directamente de librerías específicas de terceros cuando pueda utilizarse una abstracción.

---

# 24. Pruebas

Cada caso de uso importante debe contar con pruebas unitarias.

Las pruebas deben verificar principalmente:

- Flujo exitoso.
- Entidad inexistente.
- Datos inválidos.
- Reglas de negocio.
- Errores esperados.
- Permisos.
- Comportamiento ante dependencias externas.

Los casos de uso deben poder probarse sin necesidad de conectarse a una base de datos real.

Ejemplo:

```text
use-cases/
├── crear-indicador.use-case.ts
└── obtener-indicador.use-case.ts

tests/
├── crear-indicador.use-case.spec.ts
└── obtener-indicador.use-case.spec.ts
```

---

# 25. Nombres de Archivos

Los archivos deben utilizar `kebab-case`.

Ejemplos:

```text
crear-indicador.use-case.ts
obtener-usuario.use-case.ts
prisma-indicador.repository.ts
crear-usuario.dto.ts
usuario.entity.ts
```

Las clases deben utilizar `PascalCase`.

```typescript
CrearIndicadorUseCase
ObtenerUsuarioUseCase
PrismaIndicadorRepository
CrearUsuarioDto
```

Las variables y métodos deben utilizar `camelCase`.

```typescript
obtenerIndicador()
crearUsuario()
indicadorRepository
```

---

# 26. Métodos

Los métodos deben representar acciones claras.

Preferir:

```typescript
obtenerUsuario()
crearUsuario()
actualizarUsuario()
eliminarUsuario()
validarRequisitos()
generarReporte()
```

Evitar nombres ambiguos:

```typescript
hacer()
procesar()
manejar()
ejecutarTodo()
```

salvo que el contexto justifique claramente su utilización.

---

# 27. Dependencia Invertida

Las capas internas no deben depender de implementaciones concretas de infraestructura.

La dirección de dependencia debe favorecer:

```text
Presentation
     ↓
Application
     ↓
Domain
     ↑
Infrastructure
```

Infrastructure implementa los contratos definidos por Domain/Application.

---

# 28. Servicios

No se deben crear servicios genéricos únicamente por costumbre.

Un servicio debe existir cuando represente una responsabilidad clara.

Se debe evitar:

```text
usuario.service.ts
```

con cientos de métodos que hagan:

- Crear usuarios.
- Generar reportes.
- Enviar correos.
- Validar permisos.
- Consultar estadísticas.
- Modificar configuraciones.

Estas responsabilidades deben dividirse en casos de uso y componentes especializados.

---

# 29. Código Duplicado

Se debe evitar la duplicación de lógica.

Si una misma regla o comportamiento aparece repetidamente, se debe evaluar si corresponde extraerlo a:

- Servicio de dominio.
- Función reutilizable.
- Clase especializada.
- Utilidad transversal.

No se debe abstraer código prematuramente únicamente para reducir algunas líneas.

---

# 30. Comentarios

El código debe ser suficientemente claro por sí mismo.

Los comentarios deben explicar principalmente:

- Por qué se tomó una decisión.
- Restricciones técnicas.
- Comportamientos no evidentes.
- Reglas externas que condicionan la implementación.

Evitar comentarios que simplemente describan lo que el código ya expresa.

Incorrecto:

```typescript
// Incrementar contador
contador++;
```

Preferible:

```typescript
// Se mantiene el contador para conservar compatibilidad
// con el sistema externo de reportes.
contador++;
```

---

# 31. Código Muerto

No debe mantenerse código comentado, funciones sin uso, imports innecesarios o archivos obsoletos.

Si una funcionalidad ya no se utiliza, debe eliminarse mediante el control de versiones en lugar de conservar grandes bloques comentados.

---

# 32. Formato y Calidad de Código

El proyecto debe utilizar herramientas automatizadas para mantener consistencia:

- ESLint.
- Prettier.
- TypeScript.
- Husky o herramientas equivalentes cuando sea necesario.

El código debe pasar las validaciones configuradas antes de integrarse a la rama principal.

---

# 33. Variables y Constantes

Las constantes globales o de configuración no deben estar dispersas por el código.

Preferir:

```typescript
const LIMITE_PAGINACION = 100;
```

o una configuración centralizada cuando el valor sea configurable.

Evitar números o cadenas mágicas:

```typescript
if (limite > 100) {
  // ...
}
```

cuando el valor tenga significado de negocio o configuración.

---

# 34. Commits

Los commits deben ser pequeños, descriptivos y relacionados con una única responsabilidad.

Se recomienda utilizar una convención como:

```text
feat: agregar consulta de indicadores
fix: corregir cálculo de tiempos
refactor: separar repositorio de indicadores
test: agregar pruebas de creación de indicadores
docs: actualizar reglas de arquitectura
chore: actualizar dependencias
```

---

# 35. Principio General

Ante cualquier nueva funcionalidad se debe evaluar:

1. ¿A qué módulo pertenece?
2. ¿Es una regla de negocio?
3. ¿Debe ser un caso de uso?
4. ¿Necesita acceso a datos?
5. ¿Necesita un repositorio?
6. ¿Es infraestructura?
7. ¿Es una preocupación transversal?
8. ¿Puede probarse de manera aislada?
9. ¿Existe una responsabilidad única y clara?
10. ¿La solución mantiene bajo acoplamiento entre módulos?

La arquitectura debe utilizarse para **facilitar el mantenimiento del sistema**, no para introducir complejidad innecesaria.

---

# 36. Regla de Oro

> **El controlador recibe la petición, el caso de uso ejecuta la operación, el dominio contiene las reglas del negocio y la infraestructura se encarga de los detalles técnicos.**

La implementación debe priorizar:

**Claridad → Separación de responsabilidades → Testabilidad → Mantenibilidad → Escalabilidad**

antes que introducir abstracciones innecesarias.


Node.js
└── NestJS
    ├── TypeScript
    ├── Prisma
    ├── PostgreSQL
    ├── JWT
    ├── class-validator
    ├── class-transformer
    ├── Swagger / OpenAPI
    └── ESLint + Prettier

