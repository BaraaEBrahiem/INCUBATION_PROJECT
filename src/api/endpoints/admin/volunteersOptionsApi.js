// src/api/endpoints/usersApi.js
import { apiSlice } from "../../apiSlice";

export const volunteersOptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب المتطوعين المقبولين
    getVolunteers: builder.query({
      query: () => '/admin/volunteers/approved/',
      providesTags: ['Volunteers'],
    }),

    // جلب طلبات التطوع
    getVolunteerRequests: builder.query({
      query: () => '/admin/volunteers/pending/',
      providesTags: ['VolunteerRequests'],
    }),

    // جلب المقيمين
    getEvaluators: builder.query({
      query: () => '/admin/volunteers/evaluators/',
      providesTags: ['Evaluators'],
    }),

    //ارسال دعوة تقييم
    sendEvaluationInvitation:
      builder.mutation({query: ({volunteer_id,data}) => ({
      url: `/admin/volunteers/${volunteer_id}/send-invitation/`,
      method: "POST",
      body: data,
    }),

    invalidatesTags: [
      "Evaluators",
    ],
  }),

    //ازالة دور مقيم
    removeEvaluatorRole: builder.mutation({
      query: (evaluator_id) => ({
        url: `/admin/volunteers/${evaluator_id}/remove-evaluator-role/`,
        method: 'POST',
      }),
      invalidatesTags: ['Evaluators'],
    }),

    // قبول طلب تطوع
    approveVolunteerRequest: builder.mutation({
      query: (volunteer_id) => ({
        url: `/admin/volunteers/${volunteer_id}/approve/`,
        method: 'POST',
      }),
      invalidatesTags: ['VolunteerRequests', 'Volunteers'],
    }),

    // رفض طلب تطوع
    rejectVolunteerRequest: builder.mutation({
      query: (volunteer_id) => ({
        url: `/admin/volunteers/${volunteer_id}/reject/`,
        method: 'POST',
      }),
      invalidatesTags: ['VolunteerRequests'],
    }),

  }),
});

export const {
  useGetVolunteersQuery,
  useGetVolunteerRequestsQuery,
  useGetEvaluatorsQuery,
  useApproveVolunteerRequestMutation,
  useRejectVolunteerRequestMutation,
  useSendEvaluationInvitationMutation,
  useRemoveEvaluatorRoleMutation,
} = volunteersOptionsApi;