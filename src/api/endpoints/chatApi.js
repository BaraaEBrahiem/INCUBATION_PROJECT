import { apiSlice } from "../apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    
    // 1. جلب قائمة المحادثات السابقة
    getChatSessions: builder.query({
      query: () => "chatbot/sessions/",
      providesTags: ["ChatSessions"],
    }),

    // 2. جلب رسائل محادثة معينة
    getChatSessionDetail: builder.query({
      query: (sessionId) => `chatbot/sessions/${sessionId}/`,
      providesTags: (result, error, arg) => [{ type: "ChatDetails", id: arg }],
    }),

    // 3. إرسال الرسالة
    sendStreamMessage: builder.mutation({
      query: (payload) => ({
        url: "chatbot/chat/",
        method: "POST",
        body: payload,
      }),

    }),
  }),
});

export const {
  useGetChatSessionsQuery,
  useGetChatSessionDetailQuery,
  useSendStreamMessageMutation,
} = chatApi;