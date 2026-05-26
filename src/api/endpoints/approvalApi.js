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

<<<<<<< HEAD
      invalidatesTags: ["Volunteers", "Approvals"], 
    }),

=======
    // للمهام (Tasks)، المشاريع، الورشات... إلخ
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
    approveGeneral: builder.mutation({
      query: ({ type, id }) => ({
        url: `admin/${type}/${id}/approve/`,
        method: "POST",
      }),
      invalidatesTags: ["Approvals"],
    }),

<<<<<<< HEAD
=======
    rejectGeneral: builder.mutation({
      query: ({ type, id, reason }) => ({
        url: `admin/${type}/${id}/reject/`,
        method: "POST",
        body: { reason },
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

>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
  }),
});


export const {
<<<<<<< HEAD
  useHandleConsultationDecisionMutation,
  useApproveGeneralMutation,
=======
  useApproveGeneralMutation,
  useRejectGeneralMutation,
  useHandleConsultationDecisionMutation,
>>>>>>> df2da58e9d26fe04ba2613780d1d33bd4d047551
} = approvalApi;