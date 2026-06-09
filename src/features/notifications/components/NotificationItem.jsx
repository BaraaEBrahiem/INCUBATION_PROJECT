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
       mt-3 flex items-start gap-4 p-4 border border-gray-200 rounded-lg relative
        ${
          !notification.is_read
            ?  "bg-white-color shadow-sm": "bg-white"
        }
      `}
    >
      {!notification.is_read && (
         <span className="absolute top-4 left-2 w-3 h-3 bg-second-color rounded-full"></span>
      )}

      <div className="flex gap-4">
       {/* صورة الإشعار */}
      <div className="w-15 h-15 shrink-0">
        <img src={logo} alt="logo" className="w-full h-full object-contain" />
      </div>

        <div className="flex-1">
          <p
            className={`
              text-xl
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
              text-sm
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

          {/* {notification.has_action && ( */}
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
                text-md
              "
            >
              عرض التفاصيل
            </button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;