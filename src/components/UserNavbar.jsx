import React from "react"
import logo from "../assets/images/logo.png"
import person1 from "../assets/images/person1.jpg"
import NavLinksGroup from "./NavLinksGroup"
import NavLinkUniversal from "./NavLinkUniversal"
import NotificationBell from "../features/notifications/components/NotificationBell"
import GlobalMessagesBadge from "../features/messaging/components/GlobalMessagesBadge";
import { FaRegMessage } from "react-icons/fa6"

const UserNavbar = ({ navOptions }) => {

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
              to={`/messagespage/:id`}
              className="font-bold hover:scale-105 transition"
            />

            <GlobalMessagesBadge />
          </div>

           <NotificationBell />         

          <NavLinkUniversal
            label={
              <img
                src={person1}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover border"
              />
            }
            to="/contact"
            className="hover:scale-105 transition"
          />
        </div>

      </div>
    </nav>
  )
}

export default UserNavbar