import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import forgetPassword from "../../assets/images/forgetPassword.png";
import { useForgotPasswordMutation } from "../../api/endpoints/authApi";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validate = () => {
    if (!email.trim()) {
      setError("البريد الإلكتروني مطلوب");
      return false;
    }
    // التحقق من صيغة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("البريد الإلكتروني غير صحيح");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await forgotPassword({ email }).unwrap();
      
      // التعديل 1: قراءة 'detail' من الـ API وتصحيح السنتكس بإضافة ||
      const msg = response?.detail || "تم إرسال رمز التحقق إلى بريدك الإلكتروني";
      setSuccessMessage(msg);
      setApiError("");
      
      // التوجيه إلى صفحة إدخال الرمز بعد ثانية ونصف لقراءة الرسالة
      setTimeout(() => {
        // نمرر الإيميل عبر الـ state لكي نستخدمه في خطوة التحقق (الخطوة الثانية والثالثة)
        navigate("/verification", { state: { email: email } });
      }, 1500);
      
    } catch (error) {
      console.error("Forgot password error:", error);
      // التعديل 2: قراءة الخطأ من detail وتصحيح السنتكس بإضافة ||
      const errorMsg = error?.data?.detail || error?.data?.message ||  "فشل إرسال رمز التحقق. تأكد من البريد الإلكتروني";
      setApiError(errorMsg);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex h-screen w-full font-sans antialiased" dir="ltr">
      <div className="hidden md:flex w-1/2 bg-main-color items-center justify-center p-12">
        <img src={forgetPassword} alt="Illustration" className="w-full h-full" />
      </div>

      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md" dir="rtl">
          <h1 className="text-3xl font-bold text-second-color mb-12 text-center">
            هل نسيت كلمة المرور؟
          </h1>

          {/* عرض رسالة النجاح */}
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
              {successMessage}
            </div>
          )}

          {/* عرض خطأ API */}
          {apiError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {apiError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              type="email"
              label="البريد الالكتروني"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
                if (apiError) setApiError("");
              }}
              error={error}
            />

            <Button
              label={isLoading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
              type="submit"
              disabled={isLoading}
              className="flex justify-center max-w-[300px] bg-main-color mt-10 mx-auto w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;