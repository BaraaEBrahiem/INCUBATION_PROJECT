
import { apiSlice } from "../apiSlice";

export const incubationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // 1) جلب تقدم مراحل الاحتضان لمستخدم معين
    // -----------------------------
    getIncubationProgress: builder.query({
      query: (userId) => `/incubation/progress/${userId}/`,
      providesTags: ['Incubation'],
    }),
    // -----------------------------
    // جلب معلومات الاحتضان (لصفحة عرض المعلومات فقط)
    // -----------------------------
    getIncubationInfo: builder.query({
      query: (userId) => `/incubation/info/${userId}/`,
      providesTags: ['Incubation'],
    }),
    // -----------------------------
    // جلب قائمة المحتضنين (لصفحة الادارة)
    getIncubated: builder.query({
      query: () => '/admin/incubated/',
      providesTags: ['Incubated'],
}),
// -----------------------------
// جلب تفاصيل طلب احتضان محدد
    getIncubationRequest: builder.query({
      query: (id) => `/admin/incubation-requests/${id}/`,
      providesTags: (result, error, id) => [{ type: 'IncubationRequests', id }],
}),

  }),
});

export const {
  // المراحل العامة
  useGetIncubationProgressQuery,
  // جلب معلومات الاحتضان (لصفحة عرض المعلومات فقط)
  useGetIncubationInfoQuery,

  // جلب قائمة المحتضنين (لصفحة الادارة)
  useGetIncubatedQuery,
  // جلب تفاصيل طلب احتضان محدد
  useGetIncubationRequestQuery,
} = incubationApi;