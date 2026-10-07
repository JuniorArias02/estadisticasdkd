import { type RouteObject, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { rutasAutenticacion } from '@/modules/autenticacion';
import { rutasInicio } from '@/modules/inicio';
import { rutasGestionTareas } from '@/modules/gestion-tareas';
import { rutasConfiguracion } from '@/modules/configuracion';
import { rutasChatbox } from '@/modules/chat-box';
import { rutasDashboardGerencial } from '@/modules/dashboard-gerencial';

export const appRutas: RouteObject[] = [
  ...rutasAutenticacion,
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/inicio" replace />,
      },
      ...rutasInicio,
      ...rutasGestionTareas,
      ...rutasConfiguracion,
      ...rutasChatbox,
      ...rutasDashboardGerencial,
    ],
  },
  {
    path: '*',
    element: <Navigate to="/inicio" replace />,
  },
];
