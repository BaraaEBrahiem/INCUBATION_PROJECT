import { Link } from "react-router-dom";

import UnreadBadge from "./UnreadBadge";

const ConversationItem = ({
  conversation,
}) => {
  const user =
    conversation.other_user;

  return (
    <Link
      to={`/messages/${conversation.id}`}
      className="
        flex
        items-center
        gap-3
        p-4
        border-b
        hover:bg-gray-50
      "
    >
      <div
        className="
          w-12
          h-12
          rounded-full
          bg-gray-200
          flex
          items-center
          justify-center
        "
      >
        {user?.full_name?.[0]}
      </div>

      <div className="flex-1">
        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <h3 className="font-medium">
            {user?.full_name}
          </h3>

          <UnreadBadge
            count={
              conversation.unread_count
            }
          />
        </div>

        <p
          className="
            text-sm
            text-gray-500
            truncate
          "
        >
          {
            conversation
              ?.last_message
              ?.content
          }
        </p>
      </div>
    </Link>
  );
};

export default ConversationItem;