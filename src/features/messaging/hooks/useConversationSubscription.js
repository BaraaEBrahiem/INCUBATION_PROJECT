import { useEffect } from "react";

import { realtimeManager } from "../../../realtime/core/realtimeManager";

export default function useConversationSubscription(
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