import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import logIn from "../../assets/images/logIn.png";
import NavLinkUniversal from "../../components/NavLinkUniversal";
import { useLoginMutation } from "../../api/endpoints/authApi";
import { setCredentials } from "../../redux/authSlice";
import { RoleContext } from "../../Context/RoleContext";
import { showSuccess, showError } from "../../Utils/toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateRoles } = useContext(RoleContext);
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await login({
        email: form.email,
        password: form.password,
      }).unwrap();

      // 1️⃣ طباعة الاستجابة القادمة من السيرفر كاملة لنبحث عن الدور فيها
      console.log("=== 全 API FULL RESPONSE ===", response);

      const accessToken = response.access || response.token || response.accessToken;
      if (!accessToken) throw new Error("لم يتم استلام التوكن من السيرفر");

      const decoded = jwtDecode(accessToken);
      
      // 2️⃣ محاولة استخراج الدور من الـ response أولاً، ثم من التوكن، وإذا لم يوجدا نضع visitor
      let rawRoles = response.roles || 
                     response.role || 
                     response.user?.roles || 
                     response.user?.role || 
                     decoded.roles || 
                     decoded.role || 
                     ["visitor"];

      // إذا كان الدور القادم نصاً واحداً وليس مصفوفة، نحوله لمصفوفة
      if (typeof rawRoles === "string") {
        rawRoles = [rawRoles];
      }

      // تحويل الأدوار إلى أحرف صغيرة لتفادي مشكلة ADMIN و admin
      let normalizedRoles = rawRoles.map(role => 
        typeof role === 'string' ? role.toLowerCase() : role
      );

      console.log("=== 🎯 FINAL ROLES DETECTED ===", normalizedRoles);

      const user = {
        id: decoded.user_id || response.user?.id,
        email: decoded.email || response.user?.email,
        name: decoded.full_name || response.user?.name || decoded.email,
        roles: normalizedRoles,
      };

      // تخزين البيانات في Redux
      dispatch(setCredentials({
        user: user,
        token: accessToken,
        userId: user.id,
      }));

      // تحديث السياق (Context)
      updateRoles(user.roles);

      showSuccess(`مرحباً ${user.name}`);
      
      // التوجيه التلقائي بناءً على الدور المخزن
      if (user.roles.includes("admin")) {
        navigate("/admin-mainpage");
      } else if (user.roles.includes("ideaowner")) {
        navigate("/ideaowner-mainpage");
      } else if (user.roles.includes("volunteer")) {
        navigate("/volunteer-mainpage");
      } else {
        navigate("/visitor-mainpage");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error?.data?.message || error?.data?.detail || "فشل تسجيل الدخول";
      showError(errorMsg);
      setErrors({ general: errorMsg });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-sans">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-second-color mb-8 text-center">تسجيل الدخول</h1>
          {errors.general && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{errors.general}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input label="البريد الالكتروني" placeholder="البريد الالكتروني" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
            <div className="relative">
              <Input label="كلمة المرور" placeholder="كلمة المرور" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
            </div>
            <NavLinkUniversal label="هل نسيت كلمة المرور؟" to="/forgetpassword" className="font-bold text-third-color mt-2 hover:underline text-right" />
            <Button label={isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"} type="submit" disabled={isLoading} className="flex justify-center max-w-[300px] bg-main-color mt-10 mx-auto w-full" />
            <div className="flex items-center my-8">
              <div className="flex-grow border-t border-second-color"></div>
              <span className="px-4 font-bold text-black text-sm">او عن طريق</span>
              <div className="flex-grow border-t border-second-color"></div>
            </div>
            <div className="relative">
              <a href="http://127.0.0.1:8000/api/auth/google" className="flex justify-center font-bold border border-second-color px-10 py-2 rounded mt-5 mx-auto hover:bg-gray-50">تسجيل الدخول باستخدام Google</a>
              <FcGoogle className="absolute w-5 h-5 ml-6 top-1/5 left-1/2 right-1/10 translate-y-1/8" />
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-main-color items-center justify-center">
        <div className="relative w-3/4"><img src={logIn} alt="Character with laptop" className="w-full h-full" /></div>
      </div>
    </div>
  );
};

export default LoginPage;