
import { apiSlice } from "../apiSlice";

export const volunteerprofileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // جلب بيانات الملف الشخصي للمتطوع
    getVolunteerProfile: builder.query({
      query: (id) => `/volunteers/public-me/${id}`,
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
    //ارسال طلب تطوع
  
upgradeToVolunteer: builder.mutation({
  query: (formData) => ({
    url: '/volunteers/apply/', // الرابط المطابق للصورة تماماً
    method: 'POST',
    body: formData, // الحقول: primary_skills, years_of_experience, current_company, specialization, volunteer_type, residence, motivation, day, start_time, end_time
  }),
}),

  }),
})

export const {
  useGetVolunteerProfileQuery,
  useUpdateVolunteerProfileMutation,
} = volunteerprofileApi