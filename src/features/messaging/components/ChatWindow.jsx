import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";

import { useConversationRealtime } from "../../../realtime/hooks/useConversationRealtime";

export default function ChatWindow({
  conversation,
  messages,
}) {

  useConversationRealtime(
    conversation?.id
  );

 const messageList =
  [...(messages?.results || [])]
    

  return (
    <div className="h-[80vh] flex flex-col border rounded-lg overflow-hidden bg-gray-50">

      <ChatHeader conversation={conversation} />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        <MessageList messages={messageList} />
      </div>

      <MessageComposer
        conversationId={conversation?.id}
      />

    </div>
  );
}