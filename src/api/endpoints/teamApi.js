// src/api/endpoints/teamApi.js
import { apiSlice } from "../apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // 1. إرسال طلب فريق (مطابق للصورة 1)
    // -----------------------------
    sendTeamRequest: builder.mutation({
      query: (data) => ({
        url: '/ideas/team-request/',
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
    // جلب المتطوعين المقترحين
    // -----------------------------
    getSuggestedVolunteers: builder.query({
      query: () => '/ideas/suggested-volunteers/',
      providesTags: ['SuggestedVolunteers'],
    }),

    // -----------------------------
    // إضافة متطوع مباشرة إلى الفريق
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

  }),
});

export const {
  useSendTeamRequestMutation,
  useGetTeamQuery,
  useGetSuggestedVolunteersQuery,
  useAddToTeamMutation,
  useGetTeamRequestsQuery,
} = teamApi;