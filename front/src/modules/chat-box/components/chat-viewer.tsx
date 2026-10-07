import React, { useEffect, useRef, useState } from 'react';
import { useHistorialChat } from '../hooks/use-historial-chat';
import type { PeticionChat } from '../types/chat-box.types';
import { Loader2, MessageSquare, User, AlertCircle, Paperclip, History } from 'lucide-react';
import { AttachmentsModal } from './attachments-modal';
import { AvancesDrawer } from './avances-drawer';

interface Props {
  peticion: PeticionChat | null;
}

export const ChatViewer: React.FC<Props> = ({ peticion }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousScrollHeightRef = useRef<number>(0);
  const previousMessagesLengthRef = useRef<number>(0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { 
    data, 
    isLoading, 
    isError, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useHistorialChat(peticion?.Telefono);

  // Aplanar mensajes y ordenarlos cronológicamente
  const todosLosMensajes = data?.pages.flatMap(page => page.messages) || [];
  const mensajesOrdenados = [...todosLosMensajes].sort((a, b) => a.id - b.id);

  // Auto-scroll al fondo al cargar por primera vez un caso
  useEffect(() => {
    if (scrollRef.current && data?.pages.length === 1 && !isFetchingNextPage) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [peticion, data, isFetchingNextPage]);

  // Mantener la posición del scroll al cargar mensajes anteriores
  useEffect(() => {
    if (
      scrollRef.current &&
      mensajesOrdenados.length > previousMessagesLengthRef.current &&
      (data?.pages.length || 0) > 1
    ) {
      const currentScrollHeight = scrollRef.current.scrollHeight;
      const heightDifference = currentScrollHeight - previousScrollHeightRef.current;
      
      if (heightDifference > 0) {
        scrollRef.current.scrollTop = heightDifference;
      }
    }
    previousMessagesLengthRef.current = mensajesOrdenados.length;
  }, [mensajesOrdenados.length, data?.pages.length]);

  // Detectar scroll hacia arriba para cargar más
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight } = e.currentTarget;
    if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      previousScrollHeightRef.current = scrollHeight;
      fetchNextPage();
    }
  };

  if (!peticion) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#FAF9F8] h-full">
        <div className="p-4 rounded-full bg-white border border-[#EAEAEA] text-[#D4D4D4]">
          <MessageSquare className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <p className="text-[#737373] text-sm">Selecciona un caso para ver el historial de chat</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white h-full">
        <Loader2 className="w-6 h-6 text-[#A65932] animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FBEAE9] h-full">
        <p className="text-sm text-[#B33A3A] font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          No se pudo cargar el historial del chat
        </p>
      </div>
    );
  }


  return (
    <>
      <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
        {/* Header del Chat */}
        <div className="p-4 border-b border-[#EAEAEA] bg-[#FAF9F8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F6EFEA] flex items-center justify-center text-[#A65932]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#262626] text-base">{peticion.Telefono}</h3>
              <p className="text-sm text-[#737373] truncate max-w-[200px] md:max-w-md">{peticion.Asunto}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#262626] bg-white border border-[#EAEAEA] rounded-md hover:bg-[#FAF9F8] transition-colors"
              title="Ver trazabilidad"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Trazabilidad</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#A65932] bg-white border border-[#EAEAEA] rounded-md hover:bg-[#F6EFEA] transition-colors"
              title="Ver archivos adjuntos"
            >
              <Paperclip className="w-4 h-4" />
              <span className="hidden sm:inline">Adjuntos</span>
            </button>
            <span className="text-sm font-medium px-3 py-1.5 bg-white border border-[#EAEAEA] rounded-md text-[#737373] hidden md:inline-block">
              {peticion.Ticket}
            </span>
          </div>
        </div>

      {/* Historial de Mensajes */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-5 bg-[#FAF9F8]"
      >
        {hasNextPage && (
          <div className="text-center py-2">
            {isFetchingNextPage ? (
              <Loader2 className="w-4 h-4 text-[#A65932] animate-spin mx-auto" />
            ) : (
              <span className="text-xs text-[#737373]">Desliza hacia arriba para ver más</span>
            )}
          </div>
        )}

        {mensajesOrdenados.length === 0 ? (
          <div className="m-auto text-center text-[#737373] text-sm">No hay mensajes registrados.</div>
        ) : (
          mensajesOrdenados.map((msg) => {
            const isRecibido = msg.message_type === 'RECEIVED';
            
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[85%] lg:max-w-[75%] ${isRecibido ? 'self-start' : 'self-end'}`}
              >
                {!isRecibido && msg.from_user_name && (
                  <span className="text-xs text-[#737373] mb-1 ml-auto mr-1">
                    {msg.from_user_name}
                  </span>
                )}
                
                <div 
                  className={`p-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    isRecibido 
                      ? 'bg-white border border-[#EAEAEA] text-[#262626] rounded-tl-sm' 
                      : 'bg-[#A65932] text-white rounded-tr-sm'
                  }`}
                  style={!isRecibido ? { border: '1px solid #944D2A' } : {}}
                >
                  {msg.content}
                </div>
                
                <span className={`text-[11px] text-[#A89D95] mt-1 ${isRecibido ? 'ml-1' : 'ml-auto mr-1'}`}>
                  {new Date(msg.creation_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
      </div>
      </div>
      <AttachmentsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        phone={peticion.Telefono}
        interactionId={peticion.InteraccionId}
      />
      <AvancesDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        idPeticion={peticion.Id}
      />
    </>
  );
};
