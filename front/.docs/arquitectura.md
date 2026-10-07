# Reglas de Arquitectura y Estándares para el Frontend

Este documento establece las reglas arquitectónicas, estructurales y de desarrollo para el frontend construido con **React + TypeScript**, buscando mantener una aplicación modular, escalable, mantenible, testeable y consistente.

La arquitectura se basa en **organización por dominios de negocio**, separación de responsabilidades, componentes reutilizables, tipado estricto y aislamiento de la infraestructura.

---

# 1. Convenciones de Idioma

## 1.1. Código en español

Todo el código relacionado con el negocio debe escribirse en **español**.

Esto incluye:

- Componentes relacionados con el negocio.
- Variables.
- Funciones.
- Hooks.
- Interfaces.
- Types.
- Estados.
- Servicios de dominio.
- Funciones de negocio.
- Validaciones.
- Selectores.
- Acciones.
- Contextos relacionados con el negocio.

Ejemplo:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

function obtenerUsuario(id: number) {
  // ...
}
```

No utilizar:

```typescript
interface User {
  id: number;
  name: string;
}
```

si representa una entidad del negocio.

---

# 2. Directorios Técnicos en Inglés

Los directorios relacionados con conceptos técnicos, infraestructura o herramientas deben utilizar nombres en inglés.

Ejemplos:

```text
components/
hooks/
services/
lib/
config/
utils/
routes/
store/
layouts/
assets/
providers/
types/
```

Los módulos o dominios del negocio deben utilizar español.

Ejemplos:

```text
usuarios/
indicadores/
contratistas/
proyectos/
facturacion/
documentos/
```

---

# 3. Arquitectura por Dominios

La aplicación debe organizarse principalmente por **dominios de negocio** y no únicamente por tipo de archivo.

Evitar una estructura global como:

```text
components/
├── Usuario.tsx
├── Indicador.tsx
├── Proyecto.tsx
└── Contratista.tsx

hooks/
├── useUsuario.ts
├── useIndicador.ts
└── useProyecto.ts
```

Esta estructura separa artificialmente elementos que pertenecen al mismo dominio.

Preferir:

```text
modules/
├── usuarios/
├── indicadores/
├── contratistas/
└── proyectos/
```

Cada dominio debe contener los elementos propios de su funcionalidad.

---

# 4. Estructura General

La estructura recomendada es:

```text
src/
├── app/
│   ├── router.tsx
│   ├── providers.tsx
│   └── app.tsx
│
├── assets/
│
├── components/
│   ├── ui/
│   └── layout/
│
├── config/
│
├── hooks/
│
├── lib/
│
├── routes/
│
├── store/
│
├── types/
│
├── utils/
│
└── modules/
    ├── usuarios/
    ├── indicadores/
    ├── contratistas/
    └── proyectos/
```

---

# 5. Estructura de un Dominio

Cada dominio puede organizarse de la siguiente manera:

```text
modules/
└── usuarios/
    ├── components/
    ├── hooks/
    ├── pages/
    ├── services/
    ├── types/
    ├── validations/
    ├── usuarios.routes.tsx
    └── index.ts
```

Ejemplo:

```text
modules/
└── indicadores/
    ├── components/
    │   ├── indicador-card.tsx
    │   ├── indicador-filtros.tsx
    │   └── indicador-tabla.tsx
    │
    ├── hooks/
    │   └── use-indicadores.ts
    │
    ├── pages/
    │   ├── indicadores-page.tsx
    │   └── detalle-indicador-page.tsx
    │
    ├── services/
    │   └── indicador.service.ts
    │
    ├── types/
    │   └── indicador.types.ts
    │
    ├── validations/
    │   └── indicador.validation.ts
    │
    └── index.ts
