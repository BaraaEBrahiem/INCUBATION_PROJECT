import React from "react"
import { Outlet } from "react-router-dom";

const MainLayout = ({ children, header, footer }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      {/* الهيدر */}
      {header}

      {/* المحتوى */}
      <main className="flex-1 lg:mt-20">
        {children || <Outlet />}
      </main>

      {/* الفوتر */}
      {footer}
    </div>
  )
}

export default MainLayout