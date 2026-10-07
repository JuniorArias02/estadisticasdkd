import type { RouteObject } from 'react-router-dom';
import { LoginPage } from './pages/login-page';

export const rutasAutenticacion: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];
