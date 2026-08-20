import { useSelector } from "react-redux";

export default function ChatHeader({ conversation }) {
  const currentUserId = useSelector((state) => Number(state.auth.userId));

  // جلب بيانات الطرف الآخر مباشرة وبأمان
  const otherUser = conversation?.other_user || 
    conversation?.participants?.find((user) => user.id !== currentUserId);

  return (
    <div className="border-b border-second-color p-4 flex items-center justify-between bg-white">
      <div>
        <h2 className="font-semibold text-xl text-gray-800">
          {otherUser?.full_name || "مستخدم"}
        </h2>
        <p className="text-md text-gray-500">
          {otherUser?.is_online ? "متصل الآن" : "غير متصل"}
        </p>
      </div>
    </div>
  );
}

