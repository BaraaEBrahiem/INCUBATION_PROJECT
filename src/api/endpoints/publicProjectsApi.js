import { apiSlice } from "../apiSlice";

export const publicProjectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب مشروع واحد للعرض العام
    getPublicProjectById: builder.query({
      query: (id) => `projects/${id}/`,
      providesTags: ["PublicProjects"],
    }),

    // جلب كل المشاريع للبطاقات
    getPublicProjects: builder.query({
      query: () => `projects/`,
      providesTags: ["PublicProjects"],
    }),

    //جلب المشاريع المحتضنة للادارة
    getIncubatedProjects: builder.query({
      query: () => `/admin/incubations/projects`,
      providesTags: ["PublicProjects"],
    }),
    // جلب المقيمين لمشروع معين  (لصفحة الادارة)
    getIncubationEvaluators:
        builder.query({
          query: (projectId) =>
            `/admin/incubations/ideas/${projectId}/mentors/`,
        }),


    assignIncubationEvaluators: builder.mutation({
        query: ({ idea_id, mentor_user_ids }) => ({
    url: `/admin/incubations/ideas/${idea_id}/mentors/assign/`,
    method: "POST",
    body: {
      mentor_user_ids: Array.isArray(mentor_user_ids)
        ? mentor_user_ids
        : [],
    },
  }),

    }),
  }),
});

export const {
  useGetPublicProjectByIdQuery,
  useGetPublicProjectsQuery,
  useGetIncubationEvaluatorsQuery,
  useAssignIncubationEvaluatorsMutation,
  useGetIncubatedProjectsQuery,
} = publicProjectsApi;
