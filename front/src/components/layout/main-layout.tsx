import React, { useState } from 'react';
import { Outlet, Navigate, useMatches } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { useAutenticacionStore } from '@/store/autenticacion.store';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarColapsado, setSidebarColapsado] = useState(false);
  const { usuario, cargando } = useAutenticacionStore();
  const matches = useMatches();

  if (cargando) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const alternarSidebar = () => {
    setSidebarColapsado((prev) => !prev);
  };

  // Determinamos si es una ruta que necesita pantalla completa sin padding leyendo el "handle"
  const isFullScreenRoute = matches.some((match) => (match.handle as any)?.fullScreen);

  return (
    <div className="h-screen w-full bg-[#FAF8F5] text-[#1C1917] flex overflow-hidden">
      {/* Sidebar Lateral */}
      <Sidebar colapsado={sidebarColapsado} onToggle={alternarSidebar} />

      {/* Área Principal de Contenido */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Barra de Navegación Superior (Navbar con Migas de Pan) */}
        <Navbar onToggleSidebar={alternarSidebar} />

        {/* Contenido Dinámico de Rutas / Páginas */}
        <main className={`flex-1 relative ${isFullScreenRoute ? 'overflow-hidden flex flex-col' : 'p-8 overflow-y-auto'}`}>
          <div className={isFullScreenRoute ? 'absolute inset-0 flex flex-col' : 'max-w-7xl mx-auto'}>
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

