import React, { useState } from 'react';
import { useChatAttachments } from '../hooks/use-chat-attachments';
import { X, FileText, Image as ImageIcon, File, Download, Loader2, Eye } from 'lucide-react';
import type { ChatAttachment } from '../types/chat-box.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  interactionId: number;
}

export const AttachmentsModal: React.FC<Props> = ({ isOpen, onClose, phone, interactionId }) => {
  const { data: attachments, isLoading, isError } = useChatAttachments(phone, interactionId);
  const [selectedDoc, setSelectedDoc] = useState<ChatAttachment | null>(null);

  if (!isOpen) return null;

  const getIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-[#A65932]" />;
    if (mimeType === 'application/pdf') return <FileText className="w-8 h-8 text-[#B33A3A]" />;
    return <File className="w-8 h-8 text-[#737373]" />;
  };

  const getFileUrl = (attachId: number) => {
    // Endpoint directo para servir los bytes en crudo (imagen, pdf, etc.)
    return `${import.meta.env.VITE_API_URL}/reportes-chatbox/upload/${attachId}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all"
        style={{ width: selectedDoc ? '90vw' : '500px', height: selectedDoc ? '90vh' : 'auto', maxHeight: '90vh' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA] bg-[#FAF9F8]">
          <h2 className="text-lg font-semibold text-[#262626]">
            {selectedDoc ? `Vista Previa: ${selectedDoc.file_name}` : 'Archivos Adjuntos'}
          </h2>
          <button 
            onClick={() => selectedDoc ? setSelectedDoc(null) : onClose()}
            className="p-2 rounded-md hover:bg-[#EAEAEA] transition-colors text-[#737373]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {isLoading && !selectedDoc && (
            <div className="p-12 flex justify-center items-center">
              <Loader2 className="w-8 h-8 text-[#A65932] animate-spin" />
            </div>
          )}

          {isError && !selectedDoc && (
            <div className="p-8 text-center text-[#B33A3A]">
              No se pudieron cargar los archivos adjuntos.
            </div>
          )}

          {!isLoading && !isError && (!attachments || attachments.length === 0) && !selectedDoc && (
            <div className="p-12 text-center text-[#737373]">
              No hay archivos adjuntos en esta conversación.
            </div>
          )}

          {/* Vista de Lista */}
          {!selectedDoc && attachments && attachments.length > 0 && (
            <div className="p-4 grid grid-cols-1 gap-3">
              {attachments.map((attach) => (
                <div 
                  key={attach.id} 
                  className="flex items-center justify-between p-3 border border-[#EAEAEA] rounded-lg hover:bg-[#FAF9F8] transition-colors group cursor-pointer"
                  onClick={() => setSelectedDoc(attach)}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="p-2 bg-[#F6EFEA] rounded-md shrink-0">
                      {getIcon(attach.mime_type)}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-sm font-medium text-[#262626] truncate">
                        {attach.file_name || 'Documento sin nombre'}
                      </span>
                      <span className="text-xs text-[#737373]">
                        {new Date(attach.creation_date).toLocaleDateString()} • {attach.mime_type.split('/')[1]?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-2 text-[#A65932] hover:bg-[#F6EFEA] rounded-md transition-colors"
                      title="Previsualizar"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a 
                      href={getFileUrl(attach.attach_id)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-[#2D7A5D] hover:bg-[#E6F2ED] rounded-md transition-colors"
                      title="Descargar"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vista Previa de Documento */}
          {selectedDoc && (
            <div className="flex-1 bg-[#FAF9F8] flex items-center justify-center p-4">
              {selectedDoc.mime_type.startsWith('image/') ? (
                <img 
                  src={getFileUrl(selectedDoc.attach_id)} 
                  alt={selectedDoc.file_name} 
                  className="max-w-full max-h-full object-contain rounded-md shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    e.currentTarget.parentElement?.setAttribute('data-error', 'No se pudo cargar la previsualización de la imagen');
                  }}
                />
              ) : selectedDoc.mime_type === 'application/pdf' ? (
                <iframe 
                  src={getFileUrl(selectedDoc.attach_id)} 
                  className="w-full h-full rounded-md border border-[#EAEAEA] bg-white shadow-sm"
                  title="PDF Preview"
                />
              ) : (
                <div className="text-center flex flex-col items-center gap-4">
                  <File className="w-16 h-16 text-[#737373]" />
                  <p className="text-[#262626] font-medium">Previsualización no disponible</p>
                  <a 
                    href={getFileUrl(selectedDoc.attach_id)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#A65932] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Descargar Archivo
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
