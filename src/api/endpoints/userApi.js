import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 1) جلب بيانات المستخدم الحالي
    getCurrentUser: builder.query({
      query: () => "users/me/",    
      providesTags: ["User"],
    }),

    // 2) تحديث بيانات المستخدم (اسم - إيميل - صورة)
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/accounts/profile/",       
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // 3) تغيير كلمة المرور
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/change-password/",    
        method: "POST",
        body: data,
      }),
    }),

    // 4) رفع صورة شخصية (اختياري)
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "users/avatar/",       
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    //5) تسجيل الخروج 
    logout: builder.mutation({
  query: () => ({
    url: "/accounts/logout/",
    method: "POST",
  }),
}),
//6) حذف الحساب
    deleteAccount: builder.mutation({
    query: () => ({
        url: "users/delete/",
        method: "DELETE",
    }),
    }),


  }),
});

export const {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useLogoutMutation,
  useDeleteAccountMutation,
} = userApi;