```

---

# 6. Componentes

Los componentes deben tener una única responsabilidad clara.

Un componente debe encargarse principalmente de representar la interfaz y manejar la interacción relacionada con ella.

Evitar componentes gigantes como:

```text
IndicadoresPage.tsx
```

con cientos de líneas que contengan:

- Peticiones HTTP.
- Transformación de datos.
- Validaciones.
- Cálculos.
- Estados complejos.
- Tablas.
- Formularios.
- Modales.

Preferir dividir:

```text
IndicadoresPage
├── IndicadorFiltros
├── IndicadorTabla
├── IndicadorCard
├── IndicadorModal
└── IndicadorResumen
```

---

# 7. Pages

Las páginas representan vistas completas de la aplicación.

Ejemplo:

```text
pages/
├── indicadores-page.tsx
├── detalle-indicador-page.tsx
└── crear-indicador-page.tsx
```

Una página debe encargarse principalmente de:

- Componer componentes.
- Obtener datos mediante hooks.
- Manejar el estado propio de la vista.
- Coordinar las acciones de la página.

La lógica compleja debe delegarse a hooks, servicios o componentes especializados.

---

# 8. Componentes de UI Reutilizables

Los componentes genéricos que no pertenecen a un dominio deben ubicarse en:

```text
components/
```

Ejemplo:

```text
components/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   ├── table.tsx
│   ├── badge.tsx
│   └── spinner.tsx
│
└── layout/
    ├── sidebar.tsx
    ├── header.tsx
    └── page-container.tsx
```

Estos componentes no deben contener lógica específica de un dominio.

Por ejemplo, `Button` no debe conocer qué es un "contratista".

---

# 9. Hooks

Los hooks personalizados deben utilizarse para encapsular lógica reutilizable relacionada con React.

Ejemplo:

```typescript
useIndicadores()
useCrearIndicador()
useAutenticacion()
usePaginacion()
```

Los hooks no deben convertirse en contenedores gigantes de lógica.

Un hook debe tener una responsabilidad clara.

---

# 10. Servicios

Los servicios se encargan de la comunicación con APIs externas o infraestructura.

Ejemplo:

```text
modules/
└── usuarios/
    └── services/
        └── usuario.service.ts
```

Ejemplo:

```typescript
export const obtenerUsuario = async (
  id: number,
): Promise<Usuario> => {
  const respuesta = await api.get(`/usuarios/${id}`);

  return respuesta.data;
};
```

Los componentes no deben realizar directamente peticiones HTTP.

Evitar:

```typescript
function UsuariosPage() {
  axios.get('/usuarios');
}
```

Preferir:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
API
```

---

# 11. Cliente HTTP

La configuración del cliente HTTP debe estar centralizada.

Ejemplo:

```text
lib/
└── api.ts
```

El cliente debe encargarse de aspectos transversales como:

- URL base.
- Headers.
- Tokens.
- Interceptores.
- Manejo común de errores.
- Configuración HTTP.

Los servicios de dominio utilizan este cliente.

```text
UsuarioService
      ↓
      api
      ↓
Backend
```

---

# 12. Tipado

El uso de `any` está prohibido salvo casos excepcionales y justificados.

Preferir:

```typescript
unknown
```

cuando no se conozca el tipo.

Todas las respuestas de la API deben tener tipos definidos.

Ejemplo:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}
```

Y:

```typescript
const obtenerUsuarios = async (): Promise<Usuario[]> => {
  // ...
};
```

---

# 13. DTOs y Tipos

Los tipos utilizados para comunicación con el backend deben estar claramente definidos.

Ejemplo:

```text
usuarios/
└── types/
    ├── usuario.types.ts
    └── usuario-api.types.ts
```

No se debe utilizar un único objeto genérico para representar cualquier estructura.

Diferenciar cuando sea necesario:

```typescript
Usuario
CrearUsuario
ActualizarUsuario
UsuarioRespuesta
```

---

# 14. Estado Global

No todo estado debe almacenarse globalmente.

Utilizar estado local cuando solamente sea necesario dentro de un componente:

```typescript
useState()
```

Utilizar estado global únicamente cuando múltiples partes de la aplicación necesiten compartirlo.

Ejemplos:

- Usuario autenticado.
- Permisos.
- Tema.
- Configuración global.
- Información compartida entre múltiples módulos.

Evitar almacenar innecesariamente en el estado global:

- Inputs de formularios.
- Modales locales.
- Estados temporales.
- Datos exclusivos de una página.

---

# 15. Store

El estado global debe mantenerse centralizado en:

```text
store/
```

Si se utiliza Redux Toolkit:

```text
store/
├── store.ts
└── slices/
    ├── autenticacion.slice.ts
    └── configuracion.slice.ts
