// src/api/endpoints/campApi.js
import { apiSlice } from "../../apiSlice";

export const campApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // إنهاء المعسكر وإرسال إشعارات للجميع
    endCamp: builder.mutation({
      query: ( season_id ) => ({
        url: `/admin/bootcamp/decisions/end-camp/${season_id}/`,
        method: 'POST',
      }),
      invalidatesTags: ['Camp', 'Notifications'],
    }),

    // جلب حالة المعسكر
    getCampStatus: builder.query({
      query: () => '/admin/bootcamp/status/',
      providesTags: ['Camp'],
    }),
    getIncubatedcamp: builder.query({
  query: () =>
    "/admin/bootcamp/attendance/decisions/",
  providesTags: ["Incubated"],
}),

  }),
});

export const {
  useGetIncubatedcampQuery,
  useEndCampMutation,
  useGetCampStatusQuery,
} = campApi;