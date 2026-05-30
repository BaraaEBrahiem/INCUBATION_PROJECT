import { apiSlice } from "../apiSlice";

export const approvalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // للمهام (Tasks)، المشاريع، الورشات... إلخ
    approveGeneral: builder.mutation({
      query: ({ type, id }) => ({
        url: `admin/${type}/${id}/approve/`,
        method: "POST",
      }),
      invalidatesTags: ["Approvals"],
    }),

    rejectGeneral: builder.mutation({
      query: ({ type, id, reason }) => ({
        url: `admin/${type}/${id}/reject/`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Approvals"],
    }),

    handleConsultationDecision: builder.mutation({
      query: ({ id, action }) => ({
        url: `volunteers/consultations/${id}/decision/`,
        method: "POST",
        body: { action },
  
      }),
      invalidatesTags: ["Requests"],
    }),

    handleJoinRequestDecision: builder.mutation({
      query: ({ id, action }) => ({
        url: `volunteers/join-requests/${id}/decision/`,
        method: "POST",
        body: { action },
      }),
      invalidatesTags: ["Requests"],
    }),

  }),
});


export const {
  useApproveGeneralMutation,
  useRejectGeneralMutation,
  useHandleConsultationDecisionMutation,
  useHandleJoinRequestDecisionMutation,
} = approvalApi;