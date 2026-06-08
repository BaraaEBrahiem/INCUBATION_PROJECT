import {
  useGetNotificationBadgeQuery,
} from "../../../api/endpoints/notificationApi";

const NotificationBadge = () => {
  const {
    data,
  } = useGetNotificationBadgeQuery();

  const count =
    data?.unread_count || 0;

  if (!count) {
    return null;
  }

  return (
    <span
      className="
        absolute
        -top-1
        -right-1
        min-w-5
        h-5
        px-1
        rounded-full
        bg-red-500
        text-white
        text-xs
        flex
        items-center
        justify-center
      "
    >
      {count}
    </span>
  );
};

export default NotificationBadge;