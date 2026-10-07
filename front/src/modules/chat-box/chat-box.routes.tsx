import { type RouteObject } from 'react-router-dom';
import { ChatboxRolesPage } from './pages/chatbox-roles.page';
import { ChatboxUsersPage } from './pages/chatbox-users.page';
import { ChatboxUserDetailPage } from './pages/chatbox-user-detail.page';
import { ChatboxPeticionesPage } from './pages/chatbox-peticiones.page';
import { ChatboxRegistrosPeticionesPage } from './pages/chatbox-registros-peticiones.page';
import { ChatboxEmpresasPage } from './pages/chatbox-empresas.page';
import { ChatboxEmpresaDetallePage } from './pages/chatbox-empresa-detalle.page';
import { ChatboxReportesPage } from './pages/chatbox-reportes.page';

export const rutasChatbox: RouteObject[] = [
  {
    path: '/chat-box',
    element: <ChatboxRolesPage />,
  },
  {
    path: '/chat-box/rol/:rolId',
    element: <ChatboxUsersPage />,
  },
  {
    path: '/chat-box/usuario/:userId',
    element: <ChatboxUserDetailPage />,
  },
  {
    path: '/chat-box/usuario/:userId/peticiones',
    element: <ChatboxPeticionesPage />,
    handle: { fullScreen: true },
  },
  {
    path: '/chat-box/registros',
    element: <ChatboxRegistrosPeticionesPage />,
    handle: { fullScreen: true },
  },
  {
    path: '/chat-box/reportes',
    element: <ChatboxReportesPage />,
    handle: { fullScreen: true },
  },
  {
    path: '/chat-box/empresas',
    element: <ChatboxEmpresasPage />,
    handle: { fullScreen: true },
  },
  {
    path: '/chat-box/empresas/:nombreEmpresa/detalle',
    element: <ChatboxEmpresaDetallePage />,
    handle: { fullScreen: true },
  },
];
