import {
  useMarkNotificationAsReadMutation,
} from "../../../api/endpoints/notificationApi";

import logo from "../../../assets/images/logo.png";

const NotificationItem = ({
  notification,
}) => {
  const [
    markAsRead,
    { isLoading },
  ] =
    useMarkNotificationAsReadMutation();

  const handleAction = async () => {
    try {
      if (!notification.is_read) {
        await markAsRead(
          notification.id
        ).unwrap();
      }

      if (
        notification.has_action &&
        notification.action_url
      ) {
        window.location.href =
          notification.action_url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`
        relative
        border-b
        p-4
        transition
        hover:bg-gray-50
        ${
          !notification.is_read
            ? "bg-cyan-50"
            : "bg-white"
        }
      `}
    >
      {!notification.is_read && (
        <span
          className="
            absolute
            left-3
            top-5
            w-3
            h-3
            rounded-full
            bg-cyan-500
          "
        />
      )}

      <div className="flex gap-4">
        <img
          src={logo}
          alt="logo"
          className="
            w-12
            h-12
            rounded-full
            object-cover
            border
          "
        />

        <div className="flex-1">
          <p
            className={`
              text-sm
              leading-7
              text-right
              ${
                !notification.is_read
                  ? "font-semibold"
                  : ""
              }
            `}
          >
            {notification.message}
          </p>

          <div
            className="
              mt-2
              flex
              flex-wrap
              gap-4
              text-xs
              text-gray-500
            "
          >
            <span>
              {notification.formatted_created_at}
            </span>

            <span>
              {notification.time_since}
            </span>
          </div>

          {notification.has_action && (
            <button
              onClick={handleAction}
              disabled={isLoading}
              className="
                mt-3
                px-4
                py-2
                rounded-md
                bg-main-color
                text-white
                text-sm
              "
            >
              عرض التفاصيل
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;