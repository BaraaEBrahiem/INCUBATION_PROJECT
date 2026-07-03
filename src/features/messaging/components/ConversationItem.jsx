import { Link } from "react-router-dom";
import UnreadBadge from "./UnreadBadge";

const ConversationItem = ({ conversation, isSelected }) => {
  const user = conversation?.other_user;

  console.log(
  "CONVERSATION RENDER",
  conversation.id,
  conversation.unread_count,
  conversation.last_message
);

  return (
    <Link
      to={`/messagespage/${conversation.id}`}
      className={`flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-white-color" : ""
      }`}
    >
      <div className="w-12 h-12 rounded-full border-2 border-second-color flex items-center justify-center font-bold">
        {user?.full_name ? user.full_name[0].toUpperCase() : "؟"}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-gray-900 truncate">
            {user?.full_name || "مستخدم غير معروف"}
          </h3>

          <UnreadBadge count={conversation?.unread_count} />
        </div>

        <p className="text-sm text-gray-500 truncate">
          {conversation?.last_message?.content || "لا توجد رسائل سابقة"}
        </p>
      </div>
    </Link>
  );
};

export default ConversationItem;