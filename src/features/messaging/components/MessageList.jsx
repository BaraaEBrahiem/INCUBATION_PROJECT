import MessageBubble from "./MessageBubble";

export default function MessageList({ messages = [] }) {
  return (
    <div className="flex flex-col w-full">
      {messages.map((message) => (
        <MessageBubble
          key={message.id }
          message={message}
        />
      ))}
    </div>
  );
}