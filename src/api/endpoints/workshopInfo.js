// src/api/endpoints/userWorkshopsApi.js
import { apiSlice } from "../apiSlice";

export const workshopInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //جلب معلومات ورشة 
    getWorkshopInfoById: builder.query({
      query: (id) => `/volunteers/workshops-details/${id}/`,
      providesTags: (result, error, id) => [{ type: 'WorkshopInfo', id }],
    }),

  }),
});

export const {
  useGetWorkshopInfoByIdQuery,
} = workshopInfoApi;