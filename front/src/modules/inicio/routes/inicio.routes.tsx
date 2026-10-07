import { type RouteObject } from 'react-router-dom';
import { InicioPage } from '../pages/inicio.page';

export const rutasInicio: RouteObject[] = [
  {
    path: '/inicio',
    element: <InicioPage />,
  },
];
