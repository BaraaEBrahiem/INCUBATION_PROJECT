import { useEffect } from "react";

import {
  useMarkConversationAsReadMutation,
} from "../../../api/endpoints/messageApi";

export default function useMarkConversationRead(
  conversationId
) {
  const [markRead] =
    useMarkConversationAsReadMutation();

  useEffect(() => {
    if (!conversationId) {
      return;
    }

    markRead(conversationId);
  }, [conversationId, markRead]);
}