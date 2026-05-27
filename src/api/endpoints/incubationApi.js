
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
    // 2) تحديث المرحلة الحالية
    // -----------------------------
    updateIncubationStage: builder.mutation({
      query: ({ userId, currentStage, stageData }) => ({
        url: `/incubation/progress/${userId}/`,
        method: 'PATCH',
        body: { currentStage, ...stageData },
      }),
      invalidatesTags: ['Incubation'],
    }),

    // -----------------------------
    // 3) جلب بيانات المعسكر (المرحلة 1)
    // -----------------------------
    getCampData: builder.query({
      query: () => `/bootcamp/owner-bootcamp/sessions/`,
      providesTags: ['Incubation'],
    }),

    // -----------------------------
    // 4) حفظ بيانات المعسكر (المرحلة 1)
    // -----------------------------
    saveCampData: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/incubation/camp/${userId}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Incubation'],
    }),

    getNextSession: builder.query({
      query: () => ({
        url: 'bootcamp/owner-bootcamp/next-session/', // الـ URL الخاص بالصورة الثانية تماماً
        method: 'GET',
      }),
      providesTags: ['Incubation']
    }),
    // -----------------------------
    // 5) طلب غياب عن جلسة (المرحلة 1)
    // -----------------------------
    requestAbsence: builder.mutation({
      query: ({ userId, reason, sessionId }) => ({
        url: '/bootcamp/owner-bootcamp/absence-request/',
        method: 'POST',
        body: { userId, reason, sessionId },
      }),
      invalidatesTags: ['Incubation'],
    }),

    // -----------------------------
    // 6) تحديث الحضور (عند حضور جلسة) (المرحلة 1)
    // -----------------------------
    updateAttendance: builder.mutation({
      query: ({ userId, sessionId, attended }) => ({
        url: '/incubation/camp/attendance/',
        method: 'PATCH',
        body: { userId, sessionId, attended },
      }),
      invalidatesTags: ['Incubation'],
    }),

    // -----------------------------
    // 7) جلب بيانات تقييم اللجنة (المرحلة 2)
    // -----------------------------
    getCommitteeEvaluation: builder.query({
      query: (userId) => `/incubation/committee/${userId}/`,
      providesTags: ['Incubation'],
    }),

    // -----------------------------
    // 8) حفظ تقييم اللجنة (المرحلة 2)
    // -----------------------------
    saveCommitteeEvaluation: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/incubation/committee/${userId}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Incubation'],
    }),

    // -----------------------------
    // 9) جلب بيانات مرحلة المتابعة (المرحلة 3)
    // -----------------------------
    getFollowupData: builder.query({
      query: (userId) => `/incubation/followup/${userId}/`,
      providesTags: ['Incubation'],
    }),

    // -----------------------------
    // 10) حفظ بيانات مرحلة المتابعة (المرحلة 3)
    // -----------------------------
    saveFollowupData: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/incubation/followup/${userId}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Incubation'],
    }),

    // -----------------------------
    // 11) حل ملاحظة (تحديث حالة الملاحظة) (المرحلة 3)
    // -----------------------------
    resolveNote: builder.mutation({
      query: ({ userId, noteId }) => ({
        url: `/incubation/followup/note/${noteId}/resolve/`,
        method: 'PATCH',
        body: { userId },
      }),
      invalidatesTags: ['Incubation'],
    }),

    // -----------------------------
    // 12) جلب بيانات المعرض المحفوظة مسبقاً (المرحلة 4)
    // -----------------------------
    getExhibitionData: builder.query({
      query: (userId) => `/incubation/exhibition/${userId}/`,
      providesTags: ['Incubation'],
    }),

    // -----------------------------
    // 13) حفظ بيانات المعرض (المرحلة 4)
    // -----------------------------
    saveExhibitionData: builder.mutation({
      query: (formData) => ({
        url: '/ideas/exhibition/submit/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Incubation'],
    }),
    // -----------------------------
    // جلب معلومات الاحتضان (لصفحة عرض المعلومات فقط)
    // -----------------------------
    getIncubationInfo: builder.query({
      query: () => `/ideas/exhibition/dashboard/`,
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
      query: (id) => `/ideas/project-details/${id}/`,
      providesTags: (result, error, id) => [{ type: 'IncubationRequests', id }],
}),

  }),
});

export const {
  // المراحل العامة
  useGetIncubationProgressQuery,
  useUpdateIncubationStageMutation,

  // المرحلة 1: المعسكر
  useGetCampDataQuery,
  useSaveCampDataMutation,
  useRequestAbsenceMutation,
  useUpdateAttendanceMutation,

  // المرحلة 2: تقييم اللجنة
  useGetCommitteeEvaluationQuery,
  useSaveCommitteeEvaluationMutation,

  // المرحلة 3: الاحتضان والمتابعة
  useGetFollowupDataQuery,
  useSaveFollowupDataMutation,
  useResolveNoteMutation,

  // المرحلة 4: المعرض
  useGetExhibitionDataQuery,
  useSaveExhibitionDataMutation,

  // جلب معلومات الاحتضان (لصفحة عرض المعلومات فقط)
  useGetIncubationInfoQuery,

  // جلب قائمة المحتضنين (لصفحة الادارة)
  useGetIncubatedQuery,
  // جلب تفاصيل طلب احتضان محدد
  useGetIncubationRequestQuery,
} = incubationApi;