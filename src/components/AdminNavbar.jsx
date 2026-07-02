import React from 'react'
import SearchBar from './SearchBar';
import NavLinkUniversal from './NavLinkUniversal';
import { FaRegMessage } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';
import Button from './Button';
import NotificationBell from "../features/notifications/components/NotificationBell";

const AdminNavbar = ({ BtnLabel, onBtnClick }) => {
 return (
    
    <header className="fixed top-0 right-0 lg:right-76 w-full lg:w-[calc(100%-19rem)] h-20 bg-white shadow-md flex items-center justify-between px-3 md:px-10 flex-nowrap overflow-x-auto scrollbar-hide z-50">
      
      <div className="w-80 sm:w-auto sm:flex-1 sm:max-w-md ">
        <SearchBar />
      </div>

      <div className="flex items-center gap-2 md:gap-6  pr-1 lg:pr-0">

        <NotificationBell />

        <NavLinkUniversal 
          label={<FaRegMessage size={20} className="cursor-pointer md:size-[26px]" />} 
          to="/messagespage" 
        />

        <NavLinkUniversal 
          label={<FiSettings size={18} className="cursor-pointer md:size-[25px]" />} 
          to="/admin/settings" 
        />

        {BtnLabel && onBtnClick && (
          <Button 
            label={BtnLabel} 
            onClick={onBtnClick} 
            className="bg-main-color text-[10px] md:text-sm px-2 md:px-4 py-1 whitespace-nowrap" 
          />
        )}
      </div>

    </header>
  )}

export default AdminNavbar