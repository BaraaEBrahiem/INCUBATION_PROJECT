// src/api/endpoints/volunteerApi.js
import { apiSlice } from "../apiSlice";

export const volunteerprofileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب بيانات الملف الشخصي للمتطوع
    getVolunteerProfile: builder.query({
      query: () => "/volunteer/profile/",
      providesTags: ["VolunteerProfile"],
    }),

    // تحديث بيانات الملف الشخصي للمتطوع
    updateVolunteerProfile: builder.mutation({
      query: (profileData) => ({
        url: "/volunteers/me/update/",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["VolunteerProfile"],
    }),

  }),
})

export const {
  useGetVolunteerProfileQuery,
  useUpdateVolunteerProfileMutation,
} = volunteerprofileApi