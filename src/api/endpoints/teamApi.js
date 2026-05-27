// src/api/endpoints/teamApi.js
import { apiSlice } from "../apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // إرسال طلب فريق (من TeamRequestForm)
    // -----------------------------
    sendTeamRequest: builder.mutation({
      query: (data) => ({
        url: '/team/requests/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TeamRequests'],
    }),

    // -----------------------------
    // جلب الفريق الحالي (لصاحب الفكرة)
    // -----------------------------
    getTeam: builder.query({
      query: () => '/ideas/team/',
      providesTags: ['Team'],
    }),

    // -----------------------------
    // جلب المتطوعين المقترحين (لصاحب الفكرة الذي ليس لديه فريق)
    // -----------------------------
    getSuggestedVolunteers: builder.query({
      query: () => '/ideas/suggested-volunteers/',
      providesTags: ['SuggestedVolunteers'],
    }),

    // -----------------------------
    // إضافة متطوع إلى الفريق
    // -----------------------------
    addToTeam: builder.mutation({
      query: (volunteerId) => ({
        url: `/team/add/${volunteerId}/`,
        method: 'POST',
      }),
      invalidatesTags: ['Team', 'SuggestedVolunteers'],
    }),

    // -----------------------------
    // جلب طلبات الفريق (لصاحب الفكرة)
    // -----------------------------
    getTeamRequests: builder.query({
      query: () => '/team/requests/',
      providesTags: ['TeamRequests'],
    }),

    // -----------------------------
    // جلب تفاصيل طلب فريق محدد
    // -----------------------------
    getTeamRequestById: builder.query({
      query: (id) => `/team/requests/${id}/`,
      providesTags: (result, error, id) => [{ type: 'TeamRequests', id }],
    }),

  }),
});

export const {
  useSendTeamRequestMutation,
  useGetTeamQuery,
  useGetSuggestedVolunteersQuery,
  useAddToTeamMutation,
  useGetTeamRequestsQuery,
  useGetTeamRequestByIdQuery,
} = teamApi;