// src/api/endpoints/consultationsApi.js
import { apiSlice } from "../apiSlice";

export const consultationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // إرسال طلب استشارة
    sendConsultationRequest: builder.mutation({
      query: (data) => ({
        url: '/volunteers/consultations/create/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Consultations'],
    }),

    // جلب طلبات الاستشارة (للمستشار)
    getConsultationRequests: builder.query({
      query: () => '/consultations/requests/',
      providesTags: ['Consultations'],
    }),

  }),
});

export const {
  useSendConsultationRequestMutation,
  useGetConsultationRequestsQuery,
} = consultationsApi;