// src/api/endpoints/seasonApi.js

import { apiSlice } from "../apiSlice";

export const seasonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPhase: builder.query({
      query: () => "/ideas/current-phase/",
    }),
  //جلب الموسم الحالي 
  getActiveSeason: builder.query({
  query: () => '/ideas/current-seasons/',
}),
}),
});

export const {
  useGetCurrentPhaseQuery,
  useGetActiveSeasonQuery,
} = seasonApi;