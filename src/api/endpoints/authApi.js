import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // 1) Register (Signup)
    // -----------------------------
    register: builder.mutation({
      query: (data) => ({
        url: "/accounts/register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // -----------------------------
    // 2) Login
    // -----------------------------
    login: builder.mutation({
      query: (data) => ({
        url: "/accounts/login/", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User", "Roles"],
    }),



    // -----------------------------
    // 3) Forgot Password
    // -----------------------------
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),

    // -----------------------------
    // 4) Verify OTP
    // -----------------------------
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/accounts/verify-password-otp/",

        method: "POST",
        body: data,
      }),
    }),

    // -----------------------------
    // 5) Set New Password
    // -----------------------------
    newPassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/reset-password/",
        method: "POST",
        body: data,
      }),
    }),

    // -----------------------------
    // 6) Refresh Token (optional)
    // -----------------------------
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "/auth/refresh/",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useNewPasswordMutation,
  useRefreshTokenMutation,
} = authApi;
