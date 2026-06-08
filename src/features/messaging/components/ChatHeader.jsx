export default function ChatHeader({
  conversation,
}) {
  const otherUser =
    conversation?.participants?.find(
      (user) => user.id !== Number(localStorage.getItem("userId"))
    );

  return (
    <div
      className="
      border-b
      p-4
      flex
      items-center
      justify-between
    "
    >
      <div>
        <h2 className="font-semibold">
          {otherUser?.full_name}
        </h2>

        <p
          className="
          text-xs
          text-gray-500
        "
        >
          {otherUser?.is_online
            ? "متصل الآن"
            : "غير متصل"}
        </p>
      </div>
    </div>
  );
}