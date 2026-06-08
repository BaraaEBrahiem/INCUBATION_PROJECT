import React from "react"
import logo from "../assets/images/logo.png"
import girl from "../assets/images/girl.jpg"
import NavLinksGroup from "./NavLinksGroup"
import NavLinkUniversal from "./NavLinkUniversal"

import NotificationBell from "../features/notifications/components/NotificationBell"

import { FaRegMessage } from "react-icons/fa6"

const UserNavbar = ({ navOptions }) => {

  return (
       <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20 flex-nowrap overflow-x-auto scrollbar-hide">

        <div className="flex items-center gap-2 flex-shrink-0">
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
        <div className="flex items-center gap-4 flex-shrink-0">
          <NavLinkUniversal
            label={<FaRegMessage size={22} />}
            to="/messagespage"
            className="font-bold hover:scale-105 transition"
          />

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
  )
}

export default UserNavbar