```

Los nombres relacionados con el negocio deben permanecer en español.

---

# 16. Estado del Servidor

Los datos provenientes de APIs deben diferenciarse del estado global de la aplicación.

Cuando el proyecto utilice una herramienta como:

```text
TanStack Query
```

se debe utilizar para manejar:

- Caché.
- Loading.
- Errores.
- Refetch.
- Invalidación.
- Mutaciones.

No duplicar innecesariamente los datos de la API dentro de Redux u otro estado global.

---

# 17. Formularios

Los formularios deben separar:

- Presentación.
- Validación.
- Envío.
- Transformación de datos.

Ejemplo:

```text
usuarios/
├── components/
│   └── usuario-formulario.tsx
│
├── validations/
│   └── usuario.validation.ts
│
└── hooks/
    └── use-crear-usuario.ts
```

Las reglas de validación deben permanecer fuera del componente cuando sean suficientemente complejas o reutilizables.

---

# 18. Validaciones

Las validaciones del frontend deben mejorar la experiencia del usuario, pero **no sustituyen las validaciones del backend**.

El backend siempre debe considerarse la autoridad final para las reglas de negocio.

El frontend puede validar:

```text
Campo obligatorio
Formato de correo
Longitud
Formato de fecha
Valores permitidos
```

El backend debe validar nuevamente la información recibida.

---

# 19. Manejo de Errores

Los errores HTTP deben manejarse de forma consistente.

Evitar repetir en cada componente:

```typescript
try {
  // ...
} catch {
  // mostrar error
}
```

cuando el comportamiento sea global o reutilizable.

El cliente HTTP, hooks y utilidades pueden centralizar parte del manejo.

Los errores específicos de negocio deben mostrarse mediante mensajes comprensibles para el usuario.

No mostrar errores técnicos como:

```text
PrismaClientKnownRequestError
```

al usuario final.

---

# 20. Loading y Estados Vacíos

Toda operación asíncrona que pueda tardar debe contemplar:

```text
loading
success
empty
error
```

Ejemplo:

```text
Cargando indicadores...

No hay indicadores registrados.

Error al cargar los indicadores.

Indicadores encontrados.
```

No dejar interfaces en blanco mientras se espera una respuesta.

---

# 21. Rutas

Las rutas deben mantenerse separadas de los componentes.

Ejemplo:

```text
routes/
└── app.routes.tsx
```

Los dominios pueden declarar sus rutas específicas:

```text
modules/
└── indicadores/
    └── indicadores.routes.tsx
```

La configuración principal debe ensamblarlas.

---

# 22. Layouts

Los layouts globales deben ubicarse en:

```text
components/layout/
```

o:

```text
layouts/
```

Ejemplos:

```text
DashboardLayout
AutenticacionLayout
PaginaLayout
```

Los layouts no deben contener lógica específica de un dominio.

---

# 23. Autenticación

La autenticación debe estar aislada del resto de los dominios.

Ejemplo:

```text
modules/
└── autenticacion/
    ├── components/
    ├── hooks/
    ├── pages/
    ├── services/
    ├── types/
    └── autenticacion.routes.tsx
