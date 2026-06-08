// src/realtime/handlers/conversationRealtimeHandler.js

import store from "../../Redux/store";

import { apiSlice } from "../../api/apiSlice";

class ConversationRealtimeHandler {
  handle(data) {
    if (
      !data ||
      !data.conversation_id
    ) {
      return;
    }

    let conversationFound = false;

    store.dispatch(
      apiSlice.util.updateQueryData(
        "getConversations",
        "",
        (draft) => {
          if (!Array.isArray(draft)) {
            return;
          }

          const conversation =
            draft.find(
              (item) =>
                item.id ===
                data.conversation_id
            );

          if (!conversation) {
            return;
          }

          conversationFound = true;

          if (data.last_message) {
            conversation.last_message =
              data.last_message;
          }

          if (data.last_message_at) {
            conversation.last_message_at =
              data.last_message_at;
          }

          if (
            typeof data.unread_count ===
            "number"
          ) {
            conversation.unread_count =
              data.unread_count;
          }

          draft.sort(
            (a, b) =>
              new Date(
                b.last_message_at
              ) -
              new Date(
                a.last_message_at
              )
          );
        }
      )
    );

    if (!conversationFound) {
      store.dispatch(
        apiSlice.util.invalidateTags([
          {
            type: "Conversations",
            id: "LIST",
          },
        ])
      );
    }
  }
}

export const conversationRealtimeHandler =
  new ConversationRealtimeHandler();