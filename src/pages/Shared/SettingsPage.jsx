
import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Button from "../../components/Button";
import NavLinkUniversal from "../../components/NavLinkUniversal";
import Modal from "../../components/Modal";

import {
  showSuccess,
  showError,
} from "../../Utils/toast";

import {
  useLogoutMutation,
  useDeleteAccountMutation,
} from "../../api/endpoints/userApi";
const SettingsPage = () => {
  const navigate =
    useNavigate();

  const [
    isLogoutModalOpen,
    setIsLogoutModalOpen,
  ] = useState(false);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    logout,
    {
      isLoading:
        isLogoutLoading,
    },
  ] =
    useLogoutMutation();

  const [
    deleteAccount,
    {
      isLoading:
        isDeleteLoading,
    },
  ] =
    useDeleteAccountMutation();

  const clearAuth =
    () => {
      localStorage.removeItem(
        "access"
      );

      localStorage.removeItem(
        "refresh"
      );

      localStorage.removeItem(
        "user"
      );
    };

  const handleLogout =
    async () => {
      try {
        await logout().unwrap();

        clearAuth();

        showSuccess(
          "تم تسجيل الخروج بنجاح"
        );

        navigate(
          "/login"
        );
      } catch (err) {
        showError(
          err?.data
            ?.detail ||
            "حدث خطأ أثناء تسجيل الخروج"
        );
      } finally {
        setIsLogoutModalOpen(
          false
        );
      }
    };

  const handleDeleteAccount =
    async () => {
      try {
        await deleteAccount().unwrap();

        clearAuth();

        showSuccess(
          "تم حذف الحساب بنجاح"
        );

        navigate(
          "/signup"
        );
      } catch (err) {
        showError(
          err?.data
            ?.detail ||
            "حدث خطأ أثناء حذف الحساب"
        );
      } finally {
        setIsDeleteModalOpen(
          false
        );
      }
    };

  return (
    <div className="px-4 pb-10">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-second-color my-10">
          اعدادات الحساب
        </h1>

        <div className="max-w-[800px] w-full min-h-40 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            الأمان وتسجيل
            الدخول
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base md:text-lg">
              هل تريد تغيير
              كلمة المرور؟
            </p>

            <NavLinkUniversal
              to="/change-password"
              label={
                <Button
                  label="تغيير كلمة المرور"
                  className="bg-main-color px-15 md:px-20 py-2"
                />
              }
            />
          </div>
        </div>

        <div className="max-w-[800px] w-full min-h-40 bg-white flex flex-col md:flex-row justify-between items-center p-6 rounded-lg mt-6 gap-4">
          <Button
            label="حذف الحساب"
            className="bg-red-color px-20 py-2"
            onClick={() =>
              setIsDeleteModalOpen(
                true
              )
            }
          />

          <Button
            label="تسجيل الخروج"
            className="bg-main-color px-20 py-2"
            onClick={() =>
              setIsLogoutModalOpen(
                true
              )
            }
          />
        </div>
      </div>

      <Modal
        isOpen={
          isLogoutModalOpen
        }
        onClose={() =>
          setIsLogoutModalOpen(
            false
          )
        }
        title="هل أنت متأكد من تسجيل الخروج؟"
        footer={
          <div className="flex gap-4">
            <Button
              label={
                isLogoutLoading
                  ? "جارٍ التنفيذ..."
                  : "نعم"
              }
              disabled={
                isLogoutLoading
              }
              className="bg-main-color px-6"
              onClick={
                handleLogout
              }
            />

            <Button
              label="لا"
              className="bg-gray-300 px-6"
              onClick={() =>
                setIsLogoutModalOpen(
                  false
                )
              }
            />
          </div>
        }
      >
        <p>
          سيتم تسجيل خروجك
          من الحساب
        </p>
      </Modal>

      <Modal
        isOpen={
          isDeleteModalOpen
        }
        onClose={() =>
          setIsDeleteModalOpen(
            false
          )
        }
        title="هل أنت متأكد؟"
        footer={
          <div className="flex gap-4">
            <Button
              label={
                isDeleteLoading
                  ? "جارٍ الحذف..."
                  : "حذف الحساب"
              }
              disabled={
                isDeleteLoading
              }
              className="bg-red-color px-6"
              onClick={
                handleDeleteAccount
              }
            />

            <Button
              label="إلغاء"
              className="bg-gray-300 px-6"
              onClick={() =>
                setIsDeleteModalOpen(
                  false
                )
              }
            />
          </div>
        }
      >
        <p>
          أنت على وشك حذف
          حسابك، لا يمكن
          التراجع عن هذا
          الإجراء وسيتم حذف
          جميع بياناتك بشكل
          دائم.
        </p>
      </Modal>
    </div>
  );
};

export default SettingsPage;
