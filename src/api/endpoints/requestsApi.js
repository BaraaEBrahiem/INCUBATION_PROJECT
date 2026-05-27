// src/api/endpoints/requestsApi.js
import { apiSlice } from "../apiSlice";

export const requestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // جلب جميع الطلبات (استشارات + تطوع)
    // -----------------------------
    getAllRequests: builder.query({
      query: () => '/volunteers/all-requests/',
      providesTags: ['Requests'],
    }),

    // -----------------------------
    // جلب طلبات الاستشارة فقط
    // -----------------------------
    getConsultationRequests: builder.query({
      query: () => '/volunteers/consultations/',
      providesTags: ['Requests'],
    }),

    // -----------------------------
    // جلب طلبات التطوع فقط
    // -----------------------------
    getVolunteerRequests: builder.query({
      query: () => '/volunteers/join-requests/',
      providesTags: ['Requests'],
    }),

    // -----------------------------
    // جلب طلب تطوع محدد بواسطة ID
    // -----------------------------
    getVolunteerRequestById: builder.query({
      query: (id) => `/requests/join-request-details/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Requests', id }],
}),
  }),
});

export const {
  useGetAllRequestsQuery,
  useGetConsultationRequestsQuery,
  useGetVolunteerRequestsQuery,
  useGetVolunteerRequestByIdQuery,
} = requestsApi;