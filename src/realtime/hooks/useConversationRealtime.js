import { useEffect } from "react";

import { realtimeManager } from "../core/realtimeManager";

export function useConversationRealtime(
  conversationId
) {
  useEffect(() => {
    if (!conversationId) {
      return;
    }

    realtimeManager.subscribeConversation(
      conversationId
    );

    return () => {
      realtimeManager.unsubscribeConversation(
        conversationId
      );
    };
  }, [conversationId]);
}