import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from "../../../api/endpoints/notificationApi";

import NotificationItem from "../components/NotificationItem";

const NotificationsPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useGetNotificationsQuery();

  const [
    markAllAsRead,
    { isLoading: markingAll },
  ] =
    useMarkAllNotificationsAsReadMutation();

  if (isLoading) {
    return (
      <div className="p-6">
        جاري تحميل الإشعارات...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p>حدث خطأ أثناء تحميل الإشعارات</p>

        <button
          onClick={refetch}
          className="
            mt-3
            px-4
            py-2
            border
            rounded
          "
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const unreadNotifications =
    data.filter(
      (notification) =>
        !notification.is_read
    );

  const readNotifications =
    data.filter(
      (notification) =>
        notification.is_read
    );

  return (
    <div
      className="
        max-w-5xl
        mx-auto
        p-6
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <h1
          className="
            text-2xl
            font-bold
          "
        >
          الإشعارات
        </h1>

        {data.length > 0 && (
          <button
            onClick={() =>
              markAllAsRead()
            }
            disabled={markingAll}
            className="
              px-4
              py-2
              rounded-md
              bg-main-color
              text-white
            "
          >
            تعليم الكل كمقروء
          </button>
        )}
      </div>

      {data.length === 0 && (
        <div
          className="
            bg-white
            border
            rounded-lg
            p-8
            text-center
          "
        >
          لا توجد إشعارات حالياً
        </div>
      )}

      {unreadNotifications.length >
        0 && (
        <>
          <h2
            className="
              mb-3
              text-lg
              font-semibold
            "
          >
            غير المقروءة
          </h2>

          <div
            className="
              bg-white
              rounded-lg
              border
              overflow-hidden
              mb-8
            "
          >
            {unreadNotifications.map(
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
        </>
      )}

      {readNotifications.length >
        0 && (
        <>
          <h2
            className="
              mb-3
              text-lg
              font-semibold
            "
          >
            المقروءة
          </h2>

          <div
            className="
              bg-white
              rounded-lg
              border
              overflow-hidden
            "
          >
            {readNotifications.map(
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
        </>
      )}
    </div>
  );
};

export default NotificationsPage;