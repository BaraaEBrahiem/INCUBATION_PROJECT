// src/api/endpoints/teamApi.js
import { apiSlice } from "../apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // إرسال طلب فريق (من TeamRequestForm)
    // -----------------------------
    sendTeamRequest: builder.mutation({
      query: (data) => ({
        url: "/ideas/team-request/",
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
      query: () => '/ideas/team-request/',
      providesTags: ['TeamRequests'],
    }),

    // -----------------------------
    // جلب تفاصيل طلب فريق محدد
    // -----------------------------
    getTeamRequestById: builder.query({
      query: (id) => `/volunteers/join-request-details/${id}/`,
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