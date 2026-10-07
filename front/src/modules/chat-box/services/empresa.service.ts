import { clienteApi } from '@/lib/api';
import type { Empresa, DetalleEmpresa, DetalleEmpresaFiltros } from '../types/empresa.types';

// Ojo: Si el backend envía el array directamente, puede que no necesitemos .data
// Pero según la arquitectura sugerida por el usuario, suele ser { data: ..., message: ... }
export const obtenerEmpresas = async (): Promise<Empresa[]> => {
  const { data } = await clienteApi.get('/reportes-chatbox/empresas');
  return data?.data || data; // Por si el interceptor ya desempaqueta, o si viene el array directo
};

export const obtenerDetalleEmpresa = async (
  nombreEmpresa: string,
  filtros?: DetalleEmpresaFiltros
): Promise<DetalleEmpresa> => {
  const { data } = await clienteApi.get(
    `/reportes-chatbox/empresas/${encodeURIComponent(nombreEmpresa)}/detalle`,
    { params: filtros }
  );
  return data?.data || data;
};
