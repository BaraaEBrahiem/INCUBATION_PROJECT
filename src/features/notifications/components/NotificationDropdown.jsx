import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from "../../../api/endpoints/notificationApi";

import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({
  onClose,
}) => {
  const {
    data = [],
    isLoading,
  } = useGetNotificationsQuery();

  const [
    markAll,
    {
      isLoading:
        markAllLoading,
    },
  ] =
    useMarkAllNotificationsAsReadMutation();

  return (
    <div
      className="
        absolute
        left-0
        mt-2
        w-96
        bg-white
        border
        rounded-lg
        shadow-lg
        z-50
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          p-3
          border-b
        "
      >
        <h3>
          الإشعارات
        </h3>

        <button
          disabled={
            markAllLoading
          }
          onClick={() =>
            markAll()
          }
          className="
            text-sm
            text-blue-600
          "
        >
          قراءة الكل
        </button>
      </div>

      <div
        className="
          max-h-96
          overflow-y-auto
        "
      >
        {isLoading && (
          <div className="p-4">
            جاري التحميل...
          </div>
        )}

        {!isLoading &&
          data.length === 0 && (
            <div className="p-4">
              لا توجد إشعارات
            </div>
          )}

        {data.map(
          (notification) => (
            <NotificationItem
              key={
                notification.id
              }
              notification={
                notification
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;