// src/api/endpoints/formConfigApi.js
import { apiSlice } from "../apiSlice";

export const formConfigApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب هيكل فورم المعرض
    getExhibitionFormConfig: builder.query({
      query: () => '/admin/form-config/exhibition/',
      providesTags: ['FormConfig'],
    }),

    //انشاء فورم المعرض
    createExhibitionForm: builder.mutation({
      query: (data) => ({
      url: `/admin/exhibition/form/create/`,
      method: "POST",
      body: data
    }),
      invalidatesTags: () => [
    { type: "ExhibitionForm" },
  ],
}),
    ///نشر فورم المعرض
     publishSeason: builder.mutation({
      query: (form_id) => ({
        url: `/admin/exhibition/form/${form_id}/publish/`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, form_id) => [{ type: 'ExhibitionForm', id: form_id }],
    }),
    
   createSeasonForm: builder.mutation({
  query: ({ season_id, title }) => ({
    url: `/admin/ideas/forms/${season_id}/builder/`,
    method: 'POST',
    body: { title }, 
    description: `نموذج تقديم خاص بالموسم رقم ${season_id}`,
  }),
  invalidatesTags: (result, error, { season_id }) => [{ type: 'SeasonForm', id: season_id }],
}),

    // حفظ تصميم النموذج (builder) – تحديث
    saveSeasonFormDesign: builder.mutation({
      query: ({ season_id, formConfig }) => ({
        url: `/admin/ideas/forms/${season_id}/builder/`,
        method: 'PUT',
        body: formConfig,
      }),
      invalidatesTags: (result, error, { season_id }) => [{ type: 'SeasonForm', id: season_id }],
    }),

    // عرض تصميم النموذج season
    getSeasonFormDesign: builder.query({
      query: (id) => `/admin/seasons/${id}/form-design/`,
      providesTags: ['IncubationSeasons'],
    }),

    // عرض النموذج لصاحب الفكرة عند تقديم الفكرة
   getIdeaFormDesign: builder.query({
  query: (seasonId) => `/seasons/${seasonId}/ideas/create/`,
  providesTags: (result, error, seasonId) => [{ type: 'IncubationSeasons', id: seasonId }],
}),

  }),
});

export const {
  useCreateExhibitionFormMutation,
  usePublishSeasonMutation,
  useGetExhibitionFormConfigQuery,
  useGetSeasonFormDesignQuery,
  useGetIdeaFormDesignQuery,
  useCreateSeasonFormMutation,
  useSaveSeasonFormDesignMutation,
  useCreateExhibitionFormMutation,
  usePublishSeasonMutation
} = formConfigApi;