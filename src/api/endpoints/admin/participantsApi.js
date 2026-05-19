// src/api/endpoints/participantsApi.js
import { apiSlice } from "../../apiSlice";

export const participantsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

     // نقطة نهاية واحدة للقبول والرفض
    decideParticipant: builder.mutation({
      query: ({ idea_id, decision }) => ({
        url: `/admin/bootcamp/decisions/${idea_id}/decision/`,
        method: 'POST',
        body: { decision }, // "accept" أو "reject"
      }),
      invalidatesTags: ['Participants'],
    }),

    // جلب قائمة المشاركين
    getParticipants: builder.query({
      query: () => '/admin/bootcamp/decisions/ideas/',
      providesTags: ['Participants'],
    }),

  }),
});

export const {
  useDecideParticipantMutation,
  useGetParticipantsQuery,
} = participantsApi;