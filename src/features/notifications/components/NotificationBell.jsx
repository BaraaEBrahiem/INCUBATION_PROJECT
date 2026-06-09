import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationBadge from "./NotificationBadge";

const NotificationBell = () => {
  const navigate = useNavigate();

  const handleBellClick = () => {
    navigate("/notificationspage"); 
  };

  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        title="الإشعارات"
      >
        <IoIosNotificationsOutline size={35} />

        {/* شارة عدد الإشعارات غير المقروءة */}
        <NotificationBadge />
      </button>
    </div>
  );
};

export default NotificationBell;