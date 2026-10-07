import { useQuery } from '@tanstack/react-query';
import { obtenerEmpresas, obtenerDetalleEmpresa } from '../services/empresa.service';
import type { DetalleEmpresaFiltros } from '../types/empresa.types';

export const useEmpresas = () => {
  return useQuery({
    queryKey: ['empresas'],
    queryFn: obtenerEmpresas,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEmpresaDetalle = (nombreEmpresa: string, filtros?: DetalleEmpresaFiltros) => {
  return useQuery({
    queryKey: ['empresa-detalle', nombreEmpresa, filtros],
    queryFn: () => obtenerDetalleEmpresa(nombreEmpresa, filtros),
    enabled: !!nombreEmpresa,
  });
};
