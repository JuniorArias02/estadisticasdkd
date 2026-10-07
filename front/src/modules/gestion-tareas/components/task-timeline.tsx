import React, { useState } from 'react';
import type { TareaAsignada } from '../types/gestion-tareas.types';

interface Props {
  tarea: TareaAsignada;
}

export const TaskTimeline: React.FC<Props> = ({ tarea }) => {
  const [abierto, setAbierto] = useState(false);

  // Combine history and comments into a single timeline array
  const timelineEvents = [
    ...(tarea.history?.map(h => ({ type: 'history', date: new Date(h.date), data: h })) || []),
    ...(tarea.comments?.map(c => ({ type: 'comment', date: new Date(c.created_at), data: c })) || [])
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const renderMessage = (msg: string) => {
    if (!msg) return null;
    const match = msg.match(/^\[(.*?)\]\s*(.*)$/s);
    if (!match) return <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg}</p>;

    const tag = match[1];
    const rest = match[2];

    const isStructured = rest.includes('Avance:') || rest.includes('Estado:');
    
    if (!isStructured) {
      return (
        <div className="mt-1 flex flex-col gap-1">
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded w-fit uppercase" style={{ backgroundColor: '#F6EFEA', color: '#A65932' }}>
            {tag}
          </span>
          <span className="text-sm text-gray-700 whitespace-pre-wrap">{rest}</span>
        </div>
      );
    }

    const parts = rest.split(/\s*\|\s*/);
    
    return (
      <div className="mt-2 flex flex-col gap-2 p-3 rounded-md border border-gray-100" style={{ backgroundColor: '#FFFFFF' }}>
        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded w-fit uppercase" style={{ backgroundColor: '#F6EFEA', color: '#A65932' }}>
          {tag}
        </span>
        <div className="flex flex-col gap-2">
          {parts.map((p, i) => {
            const colonIdx = p.indexOf(':');
            if (colonIdx === -1) return <span key={i} className="text-sm text-gray-700">{p}</span>;
            
            const label = p.substring(0, colonIdx).trim();
            let value = p.substring(colonIdx + 1).trim();
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1);
            }
            
            return (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-semibold text-gray-400 uppercase">{label}</span>
                <span className="text-sm text-gray-800 whitespace-pre-wrap font-medium">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="p-4 mb-4 flex flex-col gap-3"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: '8px',
      }}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-sm" style={{ color: '#262626' }}>{tarea.title}</h4>
        <span 
          className="px-2 py-1 rounded text-xs font-medium"
          style={{ 
            backgroundColor: tarea.task_status === 'finalizada' ? '#E6F2ED' : '#FDF4E6', 
            color: tarea.task_status === 'finalizada' ? '#2D7A5D' : '#A06A22'
          }}
        >
          {tarea.task_status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: '#737373' }}>
        <div>Prioridad: <span style={{ color: '#262626' }}>{tarea.priority}</span></div>
        <div>Progreso: <span style={{ color: '#262626' }}>{tarea.task_progress}%</span></div>
        {tarea.due_date && <div>Vence: <span style={{ color: '#262626' }}>{new Date(tarea.due_date).toLocaleDateString()}</span></div>}
      </div>

      {timelineEvents.length > 0 && (
        <button
          onClick={() => setAbierto(!abierto)}
          className="text-xs font-medium text-left mt-2"
          style={{ color: '#A65932' }}
        >
          {abierto ? 'Ocultar Histórico' : 'Ver Histórico'}
        </button>
      )}

      {abierto && timelineEvents.length > 0 && (
        <div className="mt-4 pl-2 border-l-2" style={{ borderColor: '#EAEAEA' }}>
          {timelineEvents.map((ev, i) => (
            <div key={i} className="mb-4 pl-4 relative">
              <div 
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: '#A65932', left: '-5px', top: '4px' }}
              />
              <div className="text-xs font-medium" style={{ color: '#262626' }}>
                {ev.type === 'history' ? ev.data.msg : `${ev.data.user_name} comentó:`}
              </div>
              <div className="text-xs mt-1" style={{ color: '#737373' }}>
                {ev.type === 'comment' && renderMessage(ev.data.message)}
                {ev.type === 'history' && <p className="mb-1 text-sm text-gray-700">{ev.data.msg}</p>}
                <div className="mt-2 text-[10px] text-gray-400 font-medium">{ev.date.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