```

La información global de autenticación puede manejarse desde:

```text
store/
```

o mediante un provider/contexto cuando corresponda.

---

# 24. Permisos

La interfaz debe controlar la visibilidad de funcionalidades según los permisos del usuario.

Ejemplo:

```typescript
puede('crear', 'indicadores')
```

La validación del frontend únicamente controla la interfaz.

**Nunca debe considerarse una medida de seguridad.**

El backend debe validar siempre los permisos.

---

# 25. Utilidades

Las funciones realmente genéricas deben ubicarse en:

```text
utils/
```

Ejemplos:

```text
formatear-fecha.ts
formatear-moneda.ts
formatear-numero.ts
```

No colocar lógica específica de un dominio en `utils/`.

Si una función solamente tiene sentido para `indicadores`, debe permanecer dentro de:

```text
modules/indicadores/
```

---

# 26. Separación entre UI y Negocio

Los componentes visuales deben evitar contener reglas complejas del negocio.

Evitar:

```typescript
if (
  usuario.estado === 'activo' &&
  usuario.tipo === 'contratista' &&
  usuario.fechaVencimiento > fechaActual &&
  usuario.permisos.includes('crear')
) {
  // ...
}
```

dentro de múltiples componentes.

La lógica debe centralizarse en una función, hook o servicio apropiado.

---

# 27. Infraestructura

Las dependencias externas deben mantenerse aisladas.

Ejemplos:

```text
lib/
services/
config/
providers/
```

El código del dominio no debe depender directamente de detalles específicos de una librería cuando pueda existir una abstracción razonable.

Por ejemplo, evitar que toda la aplicación conozca directamente la configuración interna de Axios.

---

# 28. Variables de Entorno

Los valores configurables deben utilizar variables de entorno.

Ejemplo:

```env
VITE_API_URL=
```

No colocar URLs, claves o configuraciones sensibles directamente en componentes.

Las variables deben accederse desde un punto centralizado cuando sea apropiado.

---

# 29. Seguridad

Nunca almacenar información sensible innecesariamente.

No incluir:

- Contraseñas.
- Secretos.
- API Keys privadas.
- Tokens sensibles en código fuente.

Las credenciales deben manejarse siguiendo el mecanismo de autenticación definido por el backend.

El frontend nunca debe asumir que ocultar un botón constituye una medida de seguridad.

---

# 30. Componentes Reutilizables

Antes de crear un nuevo componente genérico, evaluar si ya existe uno reutilizable.

Sin embargo, no se debe crear abstracción prematuramente.

Un componente debe convertirse en reutilizable cuando:

- Se utiliza en varios lugares.
- Tiene comportamiento claramente genérico.
- Su API es estable.
- La abstracción simplifica el código.

---

# 31. Evitar Componentes Gigantes

No se deben crear componentes excesivamente grandes.

Si un componente empieza a manejar demasiadas responsabilidades, dividirlo.

Ejemplo:

```text
IndicadoresPage
├── IndicadoresHeader
├── IndicadoresFiltros
├── IndicadoresResumen
├── IndicadoresTabla
└── IndicadoresPaginacion
```

La división debe realizarse por responsabilidad y no simplemente para reducir líneas.

---

# 32. Nombres de Archivos

Los archivos deben utilizar `kebab-case`.

Ejemplos:

```text
indicador-card.tsx
indicador-formulario.tsx
use-indicadores.ts
usuario.service.ts
usuario.types.ts
usuario.validation.ts
```

Los componentes y clases deben utilizar `PascalCase`.

```typescript
IndicadorCard
IndicadorFormulario
```

Las variables y funciones deben utilizar `camelCase`.

```typescript
obtenerIndicadores()
crearUsuario()
usuarioSeleccionado
```

---

# 33. Exports

Cada dominio puede utilizar un `index.ts` para exponer únicamente aquello que otros módulos necesitan.

Ejemplo:

```text
usuarios/
└── index.ts
```

Evitar importar archivos internos profundos de otro dominio:

```typescript
import { algo } from '@/modules/usuarios/components/interno/algo';
```

Preferir:

```typescript
import { algo } from '@/modules/usuarios';
```

cuando ese elemento forme parte de la API pública del módulo.

---

# 34. Dependencias entre Dominios

Un dominio no debe depender innecesariamente de los detalles internos de otro dominio.

Si `indicadores` necesita información de `usuarios`, debe utilizar una interfaz o funcionalidad pública del dominio de usuarios.

Evitar acceder directamente a:

```text
modules/usuarios/components/
modules/usuarios/hooks/internos/
modules/usuarios/services/internos/
```

desde otro dominio.

---

# 35. Tests

Los componentes y lógica importante deben poder probarse de forma aislada.

Se deben priorizar pruebas para:

- Hooks.
- Validaciones.
- Funciones de negocio.
- Componentes críticos.
- Flujos importantes.
- Transformaciones de datos.

Las pruebas no deben depender innecesariamente de APIs reales.

---

# 36. Código Muerto

No mantener:

- Imports sin utilizar.
- Componentes abandonados.
- Hooks sin uso.
- Código comentado innecesariamente.
- Variables sin utilizar.
- Funciones obsoletas.

El código eliminado debe recuperarse mediante Git cuando sea necesario.

---

# 37. Comentarios

Los comentarios deben explicar principalmente **por qué** existe una implementación determinada.

Evitar:

```typescript
// Obtener usuarios
const usuarios = obtenerUsuarios();
```

Preferir:

```typescript
// Se mantiene la consulta aquí porque esta vista requiere
// actualizar los datos después de modificar un usuario.
```

---

# 38. Formato y Calidad

El proyecto debe utilizar herramientas automatizadas como:

- ESLint.
- Prettier.
- TypeScript.

El código debe pasar las validaciones antes de integrarse a la rama principal.

No se deben ignorar errores de TypeScript o ESLint sin una justificación concreta.

Evitar:

```typescript
// eslint-disable-next-line
```

sin comprender y documentar la razón.

---

# 39. Imports

Los imports deben mantenerse organizados y consistentes.

Preferir alias configurados:

```typescript
import { Button } from '@/components/ui/button';
import { obtenerIndicadores } from '@/modules/indicadores';
```

en lugar de rutas relativas excesivamente profundas:

```typescript
import { Button } from '../../../../components/ui/button';
```

---

# 40. Reglas de Negocio

Las reglas de negocio deben permanecer separadas de la presentación.

El componente:

```text
IndicadorCard
```

debe representar información.

La lógica como:

```text
determinar si un indicador está vencido
calcular porcentaje de cumplimiento
determinar estado del indicador
```

debe mantenerse en funciones, hooks o servicios apropiados.

---

# 41. Comunicación con el Backend

La comunicación debe seguir una estructura consistente:

```text
Component
    ↓
