import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const savedRefreshToken = localStorage.getItem("refreshToken");
const savedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
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
    setCredentials: (state, action) => {
      const { user, token, refreshToken, roles, userId } = action.payload;
      
      // 1️⃣ تحديد الأدوار النهائية (سواء قادمة منفصلة، أو من داخل كائن المستخدم، أو فارغة)
      const finalRoles = roles || user?.roles || [];

      // 2️⃣ حماية هندسية: ندمج الأدوار النهائية داخل كائن الـ user نفسه لتوحيد البيانات
      const updatedUser = user ? { ...user, roles: finalRoles } : null;

      // 3️⃣ تحديث الـ Redux State
      state.user = updatedUser;
      state.token = token;
      state.userId = userId;
      state.roles = finalRoles;
      state.isAuthenticated = true;
      if (refreshToken) state.refreshToken = refreshToken;

      // 4️⃣ تخزين البيانات النظيفة والموحدة في الـ LocalStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // تخزين الكائن المحدث بالأدوار
      localStorage.setItem("userId", userId);
      localStorage.setItem("roles", JSON.stringify(finalRoles));
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    },
    updateAccessToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
///////////////////////////
    updateRoles: (state, action) => {
  const roles = action.payload;

  state.roles = roles;

  if (state.user) {
    state.user.roles = roles;
  }

  localStorage.setItem("roles", JSON.stringify(roles));

  if (state.user) {
    localStorage.setItem("user", JSON.stringify(state.user));
  }
  /////////////////
},
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.userId = null;
      state.roles = []; // تصفير الأدوار في الـ State عند تسجيل الخروج
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");
    },
  },
});

export const { setCredentials, updateAccessToken,updateRoles, logOut } = authSlice.actions;
export default authSlice.reducer;