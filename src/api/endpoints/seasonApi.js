// src/api/endpoints/seasonApi.js

import { apiSlice } from "../apiSlice";

export const seasonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPhase: builder.query({
      query: () => "/ideas/current-phase/",
    }),
  //جلب الموسم الحالي 
  getCurrentActiveSeason: builder.query({
  query: () => '/ideas/current-active-season/',
}),
}),
});

export const {
  useGetCurrentPhaseQuery,
  useGetCurrentActiveSeasonQuery,
} = seasonApi;