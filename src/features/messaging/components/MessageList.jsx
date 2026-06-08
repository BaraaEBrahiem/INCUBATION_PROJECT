import MessageBubble from "./MessageBubble";

export default function MessageList({
  messages,
}) {
  return (
    <div className="flex-1">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}