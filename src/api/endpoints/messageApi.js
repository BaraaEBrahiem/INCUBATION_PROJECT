// src/api/endpoints/messageApi.js

import { apiSlice } from "../apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversationMessages: builder.query({
      query: ({
        conversationId,
        cursor,
        pageSize = 20,
      }) => ({
        url: `messaging/conversations/${conversationId}/messages/`,
        params: {
          ...(cursor ? { cursor } : {}),
          page_size: pageSize,
        },
      }),

      serializeQueryArgs: ({
        endpointName,
        queryArgs,
      }) => {
        return `${endpointName}-${queryArgs.conversationId}`;
      },

      merge: (currentCache, newData) => {
        if (!currentCache?.results) {
          Object.assign(currentCache, newData);
          return;
        }

      const existingIds = new Set(
        currentCache.results.map(
          (message) => message.id
        )
      );

      newData.results.forEach(
        (message) => {
          if (!existingIds.has(message.id)) {
            currentCache.results.push(
              message
            );

            existingIds.add(message.id);
          }
        }
      );

        currentCache.next =
          newData.next;

        currentCache.previous =
          newData.previous;
      },

      forceRefetch({
        currentArg,
        previousArg,
      }) {
        return (
          currentArg?.conversationId !==
          previousArg?.conversationId
        );
      },

      providesTags: (
        result,
        error,
        arg
      ) => [
        {
          type: "Messages",
          id: `CONVERSATION_${arg.conversationId}`,
        },
      ],
    }),

    sendMessage: builder.mutation({
      query: ({
        conversationId,
        content,
      }) => ({
        url: `messaging/conversations/${conversationId}/messages/send/`,
        method: "POST",
        body: {
          content,
        },
      }),

      async onQueryStarted(
        { conversationId, content },
        { dispatch, queryFulfilled, getState }
      ) {
        const state = getState();

        const currentUserId =
          Number(state.auth.userId);

        const currentUser =
          state.auth.user;

        const tempId =
          `temp-${Date.now()}`;

        const patchResult =
          dispatch(
            apiSlice.util.updateQueryData(
              "getConversationMessages",
              {
                conversationId,
              },
              (draft) => {
                if (!draft?.results) {
                  return;
                }

                draft.results.unshift({
                  id: tempId,
                  conversation:
                    conversationId,
                  sender_id:
                    currentUserId,
                  sender_name:
                    currentUser?.full_name ||
                    currentUser?.name ||
                    "Me",
                  sender_avatar:
                    currentUser?.avatar ||
                    null,
                  content,
                  created_at:
                    new Date().toISOString(),
                  optimistic: true,
                });
              }
            )
          );

        try {
          const { data } =
            await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getConversationMessages",
              {
                conversationId,
              },
              (draft) => {
                const index =
                  draft.results.findIndex(
                    (msg) =>
                      msg.id === tempId
                  );

                if (index !== -1) {
                  draft.results[index] =
                    data;
                }
              }
            )
          );
        } catch {
          patchResult.undo();
        }
      },
    }),

    markConversationAsRead: builder.mutation({
      query: (conversationId) => ({
        url: `messaging/conversations/${conversationId}/read/`,
        method: "POST",
      }),
    }),

    getConversationUnreadCount:
      builder.query({
        query: (conversationId) =>
          `messaging/conversations/${conversationId}/unread-count/`,

        providesTags: (
          result,
          error,
          conversationId
        ) => [
          {
            type: "Messages",
            id: `UNREAD_${conversationId}`,
          },
        ],
      }),

    getGlobalUnreadMessagesCount:
      builder.query({
        query: () =>
          "messaging/messages/unread-count/",

        providesTags: [
          {
            type: "Messages",
            id: "GLOBAL_UNREAD",
          },
        ],
      }),
  }),
});

export const {
  useGetConversationMessagesQuery,
  useSendMessageMutation,
  useMarkConversationAsReadMutation,
  useGetConversationUnreadCountQuery,
  useGetGlobalUnreadMessagesCountQuery,
} = messageApi;