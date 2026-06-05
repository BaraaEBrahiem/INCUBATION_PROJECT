// src/api/endpoints/seasonApi.js

import { apiSlice } from "../apiSlice";

export const seasonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPhase: builder.query({
      query: () => "/ideas/current-phase/",
    }),
  }),
});

export const {
  useGetCurrentPhaseQuery,
} = seasonApi;