import { apiSlice } from "../apiSlice";

export const projectsInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //تفاصيل المشروع المسند للمتطوع
    getAssignProjectInfo: builder.query({
      query: (id) => `evaluations/my-assignments_details/${id}/`,
      providesTags: ['Projects'],
    }),

    // معلومات المشروع (داخل لوحة التحكم)
    getProjectInfo: builder.query({
      query: (id) => `admin/projects/${id}/info/`,
      providesTags: ["Projects"],
    }),

    // تفاصيل المشروع الكاملة
    getProjectDetails: builder.query({
      query: (id) => `admin/ideas/${id}/details/`,
      providesTags: ["Projects"],
    }),
     //جلب تفاصيل المشروع للادمن
    getAdminProjectDetails: builder.query({
      query: (id) => `admin/ideas/${id}/details/`,
      providesTags: ["Projects"],
    }),
    //جدولة جلسة متابعة بالاحتضان
  scheduleFollowUp:
  builder.mutation({
    query: ({
      idea_id,
      meetingDate,
    }) => {
      const [
        date,
        time,
      ] =
        meetingDate.split(
          "T"
        );

      return {
        url:
          `admin/incubations/ideas/${idea_id}/meetings/schedule/`,
        method:
          "POST",

        body: {
          date,
          time,
        },
      };
    },

    invalidatesTags: [
      "Projects",
    ],
  }),
  }),
});
export const {
  useGetProjectInfoQuery,
  useGetProjectDetailsQuery,
  useGetAdminProjectDetailsQuery,
  useScheduleFollowUpMutation,
  useGetAssignProjectInfoQuery,
} = projectsInfoApi;