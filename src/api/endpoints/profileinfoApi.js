// src/api/endpoints/profileApi.js
import { apiSlice } from "../apiSlice";

export const profileinfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب بيانات ملف شخصي بواسطة ID
    getProfileById: builder.query({
      query: (userId) => `/volunteers/public-me/${userId}/`,
      providesTags: (result, error, userId) => [{ type: 'ProfileInfo', id: userId }],
    }),

  }),
})

export const {
  useGetProfileByIdQuery,
} = profileinfoApi