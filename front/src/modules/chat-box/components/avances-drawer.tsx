import React from 'react';
import { X, History, Loader2, AlertCircle } from 'lucide-react';
import { useChatAvances } from '../hooks/use-chat-avances';
import { motion, AnimatePresence } from 'framer-motion';

interface AvancesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  idPeticion: number;
  fechaCierre?: string;
  fechaIngreso?: string;
  responsableCierre?: string;
}

const TimelineCard = ({ 
  id, title, dateStr, responsable, comentario, isNewest, isSpecial 
}: { 
  id: string | number, title: string, dateStr: string, responsable?: string, comentario?: string, isNewest: boolean, isSpecial?: boolean 
}) => {
  const dateObj = new Date(dateStr);
  const fecha = dateObj.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  const hora = dateObj.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  return (
    <div key={id} className="relative pl-6">
      {/* Dot del timeline */}
      <div 
        className="absolute rounded-full left-[-9px] flex items-center justify-center bg-white"
        style={{ 
          top: '24px',
          width: isNewest ? '16px' : '14px',
          height: isNewest ? '16px' : '14px',
          border: `2px solid ${isNewest ? '#A65932' : '#EAEAEA'}`,
          boxShadow: isNewest ? '0 0 0 4px rgba(166, 89, 50, 0.1)' : 'none',
          transform: isNewest ? 'translateX(-0.5px)' : 'translateX(0.5px)',
          zIndex: 10
        }}
      >
         {isNewest && <div className="w-2 h-2 rounded-full bg-[#A65932]" />}
      </div>
      
      {/* Tarjeta de Avance */}
      <div className={`flex flex-col gap-1.5 p-4 rounded-xl border shadow-[0px_2px_4px_rgba(0,0,0,0.02)] transition-all hover:border-[rgba(166,89,50,0.3)] ${isSpecial ? 'bg-[#FAF9F8] border-[#A65932]/20' : 'bg-white border-[#EAEAEA]'}`}>
        {/* Etapa y Fecha */}
        <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
          <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isSpecial ? 'bg-[#A65932] text-white' : 'bg-[#F6EFEA] text-[#A65932] border border-[rgba(166,89,50,0.1)]'}`}>
            {title}
          </span>
          <span className="text-xs font-medium text-[#737373] flex items-center gap-1">
            {fecha} • {hora}
          </span>
        </div>
        
        {/* Responsable */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-6 h-6 rounded-full bg-[#FAF9F8] flex items-center justify-center border border-[#EAEAEA] shrink-0">
            <span className="text-[10px] font-bold text-[#A65932]">
              {responsable ? responsable.substring(0, 2).toUpperCase() : 'U'}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-[#262626]">
            {responsable || 'Usuario Desconocido'}
          </h4>
        </div>
        
        {/* Comentario */}
        {comentario && (
          <div className="mt-2 text-sm text-[#404040] leading-relaxed bg-[#FAF9F8] p-3 rounded-lg border border-[#EAEAEA]">
            <span className="break-words">{comentario}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const AvancesDrawer: React.FC<AvancesDrawerProps> = ({ isOpen, onClose, idPeticion, fechaCierre, fechaIngreso, responsableCierre }) => {
  const { data: avances, isLoading, isError } = useChatAvances(isOpen ? idPeticion : undefined);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-[100]"
            onClick={onClose}
          />
          
          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA] bg-[#FAF9F8]">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-[#A65932]" />
                <h2 className="font-semibold text-[#262626]">Trazabilidad del Caso</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/5 transition-colors text-[#737373]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#FAF9F8]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-[#A65932]">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p className="text-sm font-medium">Cargando historial...</p>
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-[#B33A3A]">
                  <AlertCircle className="w-8 h-8" />
                  <p className="text-sm font-medium">Error al cargar la trazabilidad.</p>
                </div>
              ) : (
                <div className="relative border-l-2 border-[#EAEAEA] ml-3 flex flex-col gap-6 pb-4">
                  {fechaCierre && (
                    <TimelineCard 
                      id="cierre"
                      title="Cierre"
                      dateStr={fechaCierre}
                      responsable={responsableCierre}
                      comentario="Caso cerrado."
                      isNewest={true}
                      isSpecial={true}
                    />
                  )}
                  
                  {avances && [...avances]
                    .sort((a, b) => new Date(b.FechaIng).getTime() - new Date(a.FechaIng).getTime())
                    .map((avance, index) => {
                      return (
                        <TimelineCard 
                          key={avance.Id}
                          id={avance.Id}
                          title={avance.Etapa}
                          dateStr={avance.FechaIng}
                          responsable={avance.Responsable}
                          comentario={avance.Comentario || 'Sin comentario adicional.'}
                          isNewest={index === 0 && !fechaCierre}
                        />
                      );
                  })}

                  {fechaIngreso && (
                    <div className="relative pl-6 mt-2">
                      <div 
                        className="absolute rounded-full left-[-7px] flex items-center justify-center bg-white"
                        style={{ 
                          top: '6px',
                          width: '10px',
                          height: '10px',
                          border: `2px solid #EAEAEA`,
                          zIndex: 10
                        }}
                      />
                      <div className="flex items-center gap-2 text-xs text-[#737373]">
                        <span className="font-medium">Caso registrado</span>
                        <span className="opacity-50">•</span>
                        <span>
                          {new Date(fechaIngreso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })} {new Date(fechaIngreso).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  )}

                  {(!avances || avances.length === 0) && !fechaCierre && !fechaIngreso && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-[#737373] mt-10">
                      <History className="w-10 h-10 opacity-30" />
                      <p className="text-sm">No hay registros de trazabilidad para este caso.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
