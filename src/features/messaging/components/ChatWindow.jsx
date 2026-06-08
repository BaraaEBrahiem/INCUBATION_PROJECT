import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";

export default function ChatWindow({
  conversation,
  messages,
}) {
  return (
    <div
      className="
      h-[80vh]
      flex
      flex-col
      border
      rounded-lg
      overflow-hidden
    "
    >
      <ChatHeader
        conversation={conversation}
      />

      <div
        className="
        flex-1
        overflow-y-auto
        p-4
      "
      >
        <MessageList
          messages={messages}
        />
      </div>

      <MessageComposer
        conversationId={
          conversation.id
        }
      />
    </div>
  );
}