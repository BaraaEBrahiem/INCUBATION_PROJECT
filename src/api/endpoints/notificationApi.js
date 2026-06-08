// src/api/endpoints/notificationApi.js

import { apiSlice } from "../apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getNotifications: builder.query({
      query: (role) => ({
        url: "notifications/",
        params: role
          ? { role }
          : undefined,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map((notification) => ({
                type: "Notifications",
                id: notification.id,
              })),
              {
                type: "Notifications",
                id: "LIST",
              },
            ]
          : [
              {
                type: "Notifications",
                id: "LIST",
              },
            ],
    }),

    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `notifications/${notificationId}/read/`,
        method: "POST",
      }),

      invalidatesTags: [
        { type: "Notifications", id: "LIST" },
        { type: "Notifications", id: "BADGE" },
      ]

    }),

    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: "notifications/read-all/",
        method: "POST",
      }),

      invalidatesTags: [
        { type: "Notifications", id: "LIST" },
        { type: "Notifications", id: "BADGE" },
      ]
    }),

    getNotificationBadge: builder.query({
      query: () =>
        "notifications/badge/",

      providesTags: [
        {
          type: "Notifications",
          id: "BADGE",
        },
      ],
    }),

  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useGetNotificationBadgeQuery,
} = notificationApi;