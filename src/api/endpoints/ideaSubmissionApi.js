import { apiSlice } from "../apiSlice";


export const ideaSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

        // 1. جلب هيكلية الفورم والمَسودّة الحالية للفكرة (GET)
    getIdeaFormDesign: builder.query({
      query: (seasonId) => `/ideas/seasons/${seasonId}/submission-form/`,
      providesTags: ['IdeaFormConfig'],
    }),

    // 2. حفظ بيانات الخطوة الحالية مؤقتاً عند الضغط على التالي (POST)
    saveFormStep: builder.mutation({
      query: ({ seasonId, step, data }) => ({
        url: `/ideas/seasons/${seasonId}/save-step/`,
        method: 'POST',
        body: { step, data },
      }),
      invalidatesTags: ['IdeaFormConfig'], // لتحديث الـ Cache والمسودة تلقائياً بسحب البيانات الجديد
    }),

    // 3. الإرسال النهائي وتثبيت الفكرة وإصدار الـ PDF (POST)
    submitFinalIdea: builder.mutation({
      query: (seasonId) => ({
        url: `/ideas/seasons/${seasonId}/submit-idea/`,
        method: 'POST',
        body: {}, // الـ Body فارغ تماماً حسب مواصفات الباك إند
      }),
      invalidatesTags: ['IdeaFormConfig'],
    }),

  }),
});

export const {

  //  [تمت الإضافة بنجاح]: الـ Hooks التلقائية المستخرجة لفورم الفكرة
  useGetIdeaFormDesignQuery,
  useSaveFormStepMutation,
  useSubmitFinalIdeaMutation,

} = ideaSubmissionApi;