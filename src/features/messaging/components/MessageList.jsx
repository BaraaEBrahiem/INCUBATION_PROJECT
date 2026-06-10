import MessageBubble from "./MessageBubble";

export default function MessageList({ messages = [] }) {
  return (
    <div className="flex flex-col w-full gap-3">
      {messages.map((message) => (
        <MessageBubble
          key={message.id }
          message={message}
        />
      ))}
    </div>
  );
}