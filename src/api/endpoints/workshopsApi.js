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
      query: (id) => `/admin/workshops/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Workshop', id }],
    }),
    

    // جلب جميع الورشات (لصفحة WorkshopsPage)
    getAllWorkshops: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();

        return `volunteers/workshops/${queryString ? `?${queryString}` : ''}`;

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
  transformResponse: (response) => response.results,

  providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({
            type: 'Workshop',
            id,
          })),
          { type: 'CampWorkshops', id: 'LIST' },
        ]
      : [{ type: 'CampWorkshops', id: 'LIST' }],
}),


    // جلب أقرب ورشة عمل (لصفحة المتطوع الرئيسية)
    getNearestWorkshop: builder.query({
      query: () => '/volunteers/nearest-workshop/',
      providesTags: ['Workshop'],
    }),

//عرض الافكار يلي بحالة المعسكر
getCampWorkshopProjects: builder.query({
  query: (id) => `/bootcamp/bootcamp-sessions/${id}/ideas/`,

  transformResponse: (response) => response.results,

  providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({
            type: 'CampProjects',
            id,
          })),
          { type: 'CampProjects', id: 'LIST' },
        ]
      : [{ type: 'CampProjects', id: 'LIST' }],
}),
// جلب نشاطات الصفحة الرئيسية
// جلب النشاطات للصفحة الرئيسية
getPublicWorkshops: builder.query({
  query: () => "volunteers/public-workshops/",
  providesTags: ["Workshop"],
}),


// دالة تحديث حالة الحضور والغياب للمشروع
updateProjectAttendance: builder.mutation({
  query: ({ sessionId, idea_id, status }) => ({
    url: `/bootcamp/bootcamp-sessions/${sessionId}/attendance/`,
    method: 'POST',
    body: {
      idea_id,
      status,
    },
  }),

  invalidatesTags: [{ type: 'CampProjects', id: 'LIST' }],
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
  useGetPublicWorkshopsQuery,
} = workshopsApi;