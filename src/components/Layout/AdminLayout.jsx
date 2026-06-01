import AdminSidebar from "../AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({adminName, email}) => {
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
