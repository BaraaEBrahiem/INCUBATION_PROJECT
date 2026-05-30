// src/api/endpoints/workshopsApi.js
import { apiSlice } from "../apiSlice";

export const workshopsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب آخر 4 ورشات للصفحة الرئيسية
    getLatestWorkshops: builder.query({
      query: () => '/workshops/latest/',
      providesTags: ['Workshop'],
    }),

    // جلب ورشة محددة بواسطة ID
    getWorkshopById: builder.query({
      query: (id) => `/volunteers/public-workshopsdetails/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Workshop', id }],
    }),

    // جلب جميع الورشات (لصفحة WorkshopsPage)
    getAllWorkshops: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return `/volunteers/public-workshops/${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Workshop'],
    }),

    // إضافة ورشة جديدة
    addWorkshop: builder.mutation({
      query: (workshopData) => ({
        url: '/volunteers/workshops/create/',
        method: 'POST',
        body: workshopData,
      }),
      invalidatesTags: ['Workshop'],
    }),

    getWorkshops: builder.query({
      query: () => 'admin/workshops/',
      providesTags: ['Workshop'],
    }),
  //جلب ورشات المعسكر للمتطوع
  getCampWorkshops: builder.query({
  query: () => '/bootcamp/my-bootcamp-sessions/',
  providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({ type: 'Workshop', id })),
          { type: 'CampWorkshops', id: 'LIST' },
        ]
      : [{ type: 'Workshop', id: 'LIST' }],
}),

    // جلب أقرب ورشة عمل (لصفحة المتطوع الرئيسية)
    getNearestWorkshop: builder.query({
      query: () => '/volunteers/nearest-workshop/',
      providesTags: ['Workshop'],
    }),

getCampWorkshopProjects: builder.query({
  query: (id) => `/bootcamp/bootcamp-sessions/${id}/ideas/`,
  providesTags: (result, error, id) => [{ type: 'CampProjects', id: id }],
}),

// دالة تحديث حالة الحضور والغياب للمشروع
updateProjectAttendance: builder.mutation({
  query: ({ idea_id, status }) => ({
    url: `/admin/camp/projects/${idea_id}/attendance/`,
    method: 'POST',
    body: { status },
  }),
  invalidatesTags: (result, error, { idea_id }) => ['CampProjects', idea_id],
}),

  }),
});

export const {
  useGetLatestWorkshopsQuery,
  useGetWorkshopByIdQuery,
  useGetAllWorkshopsQuery,  
  useAddWorkshopMutation,
  useGetWorkshopsQuery,
  useGetCampWorkshopsQuery,
  useGetCampWorkshopProjectsQuery,
  useUpdateProjectAttendanceMutation,
  useGetNearestWorkshopQuery,
  useGetCampWorkshopsQuery,
  useGetCampWorkshopProjectsQuery,
  useUpdateProjectAttendanceMutation,
} = workshopsApi;