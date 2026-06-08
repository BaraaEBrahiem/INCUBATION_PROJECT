// src/components/MessageNavButton.jsx

import { Link } from "react-router-dom";
import { FaRegMessage } from "react-icons/fa6";

import {
  useGetGlobalUnreadMessagesCountQuery,
} from "../api/endpoints/messageApi";

export default function MessageNavButton() {
  const { data } =
    useGetGlobalUnreadMessagesCountQuery();

  return (
    <Link
      to="/messagespage"
      className="relative"
    >
      <FaRegMessage size={22} />

      {data?.unread_count > 0 && (
        <span
          className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            text-xs
            rounded-full
            min-w-[18px]
            h-[18px]
            flex
            items-center
            justify-center
          "
        >
          {data.unread_count}
        </span>
      )}
    </Link>
  );
}