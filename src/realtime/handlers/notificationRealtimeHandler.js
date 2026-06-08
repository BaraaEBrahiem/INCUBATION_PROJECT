// src/realtime/handlers/notificationRealtimeHandler.js

import store from "../../Redux/store";

import { apiSlice } from "../../api/apiSlice";

class NotificationRealtimeHandler {
  handle(payload) {
    if (!payload?.event) {
      return;
    }

    switch (payload.event) {
      case "NOTIFICATION_CREATED":
        this.handleCreated(payload);
        break;

      case "NOTIFICATION_READ":
        this.handleRead(payload);
        break;

      case "NOTIFICATIONS_ALL_READ":
        this.handleAllRead(payload);
        break;

      default:
        console.warn(
          "[Realtime] Unknown notification event",
          payload
        );
    }
  }

  handleCreated(payload) {
    this.updateBadge(payload);

    store.dispatch(
      apiSlice.util.updateQueryData(
        "getNotifications",
        undefined,
        (draft) => {
          if (!Array.isArray(draft)) {
            return;
          }

          const exists =
            draft.some(
              (item) =>
                item.id ===
                payload.notification.id
            );

          if (exists) {
            return;
          }

          draft.unshift(
            payload.notification
          );
        }
      )
    );
  }

  handleRead(payload) {
    this.updateBadge(payload);

    store.dispatch(
      apiSlice.util.updateQueryData(
        "getNotifications",
        undefined,
        (draft) => {
          if (!Array.isArray(draft)) {
            return;
          }

          const notification =
            draft.find(
              (item) =>
                item.id ===
                payload.notification_id
            );

          if (!notification) {
            return;
          }

          notification.is_read =
            true;
        }
      )
    );
  }

  handleAllRead(payload) {
    this.updateBadge(payload);

    store.dispatch(
      apiSlice.util.updateQueryData(
        "getNotifications",
        undefined,
        (draft) => {
          if (!Array.isArray(draft)) {
            return;
          }

          draft.forEach(
            (notification) => {
              notification.is_read =
                true;
            }
          );
        }
      )
    );
  }

  updateBadge(payload) {
    store.dispatch(
      apiSlice.util.updateQueryData(
        "getNotificationBadge",
        undefined,
        (draft) => {
          if (!draft) {
            return;
          }

          draft.unread_count =
            payload.unread_count;

          draft.has_unread_notifications =
            payload.has_unread_notifications;
        }
      )
    );
  }
}

export const notificationRealtimeHandler =
  new NotificationRealtimeHandler();