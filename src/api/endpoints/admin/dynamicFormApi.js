import {apiSlice} from "../../apiSlice";

export const dynamicFormApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
<<<<<<< HEAD
       getFormStructure: builder.query({
      query: (seasonId) => `admin/ideas/forms/${seasonId}/builder/`,
      providesTags: ["FormStructure"],
    }),
    
    saveFormStructure: builder.mutation({
      query: ({ seasonId, payload }) => ({
        url: `admin/ideas/forms/${seasonId}/builder/`,
        method: "PUT",
        body: payload,
=======
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
>>>>>>> origin/user-side-branch
      }),
      invalidatesTags: ["FormStructure"],
    }),

    }),
<<<<<<< HEAD
});

export const {useGetFormStructureQuery, useSaveFormStructureMutation} = dynamicFormApi
=======
});
>>>>>>> origin/user-side-branch
