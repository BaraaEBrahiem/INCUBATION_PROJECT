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
  query: ({ idea_id, status }) => ({
    url: `/admin/exhibition/ideas/${idea_id}/graduate/`,
    method: 'POST',
    body: { status },
  }),

  
  invalidatesTags: (result, error, { idea_id }) => [{ type: 'GraduatedProjects', id: idea_id }],
}),

    getGraduatedProjects: builder.query({
      query: () => ({
        url: `/admin/incubations/graduated-projects/`, 
        method: 'GET',
      }),
    
      providesTags: ['GraduatedProjects'], 
    }),

  }),
});

export const {
  useGetEvaluationNotesQuery,
  useSubmitGraduationDecisionMutation,
  useGetGraduatedProjectsQuery,
} = graduationApi;