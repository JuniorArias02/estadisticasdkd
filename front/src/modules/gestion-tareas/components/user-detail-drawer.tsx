import React, { useEffect } from 'react';
import { useDetalleUsuario } from '../hooks/use-detalle-usuario';
import { TaskTimeline } from './task-timeline';
import { motion } from 'framer-motion';

interface Props {
  userId: number;
  teamId?: number;
  onClose: () => void;
}

export const UserDetailDrawer: React.FC<Props> = ({ userId, teamId, onClose }) => {
  const { data: detalle, isLoading, isError } = useDetalleUsuario(userId, teamId);

  // Bloquear el scroll del body cuando el drawer esté abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Soft backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(250, 249, 248, 0.4), rgba(166, 89, 50, 0.15))',
          backdropFilter: 'blur(3px)'
        }}
      />

      {/* Drawer panel */}
      <motion.div 
        initial={{ x: '100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full md:w-2/3 lg:w-1/2 h-full overflow-y-auto shadow-[0_0_40px_rgba(0,0,0,0.08)]"
        style={{ backgroundColor: '#FAF9F8', borderLeft: '1px solid #EAEAEA' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold" style={{ color: '#262626' }}>Detalle de Usuario</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
              style={{ color: '#737373' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EAEAEA'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              ✕
            </button>
          </div>

          {isLoading && <p style={{ color: '#737373' }}>Cargando detalles...</p>}
          {isError && <p style={{ color: '#B33A3A' }}>Error al cargar detalles.</p>}

          {detalle && (
            <>
              {/* Resumen */}
              <div 
                className="p-6 rounded-xl flex flex-col gap-4"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEAEA' }}
              >
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#262626' }}>{detalle.summary.name}</h3>
                  <p className="text-sm" style={{ color: '#737373' }}>{detalle.summary.role}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mt-2">
                  <div className="flex flex-col"><span style={{ color: '#737373' }}>Total Asignadas</span><span className="font-medium">{detalle.summary.total_asignadas}</span></div>
                  <div className="flex flex-col"><span style={{ color: '#737373' }}>Finalizadas</span><span className="font-medium text-green-700">{detalle.summary.finalizadas}</span></div>
                  <div className="flex flex-col"><span style={{ color: '#737373' }}>Pendientes</span><span className="font-medium">{detalle.summary.pendientes}</span></div>
                  <div className="flex flex-col"><span style={{ color: '#737373' }}>En Proceso</span><span className="font-medium">{detalle.summary.en_proceso}</span></div>
                  <div className="flex flex-col"><span style={{ color: '#737373' }}>Progreso</span><span className="font-medium" style={{ color: '#A65932' }}>{Number(detalle.summary.progreso_promedio || 0).toFixed(0)}%</span></div>
                  <div className="flex flex-col"><span style={{ color: '#737373' }}>Retrasadas</span><span className="font-medium text-red-700">{detalle.summary.retrasadas}</span></div>
                </div>
              </div>

              {/* Tareas */}
              <div>
                <h3 className="text-md font-semibold mb-4" style={{ color: '#262626' }}>Tareas ({detalle.tasks.length})</h3>
                <div className="flex flex-col gap-0">
                  {detalle.tasks.map((tarea, index) => (
                    <TaskTimeline key={`${tarea.task_id}-${index}`} tarea={tarea} />
                  ))}
                  {detalle.tasks.length === 0 && (
                    <p className="text-sm" style={{ color: '#737373' }}>No hay tareas asignadas.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
