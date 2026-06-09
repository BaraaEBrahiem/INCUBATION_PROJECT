import { apiSlice } from "../apiSlice";

import { eventRouter } from "../../realtime/core/eventRouter"; 

export const messageApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    
    // 1️⃣ جلب قائمة كل المحادثات لليوزر
    getConversations: builder.query({
      query: () => "messaging/conversations/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Messages", id: `CONVERSATION_${id}` })),
              { type: "Messages", id: "LIST" },
            ]
          : [{ type: "Messages", id: "LIST" }],
    }),

    // 2️⃣ جلب رسائل محادثة معينة (يدعم الـ Pagination والـ Real-time المركزي)
    getConversationMessages: builder.query({
      query: ({ conversationId, cursor, pageSize = 20 }) => ({
        url: `messaging/conversations/${conversationId}/messages/`,
        params: {
          ...(cursor ? { cursor } : {}),
          page_size: pageSize,
        },
      }),

      // 🛡️ حماية الـ الكاش من الانهيار عند عدم تمرير الـ ID أول الرندر
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (!queryArgs || !queryArgs.conversationId) {
          return `${endpointName}-default`;
        }
        return `${endpointName}-${queryArgs.conversationId}`;
      },

      // دمج الصفحات الجديدة مع الرسائل الحالية (Pagination)
      merge: (currentCache, newData) => {
        if (!currentCache?.results) {
          Object.assign(currentCache, newData);
          return;
        }

        const existingIds = new Set(currentCache.results.map((message) => message.id));

        newData.results.forEach((message) => {
          if (!existingIds.has(message.id)) {
            currentCache.results.push(message);
            existingIds.add(message.id);
          }
        });

        currentCache.next = newData.next;
        currentCache.previous = newData.previous;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.conversationId !== previousArg?.conversationId;
      },

      providesTags: (result, error, arg) => [
        {
          type: "Messages",
          id: `CONVERSATION_${arg.conversationId}`,
        },
      ],

      // ⚡ الربط مع الـ Realtime Central Router الخاص بتطبيقكِ
      async onCacheEntryAdded(
        { conversationId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          // الاستماع لحدث الرسائل الجديدة عبر الـ Router المركزي المحمي الخاص بكِ
          const unsubscribe = eventRouter.on("new_message", (data) => {
            // التحقق من أن الرسالة القادمة تخص المحادثة المفتوحة حالياً بالواجهة
            if (data && Number(data.conversation) === Number(conversationId)) {
              updateCachedData((draft) => {
                if (draft?.results) {
                  const exists = draft.results.some((m) => m.id === data.id);
                  if (!exists) {
                    draft.results.unshift(data); // حقن الرسالة في الأعلى لحظياً
                  }
                }
              });
            }
          });

          // تنظيف المستمع فور مغادرة اليوزر للمحادثة لتوفير الذاكرة
          await cacheEntryRemoved;
          unsubscribe();
        } catch (error) {
          console.error("Real-time cache entry error:", error);
        }
      },
    }),

    // 3️⃣ إرسال الرسالة (يدعم الـ Optimistic UI الشفاف والذكي)
    sendMessage: builder.mutation({
      query: ({ conversationId, content }) => ({
        url: `messaging/conversations/${conversationId}/send/`,
        method: "POST",
        body: { content },
      }),

      async onQueryStarted(
        { conversationId, content },
        { dispatch, queryFulfilled, getState }
      ) {
        const state = getState();
        const currentUserId = Number(state.auth?.userId);
        const currentUser = state.auth?.user;
        const tempId = `temp-${Date.now()}`;

        // 🚀 تحديث متفائل: حقن الرسالة في الواجهة فوراً كـ "شفافة" قبل رد السيرفر
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getConversationMessages",
            { conversationId },
            (draft) => {
              if (!draft) return;
              if (!draft.results) draft.results = [];
              
              draft.results.unshift({
                id: tempId,
                conversation: conversationId,
                sender_id: currentUserId,
                sender_name: currentUser?.full_name || "أنا",
                content,
                created_at: new Date().toISOString(),
                optimistic: true, // لتمييزها بصرياً في الـ Bubble
              });
            }
          )
        );

        try {
          const { data } = await queryFulfilled;
          // استبدال الرسالة المؤقتة بالبيانات الحقيقية القادمة من دجانغو
          dispatch(
            apiSlice.util.updateQueryData(
              "getConversationMessages",
              { conversationId },
              (draft) => {
                if (!draft?.results) return;
                const index = draft.results.findIndex((msg) => msg.id === tempId);
                if (index !== -1) {
                  draft.results[index] = data;
                }
              }
            )
          );
        } catch {
          patchResult.undo(); // إلغاء الحقن وإخفاء الرسالة إذا فشل الإنترنت أو حدث خطأ
        }
      },
    }),

    // 4️⃣ تعيين المحادثة كمقروءة فور دخولها
    markConversationAsRead: builder.mutation({
      query: (conversationId) => ({
        url: `messaging/conversations/${conversationId}/read/`,
        method: "POST",
      }),
      // عمل invalidate لكاش القائمة لتصفير العداد فوراً
      invalidatesTags: (result, error, conversationId) => [
        { type: "Messages", id: `CONVERSATION_${conversationId}` },
        { type: "Messages", id: "LIST" }
      ],
    }),

    // 5️⃣ جلب الـ Unread Count الخاص بمحادثة معينة
    getConversationUnreadCount: builder.query({
      query: (conversationId) => `messaging/conversations/${conversationId}/unread/`,
      providesTags: (result, error, conversationId) => [
        { type: "Messages", id: `UNREAD_${conversationId}` },
      ],
    }),

    // 6️⃣ جلب إجمالي الرسائل غير المقروءة لكل التطبيق (للـ Navbar العلوي مثلاً)
    getGlobalUnreadMessagesCount: builder.query({
      query: () => "messaging/messages/unread-count/",
      providesTags: [{ type: "Messages", id: "GLOBAL_UNREAD" }],
    }),
  }),
});

// تصدير الـ Hooks النظيفة والجاهزة للاستعمال مباشرة بالصفحة والمكونات
export const {
  useGetConversationsQuery,
  useGetConversationMessagesQuery,
  useSendMessageMutation,
  useMarkConversationAsReadMutation,
  useGetConversationUnreadCountQuery,
  useGetGlobalUnreadMessagesCountQuery,
} = messageApi;