import Sidebar from "../Sidebar"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const DashboardLayout = () => {
  const reduxUser = useSelector((state) => state.auth?.user);
  const reduxRoles = useSelector((state) => state.auth?.role) || reduxUser?.roles;

  const localStorageUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const finalUser = reduxUser || localStorageUser || {};
  
  const userName = finalUser.name || finalUser.full_name || localStorage.getItem("userName") || "";
  const email = finalUser.email || localStorage.getItem("email") || "";
  
  const roles = reduxRoles || finalUser.roles || [];

  return (
    <div className="flex min-h-screen">
      <div className="">
        <Sidebar roles={roles} userName={userName} email={email} />
      </div>

      <main className="grow bg-white-color lg:mr-15 w-full h-screen ">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout;