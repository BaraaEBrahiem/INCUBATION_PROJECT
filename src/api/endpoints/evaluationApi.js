// src/api/endpoints/evaluationApi.js
import { apiSlice } from "../apiSlice";

export const evaluationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // 1) المشاريع للتقييم
    // -----------------------------

    // جلب المشاريع للتقييم (لصفحة التوزيع)
    getProjectsForEvaluation: builder.query({
      query: () => '/admin/evaluations/assignment-dashboard/',
      providesTags: ['Evaluation'],
    }),
    // جلب المشاريع للتقييم (لصفحة عرض نتائج التقييم)
    getProjectsWithEvaluators: builder.query({
      query: () => '/admin/evaluations/evaluation-results/',
      providesTags: ['Evaluation'],
    }),
    // جلب المشاريع للتقييم (لصفحة تحديد موعد اللجنة)
    getProjectsWithMeetings: builder.query({
      query: () => '/admin/evaluations/meeting-dashboard/',
      providesTags: ['Evaluation'],
    }),

    // جلب تفاصيل مشروع معين للتقييم
    getProjectEvaluationDetails: builder.query({
      query: (projectId) => `/evaluations/projects/${projectId}/`,
      providesTags: (result, error, projectId) => [{ type: 'Evaluation', id: projectId }],
    }),

    // -----------------------------
    // 2) إرسال التقييم
    // -----------------------------

    // إرسال تقييم مشروع
    submitEvaluation: builder.mutation({
      query: ({ idea_id, ...evaluationData }) => ({
        url: `/evaluations/idea/${idea_id}/evaluate/`,
        method: 'POST',
        body: evaluationData,
      }),
      invalidatesTags: ['Evaluation'],
    }),

    // جلب تقييم مشروع معين
    getEvaluationByProject: builder.query({
      query: (projectId) => `/evaluation/project/${projectId}/`,
      providesTags: (result, error, projectId) => [{ type: 'Evaluation', id: projectId }],
    }),

    // جلب نتائج التقييم لمشروع معين
    getEvaluationResults: builder.query({
      query: (projectId) => `/evaluation/results/${projectId}/`,
      providesTags: (result, error, projectId) => [{ type: 'Evaluation', id: projectId }],
    }),
    //تحديد موعد اللجنة للتقييم
    setMeetingDate: builder.mutation({
      query: ({ idea_id, meetingDate }) => ({
        url: `/admin/evaluations/ideas/${idea_id}/set-meeting/`,
        method: 'POST',
        body: { meetingDate },
      }),
      invalidatesTags: ['Evaluation'],
    }),

    // -----------------------------
    // 3) معايير التقييم (ثابتة لكل المواسم)
    // -----------------------------

    // جلب معايير التقييم (ثابتة)
    getCriteria: builder.query({
      query: () => `/evaluations/evaluation-form/`,
      providesTags: ['Criteria'],
    }),

    // حفظ معايير التقييم (نشر)
    saveCriteria: builder.mutation({
      query: (criteria) => ({
        url: `/evaluation/criteria/`,
        method: 'PUT',
        body: { criteria },
      }),
      invalidatesTags: ['Criteria'],
    }),
    // -----------------------------
    // 4) الملاحظات
    // -----------------------------

    // جلب ملاحظات مقيم لمشروع معين
    getNotes: builder.query({
      query: (idea_id) => `/evaluations/notes/${idea_id}/`,
      providesTags: (result, error, idea_id) => [{ type: 'Notes', id: idea_id }],
    }),

    // إضافة ملاحظة جديدة
    addNote: builder.mutation({
      query: ({ idea_id, userId, note }) => ({
        url: `/evaluations/evaluation-notes/${idea_id}/`,
        method: 'POST',
        body: { userId, note },
      }),
      invalidatesTags: (result, error, { idea_id }) => [{ type: 'Notes', id: idea_id }],
    }),

    // -----------------------------
    // 5) تعيين المقيمين
    // -----------------------------

    // جلب المقيمين المتاحين للتعيين
    getAvailableEvaluators: builder.query({
      query: () => '/admin/evaluations/available-evaluators/',
      providesTags: ['Evaluators'],
    }),

    // تعيين مقيمين لمشروع معين
    assignEvaluators: builder.mutation({
      query: ({ idea_id, evaluators_ids }) => ({
        url: `/admin/evaluations/assign-evaluators/${idea_id}/`,
        method: 'POST',
        body: { evaluators_ids },
      }),
      invalidatesTags: ['Evaluation', 'Evaluators'],
    }),

    // جلب المقيمين المعينين لمشروع معين مع ملاحظاتن
    getAssignedEvaluators: builder.query({
      query: (idea_id) => `admin/evaluations/evaluation-details/${idea_id}/`,
      providesTags: (result, error, idea_id) => [{ type: 'Evaluators', id: idea_id }],
    }),
    //جلب المقيمين المعينين لمشروع في صفحة تحديد موعد اللجنة
    getEvaluatorsForMeeting: builder.query({
      query: (idea_id) => `admin/evaluations/idea-evaluators/${idea_id}/`,
      providesTags: (result, error, idea_id) => [{ type: 'Evaluators', id: idea_id }],
    }),

    // قبول مشروع (بعد التقييم)
    approveProject: builder.mutation({
      query: (idea_id) => ({
        url: `admin/evaluations/accept-idea/${idea_id}/`,
        method: 'POST',
      }),
      invalidatesTags: ['Evaluation'],
    }),

    // رفض مشروع (بعد التقييم)
    rejectProject: builder.mutation({
      query: (idea_id) => ({
        url: `admin/evaluations/reject-idea/${idea_id}/`,
        method: 'POST',
      }),
      invalidatesTags: ['Evaluation'],
    }),

  }),
});

export const {
  // المشاريع للتقييم
  useGetProjectsForEvaluationQuery,
  useGetProjectEvaluationDetailsQuery,
  useGetProjectsWithEvaluatorsQuery,  
  useGetProjectsWithMeetingsQuery,

  // إرسال التقييم
  useSubmitEvaluationMutation,
  useGetEvaluationByProjectQuery,
  useGetEvaluationResultsQuery,
  useSetMeetingDateMutation,

  // معايير التقييم
  useGetCriteriaQuery,
  useSaveCriteriaMutation,

  // الملاحظات
  useGetNotesQuery,
  useAddNoteMutation,

  // تعيين المقيمين
  useGetAvailableEvaluatorsQuery,
  useAssignEvaluatorsMutation,
  useGetAssignedEvaluatorsQuery,
  useGetEvaluatorsForMeetingQuery,

  //قبول ورفض المشروع بعد التقييم
   useApproveProjectMutation,
   useRejectProjectMutation,
} = evaluationApi;