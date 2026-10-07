# sistema de Diseño y Reglas Visuales

Este documento establece las especificaciones visuales básicas para la interfaz de la plataforma.

## 1. Paleta de Colores

### Colores de Marca y Principales
*   **Color Primario (Terracota):** `#A65932`
    *   *Uso:* Botones primarios, iconos activos, barras de progreso, logo.
*   **Fondo Activo/Primario Claro:** `#F6EFEA`
    *   *Uso:* Fondo de ítems de menú seleccionados, fondos de iconos destacados neutros.

### Colores de Fondo y Superficies
*   **Fondo General de la App (Canvas):** `#FAF9F8` (Blanco cálido/Gris muy claro)
    *   *Uso:* Fondo principal del dashboard y panel lateral.
*   **Superficies (Cards/Módulos):** `#FFFFFF` (Blanco puro)
    *   *Uso:* Tarjetas de indicadores, contenedores de tablas, menús desplegables.

### Colores de Texto
*   **Texto Principal:** `#262626`
    *   *Uso:* Títulos, valores numéricos grandes (KPIs), texto general de cuerpo.
*   **Texto Secundario:** `#737373`
    *   *Uso:* Subtítulos, breadcrumbs, etiquetas de campos, placeholders, fechas.

### Colores Semánticos (Estados)
*   **Éxito / Gestionado:**
    *   Fondo: `#E6F2ED`
    *   Icono/Texto: `#2D7A5D`
*   **Advertencia / Pendiente:**
    *   Fondo: `#FDF4E6`
    *   Icono/Texto: `#A06A22`
*   **Peligro / Crítico:**
    *   Fondo: `#FBEAE9`
    *   Icono/Texto: `#B33A3A`
*   **Informativo / Neutro:**
    *   Fondo: `#F6EFEA`
    *   Icono/Texto: `#A65932`

---

## 2. Tipografía

*   **Familia Tipográfica Principal:** Sans-serif geométrica/limpia (ej. *Inter*, *Roboto*, o *SF Pro*).

### Jerarquía
*   **Títulos de Página (H1):**
    *   Tamaño: `24px` - `28px`
    *   Peso: `Medium` o `SemiBold`
    *   Color: Texto Principal
*   **Indicadores Numéricos (Métricas Clave):**
    *   Tamaño: `32px` - `36px`
    *   Peso: `Bold`
    *   Color: Texto Principal
*   **Títulos de Tarjetas (H3) y Subtítulos:**
    *   Tamaño: `14px` - `16px`
    *   Peso: `Medium` o `SemiBold`
    *   Color: Texto Secundario (o Principal dependiendo del énfasis)
*   **Texto de Cuerpo / Controles (Inputs, Dropdowns):**
    *   Tamaño: `14px`
    *   Peso: `Regular`
    *   Color: Texto Secundario
*   **Texto Pequeño (Metadatos, Fechas, Etiquetas supra):**
    *   Tamaño: `12px`
    *   Peso: `Regular` o `Medium`
    *   Color: Texto Secundario
    *   *Nota:* Las etiquetas de sección superior (ej. "VISTA GENERAL · JUNIO 2024") usan mayúsculas cerradas (Text Transform: `uppercase`) y mayor espaciado entre letras (Letter spacing: `0.5px` - `1px`).

---

## 3. Iconografía

*   **Estilo:** Iconos de línea (Stroke icons), minimalistas y sin relleno (unfilled).
*   **Grosor de Línea (Stroke Weight):** Regular (`1.5px` a `2px`).
*   **Tamaños Estándar:**
    *   Iconos de Menú Lateral: `20px` x `20px`
    *   Iconos en Botones y Controles: `16px` x `16px` o `18px` x `18px`
    *   Iconos de Estado en Tarjetas (KPIs): `24px` x `24px` (dentro de un contenedor circular o cuadrado redondeado).
*   **Comportamiento:** Los iconos heredan el color del texto adyacente o utilizan colores semánticos cuando indican un estado específico.

---

## 4. Estilos Estructurales (Bordes y Sombras)

### Bordes (Borders)
*   **Color de Borde General:** `#E5E5E5` o `#EAEAEA` (Gris claro).
*   **Grosor:** `1px` sólido.
*   *Uso:* Divisores, contorno de tarjetas (cards), inputs de formularios, botones secundarios.

### Radios de Borde (Border Radius)
*   **Tarjetas y Contenedores Grandes:** `8px` a `12px`
*   **Botones y Controles de Formulario (Inputs, Dropdowns):** `6px` a `8px`
*   **Contenedores de Iconos (Badges de estado):** `8px` a `10px`

### Sombras (Elevación)
*   **Sombras de Tarjetas (Cards):** Muy sutiles o inexistentes. El diseño se apoya principalmente en los bordes sutiles y la diferencia ligera de contraste entre el fondo general (`#FAF9F8`) y las tarjetas (`#FFFFFF`). Si se usa sombra, debe ser muy difusa (ej. `box-shadow: 0px 2px 4px rgba(0,0,0,0.02)`).