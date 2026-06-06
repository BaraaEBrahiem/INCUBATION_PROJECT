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

    //جلب طلبات الفريق
    getadminTeamRequests: builder.query({
      query: () => '/admin/volunteers/team-request-owners/',
      providesTags: ['VolunteerRequests'],

    }),
    //ارسال دعوة تقييم

    sendEvaluationInvitation: builder.mutation({
      query: ({ evaluator_id, invitationData }) => ({
        url: `/admin/volunteers/${evaluator_id}/send-invitation/`,
        method: 'POST',
        body: invitationData, // الحقول: volunteer_id, expected_duration, task
      }),
      invalidatesTags: ['Evaluators'],
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

    // جلب قائمة المتطوعين المقترحين
    assignSuggestedVolunteers: builder.mutation({
  query: ({ team_request_id, volunteer_ids }) => ({
    url: `/admin/volunteers/${team_request_id}/suggest/`,
    method: "POST",
    body: { volunteer_ids },
  }),
  invalidatesTags: ["VolunteerRequests"],
}),

// جلب تفاصيل طلب فريق معين بواسطة الـ id لعرضه داخل المودال
  getRequestDetails: builder.query({
    query: (pk) => `/admin/volunteers/team-requests/${pk}/`, 
    providesTags: ['VolunteerProfile'],
}),
  getVolunteerDetails: builder.query({
    query: (id) =>
    `/admin/volunteers/${id}/`,
    
    providesTags: [
    "VolunteerProfile",
  ],
}),
//جلب المتطوعين المتاحين للاقتراح منهم
  getAvailableVolunteers: builder.query({
    query: () => `/admin/volunteers/available-approved-volunteers/`,
    providesTags: ['Volunteers'],
})


  }),
  
});

export const {
  useGetVolunteersQuery,
  useGetVolunteerRequestsQuery,
  useGetEvaluatorsQuery,
  useGetVolunteerDetailsQuery,
  useApproveVolunteerRequestMutation,
  useRejectVolunteerRequestMutation,
  useSendEvaluationInvitationMutation,
  useRemoveEvaluatorRoleMutation,
  useAssignSuggestedVolunteersMutation,
  useGetRequestDetailsQuery,
  useGetadminTeamRequestsQuery,
  useGetAvailableVolunteersQuery
} = volunteersOptionsApi;