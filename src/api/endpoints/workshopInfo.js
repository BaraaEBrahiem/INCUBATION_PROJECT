// src/api/endpoints/userWorkshopsApi.js
import { apiSlice } from "../apiSlice";

export const workshopInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //جلب معلومات ورشة 
    getWorkshopInfoById: builder.query({
      query: (id) => `/volunteers/workshops-details/${id}/`,
      providesTags: (result, error, id) => [{ type: 'WorkshopInfo', id }],
    }),

    // جلب أقرب ورشة عمل للمتطوع المسجل حالياً
  getNearestWorkshop: builder.query({
  query: () => '/volunteers/nearest-workshop/', // تأكدي من ضبط المسار حسب مسار الـ URL في الباك إند لديكِ
  providesTags: ['WorkshopInfo'],
}),


  }),
});

export const {
  useGetWorkshopInfoByIdQuery,
  useGetNearestWorkshopQuery,
} = workshopInfoApi;