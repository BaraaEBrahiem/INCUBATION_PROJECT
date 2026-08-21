import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import signUp from "../../assets/images/signUp.png";
import NavLinkUniversal from "../../components/NavLinkUniversal";
import { RoleContext } from "../../Context/RoleContext";
import {
  useRegisterMutation,
  useLoginMutation,
} from "../../api/endpoints/authApi";

import { showSuccess, showError } from "../../Utils/toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";


const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateRoles } = useContext(RoleContext);

  // =========================
  // API
  // =========================

  const [register, { isLoading: isRegistering }] =
    useRegisterMutation();

  const [login, { isLoading: isLoggingIn }] =
    useLoginMutation();

  const isLoading = isRegistering || isLoggingIn;


  // =========================
  // Form
  // =========================

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});


  // =========================
  // Handle Change
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // إزالة خطأ الحقل عند بدء التعديل
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };


  // =========================
  // Validation
  // =========================

  const validate = () => {
    const newErrors = {};

    const fullName = form.full_name.trim();
    const email = form.email.trim();
    const password = form.password;


    // ---------------------------------
    // الاسم
    // ---------------------------------

    if (!fullName) {
      newErrors.full_name = "الاسم مطلوب";
    } else if (fullName.length < 2) {
      newErrors.full_name = "الاسم يجب أن يكون حرفين على الأقل";
    } else if (fullName.length > 100) {
      newErrors.full_name = "الاسم طويل جداً";
    }


    // ---------------------------------
    // Email
    // ---------------------------------

    if (!email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (/\s/.test(email)) {
      newErrors.email =
        "البريد الإلكتروني لا يجب أن يحتوي على مسافات";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      newErrors.email =
        "يرجى إدخال بريد إلكتروني صحيح";
    }


    // ---------------------------------
    // Password
    // ---------------------------------

    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (password.length < 8) {
      newErrors.password =
        "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    } else if (password.length > 128) {
      newErrors.password =
        "كلمة المرور يجب ألا تتجاوز 128 حرفاً";
    } else if (/\s/.test(password)) {
      newErrors.password =
        "كلمة المرور لا يجب أن تحتوي على مسافات";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password =
        "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل";
    } 


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // =========================
  // Extract API Error
  // =========================

  const getErrorMessage = (error) => {

    if (!error) {
      return "حدث خطأ غير متوقع";
    }


    // ---------------------------------
    // RTK Query / Django
    // ---------------------------------

    const data = error?.data;


    if (typeof data === "string") {
      return data;
    }


    if (data?.message) {
      return data.message;
    }


    if (data?.detail) {
      return data.detail;
    }


    // ---------------------------------
    // Email
    // ---------------------------------

    if (data?.email) {
      return Array.isArray(data.email)
        ? data.email[0]
        : data.email;
    }


    // ---------------------------------
    // Full Name
    // ---------------------------------

    if (data?.full_name) {
      return Array.isArray(data.full_name)
        ? data.full_name[0]
        : data.full_name;
    }


    // ---------------------------------
    // Password
    // ---------------------------------

    if (data?.password) {
      return Array.isArray(data.password)
        ? data.password[0]
        : data.password;
    }


    // ---------------------------------
    // Non Field Errors
    // ---------------------------------

    if (data?.non_field_errors) {
      return Array.isArray(data.non_field_errors)
        ? data.non_field_errors[0]
        : data.non_field_errors;
    }


    // ---------------------------------
    // أي خطأ Django آخر
    // ---------------------------------

    if (data && typeof data === "object") {

      const firstKey = Object.keys(data)[0];

      if (firstKey) {

        const firstError = data[firstKey];

        if (Array.isArray(firstError)) {
          return firstError[0];
        }

        if (typeof firstError === "string") {
          return firstError;
        }
      }
    }


    // ---------------------------------
    // JavaScript Error
    // ---------------------------------

    if (error?.message) {
      return error.message;
    }


    return "فشل إنشاء الحساب. حاول مرة أخرى";
  };


  // =========================
  // Handle Submit
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();


    // منع الضغط أثناء الطلب
    if (isLoading) {
      return;
    }


    // Validation
    if (!validate()) {
      return;
    }


    const fullName = form.full_name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;


    try {

      // ==========================================
      // 1. إنشاء الحساب
      // ==========================================

      const registerResponse = await register({
        full_name: fullName,
        email: email,
        password: password,
      }).unwrap();


      console.log(
        "REGISTER RESPONSE:",
        registerResponse
      );


      // ==========================================
      // 2. محاولة استخراج Token
      // ==========================================

      let accessToken =
        registerResponse?.access ||
        registerResponse?.token ||
        registerResponse?.accessToken ||
        null;


      let refreshToken =
        registerResponse?.refresh ||
        registerResponse?.refreshToken ||
        null;


      let userData =
        registerResponse?.user ||
        registerResponse;


      // ==========================================
      // 3. إذا Register لم يرجع Token
      //    نعمل Login تلقائياً
      // ==========================================

      if (!accessToken) {

        console.log(
          "Register succeeded without token."
        );

        console.log(
          "Attempting automatic login..."
        );


        const loginResponse = await login({
          email,
          password,
        }).unwrap();


        console.log(
          "AUTO LOGIN RESPONSE:",
          loginResponse
        );


        accessToken =
          loginResponse?.access ||
          loginResponse?.token ||
          loginResponse?.accessToken ||
          null;


        refreshToken =
          loginResponse?.refresh ||
          loginResponse?.refreshToken ||
          null;


        userData =
          loginResponse?.user ||
          loginResponse;
      }


      // ==========================================
      // 4. حماية من عدم وجود Token
      // ==========================================

      if (!accessToken) {

        throw new Error(
          "تم إنشاء الحساب بنجاح، لكن تعذر تسجيل الدخول تلقائياً."
        );
      }


      // ==========================================
      // 5. استخراج Roles
      // ==========================================

      let assignedRoles =
        userData?.roles ||
        registerResponse?.roles ||
        [];


      // إذا رجع Role واحد كسلسلة
      if (!Array.isArray(assignedRoles)) {
        assignedRoles = [assignedRoles];
      }


      assignedRoles = assignedRoles
        .map((role) =>
          typeof role === "string"
            ? role.toLowerCase().trim()
            : role
        )
        .filter(Boolean);


      // المستخدم الجديد بدون Role = Visitor
      if (assignedRoles.length === 0) {
        assignedRoles = ["visitor"];
      }


      // ==========================================
      // 6. بناء User
      // ==========================================

      const localUser = {

        id:
          userData?.id ||
          registerResponse?.id ||
          null,

        email:
          userData?.email ||
          registerResponse?.email ||
          email,

        name:
          userData?.full_name ||
          registerResponse?.full_name ||
          fullName,

        roles: assignedRoles,
      };


      // ==========================================
      // 7. التأكد من وجود User ID
      // ==========================================

      if (!localUser.id) {

        console.warn(
          "User ID was not returned by server."
        );
      }


      // ==========================================
      // 8. حفظ Authentication في Redux
      // ==========================================

      dispatch(
        setCredentials({

          user: localUser,

          token: accessToken,

          refreshToken: refreshToken,

          userId: localUser.id,

          roles: assignedRoles,
        })
      );
      updateRoles(assignedRoles);
      


      console.log(
        "FINAL USER:",
        localUser
      );

      console.log(
        "FINAL ROLES:",
        assignedRoles
      );


      // ==========================================
      // 9. Success
      // ==========================================

      showSuccess(
        `مرحباً ${localUser.name}، تم إنشاء حسابك بنجاح!`
      );


      // ==========================================
      // 10. الانتقال إلى Visitor
      // ==========================================

      navigate(
        "/visitor-mainpage",
        {
          replace: true,
        }
      );


    } catch (error) {

      console.error(
        "Signup error:",
        error
      );


      const errorMsg =
        getErrorMessage(error);


      // Toast
      showError(errorMsg);


      // Error داخل الصفحة
      setErrors({
        general: errorMsg,
      });
    }
  };


  // =========================
  // JSX
  // =========================

  return (

    <div
      className="flex h-screen w-full overflow-hidden font-sans"
      dir="rtl"
    >

      {/* =========================
          Form Side
      ========================= */}

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12">

        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold text-second-color mb-10 text-center">
            إنشاء حساب
          </h1>


          {/* General Error */}

          {errors.general && (

            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">

              {errors.general}

            </div>

          )}


          <form
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* =========================
                Full Name
            ========================= */}

            <Input
              label="الاسم"
              placeholder="أدخل اسمك الكامل"
              name="full_name"
              type="text"
              value={form.full_name}
              onChange={handleChange}
              error={errors.full_name}
            />


            {/* =========================
                Email
            ========================= */}

            <Input
              label="البريد الإلكتروني"
              placeholder="أدخل بريدك الإلكتروني"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />


            {/* =========================
                Password
            ========================= */}

            <div className="relative">

              <Input
                label="كلمة المرور"
                placeholder="أدخل كلمة المرور"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
              />

            </div>


            {/* =========================
                Submit
            ========================= */}

            <Button
              label={
                isRegistering
                  ? "جاري إنشاء الحساب..."
                  : isLoggingIn
                    ? "جاري تسجيل الدخول..."
                    : "التالي"
              }
              type="submit"
              disabled={isLoading}
              className="flex justify-center max-w-[300px] bg-main-color mt-10 mx-auto w-full text-white rounded-xl py-3 font-bold block"
            />

          </form>


          {/* =========================
              Login Link
          ========================= */}

          <p className="mt-8 text-center text-sm">

            <span className="text-third-color">
              هل لديك حساب؟
            </span>

            <NavLinkUniversal
              label="تسجيل الدخول"
              to="/login"
              className="text-main-color hover:underline font-bold"
            />

          </p>

        </div>

      </div>


      {/* =========================
          Image Side
      ========================= */}

      <div className="hidden md:flex md:w-1/2 bg-main-color relative items-end justify-center">

        <div className="absolute right-0 bottom-0 w-0 h-0 border-t-[100vh] border-t-transparent border-r-[15vw] border-r-black/10"></div>

        <img
          src={signUp}
          alt="Character"
          className="h-full object-cover"
        />

      </div>

    </div>
  );
};


export default SignupPage;