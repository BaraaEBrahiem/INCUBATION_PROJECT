import { apiSlice } from "../apiSlice";



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

 // 2️⃣ جلب رسائل محادثة معينة
    getConversationMessages: builder.query({
      query: ({ conversationId, cursor, pageSize = 20 }) => ({
        url: `messaging/conversations/${conversationId}/messages/`,
        params: {
          ...(cursor ? { cursor } : {}),
          page_size: pageSize,
        },
      }),

      // 🎯 التعديل السحري: جعل مفتاح الكاش هو الـ ID مباشرة لضمان مطابقة الـ Optimistic Update
      serializeQueryArgs: ({ queryArgs }) => {
        // إذا تم تمرير كائن يحتوي على المعرف أو المعرف مباشرة
        const id = queryArgs?.conversationId || queryArgs;
        return id ? String(id) : "default";
      },

      // احتفاظ بالقيم القديمة عند جلب صفحات جديدة
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
        const currentId = currentArg?.conversationId || currentArg;
        const previousId = previousArg?.conversationId || previousArg;
        return currentId !== previousId;
      },

      providesTags: (result, error, arg) => {
        const id = arg?.conversationId || arg;
        return [{ type: "Messages", id: `CONVERSATION_${id}` }];
      },


    }),

    // 3️⃣ إرسال الرسالة (يدعم الـ Optimistic UI الشفاف والذكي)
    sendMessage: builder.mutation({
      query: ({ conversationId, content }) => ({
        url: `messaging/conversations/${conversationId}/messages/send/`,
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

        // التحديث المتفائل الفوري باستخدام المعرّف الموحد ليتطابق مع الـ serializeQueryArgs الجديد
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getConversationMessages",
            conversationId, // مررنا المعرف مباشرة هنا ليتطابق تماماً
            (draft) => {
              if (!draft) return;
              if (!draft.results) draft.results = [];
              
              draft.results.push({
                id: tempId,
                conversation: conversationId,
                sender_id: currentUserId,
                sender_name: currentUser?.full_name || "أنا",
                content,
                created_at: new Date().toISOString(),
                optimistic: true,
              });
            }
          )
        );

        try {
          const { data } = await queryFulfilled;
          // استبدال الرسالة المؤقتة بالبيانات الحقيقية القادمة من السيرفر
          dispatch(
            apiSlice.util.updateQueryData(
              "getConversationMessages",
              conversationId, // مررنا المعرف مباشرة هنا أيضاً
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
          patchResult.undo(); // التراجع عن الحقن المتفائل في حال حدوث خطأ بالشبكة
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