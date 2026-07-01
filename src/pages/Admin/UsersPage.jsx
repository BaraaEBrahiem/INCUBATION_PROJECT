import { useState, useEffect } from "react";
import UserFilters from "../../components/Admin_Dashboard/Users/UserFilters";
import UsersTable from "../../components/Admin_Dashboard/Users/UsersTable";
import AdminNavbar from "../../components/AdminNavbar";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";

import {
  useGetAdminUsersQuery,
  useCreateAdminUserMutation,
  useGetAvailableRolesQuery,
} from "../../api/endpoints/admin/usersOptionsApi.js";

const UsersPage = () => {
  const [roleFilter, setRoleFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    selectedRole: "",
  });

  const {
    data: serverUsers,
    isLoading,
    isError,
  } = useGetAdminUsersQuery();

  const {
    data: availableRoles,
  } = useGetAvailableRolesQuery();

  const [createAdminUser] =
    useCreateAdminUserMutation();

  useEffect(() => {
    if (serverUsers) {
      console.log(
        "قائمة المستخدمين القادمة من الباك:",
        serverUsers
      );
    }
  }, [serverUsers]);

  const fallbackUsers = [
    {
      id: 5,
      full_name: "أحمد محمد",
      email: "ahmed@example.com",
      roles: ["VOLUNTEER"],
      status: "ACTIVE",
      created_at: "2026-05-14",
    },
  ];

  // يعتمد على الباك أولاً
  const users =
    serverUsers || fallbackUsers;

  const handleInputChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUserSubmit =
  async (e) => {
    e.preventDefault();

    try {
      await createAdminUser({
        full_name:
          formData.fullName,
        email:
          formData.email,
        password:
          formData.password,

        role_code:
          formData.selectedRole || null,
      }).unwrap();

      alert(
        "تم إضافة المستخدم بنجاح!"
      );

      setOpen(false);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        selectedRole: "",
      });

    } catch (err) {
      console.error(
        "ERROR:",
        err
      );

      console.log(
        err?.data
      );

      alert(
        err?.data
          ?.message ||
          JSON.stringify(
            err?.data
          ) ||
          "حدث خطأ أثناء إضافة المستخدم"
      );
    }
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10">
        جاري تحميل قائمة
        المستخدمين...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        حدث خطأ أثناء تحميل
        المستخدمين
      </p>
    );
  }
  
  

  return (
    <div
      // 🎯 التعديل هنا: أضفنا overflow-x-hidden و max-w-full لمنع الصفحة الكلية من الطيران يميناً ويساراً على الموبايل
      className="bg-white-color min-h-screen w-full max-w-full overflow-x-hidden"
      dir="rtl"
    >
      <AdminNavbar
        BtnLabel="إضافة مستخدم"
        onBtnClick={() =>
          setOpen(true)
        }
      />

      <Modal
        isOpen={open}
        onClose={() =>
          setOpen(false)
        }
        title="إضافة مستخدم جديد للنظام"
        footer={
          <Button
            label="إضافة"
            className="bg-main-color ml-2"
            onClick={
              handleAddUserSubmit
            }
          />
        }
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={
            handleAddUserSubmit
          }
        >
          <Input
            label="اسم المستخدم الكامل"
            type="text"
            name="fullName"
            placeholder="اسم المستخدم الثلاثي"
            value={
              formData.fullName
            }
            onChange={
              handleInputChange
            }
          />

          <Input
            label="البريد الإلكتروني"
            type="email"
            name="email"
            placeholder="example@test.com"
            value={formData.email}
            onChange={
              handleInputChange
            }
          />

          <Input
            label="كلمة المرور الأولية"
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={
              formData.password
            }
            onChange={
              handleInputChange
            }
          />

          
          

          <Select
  label="الدور الأساسي"
  options={[
    {
      value: "",
      label:
        "بدون دور",
    },

    ...(availableRoles?.map(
      (role) => ({
        value:
          role.code,
        label:
          role.name,
    })
    ) || []),
  ]}
  value={
    formData.selectedRole
  }
  onChange={(e) =>
    setFormData(
      (prev) => ({
        ...prev,
        selectedRole:
          e.target.value,
      })
    )
  }
      />
        </form>
      </Modal>

      {/* 🎯 تعديل حاوية المحتوى: أضفنا px-4 لتوفير مساحة حواف مريحة على الموبايل، و w-full مع overflow-x-hidden لمنع خروج العناصر */}
      <div className="container mt-30 px-4 sm:px-6 w-full max-w-full overflow-x-hidden">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          إدارة المستخدمين
          الأدوار
        </h2>

        <UserFilters
          roleFilter={
            roleFilter
          }
          setRoleFilter={
            setRoleFilter
          }
        />

        {/* 🎯 تغليف جدول المستخدمين بـ div معزول لضمان السكرول الداخلي على الموبايل وعدم تخريب الصفحة الكلية */}
        <div className="w-full overflow-x-auto block whitespace-nowrap mt-4">
          <UsersTable
            roleFilter={
              roleFilter
            }
            users={users}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;