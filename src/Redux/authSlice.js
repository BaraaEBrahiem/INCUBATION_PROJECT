import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const savedRefreshToken = localStorage.getItem("refreshToken");
const savedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const savedUserId = localStorage.getItem("userId");

const initialState = {
  user: savedUser,
  token: savedToken,
  refreshToken: savedRefreshToken,
  userId: savedUserId,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken, userId } = action.payload;
      
      state.user = user;
      state.token = token;
      state.userId = userId;
      state.isAuthenticated = true;
      if (refreshToken) state.refreshToken = refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", userId);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    },
    updateAccessToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.userId = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },
  },
});

export const { setCredentials, updateAccessToken, logOut } = authSlice.actions;
export default authSlice.reducer;