import MessageBubble from "./MessageBubble";

export default function MessageList({ messages = [] }) {

  const reversedMessages = [...messages].reverse();

  return (
    <div className="flex flex-col w-full">
      {reversedMessages.map((message) => (
        <MessageBubble
          key={message.id || message.created_at}
          message={message}
        />
      ))}
    </div>
  );
}