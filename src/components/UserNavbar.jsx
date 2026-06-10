import React from "react";
import logo from "../assets/images/logo.png";
import girl from "../assets/images/girl.jpg";
import NavLinksGroup from "./NavLinksGroup";
import NavLinkUniversal from "./NavLinkUniversal";
import NotificationBell from "../features/notifications/components/NotificationBell";
import { FaRegMessage } from "react-icons/fa6";
import { useGetGlobalUnreadMessagesCountQuery } from "../api/endpoints/messageApi";
import UnreadBadge from "../features/messaging/components/UnreadBadge";

const UserNavbar = ({ navOptions }) => {
  const { data: unreadData } = useGetGlobalUnreadMessagesCountQuery();
  const globalUnreadCount = unreadData?.count || 0;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20 flex-nowrap overflow-x-auto scrollbar-hide">
        
        <div className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Main navigation links */}
        <NavLinksGroup
          options={navOptions}
          variant="mainpage"
          className="flex items-center gap-15 text-lg font-medium"
        />

        {/* Right actions */}
        <div className="flex items-center gap-4 shrink-0">
          
          <div className="relative">
            <NavLinkUniversal
              label={<FaRegMessage size={22} />}
              to="/messagespage"
              className="font-bold hover:scale-105 transition block"
            />
            {globalUnreadCount > 0 && (
              <div className="absolute -top-1 -left-1 pointer-events-none scale-75 transform -translate-x-1/4 -translate-y-1/4">
                <UnreadBadge count={globalUnreadCount} />
              </div>
            )}
          </div>

          <NotificationBell />         

          <NavLinkUniversal
            label={
              <img
                src={girl}
                alt="avatar"
                className="h-12 w-12 rounded-full object-cover border"
              />
            }
            to="/contact"
            className="hover:scale-105 transition"
          />
        </div>

      </div>
    </nav>
  );
};

export default UserNavbar;