import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { ChatboxRole } from '../types/chat-box.types';

export const useChatboxRoles = () => {
  return useQuery<ChatboxRole[]>({
    queryKey: ['chatbox-roles'],
    queryFn: async () => {
      const response = await clienteApi.get('/reportes-chatbox/roles');
      return response.data.data;
    },
  });
};
