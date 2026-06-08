import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateAccessToken, logOut } from "../redux/authSlice";

let mutexRelease = null;
const acquireMutex = () => {
  if (mutexRelease) return mutexRelease;
  let resolve;
  mutexRelease = new Promise((r) => { resolve = r; });
  mutexRelease.resolve = resolve;
  return mutexRelease;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (endpoint === "login") {
      return headers;
    }

    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // انتظر إذا كان هناك عملية تجديد توكن قائمة حالياً من طلب آخر
  if (mutexRelease) {
    await mutexRelease;
  }

  let result = await baseQuery(args, api, extraOptions);

  // إذا رجع السيرفر 401 (انتهت صلاحية الـ Access Token)
  if (result.error && result.error.status === 401) {
    // التحقق من أننا لسنا في صفحة تسجيل الدخول اصلاً
    const currentEndpoint = api.endpoint;
    if (currentEndpoint === "login") {
      return result;
    }

    const refreshToken = api.getState().auth.refreshToken;

    if (refreshToken) {
      // تفعيل القفل لمنع الطلبات المتزامنة
      const lock = acquireMutex();
      
      try {
        // إرسال طلب التجديد للسيرفر
        const refreshResult = await baseQuery(
          {
            url: "accounts/token/refresh/", // 👈 مسار نظيف يتوافق مع الـ baseUrl
            method: "POST",
            body: { refresh: refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const newToken = refreshResult.data.access || refreshResult.data.token;
          
          // تحديث التوكن الجديد في الـ Redux Store والـ LocalStorage
          api.dispatch(updateAccessToken({ token: newToken }));

          // إعادة إطلاق الطلب الأصلي الذي فشل بالتوكن الجديد
          result = await baseQuery(args, api, extraOptions);
        } else {
          // إذا فشل الـ Refresh Token (انتهت صلاحية الجلسة الطويلة) -> طرد وتسجيل خروج
          api.dispatch(logOut());
        }
      } catch (err) {
        api.dispatch(err.message === "Network Error" && logOut());
      } finally {
    
        mutexRelease = null;
        if (lock.resolve) lock.resolve();
      }
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth", "User", "Roles", "Projects", "Workshop", "WorkshopInfo",
    "Contact", "Consultations", "Consultants", "Camp", "Activities",
    "Favorites", "FormConfig", "VolunteerProfile", "ProfileInfo",
    "Messages", "Notifications", "Notes", "Evaluation", "Schedule",
    "Sessions", "Requests", "Dashboard", "AdminUsers", "AbsenceRequests",
    "Statistics", "Approvals", "Tasks", "TeamRequests", "Team",
    "Incubation", "Incubated", "SuggestedVolunteers", "PublicProjects",
    "Participants", "Volunteers", "VolunteerRequests", "Evaluators",
    "Exhibition", "ExhibitionProjects", "ExhibitionCardRequests",
    "ExhibitionsList", "ExhibitionForm", "IncubationSeasons",
    "IncubationRequests", 'GraduatedProjects', 'CampProjects',
    'AdminUser', 'Ideas', 'FormStructure', 'IdeaFormConfig', 'ChatSessions', 'ChatDetails',
  ],
  endpoints: () => ({}),
});