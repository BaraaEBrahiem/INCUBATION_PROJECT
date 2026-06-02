import { apiSlice } from "../../apiSlice";

export const statisticsApi =
  apiSlice.injectEndpoints({
    endpoints: (
      builder
    ) => ({

      // =====================================
      // إحصائيات عامة
      // =====================================
      getStatisticsStats:
        builder.query({
          query: () =>
            "admin/dashboard/statistics/overview/",
          providesTags: [
            "Statistics",
          ],
        }),

      // =====================================
      // الموسم الحالي
      // =====================================
      getCurrentSeasonStatistics:
        builder.query({
          query: () =>
            "admin/dashboard/statistics/current-season/",
          providesTags: [
            "Statistics",
          ],
        }),

      // =====================================
      // تحليل القطاعات
      // =====================================
      getSectorAnalysis:
        builder.query({
          query: () =>
            "admin/dashboard/statistics/sectors/",
          providesTags: [
            "Statistics",
          ],
        }),

      // =====================================
      // دورة حياة المشاريع
      // =====================================
      getProjectLifecycle:
        builder.query({
          query: () =>
            "admin/dashboard/statistics/lifecycle/",
          providesTags: [
            "Statistics",
          ],
        }),

      // =====================================
      // مجالات الخبرة
      // =====================================
      getExpertiseFields:
        builder.query({
          query: () =>
            "admin/dashboard/statistics/expertise/",
          providesTags: [
            "Statistics",
          ],
        }),

      // =====================================
      // مقارنة المواسم
      // =====================================
      getIncubationSeasons:
        builder.query({
          query: () =>
            "admin/dashboard/statistics/seasons-comparison/",
          providesTags: [
            "Statistics",
          ],
        }),
    }),
  });

export const {
  useGetStatisticsStatsQuery,
  useGetCurrentSeasonStatisticsQuery,
  useGetSectorAnalysisQuery,
  useGetProjectLifecycleQuery,
  useGetExpertiseFieldsQuery,
  useGetIncubationSeasonsQuery,
} = statisticsApi;