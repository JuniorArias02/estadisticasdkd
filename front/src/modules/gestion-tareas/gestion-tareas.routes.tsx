import { type RouteObject } from 'react-router-dom';
import { GestionTareasPage } from './pages/gestion-tareas.page';
import { DashboardEquipoPage } from './pages/dashboard-equipo.page';

export const rutasGestionTareas: RouteObject[] = [
  {
    path: '/gestion-tareas',
    element: <GestionTareasPage />,
  },
  {
    path: '/gestion-tareas/equipo/:equipoId',
    element: <DashboardEquipoPage />,
  },
];
