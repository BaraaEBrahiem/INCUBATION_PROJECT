import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateAccessToken, logOut } from "../redux/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api", 
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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (api.endpoint === "login") {
      return result;
    }

    const refreshToken = api.getState().auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/accounts/token/refresh/", 
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newToken = refreshResult.data.access || refreshResult.data.token;
        
        api.dispatch(updateAccessToken({ token: newToken }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
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
    'FormStructure',
    'Dashboard',
  ],
  endpoints: () => ({}),
});
