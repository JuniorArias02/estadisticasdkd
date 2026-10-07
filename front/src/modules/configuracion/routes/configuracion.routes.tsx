import { type RouteObject } from 'react-router-dom';
import { ConfiguracionPage } from '../pages/configuracion.page';
import { PerfilPage } from '../pages/perfil.page';
import { UsuariosPage } from '../pages/usuarios.page';

export const rutasConfiguracion: RouteObject[] = [
  {
    path: '/configuracion',
    element: <ConfiguracionPage />,
  },
  {
    path: '/configuracion/perfil',
    element: <PerfilPage />,
  },
  {
    path: '/configuracion/usuarios',
    element: <UsuariosPage />,
  },
];
