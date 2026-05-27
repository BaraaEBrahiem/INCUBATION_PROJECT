import { useState } from "react";
import UserFilters from "../../components/Admin_Dashboard/Users/UserFilters";
import UsersTable from "../../components/Admin_Dashboard/Users/UsersTable";
import AdminNavbar from "../../components/AdminNavbar";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";

const UsersPage = () => {
  const [roleFilter, setRoleFilter] = useState("all");
  const [open, setOpen] = useState(false);

  // ---------------------------------------------------------
  //   1) لاحقاً: جلب المستخدمين من API
  // const { data: users, isLoading } = useGetUsersQuery();
  //
  //   fallback قبل الربط:
  const fallbackUsers = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      role: "متطوع",
      status: "نشط",
      joined_at: "2024-01-10",
    },
    {
      id: 2,
      name: "سارة العلي",
      email: "sara@example.com",
      role: "محتضن",
      status: "غير نشط",
      joined_at: "2024-02-01",
    },
     {
      id: 3,
      name: "سارة العلي",
      email: "sara@example.com",
      role: "متطوع ومحتضن",
      status: "غير نشط",
      joined_at: "2024-02-01",
    },
  ];
  const users = fallbackUsers;
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  //   2) لاحقاً: إضافة مستخدم جديد عبر API
  // const [addUser] = useAddUserMutation();
  //
  // const handleAddUser = async () => {
  //   await addUser({
  //     name,
  //     email,
  //     password,
  //     role,
  //   });
  // };
  // ---------------------------------------------------------

  return (
    <div className="bg-white-color h-screen">
      <AdminNavbar 
        BtnLabel="إضافة مستخدم"
        onBtnClick={() => setOpen(true)}
      />

      {/*   Modal إضافة مستخدم */}
      <Modal 
        isOpen={open}
        onClose={() => setOpen(false)}
        title=""
        footer={<Button label="إضافة" className="bg-main-color ml-2" />}
      >
        <form className="flex flex-col gap-4">
          <Input label="اسم المستخدم الكامل" type="text" placeholder="اسم المستخدم" />
          <Input label="البريد الإلكتروني" type="email" placeholder="البريد الإلكتروني" />
          <Input label="كلمة المرور الأولية" type="password" placeholder="كلمة المرور" />

          <Select
            label="الدور"
            options={[
              { value: "زائر", label: "زائر" },
              { value: "متطوع", label: "متطوع" },
              { value: "محتضن", label: "محتضن" },
              { value: "مقيم", label: "مقيم" },
              { value: "صاحب فكرة", label: "صاحب فكرة" },
            ]}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </form>
      </Modal>

      <div className="container mt-30">
        <h2 className="text-2xl font-semibold mb-6">إدارة المستخدمين والأدوار</h2>

        {/*   الفلاتر */}
        <UserFilters
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        {/*   جدول المستخدمين */}
        <UsersTable
          roleFilter={roleFilter}
          users={users} // ← API 
        />
      </div>
    </div>
  );
};

export default UsersPage;