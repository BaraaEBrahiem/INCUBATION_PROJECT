import {apiSlice} from "../../apiSlice";

export const dynamicFormApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       getFormStructure: builder.query({
      query: (seasonId) => `admin/ideas/forms/${seasonId}/builder/`,
      providesTags: ["FormStructure"],
    }),
    
    saveFormStructure: builder.mutation({
      query: ({ seasonId, payload }) => ({
        url: `admin/ideas/forms/${seasonId}/builder/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["FormStructure"],
    }),

    }),
});

export const {useGetFormStructureQuery, useSaveFormStructureMutation} = dynamicFormApi