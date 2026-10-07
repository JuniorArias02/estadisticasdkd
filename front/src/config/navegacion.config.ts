import { 
  Home,
  LayoutDashboard, 
  BookOpen, 
  Building2, 
  Sparkles, 
  BarChart2, 
  Settings,
  type LucideIcon
} from 'lucide-react';

export interface SubElementoNavegacion {
  nombre: string;
  ruta: string;
}

export interface ElementoNavegacion {
  id: string;
  nombre: string;
  icono: LucideIcon;
  ruta?: string;
  subElementos?: SubElementoNavegacion[];
}

export interface SeccionNavegacion {
  titulo: string;
  elementos: ElementoNavegacion[];
}

export const SECCIONES_NAVEGACION: SeccionNavegacion[] = [
  {
    titulo: 'MÓDULOS INSTITUCIONALES',
    elementos: [
      {
        id: 'inicio',
        nombre: 'Inicio',
        icono: Home,
        ruta: '/inicio',
      },
      {
        id: 'operaciones',
        nombre: 'Operaciones',
        icono: LayoutDashboard,
        subElementos: [
          { nombre: 'Dashboard Gerencial', ruta: '/dashboard-gerencial' },
          { nombre: 'Gestión Tareas', ruta: '/gestion-tareas' },
          { nombre: 'Chat Box', ruta: '/chat-box' },
        ],
      },
    ],
  },
  {
    titulo: 'CONFIGURACIÓN',
    elementos: [
      {
        id: 'configuracion',
        nombre: 'Configuración',
        icono: Settings,
        ruta: '/configuracion',
      },
    ],
  },
];

export interface MigaDePan {
  padre?: string;
  actual: string;
}

/**
 * Interfaz para el estado de navegación (React Router state).
 * Útil para sobrescribir las migas de pan en rutas dinámicas (ej: /chat-box/usuario/:id).
 * Al usar navigate(), puedes enviar estos datos para cambiar el texto de la barra superior.
 * 
 * Ejemplo de uso:
 * navigate('/ruta/dinamica/123', { state: { breadcrumbPadre: 'Módulo', breadcrumbActual: 'Detalle' } })
 */
export interface EstadoNavegacion {
  breadcrumbPadre?: string;
  breadcrumbActual?: string;
  userName?: string; // Alternativa por compatibilidad
}

/**
 * Obtiene las migas de pan combinando la configuración estática y el estado dinámico de la navegación.
 * 
 * @param pathname La ruta actual (location.pathname)
 * @param state El estado actual de la navegación (location.state)
 * @returns Objeto con el padre (opcional) y el elemento actual a mostrar
 */
export const obtenerMigasDePan = (pathname: string, state?: EstadoNavegacion | null): MigaDePan => {
  let migaEstatica: MigaDePan | null = null;

  // 1. Buscar coincidencia exacta en la configuración estática
  for (const seccion of SECCIONES_NAVEGACION) {
    for (const elemento of seccion.elementos) {
      if (elemento.ruta === pathname) {
        migaEstatica = { actual: elemento.nombre };
      }
      if (elemento.subElementos) {
        for (const sub of elemento.subElementos) {
          if (sub.ruta === pathname) {
            migaEstatica = {
              padre: elemento.nombre,
              actual: sub.nombre,
            };
          }
        }
      }
    }
  }

  // 2. Si no se encontró una ruta estática, generar un fallback básico (último segmento de la URL)
  if (!migaEstatica) {
    const segmento = pathname.split('/').filter(Boolean).pop();
    migaEstatica = { 
      actual: segmento ? segmento.charAt(0).toUpperCase() + segmento.slice(1) : 'Inicio' 
    };
  }

  // 3. Sobrescribir con el estado dinámico proporcionado por React Router (si existe)
  return {
    padre: state?.breadcrumbPadre || migaEstatica.padre,
    actual: state?.breadcrumbActual || state?.userName || migaEstatica.actual,
  };
};
