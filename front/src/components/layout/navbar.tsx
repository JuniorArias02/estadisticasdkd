import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, ChevronRight, Menu, LogOut, User } from 'lucide-react';
import { obtenerUsuarioAutenticado } from '@/modules/autenticacion';
import { obtenerMigasDePan } from '@/config/navegacion.config';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = obtenerUsuarioAutenticado();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Obtener migas de pan unificadas desde la configuración
  const migas = obtenerMigasDePan(location.pathname, location.state);

  // Generar iniciales del usuario (ej. "JD" o "A")
  const iniciales = usuario?.nombre
    ? `${usuario.nombre.charAt(0)}${usuario.apellido ? usuario.apellido.charAt(0) : ''}`.toUpperCase()
    : 'DKD';

  const manejarCerrarSesion = () => {
    localStorage.removeItem('token_autenticacion');
    localStorage.removeItem('refresh_token_autenticacion');
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
  };

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickFuera = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFuera);
    return () => {
      document.removeEventListener('mousedown', handleClickFuera);
    };
  }, []);

  return (
    <header className="h-16 border-b border-[#E7E5E4] bg-[#FAF8F5]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Sección Izquierda: Botón Menú + Breadcrumbs / Ubicación Actual */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EBE4] transition-colors lg:hidden"
            aria-label="Alternar menú lateral"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Migas de Pan (Breadcrumbs) */}
        <nav className="flex items-center gap-2 text-xs">
          <span className="text-[#A89D95] font-normal">Panel institucional</span>
          <ChevronRight className="h-3.5 w-3.5 text-[#A89D95]" />

          {migas.padre && (
            <>
              <span className="text-[#A89D95] font-normal">{migas.padre}</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#A89D95]" />
            </>
          )}

          <span className="font-bold text-[#1C1917] text-sm truncate max-w-[200px]">{migas.actual}</span>
        </nav>
      </div>

      {/* Sección Derecha: Búsqueda, Notificaciones y Perfil */}
      <div className="flex items-center gap-5">
        {/* Botón de Búsqueda */}
        <button
          className="p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EBE4] transition-colors cursor-pointer"
          aria-label="Buscar"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notificaciones con Punto Indicador */}
        <button
          className="relative p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EBE4] transition-colors cursor-pointer"
          aria-label="Notificaciones"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#C05628]" />
        </button>

        {/* Avatar de Usuario con Menú Desplegable */}
        <div className="relative flex items-center" ref={menuRef}>
          <div
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="h-9 w-9 rounded-full bg-[#8C6D58] text-white flex items-center justify-center font-semibold text-xs shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            title={usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'}
          >
            {iniciales}
          </div>

          {/* Menú Desplegable */}
          {menuAbierto && (
            <div 
              className="absolute right-0 top-12 mt-2 w-48 py-2 rounded-xl shadow-lg border border-[#EAEAEA] bg-[#FFFFFF] z-50 flex flex-col"
              style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}
            >
              <div className="px-4 py-2 border-b border-[#EAEAEA] mb-1">
                <p className="text-sm font-medium text-[#262626] truncate">
                  {usuario?.nombre} {usuario?.apellido}
                </p>
                <p className="text-xs text-[#737373] truncate">
                  {usuario?.correo}
                </p>
              </div>
              
              <button 
                onClick={() => {
                  setMenuAbierto(false);
                  navigate('/configuracion/perfil');
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#262626] hover:bg-[#F6EFEA] hover:text-[#A65932] transition-colors flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Mi Cuenta
              </button>
              
              <button 
                onClick={manejarCerrarSesion}
                className="w-full text-left px-4 py-2 text-sm text-[#B33A3A] hover:bg-[#FBEAE9] transition-colors flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

