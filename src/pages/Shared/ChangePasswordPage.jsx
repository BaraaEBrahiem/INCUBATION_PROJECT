import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import NavLinkUniversal from "../../components/NavLinkUniversal";
import {
  useChangePasswordMutation,
} from "../../api/endpoints/userApi";

const ChangePasswordPage = () => {

  const [
    changePassword,
    { isLoading }
  ] = useChangePasswordMutation();

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] =
    useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // حذف الخطأ عند الكتابة
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {

    const newErrors = {};

    // ==========================
    // كلمة المرور الحالية
    // ==========================
    if (!form.old_password) {
      newErrors.old_password =
        "الرجاء إدخال كلمة المرور الحالية";
    }

    // ==========================
    // كلمة المرور الجديدة
    // ==========================
    if (!form.new_password) {
      newErrors.new_password =
        "الرجاء إدخال كلمة المرور الجديدة";
    }

    if (
      form.new_password &&
      form.new_password.length < 8
    ) {
      newErrors.new_password =
        "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }

    if (
      form.new_password &&
      !/[A-Z]/.test(form.new_password)
    ) {
      newErrors.new_password =
        "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل";
    }

    if (
      form.new_password &&
      !/[0-9]/.test(form.new_password)
    ) {
      newErrors.new_password =
        "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSuccessMsg("");
    setErrors({});

    const validationErrors =
      validate();

    setErrors(
      validationErrors
    );

    if (Object.keys(validationErrors).length > 0) return;

console.log({
  old_password: form.old_password,
  new_password: form.new_password,
});
  

    try {

      const response =
        await changePassword({
          old_password:
            form.old_password,
          new_password:
            form.new_password,
        }).unwrap();

      setSuccessMsg(
        response?.detail ||
        "تم تحديث كلمة المرور بنجاح"
      );

      // تنظيف الحقول
      setForm({
        old_password: "",
        new_password: "",
      });

    } catch (err) {

  console.log(
    "FULL ERROR:",
    err
  );

  console.log(
    "SERVER RESPONSE:",
    err?.data
  );

  setErrors({
    old_password:
      err?.data?.detail ||
      "كلمة المرور الحالية غير صحيحة",
  });


      setErrors({
        old_password:
          err?.data?.detail ||
          "كلمة المرور الحالية غير صحيحة",
      });
    }
  };

  return (
    <div>
      <div className="container">

        <h1 className="text-3xl font-bold text-second-color pt-10 mb-20">
          تغيير كلمة المرور
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="flex flex-col gap-4"
        >

          {/* كلمة المرور الحالية */}
          <div>
            <Input
              className="w-1/2 bg-white"
              label="كلمة المرور الحالية"
              name="old_password"
              type="password"
              placeholder="كلمة المرور الحالية"
              value={
                form.old_password
              }
              onChange={
                handleChange
              }
              error={
                errors.old_password
              }
            />

            <NavLinkUniversal
              to="/forgetpassword"
              label="هل نسيت كلمة المرور؟"
              className="hover:underline text-right"
            />
          </div>

          {/* كلمة المرور الجديدة */}
          <Input
            className="w-1/2 bg-white"
            label="كلمة المرور الجديدة"
            name="new_password"
            type="password"
            placeholder="كلمة المرور الجديدة"
            value={
              form.new_password
            }
            onChange={
              handleChange
            }
            error={
              errors.new_password
            }
          />

          {/* زر التحديث */}
          <Button
            label={
              isLoading
                ? "جاري التحديث..."
                : "تحديث"
            }
            type="submit"
            disabled={
              isLoading
            }
            className="bg-main-color w-fit px-20 py-2"
          />

          {/* رسالة النجاح */}
          {successMsg && (
            <p className="text-green-600 font-semibold mt-2">
              {successMsg}
            </p>
          )}

        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;