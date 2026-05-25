import { apiSlice } from "../apiSlice";

export const projectsInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // معلومات المشروع (داخل لوحة التحكم)
    getProjectInfo: builder.query({
      query: (id) => `admin/projects/${id}/info/`,
      providesTags: ["Projects"],
    }),

    // تفاصيل المشروع الكاملة
    getProjectDetails: builder.query({
      // query: (id) => `admin/projects/${id}/details/`,
      providesTags: ["Projects"],
    }),
     //جلب تفاصيل المشروع للادمن
    getAdminProjectDetails: builder.query({
      query: (id) => `admin/projects/${id}/details/`,
      providesTags: ["Projects"],
    }),
    //جدولة جلسة متابعة بالاحتضان
    scheduleFollowUp: builder.mutation({
      query: ({ idea_id, meetingDate }) => ({
        url: `admin/incubations/ideas/${idea_id}/meetings/schedule/`,
        method: "POST",
        body: { meetingDate },
      }),
      invalidatesTags: ["Projects"],
    }),


  }),
});
