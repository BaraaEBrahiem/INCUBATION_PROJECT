// src/api/endpoints/consultantsApi.js
import { apiSlice } from "../apiSlice";

export const consultantsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب جميع المستشارين
    getAllConsultants: builder.query({
      query: () => '/consultants/',
      providesTags: ['Consultants'],
    }),

    // جلب المستشارين حسب الاختصاص
    getConsultantsBySpecialty: builder.query({
      query: (specialty) => `/volunteer/consultants/${specialty}`,
      providesTags: (result, error, specialty) => [{ type: 'Consultants', id: specialty }],
    }),

    // جلب مستشار محدد بواسطة ID
    getConsultantById: builder.query({
      query: (id) => `/consultants/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Consultants', id }],
    }),

  }),
});

export const {
  useGetAllConsultantsQuery,
  useGetConsultantsBySpecialtyQuery,
  useGetConsultantByIdQuery,
} = consultantsApi;