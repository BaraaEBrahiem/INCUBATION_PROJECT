// src/api/endpoints/admin/seasonsApi.js
import { apiSlice } from "../../apiSlice";

export const seasonsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب مواسم الاحتضان
    getIncubationSeasons: builder.query({
      query: () => `/admin/seasons/`,
      providesTags: ['IncubationSeasons'],
    }),

    // جلب تفاصيل موسم معين
    getSeasonDetails: builder.query({
      query: (id) => `/admin/seasons/${id}/`,
      providesTags: (result, error, id) => [{ type: 'IncubationSeasons', id }],
    }),

    // إنشاء موسم جديد (بدون form_config)
    createIncubationSeason: builder.mutation({
      query: (data) => ({
        url: `/admin/seasons/create/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['IncubationSeasons'],
    }),

    // نشر الموسم (تفعيله وفتح باب التقديم)
    publishSeason: builder.mutation({
      query: (pk) => ({
        url: `/admin/seasons/${pk}/publish/`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, pk) => [{ type: 'IncubationSeasons', id: pk }],
    }),

    // إلحاق mutations أخرى (تحديث، إغلاق، ...)
    updateIncubationSeason: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/seasons/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'IncubationSeasons', id }],
    }),

   //  إغلاق فترة التقديم لموسم معين
closeSubmissions: builder.mutation({
  query: (season_id) => ({
    url: `/admin/seasons/${season_id}/close-submissions/`,
    method: 'POST',
  }),
  invalidatesTags: (result, error, season_id) => [
    { type: 'IncubationSeasons', id: season_id },
    'IncubationSeasons' 
  ],
}),
  }),
});

export const {
  useGetIncubationSeasonsQuery,
  useGetSeasonDetailsQuery,
  useCreateIncubationSeasonMutation,
  useUpdateIncubationSeasonMutation,
  useCloseSubmissionsMutation,
  usePublishSeasonMutation,
} = seasonsApi;