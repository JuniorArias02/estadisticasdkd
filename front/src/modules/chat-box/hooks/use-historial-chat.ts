import { useInfiniteQuery } from '@tanstack/react-query';
import { clienteApi } from '../../../lib/api';
import type { MensajeChat } from '../types/chat-box.types';
import { decryptMessage } from '../../../utils/crypto';

interface ChatHistoryResponse {
  messages: MensajeChat[];
  first_message_id: number;
  last_message_id: number;
}

export const useHistorialChat = (phone?: string) => {
  return useInfiniteQuery<ChatHistoryResponse>({
    queryKey: ['chatbox-historial', phone],
    queryFn: async ({ pageParam }) => {
      if (!phone) return { messages: [], first_message_id: 0, last_message_id: 0 };
      
      const url = new URL(`/reportes-chatbox/messages/${encodeURIComponent(phone)}`, window.location.origin);
      url.searchParams.append('limit', '20');
      if (pageParam) {
        url.searchParams.append('last_id', String(pageParam));
      }
      
      const response = await clienteApi.get(url.pathname + url.search);
      const data = response.data.data;

      // Descifrar todos los mensajes antes de meterlos al estado local
      const decryptedMessages = await Promise.all(
        (data.messages || []).map(async (msg: MensajeChat) => ({
          ...msg,
          content: await decryptMessage(msg.content)
        }))
      );

      return {
        ...data,
        messages: decryptedMessages
      };
    },
    getNextPageParam: (lastPage) => lastPage.first_message_id || undefined,
    initialPageParam: undefined,
    enabled: !!phone,
  });
};
