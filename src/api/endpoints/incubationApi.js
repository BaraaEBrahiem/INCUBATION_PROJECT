 import { apiSlice } from "../apiSlice";

export const incubationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // 1) جلب تقدم مراحل الاحتضان لمستخدم معين (ملغي حذفه - تم الحفاظ عليه)
    // -----------------------------
    getIncubationProgress: builder.query({
      query: (userId) => `/incubation/progress/${userId}/`,
      providesTags: ['Incubation'],
    }),

    // -----------------------------
    // 2) تحديث المرحلة الحالية (ملغي حذفه - تم الحفاظ عليه)
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
    // 3) جلب بيانات الداشبورد العامة (تُستخدم كـ Dashboard العام في الواجهات)
    // -----------------------------
    getDashboard: builder.query({
      query: () => `/ideas/idea-dashboard/`,
      method: 'GET',
      providesTags: ['Incubation'],
    }),

    // -----------------------------
    // 5) طلب غياب عن جلسة (المرحلة 1) - تم ضبط الـ Body ليتوافق مع الكود
    // -----------------------------
    requestAbsence: builder.mutation({
      query: ({ reason, session_id }) => ({
        url: '/bootcamp/owner-bootcamp/absence-request/',
        method: 'POST',
        body: { reason, session_id },
      }),
      invalidatesTags: ['Incubation'],
    }),

    // =========================================================================
    // ✨ إضافات المرحلة الثانية (CommitteeStage)
    // =========================================================================
    // جلب حالة التقييم
    getEvaluationStatus: builder.query({
      query: () => "/evaluations/evaluation-session-status/",
      method: 'GET',
      providesTags: ['Incubation'],
    }),

    // جلب ملاحظات اللجنة
    getEvaluationNotes: builder.query({
      query: (userId) => `/evaluations/ideas/${userId}/notes/`,
      method: 'GET',
      providesTags: ['Incubation'],
    }),

    // =========================================================================
    // ✨ إضافات المرحلة الثالثة (FollowupStage)
    // =========================================================================
    // جلب نظرة عامة عن الاحتضان (next_meeting_date)
    getIncubationOverview: builder.query({
      query: (ideaId) => `/evaluations/incubation/${ideaId}/overview/`,
      method: 'GET',
      providesTags: ['Incubation'],
    }),

    // جلب الملاحظات الأخيرة للمشروع
    getLatestNotes: builder.query({
      query: (userId) => `/evaluations/incubation/${userId}/latest-notes/`,
      method: 'GET',
      providesTags: ['Incubation'],
    }),

    // =========================================================================
    // ✨ إضافات المرحلة الرابعة (ExhibitionStage)
    // =========================================================================
    // جلب بيانات المعرض (الأسئلة والفورم الحالي)
    getExhibitionDashboard: builder.query({
      query: () => `/ideas/exhibition/dashboard/`,
      method:"GET",
      providesTags: ['Incubation'],
    }),

    // -----------------------------
    // 13) حفظ بيانات المعرض (المرحلة 4) - تم ضبط الـ Body ليتوافق مع الكود
    // -----------------------------
    saveExhibitionData: builder.mutation({
      query: ({ data }) => ({
        url: '/ideas/exhibition/submit/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Incubation'],
    }),

    // -----------------------------
    // جلب قائمة المحتضنين (لصفحة الادارة) (ملغي حذفه - تم الحفاظ عليه)
    // -----------------------------
    getIncubated: builder.query({
      query: () => '/admin/incubated/',
      providesTags: ['Incubated'],
    }),
 // -----------------------------
    // جلب تفاصيل طلب احتضان محدد (ملغي حذفه - تم الحفاظ عليه)
    // -----------------------------
    getIncubationRequest: builder.query({
      query: (id) => `/ideas/project-details/${id}/`,
      providesTags: (result, error, id) => [{ type: 'IncubationRequests', id }],
    }),



  }),
});

export const {
  // المراحل العامة والإدارة القديمة
  useGetIncubationProgressQuery,
  useUpdateIncubationStageMutation,
  useGetIncubatedQuery,
  useGetIncubationRequestQuery,

  // الـ Hooks المطلوبة للمراحل الأربعة بالأسماء الصحيحة
  useGetDashboardQuery,           
  useRequestAbsenceMutation,       
  useGetEvaluationStatusQuery,     
  useGetEvaluationNotesQuery,      
  useGetIncubationOverviewQuery,   
  useGetLatestNotesQuery,          
  useGetExhibitionDashboardQuery,  
  useSaveExhibitionDataMutation,   


} = incubationApi;