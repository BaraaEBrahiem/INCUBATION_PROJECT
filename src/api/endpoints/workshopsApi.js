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
    // جلب أقرب ورشة عمل (لصفحة المتطوع الرئيسية)
    getNearestWorkshop: builder.query({
      query: () => '/volunteers/nearest-workshop/',
      providesTags: ['Workshop'],
    }),


  }),
});

export const {
  useGetLatestWorkshopsQuery,
  useGetWorkshopByIdQuery,
  useGetAllWorkshopsQuery,  
  useAddWorkshopMutation,
  useGetWorkshopsQuery,
  useGetNearestWorkshopQuery,
} = workshopsApi;