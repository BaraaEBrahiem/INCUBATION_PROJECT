import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const savedUserId = localStorage.getItem("userId");

const initialState = {
  user: savedUser,
  token: savedToken,
  userId: savedUserId,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, userId } = action.payload;
      state.user = user;
      state.token = token;
      state.userId = userId;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", userId);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;

      // تنظيف المتصفح عند تسجيل الخروج
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;