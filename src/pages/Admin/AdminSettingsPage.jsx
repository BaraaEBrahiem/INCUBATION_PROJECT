import React, {
  useEffect,
  useState,
} from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import NavLinkUniversal from "../../components/NavLinkUniversal";
import Modal from "../../components/Modal";
import AdminNavbar from "../../components/AdminNavbar";

import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useLogoutMutation,
} from "../../api/endpoints/userApi";

import {
  showSuccess,
  showError,
} from "../../Utils/toast";

const AdminSettingsPage = () => {
  const [openLogout, setOpenLogout] =
    useState(false);

  const [form, setForm] =
    useState({
      full_name: "",
      phone: "",
      email: "",
    });

  const [errors, setErrors] =
    useState({});

  // ===================================
  // API
  // ===================================

  const {
    data: currentUser,
    isLoading,
  } =
    useGetCurrentUserQuery();

  const [
    updateUser,
    {
      isLoading:
        isUpdating,
    },
  ] =
    useUpdateUserMutation();

  const [
    logout,
    {
      isLoading:
        isLoggingOut,
    },
  ] =
    useLogoutMutation();

  // ===================================
  // تعبئة البيانات
  // ===================================

  useEffect(() => {
    if (currentUser) {
      setForm({
        full_name:
          currentUser.full_name ||
          "",
        phone:
          currentUser.phone ||
          "",
        email:
          currentUser.email ||
          "",
      });
    }
  }, [currentUser]);

  // ===================================
  // تغيير القيم
  // ===================================

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // ===================================
  // Validation
  // ===================================

  const validate = () => {
    const newErrors = {};

    if (
      !form.full_name.trim()
    ) {
      newErrors.full_name =
        "الرجاء إدخال الاسم";
    }

    if (
      !form.phone.trim()
    ) {
      newErrors.phone =
        "الرجاء إدخال رقم الهاتف";
    }

    if (
      !form.email.trim()
    ) {
      newErrors.email =
        "الرجاء إدخال البريد الإلكتروني";
    }

    return newErrors;
  };

  // ===================================
  // حفظ التعديلات
  // ===================================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const validationErrors =
        validate();

      setErrors(
        validationErrors
      );

      if (
        Object.keys(
          validationErrors
        ).length > 0
      ) {
        return;
      }

      try {
        await updateUser(
          form
        ).unwrap();

        showSuccess(
          "تم حفظ التعديلات بنجاح"
        );
      } catch (err) {
        console.error(
          err
        );

        showError(
          err?.data
            ?.detail ||
            "فشل تحديث البيانات"
        );
      }
    };

  // ===================================
  // Logout
  // ===================================

  const handleLogout =
    async () => {
      try {
        await logout().unwrap();

        localStorage.removeItem(
          "access"
        );

        localStorage.removeItem(
          "refresh"
        );

        showSuccess(
          "تم تسجيل الخروج"
        );

        window.location.href =
          "/login";
      } catch (err) {
        console.error(
          err
        );

        showError(
          "حدث خطأ أثناء تسجيل الخروج"
        );
      }
    };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar />

      <div className="container mt-30">
        <h1 className="text-3xl font-bold mb-10">
          الإعدادات
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="flex flex-col items-center gap-10"
        >
          <div className="w-full grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-20">
            {/* يمين */}
            <div>
              <Input
                label="الاسم"
                name="full_name"
                type="text"
                placeholder="الاسم"
                value={
                  form.full_name
                }
                onChange={
                  handleChange
                }
                error={
                  errors.name
                }
              />

              <Input
                label="رقم الهاتف"
                name="phone"
                type="text"
                placeholder="رقم الهاتف"
                value={
                  form.phone
                }
                onChange={
                  handleChange
                }
                error={
                  errors.phone
                }
              />
            </div>

            {/* يسار */}
            <div>
              <Input
                label="البريد الإلكتروني"
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                error={
                  errors.email
                }
              />

              <Input
                label="كلمة المرور"
                type="password"
                value="********"
                disabled
              />

              <NavLinkUniversal
                to="/change-password"
                label="اضغط هنا لتغيير كلمة المرور"
                className="hover:underline"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-4 w-[50%]">
            <Button
              label={
                isUpdating
                  ? "جاري الحفظ..."
                  : "حفظ التعديلات"
              }
              type="submit"
              className="bg-main-color px-10"
            />

            <Button
              label="تسجيل الخروج"
              onClick={() =>
                setOpenLogout(
                  true
                )
              }
              className="bg-red-color px-10"
            />
          </div>

          {/* Modal */}
          <Modal
            isOpen={
              openLogout
            }
            onClose={() =>
              setOpenLogout(
                false
              )
            }
            title="تأكيد تسجيل الخروج"
            footer={
              <div className="flex justify-center gap-4">
                <Button
                  label={
                    isLoggingOut
                      ? "جاري الخروج..."
                      : "تأكيد"
                  }
                  onClick={
                    handleLogout
                  }
                  className="bg-main-color w-30"
                />

                <button
                  onClick={() =>
                    setOpenLogout(
                      false
                    )
                  }
                  className="w-30 border border-second-color px-4 rounded"
                >
                  إلغاء
                </button>
              </div>
            }
          >
            هل أنت متأكد أنك تريد تسجيل الخروج؟
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;