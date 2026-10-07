import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  MessageSquare,
  Monitor,
  HelpCircle,
  ArrowUpRight 
} from 'lucide-react';

export const InicioPage: React.FC = () => {
  const navigate = useNavigate();

  const modulos = [
    {
      id: 'gestion-tareas',
      titulo: 'Gestión de Tareas',
      descripcion: 'Desempeño de equipos, usuarios y métricas de tareas.',
      icono: ClipboardList,
      ruta: '/gestion-tareas',
    },
    {
      id: 'chat-box',
      titulo: 'Chat Box',
      descripcion: 'Metricas, estadisticas y chats interno.',
      icono: MessageSquare,
      ruta: '/chat-box',
    },
    {
      id: 'glpi',
      titulo: 'GLPI (IMSALUD)',
      descripcion: 'Sistema de gestión de incidencias y soporte.',
      icono: Monitor,
      ruta: '/glpi',
    },
    {
      id: 'pqrs',
      titulo: 'PQRS',
      descripcion: 'Peticiones, quejas, reclamos y sugerencias.',
      icono: HelpCircle,
      ruta: '/pqrs',
    }
  ];

  return (
    <div className="flex flex-col gap-6" style={{ backgroundColor: '#FAF9F8', minHeight: '100%' }}>
      {/* Banner de Bienvenida */}
      <div 
        className="p-8 relative overflow-hidden flex flex-col md:flex-row items-start justify-between gap-6"
        style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #EAEAEA',
          borderRadius: '12px'
        }}
      >
        <div className="flex flex-col gap-2">
          <h1 
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: '#262626' }}
          >
            Plataforma Institucional DKD
          </h1>
          <p 
            className="text-sm max-w-2xl leading-relaxed"
            style={{ color: '#737373' }}
          >
            Selecciona un módulo institucional para acceder a sus funciones y herramientas correspondientes.
          </p>
        </div>
      </div>

      {/* Grid de Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((modulo) => {
          const Icono = modulo.icono;
          return (
            <button
              key={modulo.id}
              onClick={() => navigate(modulo.ruta)}
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
                  {modulo.titulo}
                </h3>
                <p 
                  className="text-sm mt-1"
                  style={{ color: '#737373' }}
                >
                  {modulo.descripcion}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

