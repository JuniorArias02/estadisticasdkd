import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatboxRoles } from '../hooks/use-chatbox-roles';
import { MessageSquare, Users, BarChart2, Building2 } from 'lucide-react';

export const ChatboxRolesPage: React.FC = () => {
  const { data: roles, isLoading, isError } = useChatboxRoles();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6" style={{ backgroundColor: '#FAF9F8', minHeight: '100%' }}>
      {/* Banner */}
      <div 
        className="p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #EAEAEA',
          borderRadius: '12px'
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span 
              className="px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
              style={{ 
                backgroundColor: '#F6EFEA', 
                color: '#A65932',
                border: '1px solid rgba(166, 89, 50, 0.2)'
              }}
            >
              Chat Box
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: '#262626' }}>
            Roles de Chatbox
          </h1>
          <p className="text-sm max-w-2xl leading-relaxed" style={{ color: '#737373' }}>
            Selecciona un rol para ver los usuarios correspondientes.
          </p>
        </div>
        <div className="hidden md:flex p-4 rounded-full" style={{ backgroundColor: '#F6EFEA' }}>
          <MessageSquare className="w-10 h-10" style={{ color: '#A65932' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <p className="text-sm" style={{ color: '#737373' }}>Cargando roles...</p>}
        {isError && <p className="text-sm" style={{ color: '#B33A3A' }}>Error al cargar los roles.</p>}
        
        {roles?.map(rol => (
          <div 
            key={rol.id}
            onClick={() => navigate(`/chat-box/rol/${rol.id}`, { state: { breadcrumbPadre: 'Chat Box', breadcrumbActual: `Rol ${rol.name}` } })}
            className="p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col gap-4 relative overflow-hidden group"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEAEA',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F6EFEA' }}>
                <Users className="w-6 h-6" style={{ color: '#A65932' }} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold" style={{ color: '#262626' }}>{rol.name}</h3>
              <p className="text-sm" style={{ color: '#737373' }}>Ver usuarios de este rol</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-[#EAEAEA] my-2" />

      <div>
        <h2 className="text-xl font-semibold mb-6" style={{ color: '#262626' }}>Registros Globales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/chat-box/registros', { state: { breadcrumbPadre: 'Chat Box', breadcrumbActual: 'Registros de peticiones' } })}
            className="p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col gap-4 relative overflow-hidden group"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEAEA',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F6EFEA' }}>
                <MessageSquare className="w-6 h-6" style={{ color: '#A65932' }} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold" style={{ color: '#262626' }}>Registros de peticiones</h3>
              <p className="text-sm" style={{ color: '#737373' }}>Ver todas las peticiones y su trazabilidad</p>
            </div>
          </div>

          <div 
            onClick={() => navigate('/chat-box/reportes', { state: { breadcrumbPadre: 'Chat Box', breadcrumbActual: 'Dashboard de Estadísticas' } })}
            className="p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col gap-4 relative overflow-hidden group"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEAEA',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-lg bg-[#E6F2ED]">
                <BarChart2 className="w-6 h-6 text-[#2D7A5D]" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold" style={{ color: '#262626' }}>Dashboard de Estadísticas</h3>
              <p className="text-sm" style={{ color: '#737373' }}>Métricas, tiempos y rendimiento</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/chat-box/empresas')}
            className="p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col gap-4 relative overflow-hidden group"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEAEA',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-lg bg-[#F6EFEA]">
                <Building2 className="w-6 h-6 text-[#A65932]" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold" style={{ color: '#262626' }}>Directorio de Empresas</h3>
              <p className="text-sm" style={{ color: '#737373' }}>Métricas y detalles por empresa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
