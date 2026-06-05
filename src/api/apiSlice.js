import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
 baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/", //backend URL
    prepareHeaders: (headers, { getState, endpoint }) => {
  const publicEndpoints = [
    "register",
    "login",
    "forgotPassword",
    "verifyOtp",
    "newPassword",
  ];

  // لا ترسل توكن للصفحات العامة
  if (publicEndpoints.includes(endpoint)) {
    return headers;
  }

  const token = getState()?.auth?.token;

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
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
    'CampProjects',
    'AdminUser',
    'Ideas',
    
  ],
  endpoints: () => ({}),
});
