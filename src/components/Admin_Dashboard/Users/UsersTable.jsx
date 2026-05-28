import { useNavigate } from "react-router-dom";
import DataTable from "../DataTable";
import Button from "../../Button";

const ROLE_TRANSLATIONS = {
  VISITOR: "زائر",
  VOLUNTEER: "متطوع",
  IDEA_OWNER: "صاحب فكرة",
  INCUBATOR: "محتضن",
  EVALUATOR: "مقيم",
};

const UsersTable = ({ users = [], roleFilter }) => {
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) => {
    if (roleFilter === "all") return true;
    
  
    return user.roles && user.roles.includes(roleFilter);
  });

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <Button
          label="عرض التفاصيل"
          className="bg-main-color"
          onClick={() => navigate(`/admin/users/${row.id}`)} // التوجيه لصفحة التفاصيل
        />
      ),
    },
    {
      key: "status",
      label: "حالة الحساب",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-md text-white text-xs font-semibold
            ${row.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"}
          `}
        >
          {row.status === "ACTIVE" ? "نشط" : "مجمد"}
        </span>
      ),
    },

    {
      key: "roles",
      label: "الأدوار المشغولة",
      render: (row) => {
        if (!row.roles || row.roles.length === 0) return <span className="text-gray-400">زائر</span>;
        
        const arabicRoles = row.roles.map(code => ROLE_TRANSLATIONS[code] || code);
        
        return <span className="font-medium text-gray-800">{arabicRoles.join(" ، ")}</span>;
      },
    },
    { key: "email", label: "البريد الإلكتروني" },
    { key: "full_name", label: "اسم المستخدم الكامل" }, 
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6" dir="rtl">
      {filteredUsers.length > 0 ? (
        <DataTable columns={columns} data={filteredUsers} />
      ) : (
        <p className="text-center text-gray-500 py-6">لا يوجد مستخدمين يطابقون الدور المحدد حالياً.</p>
      )}
    </div>
  );
};

export default UsersTable;