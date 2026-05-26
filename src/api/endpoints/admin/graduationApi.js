import { apiSlice } from "../../apiSlice";

export const graduationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getEvaluationNotes: builder.query({
      query: (idea_id) => ({
        url: `/admin/incubations/ideas/${idea_id}/latest-review/`,
        method: "GET",
      }),
     
      providesTags: ["EvaluationNotes"],
    }),

    
    submitGraduationDecision: builder.mutation({
      query: ({ evaluationId, status }) => ({
        url: `/admin/incubations/ideas/${evaluationId}/graduate/`,
        method: "POST",
        body: { action: status },
      }),
  
      invalidatesTags: ["Projects", "Approvals"],
    }),

  }),
});

export const {
  useGetEvaluationNotesQuery,
  useSubmitGraduationDecisionMutation,
} = graduationApi;