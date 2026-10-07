import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEquipos } from '../hooks/use-equipos';
import { TeamDashboard } from '../components/team-dashboard';
import { UserDetailDrawer } from '../components/user-detail-drawer';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const DashboardEquipoPage: React.FC = () => {
  const { equipoId } = useParams();
  const navigate = useNavigate();
  const { data: equipos } = useEquipos();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const teamId = Number(equipoId);
  const teamName = equipos?.find(e => e.id === teamId)?.name || 'Cargando...';

  return (
    <div className="flex flex-col gap-6" style={{ backgroundColor: '#FAF9F8', minHeight: '100%' }}>
      <button 
        onClick={() => navigate('/gestion-tareas')}
        className="flex items-center gap-2 text-sm font-medium w-fit transition-colors hover:opacity-80"
        style={{ color: '#A65932' }}
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Equipos
      </button>

      <TeamDashboard 
        teamId={teamId} 
        teamName={teamName}
        onVerMasUsuario={(userId) => setSelectedUserId(userId)} 
      />

      <AnimatePresence>
        {selectedUserId && (
          <UserDetailDrawer 
            userId={selectedUserId}
            teamId={teamId}
            onClose={() => setSelectedUserId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