Hook
    ↓
Service
    ↓
HTTP Client
    ↓
Backend API
```

Ejemplo:

```text
IndicadoresPage
      ↓
useIndicadores()
      ↓
indicador.service.ts
      ↓
api.ts
      ↓
GET /indicadores
```

El componente no debe conocer detalles de Axios, `fetch` u otra librería HTTP.

---

# 42. Transformación de Datos

La transformación entre estructuras de API y estructuras utilizadas por la interfaz debe realizarse de manera explícita cuando sea necesario.

Evitar distribuir transformaciones por múltiples componentes.

Preferir:

```text
API Response
     ↓
Service / Mapper
     ↓
Modelo Frontend
     ↓
Component
```

---

# 43. Principio de Responsabilidad Única

Cada elemento debe tener una responsabilidad clara.

```text
Component → UI
Hook      → Estado/lógica React
Service   → Comunicación externa
Type      → Contrato de datos
Validation → Validación
Utility   → Funcionalidad genérica
Page      → Composición de una vista
Store     → Estado global
```

No utilizar una sola clase, hook o componente para resolver múltiples responsabilidades no relacionadas.

---

# 44. Regla de Oro

Ante cualquier nueva funcionalidad se debe evaluar:

1. ¿A qué dominio pertenece?
2. ¿Es un componente específico del dominio?
3. ¿Es un componente genérico reutilizable?
4. ¿Necesita un hook?
5. ¿Necesita comunicación con el backend?
6. ¿Necesita un servicio?
7. ¿Necesita estado global?
8. ¿Es una regla de negocio?
9. ¿Puede reutilizarse?
10. ¿Está correctamente tipado?
11. ¿Está acoplado innecesariamente a otro dominio?

---

# 45. Principio General

La arquitectura debe priorizar:

**Claridad → Separación de responsabilidades → Reutilización → Testabilidad → Mantenibilidad → Escalabilidad**

La arquitectura no debe introducir complejidad innecesaria.

La organización por dominios debe permitir que un desarrollador pueda localizar rápidamente todo lo relacionado con una funcionalidad dentro de su propio módulo.

---

# 46. Estructura Final de Referencia

Una aplicación completa puede tener:

```text
src/
│
├── app/
│   ├── app.tsx
│   ├── providers.tsx
│   └── router.tsx
│
├── assets/
│
├── components/
│   ├── ui/
│   └── layout/
│
├── config/
├── hooks/
├── lib/
├── routes/
├── store/
├── types/
├── utils/
│
└── modules/
    │
    ├── autenticacion/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── types/
    │   └── autenticacion.routes.tsx
    │
    ├── usuarios/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── types/
    │   ├── validations/
    │   └── index.ts
    │
    ├── indicadores/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── types/
    │   ├── validations/
    │   └── index.ts
    │
    └── proyectos/
        ├── components/
        ├── hooks/
        ├── pages/
        ├── services/
        ├── types/
        ├── validations/
        └── index.ts
```

# 47. Regla Final para el Agente

Antes de crear cualquier archivo, el agente debe identificar primero:

```text
1. Dominio al que pertenece.
2. Responsabilidad del archivo.
3. Capa correspondiente.
4. Dependencias necesarias.
5. Si existe una implementación reutilizable.
```

No crear archivos, servicios, hooks, componentes o abstracciones sin una responsabilidad clara.

**Todo nuevo código debe respetar las convenciones de idioma, estructura por dominios, separación de responsabilidades y tipado estricto establecidas en este documento.** 


React
├── TypeScript
├── Vite
├── Tailwind CSS
├── React Router
├── Axios
├── React Hook Form + Zod
└── ESLint + Prettier 