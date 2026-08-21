import { createSlice } from "@reduxjs/toolkit";

// ==============================
// Helpers
// ==============================

const getSavedJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Failed to parse localStorage "${key}"`, error);
    return fallback;
  }
};

const savedToken = localStorage.getItem("token");
const savedRefreshToken = localStorage.getItem("refreshToken");
const savedUser = getSavedJson("user", null);
const savedUserId = localStorage.getItem("userId");
const savedRoles = getSavedJson("roles", []);


// ==============================
// Normalize Roles
// ==============================

const normalizeRoles = (roles) => {
  if (!Array.isArray(roles)) {
    return [];
  }

  return roles
    .map((role) =>
      typeof role === "string"
        ? role.toLowerCase().trim()
        : role
    )
    .filter(Boolean);
};


// ==============================
// Initial State
// ==============================

const initialState = {
  user: savedUser,
  token: savedToken,
  refreshToken: savedRefreshToken,
  userId: savedUserId,
  roles: normalizeRoles(savedRoles),

  // وجود Access Token = المستخدم مسجل دخول
  isAuthenticated: Boolean(savedToken),
};


// ==============================
// Slice
// ==============================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    // ========================================
    // LOGIN / REGISTER
    // ========================================

    setCredentials: (state, action) => {

      const {
        user,
        token,
        refreshToken,
        roles,
        userId,
      } = action.payload;


      // ------------------------------
      // Token
      // ------------------------------

      if (!token) {
        console.error(
          "setCredentials called without access token"
        );

        return;
      }


      // ------------------------------
      // Roles
      // ------------------------------

      let finalRoles = normalizeRoles(
        roles ?? user?.roles
      );


      // المستخدم بدون Role = Visitor
      if (finalRoles.length === 0) {
        finalRoles = ["visitor"];
      }


      // ------------------------------
      // User
      // ------------------------------

      const updatedUser = user
        ? {
            ...user,
            roles: finalRoles,
          }
        : null;


      // ------------------------------
      // Redux
      // ------------------------------

      state.user = updatedUser;

      state.token = token;

      state.userId =
        userId ??
        updatedUser?.id ??
        null;

      state.roles = finalRoles;

      state.isAuthenticated = true;


      if (refreshToken) {
        state.refreshToken = refreshToken;
      }


      // ------------------------------
      // LocalStorage
      // ------------------------------

      localStorage.setItem(
        "token",
        token
      );


      localStorage.setItem(
        "roles",
        JSON.stringify(finalRoles)
      );


      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      if (state.userId !== null) {
        localStorage.setItem(
          "userId",
          String(state.userId)
        );
      }


      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken
        );
      }


      console.log(
        "✅ Authentication saved:",
        {
          user: updatedUser,
          roles: finalRoles,
          userId: state.userId,
        }
      );
    },


    // ========================================
    // UPDATE ACCESS TOKEN
    // ========================================

    updateAccessToken: (state, action) => {

      const newToken =
        action.payload?.token;

      if (!newToken) {
        return;
      }

      state.token = newToken;

      state.isAuthenticated = true;

      localStorage.setItem(
        "token",
        newToken
      );
    },


    // ========================================
    // UPDATE ROLES
    // ========================================

    updateRoles: (state, action) => {

      let roles = normalizeRoles(
        action.payload
      );


      // لا يوجد Role = Visitor
      if (roles.length === 0) {
        roles = ["visitor"];
      }


      state.roles = roles;


      if (state.user) {

        state.user = {
          ...state.user,
          roles,
        };

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


    // ========================================
    // LOGOUT
    // ========================================

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