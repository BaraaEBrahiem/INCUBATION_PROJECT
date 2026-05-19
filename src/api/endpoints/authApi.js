import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // 1) Register (Signup)
    // -----------------------------
    register: builder.mutation({
      query: (data) => ({
        url: "accounts/register/",//backend URL
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
        url: "/accounts/login/",//backend URL 
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
        url: "auth/password-reset/",
        method: "POST",
        body: data,
      }),
    }),

    // -----------------------------
    // 4) Verify OTP
    // -----------------------------
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "auth/password-reset/verify/",
        method: "POST",
        body: data,
      }),
    }),

    // -----------------------------
    // 5) Set New Password
    // -----------------------------
    newPassword: builder.mutation({
      query: (data) => ({
        url: "auth/password-reset/confirm/",
        method: "POST",
        body: data,
      }),
    }),

    // -----------------------------
    // 6) Refresh Token (optional)
    // -----------------------------
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "auth/refresh/",
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
