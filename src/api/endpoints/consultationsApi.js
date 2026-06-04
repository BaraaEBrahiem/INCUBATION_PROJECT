// src/api/endpoints/consultationsApi.js
import { apiSlice } from "../apiSlice";

export const consultationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

   sendConsultationRequest: builder.mutation({
  query: ({ volunteer_user_id, body }) => ({
    url: `/volunteers/consultations/create/${volunteer_user_id}/`, 
    method: 'POST',
    body: body, 
  }),
  invalidatesTags: ['Consultations'], 
}),

    // جلب طلبات الاستشارة (للمستشار)
    getConsultationRequests: builder.query({
      query: () => '/volunteers/consultations/',
      providesTags: ['Consultations'],
    }),

  }),
});

export const {
  useSendConsultationRequestMutation,
  useGetConsultationRequestsQuery,
} = consultationsApi;