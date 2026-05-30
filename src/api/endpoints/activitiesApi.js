import { apiSlice } from "../apiSlice";

export const activitiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => 'volunteers/public-workshops/',
      providesTags: ['Activities'],
    }),
  }),
});

export const { useGetActivitiesQuery } = activitiesApi;