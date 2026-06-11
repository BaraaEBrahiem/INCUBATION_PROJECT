import { useGetGlobalUnreadMessagesCountQuery } from "../../../api/endpoints/messageApi";

export default function GlobalMessagesBadge() {
  const { data } =
    useGetGlobalUnreadMessagesCountQuery();

  const count =
    data?.unread_count || 0;

  console.log(
    "GLOBAL MESSAGES COUNT",
    count
  );

  if (!count) {
    return null;
  }

  return (
    <span
      className="
        absolute
        -top-2
        -right-2
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
}