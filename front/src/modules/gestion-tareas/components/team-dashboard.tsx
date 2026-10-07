import React from 'react';
import { useDashboardEquipo } from '../hooks/use-dashboard-equipo';

interface Props {
  teamId: number;
  teamName: string;
  onVerMasUsuario: (userId: number) => void;
}

export const TeamDashboard: React.FC<Props> = ({ teamId, teamName, onVerMasUsuario }) => {
  const { data: metricas, isLoading, isError } = useDashboardEquipo(teamId);

  if (isLoading) return <div className="p-4" style={{ color: '#737373' }}>Cargando métricas del equipo...</div>;
  if (isError) return <div className="p-4" style={{ color: '#B33A3A' }}>Error al cargar métricas del equipo.</div>;
  if (!metricas || metricas.length === 0) return <div className="p-4" style={{ color: '#737373' }}>No hay usuarios en este equipo.</div>;

  const totalUsuarios = metricas.length;
  const totalTareas = metricas.reduce((acc, curr) => acc + Number(curr.total_asignadas || 0), 0);

  return (
    <div className="flex flex-col gap-6 mt-2">
      <div 
        className="p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #EAEAEA',
          borderRadius: '12px'
        }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: '#262626' }}>
            Desempeño: {teamName}
          </h1>
          <p className="text-sm max-w-2xl leading-relaxed" style={{ color: '#737373' }}>
            Usuarios: <strong>{totalUsuarios}</strong> · Tareas Asignadas: <strong>{totalTareas}</strong>
          </p>
        </div>
      </div>

      <div 
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #EAEAEA',
          borderRadius: '12px',
          overflowX: 'auto'
        }}
      >
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead style={{ backgroundColor: '#FAF9F8', color: '#737373', borderBottom: '1px solid #EAEAEA' }}>
            <tr>
              <th className="px-6 py-4 font-medium">Usuario</th>
              <th className="px-6 py-4 font-medium text-center">Asignadas</th>
              <th className="px-6 py-4 font-medium text-center">Finalizadas</th>
              <th className="px-6 py-4 font-medium text-center">En Proceso</th>
              <th className="px-6 py-4 font-medium text-center">Pendientes</th>
              <th className="px-6 py-4 font-medium text-center">Retrasadas</th>
              <th className="px-6 py-4 font-medium text-center">Progreso</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#EAEAEA', color: '#262626' }}>
            {metricas.map(usuario => (
              <tr key={usuario.user_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold">{usuario.name}</div>
                  <div className="text-xs mt-1" style={{ color: '#737373' }}>{usuario.role}</div>
                </td>
                <td className="px-6 py-4 text-center font-medium">{usuario.total_asignadas}</td>
                <td className="px-6 py-4 text-center font-medium" style={{ color: '#2D7A5D' }}>{usuario.finalizadas}</td>
                <td className="px-6 py-4 text-center">{usuario.en_proceso}</td>
                <td className="px-6 py-4 text-center">{usuario.pendientes}</td>
                <td className="px-6 py-4 text-center font-medium" style={{ color: '#B33A3A' }}>{usuario.retrasadas}</td>
                <td className="px-6 py-4 text-center">
                  <span 
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{ backgroundColor: '#F6EFEA', color: '#A65932' }}
                  >
                    {Number(usuario.progreso_promedio || 0).toFixed(0)}%
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onVerMasUsuario(usuario.user_id)}
                    className="text-xs font-medium px-3 py-1.5 rounded transition-colors"
                    style={{ color: '#A65932', border: '1px solid rgba(166, 89, 50, 0.2)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6EFEA'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

