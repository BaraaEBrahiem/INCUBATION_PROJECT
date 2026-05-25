 import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Entercode from "../../assets/images/PIN.png";
import { useVerifyOtpMutation } from "../../api/endpoints/authApi";

const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");

  // جلب email من الـ state (اللي جاي من صفحة forgot password) مع تصحيح السنتكس لـ ||
  const { email } = location.state || {};

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // مسح الأخطاء عند البدء بالكتابة
    if (error) setError("");
    if (apiError) setApiError("");

    if (value && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousElementSibling) {
      e.target.previousElementSibling.focus();
    }
  };

  const handlePaste = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من إدخال جميع الأرقام
    if (otp.some((digit) => digit === "")) {
      setError("الرجاء إدخال الرمز الكامل");
      return;
    }

    // التحقق من وجود email
    if (!email) {
      setApiError("بيانات غير مكتملة. يرجى العودة إلى صفحة استعادة كلمة المرور");
      return;
    }

    const code = otp.join("");

    try {
      // إرسال الإيميل والـ otp بالشكل المتوقع للباك إند تماماً
      await verifyOtp({
        email: email,
        otp: code,
      }).unwrap();

      // تم التحقق بنجاح، التوجيه إلى صفحة إدخال كلمة المرور الجديدة مع تمرير الإيميل والرمز
      navigate("/new-password", { 
        state: { email: email, otp: code } 
      });
      
    } catch (error) {
      console.error("OTP verification error:", error);
      // التعديل هنا: تصحيح السنتكس وقراءة حقل detail ليتطابق مع رد الباك إند
      const errorMsg = error?.data?.detail || error?.data?.message || "الرمز غير صحيح أو منتهي الصلاحية. حاول مرة أخرى";
      setApiError(errorMsg);
    }
  };

  return (
    <div className="flex h-screen w-full font-sans antialiased bg-white" dir="ltr">
      <div className="hidden md:flex w-1/2 bg-main-color items-center justify-center p-12">
        <img src={Entercode} alt="OTP Illustration" className="h-full w-full" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24" dir="rtl">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-3xl font-bold text-second-color mb-16">ادخال الرمز</h1>

          <form onSubmit={handleSubmit}>
            {/* جعلنا اتجاه الـ OTP كـ ltr لكي تكتب الأرقام بالتتابع الصحيح من اليسار لليمين */}
            <div className="flex justify-between gap-3 mb-6" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  className="w-16 h-16 border-2 border-second-color rounded-xl text-center text-2xl font-bold text-third-color focus:border-[#00a8a8] focus:outline-none"
                />
              ))}
            </div>

            {/* عرض أخطاء التحقق */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {apiError && <p className="text-red-500 text-sm mb-2">{apiError}</p>}
 <Button
              label={isLoading ? "جاري التحقق..." : "تأكيد"}
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

export default VerificationPage;