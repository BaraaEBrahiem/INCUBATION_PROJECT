import { useSelector } from "react-redux";

export default function MessageBubble({
  message,
}) {
  const currentUserId =
    useSelector(
      (state) =>
        Number(
          state.auth.userId
        )
    );

  const isMine =
    currentUserId ===
    message.sender_id;

  return (
    <div
      className={`flex mb-3 ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
        max-w-[70%]
        px-4
        py-2
        rounded-lg
        ${
          isMine
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }
      `}
      >
        {message.content}
      </div>
    </div>
  );
}