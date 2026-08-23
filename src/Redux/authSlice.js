import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const savedRefreshToken = localStorage.getItem("refreshToken");

const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const savedUserId = localStorage.getItem("userId");

const savedRoles = localStorage.getItem("roles")
  ? JSON.parse(localStorage.getItem("roles"))
  : [];

const initialState = {
  user: savedUser,
  token: savedToken,
  refreshToken: savedRefreshToken,
  userId: savedUserId,
  roles: savedRoles,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // =========================
    // Login / Signup
    // =========================
    setCredentials: (state, action) => {
      const {
        user,
        token,
        refreshToken,
        roles,
        userId,
      } = action.payload;

      const finalRoles = roles || user?.roles || [];

      const updatedUser = user
        ? {
            ...user,
            roles: finalRoles,
          }
        : null;

      state.user = updatedUser;
      state.token = token;
      state.userId = userId;
      state.roles = finalRoles;
      state.isAuthenticated = true;

      if (refreshToken) {
        state.refreshToken = refreshToken;
      }

      // LocalStorage
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
      localStorage.setItem("userId", userId);
      localStorage.setItem(
        "roles",
        JSON.stringify(finalRoles)
      );

      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken
        );
      }
    },

    // =========================
    // Update Access Token
    // =========================
    updateAccessToken: (state, action) => {
      state.token = action.payload.token;

      localStorage.setItem(
        "token",
        action.payload.token
      );
    },

    // =========================
    // Update Roles
    // =========================
    updateRoles: (state, action) => {
      const roles = action.payload || [];

      state.roles = roles;

      if (state.user) {
        state.user.roles = roles;
      }

      localStorage.setItem(
        "roles",
        JSON.stringify(roles)
      );

      if (state.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(state.user)
        );
      }
    },

    // =========================
    // Logout
    // =========================
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.userId = null;
      state.roles = [];
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  updateRoles,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;