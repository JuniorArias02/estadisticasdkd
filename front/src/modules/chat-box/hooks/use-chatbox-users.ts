import { useQuery } from "@tanstack/react-query";
import { clienteApi } from "../../../lib/api";
import type { ChatboxUser } from "../types/chat-box.types";

export const useChatboxUsers = (rolId?: string) => {
  return useQuery<ChatboxUser[]>({
    queryKey: ["chatbox-users", rolId],
    queryFn: async () => {
      const endpoint = rolId ? `/reportes-chatbox/users/role/${rolId}` : '/reportes-chatbox/users';
      const response = await clienteApi.get(endpoint);
      return response.data.data;
    },
  });
};
