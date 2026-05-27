import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
 baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/", //backend URL
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      
      // سطر طباعة سيكشف لنا هيكل الريدوكس بالكامل
      console.log("=== MY EXACT REDUX STORE STATE ===", state);

      const token = state.auth?.token || 
                    state.auth?.accessToken || 
                    state.auth?.access ||
                    state.Auth?.token ||
                    state.Auth?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("⚠️ API Slice: لم يتم العثور على التوكن في الريدوكس ستيت!");
      }
      
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "User",
    "Roles",
    "Projects",
    "Workshop",
    "WorkshopInfo",
    "Contact",
    "Consultations",
    "Consultants",
    "Camp",
    "Activities",
    "Favorites",
    "FormConfig",
    "VolunteerProfile",
    "ProfileInfo",
    "Messages",
    "Notifications",
    "Notes",
    "Evaluation",
    "Schedule",
    "Sessions",
    "Requests",
    "Dashboard",
    "AdminUsers",
    "AbsenceRequests",
    "Statistics",
    "Approvals",
    "Tasks",
    "TeamRequests",
    "Team",
    "Incubation",
    "Incubated",
    "SuggestedVolunteers",
    "PublicProjects",
    "Participants",
    "Volunteers",
    "VolunteerRequests",
    "Evaluators",
    "Exhibition",
    "ExhibitionProjects",
    "ExhibitionCardRequests",
    "ExhibitionsList",
    "ExhibitionForm",
    "IncubationSeasons",
    "IncubationRequests",
    'GraduatedProjects',
  ],
  endpoints: () => ({}),
});
