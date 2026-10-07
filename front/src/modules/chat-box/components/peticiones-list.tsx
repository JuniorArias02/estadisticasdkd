import React from 'react';
import { usePeticionesActivas } from '../hooks/use-peticiones-activas';
import type { PeticionChat } from '../types/chat-box.types';
import { MessageCircle, Clock, AlertCircle } from 'lucide-react';

interface Props {
  nombreResponsable: string;
  peticionActiva: PeticionChat | null;
  onSelectPeticion: (peticion: PeticionChat) => void;
}

export const PeticionesList: React.FC<Props> = ({ nombreResponsable, peticionActiva, onSelectPeticion }) => {
  const { data: peticiones, isLoading, isError } = usePeticionesActivas(nombreResponsable);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-white rounded-xl border border-[#EAEAEA] h-full">
        <p className="text-sm text-[#737373] animate-pulse">Cargando peticiones activas...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-[#FBEAE9] rounded-xl border border-[#EAEAEA] h-full">
        <p className="text-sm text-[#B33A3A] font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Error al cargar las peticiones
        </p>
      </div>
    );
  }

  if (!peticiones || peticiones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-xl border border-[#EAEAEA] h-full text-center">
        <div className="p-4 rounded-full bg-[#F6EFEA] text-[#A65932]">
          <MessageCircle className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-semibold text-[#262626]">Sin peticiones activas</h3>
          <p className="text-sm text-[#737373] mt-1">Este gestor no tiene casos asignados actualmente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden flex-1 bg-white">
      <div className="p-4 border-b border-[#EAEAEA] bg-[#FAF9F8]">
        <h3 className="font-semibold text-[#262626] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#A65932]" />
          Casos Activos ({peticiones.length})
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-2">
          {peticiones.map((peticion) => {
            const isSelected = peticionActiva?.Id === peticion.Id;
            return (
              <button
                key={peticion.Id}
                onClick={() => onSelectPeticion(peticion)}
                className="flex flex-col gap-2 p-4 text-left rounded-lg transition-all border outline-none"
                style={{
                  backgroundColor: isSelected ? '#F6EFEA' : '#FFFFFF',
                  borderColor: isSelected ? '#A65932' : '#EAEAEA',
                  boxShadow: isSelected ? '0 2px 8px rgba(166,89,50,0.1)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#FAF9F8';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#EAEAEA';
                  }
                }}
              >
                <div className="flex justify-between items-start w-full gap-4">
                  <span className="font-semibold text-[#262626] text-sm truncate">{peticion.Asunto}</span>
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap"
                    style={{
                      backgroundColor: peticion.Estado === 'PE' ? '#FDF4E6' : '#E6F2ED',
                      color: peticion.Estado === 'PE' ? '#A06A22' : '#2D7A5D'
                    }}
                  >
                    {peticion.Estado}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full text-xs text-[#737373]">
                  <span className="font-medium">{peticion.Ticket}</span>
                  <span>{new Date(peticion.FechaAsignado).toLocaleDateString()}</span>
                </div>
                <div className="text-xs text-[#737373] truncate mt-1">
                  Contacto: {peticion.Telefono}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
