// src/api/endpoints/sessionsApi.js
import { apiSlice } from "../../apiSlice";

export const sessionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

  // إضافة جلسة جديدة  
   addSession: builder.mutation({
  query: ({sessionData, season_id}) => ({
    url: `/admin/bootcamp/sessions/${season_id}/create/`,
    method: 'POST',
    body: sessionData,
  }),
  invalidatesTags: ['Sessions'],
}),

 // جلب جميع الجلسات
    getSessions: builder.query({
      query: () => '/admin/bootcamp/sessions/',
      providesTags: ['Sessions'],
    }),

    // جلب المدربين المتاحين (لصفحة إضافة جلسة)
    // -----------------------------
    getAvailableTrainers: builder.query({
      query: () => '/admin/trainers/available/',
      providesTags: ['Trainers'],
    }),


  }),
});

export const {
  useAddSessionMutation,
  useGetSessionsQuery,
  useGetAvailableTrainersQuery,
} = sessionsApi;