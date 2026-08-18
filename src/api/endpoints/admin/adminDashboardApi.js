import { apiSlice } from "../../apiSlice";

export const adminDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 1) إحصائيات لوحة التحكم
    getDashboardStats: builder.query({
      query: () => "admin/dashboard/statistics/current-season/",
      providesTags: ["Dashboard"],
    }),

    // 2) بيانات الرسم البياني للمشاريع
    getDashboardProjectsChart: builder.query({
      query: () => "admin/dashboard/statistics/graduated-projects-chart/",
      providesTags: ["Dashboard"],
    }),

    // 3) النشاط الأخير
    getDashboardRecentActivity: builder.query({
      query: () => "admin/dashboard/",
      providesTags: ["Dashboard"],
    }),

    // 4) إرسال إشعار
    sendBroadcastNotification: builder.mutation({
  query: (data) => ({
    url: "admin/dashboard/notifications/broadcast/",
    method: "POST",
    body: data,
  }),
  invalidatesTags: ["Dashboard"],
}),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetDashboardProjectsChartQuery,
  useGetDashboardRecentActivityQuery,
  useSendBroadcastNotificationMutation,
} = adminDashboardApi;
