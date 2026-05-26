// src/api/endpoints/exhibitionApi.js
import { apiSlice } from "../../apiSlice";

export const exhibitionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // 1) تحديد موعد المعرض وإرسال إشعارات
    // -----------------------------
    setExhibitionDate: builder.mutation({
      query: (data) => ({
        url: '/admin/exhibition/create/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Exhibition'],
    }),

    // -----------------------------
    // 2) جلب موعد المعرض الحالي
    // -----------------------------
    getExhibitionDate: builder.query({
      query: () => '/admin/exhibition/date/',
      providesTags: ['Exhibition'],
    }),

    // -----------------------------
    // 3) جلب جميع المشاريع المشاركة في المعرض
    // -----------------------------
    getExhibitionProjects: builder.query({
      query: () => '/exhibition/projects/',
      providesTags: ['ExhibitionProjects'],
    }),

    // -----------------------------
    // 4) جلب بطاقة المعرض لمشروع محدد (للعرض العام)
    // -----------------------------
    getExhibitionCard: builder.query({
      query: (submission_id) => `/admin/exhibition/submissions/${submission_id}/`,
      providesTags: (result, error, submission_id) => [{ type: 'ExhibitionProjects', id: submission_id }],
    }),

    // -----------------------------
    // 5) طلبات البطاقات (للمشاريع التي تريد عرضاً في المعرض)
    // -----------------------------

    // جلب طلبات البطاقات
    getExhibitionCardRequests: builder.query({
    query: () => '/admin/exhibition/submissions/',
    providesTags: ['ExhibitionCardRequests'],
    }),

    // جلب تفاصيل طلب بطاقة محدد
    getExhibitionCardRequestDetails: builder.query({
    query: (requestId) => `/admin/exhibition/card-requests/${requestId}/`,
    providesTags: (result, error, requestId) => [{ type: 'ExhibitionCardRequests', id: requestId }],
    }),

    // -----------------------------
    // 6) جلب سجل المعارض السابقة
    // -----------------------------
    getExhibitionsList: builder.query({
    query: () => '/admin/exhibition/history/',
    providesTags: ['ExhibitionsList'],
    }),


  }),
});

export const {
  useSetExhibitionDateMutation,
  useGetExhibitionDateQuery,
  useGetExhibitionProjectsQuery,
  useGetExhibitionCardQuery,
  useGetExhibitionCardRequestsQuery,
  useGetExhibitionsListQuery,
  useGetExhibitionCardRequestDetailsQuery
} = exhibitionApi;