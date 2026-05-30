import { apiSlice } from "../apiSlice";

export const assignedProjectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getVolunteerAssignedData: builder.query({
      query: () => ({
        url: "/volunteers/assigned-projects/",
        method: "GET",
      }),
      providesTags: ["Volunteers", "Approvals"],
    }),

  }),
});

export const {
  useGetVolunteerAssignedDataQuery,
} = assignedProjectsApi;