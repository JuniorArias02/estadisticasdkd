import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, ChevronDown, ChevronRight, ChevronLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { SECCIONES_NAVEGACION, type ElementoNavegacion } from '@/config/navegacion.config';

interface SidebarProps {
  colapsado?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ colapsado = false, onToggle }) => {
  const location = useLocation();
  const [desplegados, setDesplegados] = useState<Record<string, boolean>>({
    soporte: true,
  });

  const alternarDesplegable = (id: string) => {
    setDesplegados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderElementoNavegacion = (elemento: ElementoNavegacion) => {
    const Icono = elemento.icono;
    const tieneSubElementos = elemento.subElementos && elemento.subElementos.length > 0;
    const estaDesplegado = desplegados[elemento.id] ?? false;

    const subRutaActiva = tieneSubElementos && elemento.subElementos?.some(
      (sub) => location.pathname === sub.ruta
    );

    if (tieneSubElementos) {
      return (
        <div key={elemento.id} className="flex flex-col gap-1">
          <button
            onClick={() => alternarDesplegable(elemento.id)}
            title={colapsado ? elemento.nombre : undefined}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer ${
              estaDesplegado || subRutaActiva
                ? 'bg-[#F7EAE1] text-[#B84C1C]'
                : 'text-[#44403C] hover:bg-[#F2EBE4]'
            }`}
          >
            {/* Icono siempre visible */}
            <Icono
              className={`h-5 w-5 shrink-0 transition-colors duration-150 ${
                estaDesplegado || subRutaActiva ? 'text-[#B84C1C]' : 'text-[#57534E]'
              }`}
            />

            {/* Contenido que se oculta/muestra con opacity */}
            <div
              className={`flex items-center justify-between flex-1 ml-3 transition-all duration-200 ${
                colapsado
                  ? 'opacity-0 w-0 overflow-hidden pointer-events-none'
                  : 'opacity-100 w-auto'
              }`}
            >
              <span className="whitespace-nowrap">{elemento.nombre}</span>
              {estaDesplegado ? (
                <ChevronDown className="h-4 w-4 text-[#B84C1C] shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 text-[#A8A29E] shrink-0" />
              )}
            </div>
          </button>

          {/* Sub-elementos plegables: sólo visibles cuando no está colapsado */}
          <div
            className={`flex flex-col ml-4 pl-3 border-l border-[#E7E5E4] gap-1 overflow-hidden transition-all duration-300 ${
              estaDesplegado && !colapsado ? 'max-h-96 opacity-100 my-1' : 'max-h-0 opacity-0 my-0'
            }`}
          >
            {elemento.subElementos?.map((sub) => {
              const esActivo = location.pathname === sub.ruta;
              return (
                <NavLink
                  key={sub.ruta}
                  to={sub.ruta}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#F7EAE1] text-[#B84C1C] font-semibold'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EBE4]/60'
                    }`
                  }
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                      esActivo ? 'bg-[#B84C1C]' : 'bg-[#A8A29E]'
                    }`}
                  />
                  <span>{sub.nombre}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <NavLink
        key={elemento.id}
        to={elemento.ruta || '#'}
        title={colapsado ? elemento.nombre : undefined}
        className={({ isActive }) =>
          `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
            isActive
              ? 'bg-[#F7EAE1] text-[#B84C1C] font-semibold'
              : 'text-[#44403C] hover:bg-[#F2EBE4]'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icono
              className={`h-5 w-5 shrink-0 ${isActive ? 'text-[#B84C1C]' : 'text-[#57534E]'}`}
            />
            <div
              className={`flex items-center justify-between flex-1 ml-3 transition-all duration-200 ${
                colapsado
                  ? 'opacity-0 w-0 overflow-hidden pointer-events-none'
                  : 'opacity-100 w-auto'
              }`}
            >
              <span className="whitespace-nowrap">{elemento.nombre}</span>
              <ChevronRight className="h-4 w-4 text-[#A8A29E] shrink-0" />
            </div>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      style={{ width: colapsado ? '72px' : '288px' }}
      className="h-screen sticky top-0 flex flex-col border-r border-[#E7E5E4] bg-[#FAF8F5] text-[#1C1917] z-30 select-none overflow-hidden transition-[width] duration-300 ease-in-out"
    >
      {/* Contenedor interior con padding fijo */}
      <div className="flex flex-col h-full py-6 px-3">

        {/* Header / Brand Logo */}
        <div className="flex items-center gap-3 mb-8 px-1 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-[#C05628] flex items-center justify-center text-white shadow-sm shrink-0">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div
            className={`flex flex-col transition-all duration-200 overflow-hidden ${
              colapsado ? 'opacity-0 w-0' : 'opacity-100 w-auto'
            }`}
          >
            <span className="text-xl font-bold tracking-tight text-[#1C1917] leading-none whitespace-nowrap">
              DKD
            </span>
            <span className="text-[11px] text-[#A89D95] font-medium tracking-wide whitespace-nowrap">
              Estadísticas e Indicadores
            </span>
          </div>
        </div>

        {/* Secciones de Navegación */}
        <div className="flex flex-col gap-5 flex-1 overflow-y-auto overflow-x-hidden">
          {SECCIONES_NAVEGACION.map((seccion, index) => (
            <div key={seccion.titulo} className="flex flex-col gap-1">
              {index > 0 && <div className="border-t border-[#E7E5E4] my-2" />}

              <div
                className={`transition-all duration-200 overflow-hidden ${
                  colapsado ? 'opacity-0 h-0 mb-0' : 'opacity-100 h-auto mb-1'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89D95] px-1 whitespace-nowrap">
                  {seccion.titulo}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                {seccion.elementos.map(renderElementoNavegacion)}
              </div>
            </div>
          ))}
        </div>

        {/* Botón de colapsar al fondo */}
        {onToggle && (
          <div className="shrink-0 pt-4 mt-4 border-t border-[#E7E5E4]">
            <button
              onClick={onToggle}
              title={colapsado ? 'Expandir menú' : 'Ocultar menú'}
              className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 text-[#78716C] hover:text-[#1C1917] hover:bg-[#E7E5E4] cursor-pointer"
            >
              {colapsado ? (
                <PanelLeftOpen className="h-5 w-5 shrink-0" />
              ) : (
                <PanelLeftClose className="h-5 w-5 shrink-0" />
              )}
              <div
                className={`ml-3 transition-all duration-200 overflow-hidden ${
                  colapsado ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}
              >
                <span className="whitespace-nowrap">Ocultar menú</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
