// src/api/endpoints/userWorkshopsApi.js
import { apiSlice } from "../apiSlice";

export const workshopInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({






    // ==============================
    // تفاصيل ورشة منشورة للعامة
    // ==============================

    getPublicWorkshopDetails: builder.query({
      query: (workshop_id) =>
        `volunteers/public-workshops-details/${workshop_id}/`,
      

      providesTags: (result, error, workshop_id) => [
        { type: "WorkshopInfo", id: workshop_id },
      ],
    }),


    // ==============================
    // التسجيل في الورشة
    // ==============================

    registerWorkshop: builder.mutation({
      query: (workshop_id) => ({
        url: `volunteers/public-workshops/${workshop_id}/register/`,
        method: "POST",
      }),
    }),


    //جلب معلومات ورشة 
    getWorkshopInfoById: builder.query({

      query: (id) => `volunteers/workshop-details/${id}/`,

      providesTags: (result, error, id) => [{ type: 'WorkshopInfo', id }],
    }),

    // جلب أقرب ورشة عمل للمتطوع المسجل حالياً
  getNearestWorkshop: builder.query({
  query: () => 'volunteers/nearest-workshop/', // تأكدي من ضبط المسار حسب مسار الـ URL في الباك إند لديكِ
  providesTags: ['WorkshopInfo'],
}),


  }),
});

export const {
  useGetWorkshopInfoByIdQuery,
  useGetNearestWorkshopQuery,

  useGetPublicWorkshopDetailsQuery,
  useRegisterWorkshopMutation,
} = workshopInfoApi;