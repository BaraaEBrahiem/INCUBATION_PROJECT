// src/realtime/handlers/conversationRealtimeHandler.js

import store from "../../Redux/store";

import { apiSlice } from "../../api/apiSlice";

class ConversationRealtimeHandler {

  updateGlobalMessagesBadge() {
    store.dispatch(
      apiSlice.util.invalidateTags([
        {
          type: "Messages",
          id: "GLOBAL_UNREAD",
        },
      ])
    );
  }

  handle(data) {

    console.log(
      "CONVERSATION_UPDATED PAYLOAD",
      JSON.stringify(data, null, 2)
    );

    if (
      !data ||
      !data.conversation_id
    ) {
      return;
    }

    // تحديث عداد الرسائل العام في الـ Navbar
    this.updateGlobalMessagesBadge();

    let conversationFound = false;

    store.dispatch(
      apiSlice.util.updateQueryData(
        "getConversations",
        undefined,
        (draft) => {

          console.log(
            "GET_CONVERSATIONS CACHE",
            draft
          );

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
            console.log(
              "UPDATE UNREAD",
              conversation.id,
              "FROM",
              conversation.unread_count,
              "TO",
              data.unread_count
            );



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