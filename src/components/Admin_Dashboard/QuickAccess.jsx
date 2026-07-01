import { MdWork, MdPeople, MdSchool, MdPersonAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";

const QuickAccess = ({ items }) => {
 
  const fallbackItems = [
    { label: "طلبات المشاريع", link: "/admin/assigned-projects", icon: <MdWork /> },
    { label: "طلبات التطوع", link: "/admin/volunteers", icon: <MdPeople /> },
    { label: "طلبات الورشات", link: "/admin/workshops", icon: <MdSchool /> },
    { label: "إضافة مستخدم", link: "/admin/users", icon: <MdPersonAdd /> },
  ];

  const list = items || fallbackItems;
return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">الوصول السريع :</h2>

      <div className="grid grid-cols-4 gap-6">
        {list.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.link}
            className="mb-2 bg-main-color md:w-full w-18 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <span className="md:text-3xl text-xs">{item.icon}</span>
            <span className="md:text-lg text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
//Quick access

export default QuickAccess;
