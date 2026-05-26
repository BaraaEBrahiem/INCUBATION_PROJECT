import { apiSlice } from "../apiSlice";

export const publicProjectsApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({

      // جلب مشروع واحد للعرض العام
      getPublicProjectById:
        builder.query({
          query: (id) =>
            `admin/ideas/${id}/details/`,
          providesTags: [
            "PublicProjects",
          ],
        }),

      // جلب كل المشاريع
      getPublicProjects:
        builder.query({
          query: () =>
            `admin/incubations/negative-projects/`,
          providesTags: [
            "PublicProjects",
          ],
        }),

      // المشاريع المحتضنة للإدارة
      getIncubatedProjects:
        builder.query({
          query: () =>
            `/admin/incubations/projects`,
          providesTags: [
            "PublicProjects",
          ],
        }),

      // ✅ المقيمين الحاليين للمشروع المحتضن
      getIncubationEvaluators:
        builder.query({
          query: (
            projectId
          ) =>
            `/admin/incubations/ideas/${projectId}/mentors/`,
        }),

      // تعيين مقيمين احتضان
      assignIncubationEvaluators:
        builder.mutation({
          query: ({
            idea_id,
            mentor_user_ids,
          }) => ({
            url:
              `/admin/incubations/ideas/${idea_id}/mentors/assign/`,
            method:
              "POST",
            body: {
              mentor_user_ids:
                Array.isArray(
                  mentor_user_ids
                )
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
  useGetIncubatedProjectsQuery,
  useGetIncubationEvaluatorsQuery,
  useAssignIncubationEvaluatorsMutation,
} = publicProjectsApi;