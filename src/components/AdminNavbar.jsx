import React from 'react'
import SearchBar from './SearchBar';
import NavLinkUniversal from './NavLinkUniversal';
import { FaRegMessage } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';
import Button from './Button';
import NotificationBell from "../features/notifications/components/NotificationBell";

const AdminNavbar = ({ BtnLabel, onBtnClick }) => {
  return (
    <header className="fixed top-0 right-76 w-400 h-20 bg-white shadow-md flex justify-between items-center px-20">
      
      <SearchBar />

      <div className="flex items-center gap-6 pl-6">

        
        <NotificationBell />

       
        <NavLinkUniversal 
          label={<FaRegMessage size={26} className="cursor-pointer" />} 
          to="/messagespage" 
        />

        <NavLinkUniversal 
          label={<FiSettings size={24} className="cursor-pointer" />} 
          to="/admin/settings" 
        />

        {BtnLabel && onBtnClick && (
          <Button 
            label={BtnLabel} 
            onClick={onBtnClick} 
            className="bg-main-color"
          />
        )}
      </div>

    </header>
  )
}

export default AdminNavbar
