import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { 
  Usuario, 
  CrearUsuarioDto, 
  ActualizarPerfilDto, 
  ActualizarUsuarioDto, 
  CambiarClaveDto 
} from '../types/usuarios.types';

export const useUsuarios = () => {
  return useQuery<Usuario[]>({
    queryKey: ['usuarios'],
    queryFn: async () => {
      const response = await clienteApi.get<Usuario[]>('/usuarios');
      // Asegurarnos de que retorne un arreglo (dependiendo de cómo esté estructurada la respuesta real, puede venir en `data.data`)
      // Si la respuesta es un arreglo directamente, usamos response.data
      // Si está envuelta en { data: [...] }, usamos response.data.data
      return (response.data as any).data || response.data;
    },
  });
};

export const usePerfil = () => {
  return useQuery<Usuario>({
    queryKey: ['perfil'],
    queryFn: async () => {
      const response = await clienteApi.get<Usuario>('/usuarios/perfil');
      return (response.data as any).data || response.data;
    },
  });
};

export const useCrearUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CrearUsuarioDto) => {
      const response = await clienteApi.post<Usuario>('/usuarios', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useActualizarPerfil = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ActualizarPerfilDto) => {
      const response = await clienteApi.patch<Usuario>('/usuarios/perfil', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['perfil'] });
    },
  });
};

export const useCambiarClavePerfil = () => {
  return useMutation({
    mutationFn: async (data: CambiarClaveDto) => {
      const response = await clienteApi.patch('/usuarios/perfil/cambiar-clave', data);
      return response.data;
    },
  });
};

export const useActualizarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ActualizarUsuarioDto }) => {
      const response = await clienteApi.patch<Usuario>(`/usuarios/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useCambiarClaveUsuario = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CambiarClaveDto }) => {
      const response = await clienteApi.patch(`/usuarios/${id}/cambiar-clave`, data);
      return response.data;
    },
  });
};

export const useEliminarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await clienteApi.delete(`/usuarios/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};
