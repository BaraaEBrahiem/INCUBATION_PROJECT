import { useState, /*useEffect*/ } from "react";
import UserFilters from "../../components/Admin_Dashboard/Users/UserFilters";
import UsersTable from "../../components/Admin_Dashboard/Users/UsersTable";
import AdminNavbar from "../../components/AdminNavbar";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";

/*
import {
  useGetAdminUsersQuery,
  useAddAdminUserMutation,
  useGetAvailableRolesQuery,
} from "../../api/endpoints/admin/usersOptionsApi.js";
import { showSuccess, showError } from "../../Utils/toast.js";
*/

const UsersPage = () => {
  const [roleFilter, setRoleFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    selectedRole: "VOLUNTEER",
  });


  /*
  const { data: serverUsers, isLoading, isError } = useGetAdminUsersQuery();
  const [addAdminUser] = useAddAdminUserMutation();

  useEffect(() => {
    if (serverUsers) {
      console.log("قائمة المستخدمين الحقيقية القادمة من الباك إند:", serverUsers);
    }
  }, [serverUsers]);
  */

  const fallbackUsers = [
    {
      id: 5,
      full_name: "أحمد محمد",
      email: "ahmed@example.com",
      roles: ["VOLUNTEER"], 
      status: "ACTIVE",
      created_at: "2026-05-14", 
    },
    {
      id: 7,
      full_name: "سارة العلي",
      email: "sara@example.com",
      roles: ["IDEA_OWNER"],
      status: "FROZEN",
      created_at: "2026-05-05",
    },
    {
      id: 6,
      full_name: "خالد العبد الله",
      email: "khaled@example.com",
      roles: ["VOLUNTEER", "IDEA_OWNER"],
      status: "ACTIVE",
      created_at: "2026-05-20",
    },
  ];

  // عند الربط الفعلي نكتب: const users = serverUsers || fallbackUsers;
  const users = fallbackUsers;

  // دالة تحديث حقول الـ Form الخاصة بالإدخال
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    console.log("إرسال بيانات المستخدم الجديد للباك إند:", formData);

    /* 
    try {

      await addAdminUser({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        roles: [formData.selectedRole] 
      }).unwrap();

      showSuccess("تم إضافة المستخدم بنجاح!");
      setOpen(false); // إغلاق المودال
      setFormData({ fullName: "", email: "", password: "", selectedRole: "VOLUNTEER" }); // تفريغ الحقول
    } catch (err) {
      showError("حدث خطأ أثناء إضافة المستخدم الجديد");
      console.error(err);
    }
    */
  };

  // في حال تفعيل التحميل من السيرفر
  // if (isLoading) return <p className="text-center mt-10">جاري تحميل قائمة المستخدمين...</p>;

  return (
    <div className="bg-white-color min-h-screen" dir="rtl">
      <AdminNavbar 
        BtnLabel="إضافة مستخدم"
        onBtnClick={() => setOpen(true)}
      />

      <Modal 
        isOpen={open}
        onClose={() => setOpen(false)}
        title="إضافة مستخدم جديد للنظام"
        footer={
          <Button 
            label="إضافة" 
            className="bg-main-color ml-2" 
            onClick={handleAddUserSubmit}
          />
        }
      >
        <form className="flex flex-col gap-4" onSubmit={handleAddUserSubmit}>
          <Input 
            label="اسم المستخدم الكامل" 
            type="text" 
            name="fullName"
            placeholder="اسم المستخدم الثلاثي" 
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <Input 
            label="البريد الإلكتروني" 
            type="email" 
            name="email"
            placeholder="example@test.com" 
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input 
            label="كلمة المرور الأولية" 
            type="password" 
            name="password"
            placeholder="كلمة المرور" 
            value={formData.password}
            onChange={handleInputChange}
          />

          <Select
            label="الدور الأساسي"
            options={[
              { value: "VISITOR", label: "زائر" },
              { value: "VOLUNTEER", label: "متطوع" },
              { value: "IDEA_OWNER", label: "صاحب فكرة" },
              { value: "INCUBATOR", label: "محتضن" },
              { value: "EVALUATOR", label: "مقيم" },
            ]}
            value={formData.selectedRole}
            onChange={(e) => setFormData((prev) => ({ ...prev, selectedRole: e.target.value }))}
          />
        </form>
      </Modal>

      <div className="container mt-30">
        <h2 className="text-2xl font-semibold mb-6">إدارة المستخدمين والأدوار</h2>

        <UserFilters
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <UsersTable
          roleFilter={roleFilter}
          users={users} 
        />
      </div>
    </div>
  );
};

export default UsersPage;