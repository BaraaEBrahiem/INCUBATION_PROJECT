import store from "../../Redux/store";

import { apiSlice } from "../../api/apiSlice";

class MessageRealtimeHandler {
  handleNewMessage(message) {
    if (
      !message ||
      !message.conversation
    ) {
      return;
    }

      const conversationId =
        message.conversation;

      store.dispatch(
        apiSlice.util.updateQueryData(
          "getConversationMessages",
          {
            conversationId,
          },
          (draft) => {
            if (!draft?.results) {
              return;
            }

      const alreadyExists =
        draft.results.some(
          (existingMessage) => {
            if (
              existingMessage.id ===
              message.id
            ) {
              return true;
            }

            return (
              existingMessage.content ===
                message.content &&
              existingMessage.sender_id ===
                message.sender_id &&
              Math.abs(
                new Date(
                  existingMessage.created_at
                ) -
                  new Date(
                    message.created_at
                  )
              ) < 5000
            );
          }
        );

          if (alreadyExists) {
            return;
          }

          draft.results.push(
            message
          );
        }
      )
    );

    store.dispatch(
      apiSlice.util.invalidateTags([
        {
          type: "Messages",
          id: "GLOBAL_UNREAD",
        },
      ])
    );
  }

  handleMessageRead(data) {
    if (
      !data ||
      !data.conversation_id
    ) {
      return;
    }

    store.dispatch(
      apiSlice.util.invalidateTags([
        {
          type: "Messages",
          id: `UNREAD_${data.conversation_id}`,
        },
        {
          type: "Messages",
          id: "GLOBAL_UNREAD",
        },
      ])
    );
  }
}

export const messageRealtimeHandler =
  new MessageRealtimeHandler();