// src/api/endpoints/absenceApi.js
import { apiSlice } from "../../apiSlice";

export const absenceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

     // نقطة نهاية موحدة للقبول والتحذير
    decideAbsence: builder.mutation({
      query: ({ pk, decision }) => ({
        url: `/admin/bootcamp/absence/${pk}/decide/`,
        method: 'POST',
        body: { decision },
      }),
      invalidatesTags: ['AbsenceRequests'],
    }),

    // جلب طلبات الغياب
    getAbsenceRequests: builder.query({
      query: () => '/admin/bootcamp/absence/',
      providesTags: ['AbsenceRequests'],
    }),

  }),
});

export const {
  useDecideAbsenceMutation,
  useGetAbsenceRequestsQuery,
} = absenceApi;