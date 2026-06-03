import AdminSidebar from "../AdminSidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"

const AdminLayout = () => {
  const reduxUser = useSelector((state) => state.auth?.user);

  const localStorageUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const finalUser = reduxUser || localStorageUser || {};
  
  const adminName = finalUser.name || finalUser.full_name || localStorage.getItem("adminName") || "";
  const email = finalUser.email || localStorage.getItem("email") || "";

  return (
    <div className="flex">

      {/* Sidebar */}
      <AdminSidebar adminName={adminName} email={email}/>

        <main className="grow bg-white-color lg:mr-40 w-full min-h-screen ">
        <Outlet context={{}} />
        </main>
      </div>
  );
};

export default AdminLayout;
