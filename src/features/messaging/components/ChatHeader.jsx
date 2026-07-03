import { useSelector } from "react-redux";
import { useMemo } from "react";
import { formatPresence } from "../../../utils/presenceFormatter";

export default function ChatHeader({ conversation }) {
  const currentUserId = useSelector((state) => Number(state.auth.userId));

  // جلب بيانات الطرف الآخر مباشرة وبأمان
  const otherUser = conversation?.other_user || 
    conversation?.participants?.find((user) => user.id !== currentUserId);

  const presence = useSelector(
    (state) =>
        state.presence.users[
            otherUser?.id
        ]
);

const presenceText = useMemo(
    () =>
        formatPresence(
            presence?.is_online ??
                otherUser?.is_online,
            presence?.last_seen_at ??
                otherUser?.last_seen_at,
        ),
    [
        presence,
        otherUser,
    ]
);

  return (
    <div className="border-b p-4 flex items-center justify-between bg-white">
      <div>
        <h2 className="font-semibold text-gray-800">
          {otherUser?.full_name || "مستخدم"}
        </h2>
        <p className="text-md text-gray-500">
            {presenceText}
        </p>
      </div>
    </div>
  );
}