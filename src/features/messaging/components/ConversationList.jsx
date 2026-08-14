import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations = [], selectedId }) => {
  if (!conversations || conversations.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 text-sm">
        لا توجد محادثات قائمة حالياً
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden divide-y divide-gray-100">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={conversation.id === selectedId}
        />
      ))}
    </div>
  );
};

export default ConversationList;