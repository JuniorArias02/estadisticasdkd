import { useQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { ChatAttachment } from '../types/chat-box.types';

export const useChatAttachments = (phone?: string, interactionId?: number) => {
  return useQuery<ChatAttachment[]>({
    queryKey: ['chatbox-attachments', phone, interactionId],
    queryFn: async () => {
      if (!phone || interactionId === undefined) return [];
      const response = await clienteApi.get(`/reportes-chatbox/attachments/${encodeURIComponent(phone)}/${interactionId}`);
      return response.data.data;
    },
    enabled: !!phone && interactionId !== undefined,
  });
};
