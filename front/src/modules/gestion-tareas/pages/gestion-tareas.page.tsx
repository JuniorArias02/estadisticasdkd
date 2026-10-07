import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEquipos } from '../hooks/use-equipos';
import { Users } from 'lucide-react';

export const GestionTareasPage: React.FC = () => {
  const { data: equipos, isLoading, isError } = useEquipos();
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
              Gestión de Tareas
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: '#262626' }}>
            Equipos de Trabajo
          </h1>
          <p className="text-sm max-w-2xl leading-relaxed" style={{ color: '#737373' }}>
            Selecciona un equipo para visualizar las métricas y desempeño de los usuarios correspondientes en base a las tareas asignadas.
          </p>
        </div>
      </div>

      {isLoading && <div className="p-4 text-sm" style={{ color: '#737373' }}>Cargando equipos...</div>}
      {isError && <div className="p-4 text-sm" style={{ color: '#B33A3A' }}>Error al cargar equipos.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipos?.map(equipo => (
          <button
            key={equipo.id}
            onClick={() => navigate(`/gestion-tareas/equipo/${equipo.id}`, { state: { breadcrumbPadre: 'Gestión Tareas', breadcrumbActual: equipo.name } })}
            className="p-6 flex flex-col gap-4 text-left transition-all group"
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
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl transition-colors"
                style={{ backgroundColor: '#F6EFEA', color: '#A65932' }}
              >
                <Users className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium transition-colors" style={{ color: '#262626' }}>
                {equipo.name}
              </h3>
            </div>
            <p className="text-sm" style={{ color: '#737373' }}>
              Ver panel de métricas de productividad, estado de tareas y desempeño.
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
