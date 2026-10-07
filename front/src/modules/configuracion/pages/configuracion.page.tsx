import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, User, ArrowUpRight } from 'lucide-react';

export const ConfiguracionPage: React.FC = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      id: 'usuarios',
      titulo: 'Usuarios',
      descripcion: 'Administra los roles, permisos y accesos de los colaboradores.',
      icono: Users,
      ruta: '/configuracion/usuarios',
    },
    {
      id: 'perfil',
      titulo: 'Perfil',
      descripcion: 'Actualiza tu información personal y credenciales.',
      icono: User,
      ruta: '/configuracion/perfil',
    }
  ];

  return (
    <div className="flex flex-col gap-6" style={{ backgroundColor: '#FAF9F8', minHeight: '100%' }}>
      {/* Banner de Configuración */}
      <div 
        className="p-8 relative overflow-hidden flex flex-col md:flex-row items-start justify-between gap-6"
        style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #EAEAEA',
          borderRadius: '12px'
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span 
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: '#F6EFEA', 
                color: '#A65932',
                border: '1px solid rgba(166, 89, 50, 0.2)'
              }}
            >
              Ajustes del Sistema
            </span>
          </div>
          <h1 
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: '#262626' }}
          >
            Configuración
          </h1>
          <p 
            className="text-sm max-w-2xl leading-relaxed"
            style={{ color: '#737373' }}
          >
            Gestiona los parámetros de la plataforma, usuarios y tus preferencias personales.
          </p>
        </div>
        <div 
          className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#A65932', color: '#FFFFFF', boxShadow: '0px 4px 10px rgba(166, 89, 50, 0.3)' }}
        >
          <Settings className="h-6 w-6" strokeWidth={1.5} />
        </div>
      </div>

      {/* Grid de Opciones de Configuración */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opciones.map((opcion) => {
          const Icono = opcion.icono;
          return (
            <button
              key={opcion.id}
              onClick={() => navigate(opcion.ruta)}
              className="p-6 flex flex-col justify-between gap-4 text-left transition-all group"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #EAEAEA',
                borderRadius: '12px',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#A65932';
                e.currentTarget.style.backgroundColor = '#F6EFEA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#EAEAEA';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <div className="flex items-center justify-between">
                <div 
                  className="p-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: '#F6EFEA',
                    color: '#A65932'
                  }}
                >
                  <Icono className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <ArrowUpRight 
                  className="h-5 w-5 transition-colors" 
                  style={{ color: '#A65932', opacity: 0.7 }}
                />
              </div>
              
              <div>
                <h3 
                  className="text-lg font-medium transition-colors"
                  style={{ color: '#262626' }}
                >
                  {opcion.titulo}
                </h3>
                <p 
                  className="text-sm mt-1"
                  style={{ color: '#737373' }}
                >
                  {opcion.descripcion}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
