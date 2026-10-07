import { type RouteObject } from 'react-router-dom';
import { DashboardGerencialPage } from './pages/dashboard-gerencial-page';
import { DetallePersonaPage } from './pages/detalle-persona-page';

export const rutasDashboardGerencial: RouteObject[] = [
  {
    path: '/dashboard-gerencial',
    element: <DashboardGerencialPage />,
  },
  {
    path: '/dashboard-gerencial/detalle/:nombre',
    element: <DetallePersonaPage />,
  },
];
