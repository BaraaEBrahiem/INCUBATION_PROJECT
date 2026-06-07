import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import newpassword from "../../assets/images/newPassword.png";
import { useNewPasswordMutation } from "../../api/endpoints/authApi";

const NewPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, { isLoading }] = useNewPasswordMutation();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // جلب email و otp من الـ state (اللي جاي من صفحة التحقق)
  const { email, otp } = location.state || {};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // مسح الخطأ الخاص بالحقل عند التعديل
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.password) newErrors.password = "كلمة المرور مطلوبة";
    if (form.password.length < 8)
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    if (!/[A-Z]/.test(form.password))
      newErrors.password = "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل";
    if (!/[0-9]/.test(form.password))
      newErrors.password = "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل";

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // التحقق من وجود email و otp
    if (!email || !otp) {
      setApiError("بيانات غير مكتملة. يرجى العودة إلى صفحة التحقق");
      return;
    }

    try {
      
      await newPassword({
  email,
  otp,
  password: form.password,
  confirm_password: form.confirmPassword,
}).unwrap();

      // تم بنجاح، التوجيه إلى صفحة تسجيل الدخول
      navigate("/login", { 
        state: { message: "تم تغيير كلمة المرور بنجاح. يرجى تسجيل الدخول" } 
      });
      
    } catch (error) {
      console.error("Reset password error:", error);
      setApiError(error?.data?.message || "فشل تغيير كلمة المرور. حاول مرة أخرى");
    }
  };

 return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-second-color mb-10 text-center">
            إدخال كلمة مرور جديدة
          </h1>

          {/* عرض خطأ API */}
          {apiError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {apiError}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                label="إدخال كلمة مرور جديدة"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                inputClassName="pl-10"
              />
            </div>

            <div className="relative">
              <Input
                label="تأكيد كلمة المرور الجديدة"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                inputClassName="pl-10"
              />
            </div>
            <Button
              label={isLoading ? "جاري التغيير..." : "التالي"}
              type="submit"
              disabled={isLoading}
              className="flex justify-center max-w-[300px] bg-main-color mt-10 mx-auto w-full"
            />
          </form>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-main-color relative items-end justify-center">
        <img src={newpassword} alt="Character" className="h-full w-full" />
      </div>
    </div>
  );
};

export default NewPasswordPage;
