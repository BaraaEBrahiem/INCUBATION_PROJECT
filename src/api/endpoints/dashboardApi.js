import { apiSlice } from '../apiSlice'; 

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // جلب بيانات لوحة تحكم المراحل
    getIdeaDashboard: builder.query({
      query: () => 'ideas/idea-dashboard/', 
      providesTags: ['Dashboard'], 
    }),
    //حقن ميزة إرسال طلب الغياب
    requestAbsence: builder.mutation({
      query: (body) => ({
        url: 'bootcamp/owner-bootcamp/absence-request/',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Dashboard'], 
    }),
    saveExhibitionData: builder.mutation({
      query: (payload) => ({
        url: "ideas/exhibition/submit/",
        method: "POST",
        body: payload, 
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: false,
});

// تصدير الـ Hook التلقائي الناتج عن عملية الحقن
export const { useGetIdeaDashboardQuery, useRequestAbsenceMutation, useSaveExhibitionDataMutation } = dashboardApi;