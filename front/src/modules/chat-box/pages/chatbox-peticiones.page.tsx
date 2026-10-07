import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { PeticionesList } from '../components/peticiones-list';
import { ChatViewer } from '../components/chat-viewer';
import type { PeticionChat } from '../types/chat-box.types';

export const ChatboxPeticionesPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || `Usuario ${userId}`;

  const [peticionSeleccionada, setPeticionSeleccionada] = useState<PeticionChat | null>(null);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* WhatsApp Web Style Container - Full Bleed */}
      <div className="flex flex-row w-full h-full bg-white overflow-hidden">
        
        {/* Left Sidebar (Contacts / Petitions) */}
        <div className="w-full md:w-1/3 min-w-[300px] border-r border-[#EAEAEA] flex flex-col h-full bg-[#FAF9F8]">
          {/* Gestor Header */}
          <div className="p-4 border-b border-[#EAEAEA] bg-white flex flex-col gap-3">
             <button 
               onClick={() => navigate(-1)}
               className="flex items-center gap-1.5 text-xs font-medium w-fit transition-colors hover:opacity-80"
               style={{ color: '#A65932' }}
             >
               <ArrowLeft className="w-3 h-3" /> Volver a Usuarios
             </button>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#F6EFEA] flex items-center justify-center text-[#A65932] shrink-0">
                 <User className="w-5 h-5" />
               </div>
               <div className="truncate">
                 <h2 className="font-semibold text-[#262626] text-[15px] truncate">{userName}</h2>
                 <p className="text-[12px] text-[#737373]">Auditoría de Casos</p>
               </div>
             </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <PeticionesList 
              nombreResponsable={userName}
              peticionActiva={peticionSeleccionada}
              onSelectPeticion={setPeticionSeleccionada}
            />
          </div>
        </div>

        {/* Right Chat Panel */}
        <div className="hidden md:flex md:w-2/3 flex-1 h-full flex-col bg-white">
          <ChatViewer peticion={peticionSeleccionada} />
        </div>
      </div>
    </div>
  );
};

