import React, { useState, useEffect } from "react";
import person1 from "../../assets/images/person1.jpg";

import Input from "../../components/Input";
import Button from "../../components/Button";

import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "../../api/endpoints/userApi";

import {
  showSuccess,
  showError,
} from "../../Utils/toast";

const ProfilePage = () => {
  // ==========================
  // API
  // ==========================
  const {
    data: user,
    isLoading,
  } = useGetCurrentUserQuery();

  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserMutation();

  // ==========================
  // States
  // ==========================
  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [preview, setPreview] =
    useState(person1);

  // ==========================
  // Fill form from API
  // ==========================
  useEffect(() => {
    if (user) {
      setForm({
        full_name:
          user.full_name || "",
        email:
          user.email || "",
      });

      setPreview(
        user.avatar || person1
      );
    }
  }, [user]);

  // ==========================
  // Input Change
  // ==========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // ==========================
  // Image Change
  // ==========================
  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // ==========================
  // Submit
  // ==========================
  const handleSubmit =
    async (e) => {
      e.preventDefault();
      console.log("SUBMIT CLICKED");

      try {
        const formData =
          new FormData();

        formData.append(
          "full_name",
          form.full_name
        );

        formData.append(
          "email",
          form.email
        );

        if (
          selectedImage
        ) {
          formData.append(
            "avatar",
            selectedImage
          );
        }

        await updateUser(
          formData
        ).unwrap();

        showSuccess(
          "تم تحديث الملف الشخصي بنجاح"
        );
      } catch (error) {
        console.error(error);

        showError(
          error?.data
            ?.message ||
            "حدث خطأ أثناء تحديث الملف الشخصي"
        );
      }
    };

  // ==========================
  // Loading
  // ==========================
  if (isLoading) {
    return (
      <div className="text-center mt-20">
        جاري التحميل...
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-3xl font-bold text-second-color pt-10 mb-20">
          تعديل الملف الشخصي
        </h1>

        {/* Profile Card */}
        <div className="bg-white flex items-center gap-4 mb-8 p-4 rounded shadow w-full md:w-[600px]">
          <div className="relative">
            <img
              src={preview}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />

            <label className="absolute bottom-0 left-0 bg-main-color text-white text-xs px-2 py-1 rounded cursor-pointer">
              تعديل

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={
                  handleImageChange
                }
              />
            </label>
          </div>

          <div>
            <p className="font-semibold text-lg">
              {
                form.full_name
              }
            </p>

            <p className="text-gray-500">
              {
                form.email
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded shadow w-full md:w-[600px]">
          <form
            className="flex flex-col gap-4"
            onSubmit={
              handleSubmit
            }
          >
            <Input
              label="الاسم الكامل"
              type="text"
              name="full_name"
              value={
                form.full_name
              }
              onChange={
                handleChange
              }
            />

            <Input
              label="البريد الإلكتروني"
              type="email"
              name="email"
              value={
                form.email
              }
              onChange={
                handleChange
              }
            />

            <Button
  type="submit"
  label={
    isUpdating
      ? "جاري التحديث..."
      : "تحديث"
  }
  disabled={isUpdating}
  className="bg-main-color w-fit px-20 py-2"
/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;