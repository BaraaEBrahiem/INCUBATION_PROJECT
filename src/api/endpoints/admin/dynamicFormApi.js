import {apiSlice} from "../../apiSlice";

export const dynamicFormApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //جلب الفورم في حال تم انشاؤه
        getDynamicForm: builder.query({
            query: () => '/admin/dynamicForm',
            providesTags: ['FormStructure'],
        }),
        
        // دالة النشر والحفظ
    saveFormStructure: builder.mutation({
      query: (fullFormPayload) => ({
        url: "admin/forms/ideas-form/sync/",
        method: "POST",
        body: fullFormPayload,
      }),
      invalidatesTags: ["FormStructure"],
    }),

    }),
});