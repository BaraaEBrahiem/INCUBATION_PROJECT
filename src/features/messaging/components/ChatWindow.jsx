import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";

export default function ChatWindow({ conversation, messages }) {

  const messageList = messages?.results || [];

  return (
    <div className="h-[80vh] flex flex-col border rounded-lg overflow-hidden bg-gray-50">
      <ChatHeader conversation={conversation} />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
        {/* استخدمنا flex-col-reverse ليتناسب مع الـ Scroll وترتيب الرسائل التنازلي الحاصل بالـ merge */}
        <MessageList messages={messageList} />
      </div>

      <MessageComposer conversationId={conversation?.id} />
    </div>
  );
}