import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useStartConversationMutation } from "../../../api/endpoints/messageApi";

export default function useConversationLauncher() {
  const navigate = useNavigate();

  const [startConversation, { isLoading }] =
    useStartConversationMutation();

  const launchConversation = useCallback(
    async (userId) => {
      try {
        const response = await startConversation(userId).unwrap();

        navigate(`/messagespage/${response.conversation_id}`);

        return response.conversation_id;
      } catch (error) {
        console.error("Failed to start conversation", error);
        throw error;
      }
    },
    [navigate, startConversation]
  );

  return {
    launchConversation,
    isLoading,
  };
}