// src/api/endpoints/evaluationApi.js
import { apiSlice } from "../apiSlice";

export const evaluationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({



    //===========================
    // فتح الفورم
    //==========================

    getEvaluationForm: builder.query({
      query: (idea_id) =>
        `/evaluations/evaluation-form/${idea_id}/`,
      providesTags: (result, error, idea_id) => [
        { type: "Evaluation", id: idea_id },
      ],
    }),

    //============================
    // حفظ الدرجات (Save Draft)
    //============================

    saveEvaluation: builder.mutation({
      query: ({ idea_id, scores }) => ({
        url: `/evaluations/idea/${idea_id}/evaluate/`,
        method: "POST",
        body: {
          scores,
        },
      }),
    }),

    //========================
    // إرسال التقييم النهائي
    //========================

    submitEvaluationFinal: builder.mutation({
      query: (idea_id) => ({
        url: `/evaluations/idea/${idea_id}/submit/`,
        method: "POST",
      }),
    }),

    //==========================
    //جلب ملاحظات المقيم
    //==========================

    getEvaluationNotes: builder.query({
      query: (idea_id) =>
        `/evaluations/evaluation-notes/${idea_id}/`,
      providesTags: (result, error, idea_id) => [
        { type: "Notes", id: idea_id },
      ],
    }),

    //=========================
    //إضافة ملاحظة جديدة
    //=========================

    createEvaluationNote: builder.mutation({
      query: ({ idea_id, note }) => ({
        url: `/evaluations/evaluation-notes/${idea_id}/`,
        method: "POST",
        body: {
          note,
        },
      }),
      invalidatesTags: (result, error, { idea_id }) => [
        { type: "Notes", id: idea_id },
      ],
    }),

    //الاحتضان

    //================================
    //جلب مراجعات الاحتضان السابقة
    //================================

    getIncubationReviews: builder.query({
      query: (idea_id) =>
        `/evaluations/incubation-review/${idea_id}/`,
      providesTags: (result, error, idea_id) => [
        { type: "Incubation", id: idea_id },
      ],
    }),

    //====================================
    //إرسال مراجعة احتضان
    //====================================

    createIncubationReview: builder.mutation({
      query: ({ idea_id, progress_score, notes }) => ({
        url: `/evaluations/incubation-review/${idea_id}/`,
        method: "POST",
        body: {
          progress_score,
          notes,
        },
      }),
      invalidatesTags: (result, error, { idea_id }) => [
        { type: "Incubation", id: idea_id },
      ],
    }),


    //============================
    // أقرب جلسة تقييم / احتضان
    //============================

    getNextUpcomingSession: builder.query({
      query: () =>
        "/evaluations/next-upcoming-session/",
      providesTags: ["Evaluation"],
    }),


    // ============================
    // المشاريع المسندة للمقيم
    // ============================

    getMyAssignments: builder.query({
      query: () => "/evaluations/my-assignments/",
      providesTags: ["Evaluation"],
    }),




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
      query: ({ idea_id, meetingDate }) => {
        const [date, time] =
          meetingDate.split("T");
        return {
          url: `/admin/evaluations/ideas/${idea_id}/set-meeting/`,
          method: 'POST',
          body: { 
            date,
            time 
          },
      };
      },
      invalidatesTags: ['Evaluation'],
    }),

  
       // -----------------------------
    // 3) معايير التقييم (ثابتة لكل المواسم)
    // -----------------------------

    // جلب معايير التقييم
    getCriteria: builder.query({
      query: () => `/admin/evaluations/criteria/`,
      providesTags: ['Criteria'],
    }),

    // إضافة معيار جديد
    createCriterion: builder.mutation({
      query: (data) => ({
        url: `/admin/evaluations/criteria/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Criteria'],
    }),

    // تعديل معيار
    updateCriterion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/evaluations/criteria/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Criteria'],
    }),

    // حذف معيار
    deleteCriterion: builder.mutation({
      query: (id) => ({
        url: `/admin/evaluations/criteria/${id}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Criteria'],
    }),

    // نشر المعايير (بدون body)
    publishCriteria: builder.mutation({
      query: () => ({
        url: `/admin/evaluations/criteria/publish/`,
        method: 'POST',
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
        url: `/admin/evaluations/${idea_id}/assign-evaluators/`,
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
    getInvitationDetails: builder.query({
      query: (id) => `evaluations/invitation-details/${id}/`,
      providesTags: (result, error, id) => [{ type: "Invitation", id }],
    }),

    // دالة إرسال القرار (موافقة أو رفض) للسيرفر
    updateInvitationStatus: builder.mutation({
      query: ({ id, action }) => ({
        url: `evaluations/respond-to-invitation/${id}/`, 
        method: "POST", 
        body: { action: action, },
      }),
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
  useCreateCriterionMutation,
  useUpdateCriterionMutation,
  useDeleteCriterionMutation,
  usePublishCriteriaMutation,

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


   //تقييم و احتضان يوزر سايد

    useGetEvaluationFormQuery,
    useSaveEvaluationMutation,
    useSubmitEvaluationFinalMutation,

    useGetEvaluationNotesQuery,
    useCreateEvaluationNoteMutation,

    useGetIncubationReviewsQuery,
    useCreateIncubationReviewMutation, 

    useGetMyAssignmentsQuery,

    useGetNextUpcomingSessionQuery,
    //دالة جلب تفاصيل الدعوة
    useGetInvitationDetailsQuery,
    useUpdateInvitationStatusMutation,
     
} = evaluationApi;