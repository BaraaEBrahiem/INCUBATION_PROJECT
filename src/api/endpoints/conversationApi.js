// src/api/endpoints/conversationApi.js

import { apiSlice } from "../apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getConversations: builder.query({
      query: (search) => ({
        url: "messaging/conversations/",
        params: search ? { search } : undefined,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map((conversation) => ({
                type: "Conversations",
                id: conversation.id,
              })),
              { type: "Conversations", id: "LIST" },
            ]
          : [{ type: "Conversations", id: "LIST" }],
    }),

    getConversationDetail: builder.query({
      query: (conversationId) =>
        `messaging/conversations/${conversationId}/`,

      providesTags: (result, error, conversationId) => [
        {
          type: "Conversations",
          id: conversationId,
        },
      ],
    }),

    startConversation: builder.mutation({
      query: (body) => ({
        url: "messaging/conversations/start/",
        method: "POST",
        body,
      }),

      invalidatesTags: [
        { type: "Conversations", id: "LIST" },
      ],
    }),

  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationDetailQuery,
  useStartConversationMutation,
} = conversationApi;