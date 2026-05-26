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
        body: { rejection_reason:
        reason, },
      }),
      invalidatesTags: ["Approvals"],
    }),

    handleConsultationDecision: builder.mutation({
      query: ({ id, decision, reason = "" }) => ({
        url: `/volunteers/consultations/${id}/decision/`,
        method: "POST",
        body: { 
          decision,
          reason 
        },
      }),
      invalidatesTags: ["Volunteers", "Approvals"], 
    }),

  }),
});


export const {
  useApproveGeneralMutation,
  useRejectGeneralMutation,
  useHandleConsultationDecisionMutation,
} = approvalApi;