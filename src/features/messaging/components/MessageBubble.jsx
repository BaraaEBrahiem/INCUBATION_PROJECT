import { useSelector } from "react-redux";

export default function MessageBubble({ message }) {
  const currentUserId = useSelector((state) => Number(state.auth.userId));

  // التحقق من هوية المرسل
  const isMine = currentUserId === Number(message?.sender_id);

  return (
    <div className={`flex mb-3 w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-md shadow-sm leading-relaxed ${
          isMine
            ? "bg-main-color text-white rounded-br-none text-right"
            : "bg-white border border-scond-color text-gray-800 rounded-bl-none text-right"
        } ${message?.optimistic ? "opacity-70" : ""}`} // تمييز الرسالة المؤقتة الشفافة حتى ينتهي السيرفر
      >
        <p>{message?.content}</p>
      </div>
    </div>
  );
}