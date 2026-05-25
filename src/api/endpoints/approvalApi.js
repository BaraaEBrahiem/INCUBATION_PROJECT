import { apiSlice } from "../apiSlice";

export const approvalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    handleConsultationDecision: builder.mutation({
      query: ({ id, action, reason = "" }) => ({
        url: `/volunteers/consultations/${id}/decision/`,
        method: "POST",
        body: { 
          action, // الباك إند يتوقع كلمة 'approve' أو 'reject'
          reason
        },
      }),

      invalidatesTags: ["Volunteers", "Approvals"], 
    }),

    approveGeneral: builder.mutation({
      query: ({ type, id }) => ({
        url: `admin/${type}/${id}/approve/`,
        method: "POST",
      }),
      invalidatesTags: ["Approvals"],
    }),

  }),
});

export const {
  useHandleConsultationDecisionMutation,
  useApproveGeneralMutation,
} = approvalApi;