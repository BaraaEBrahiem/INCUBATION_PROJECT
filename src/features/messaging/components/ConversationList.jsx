import ConversationItem from "./ConversationItem";

const ConversationList = ({
  conversations = [],
}) => {
  if (
    !conversations ||
    conversations.length === 0
  ) {
    return (
      <div className="p-8 text-center">
        لا توجد محادثات
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        border
        rounded-lg
        overflow-hidden
      "
    >
      {conversations.map(
        (conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={
              conversation
            }
          />
        )
      )}
    </div>
  );
};

export default ConversationList;