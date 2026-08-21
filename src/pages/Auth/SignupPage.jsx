import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../../components/Input";
import Button from "../../components/Button";
import signUp from "../../assets/images/signUp.png";
import NavLinkUniversal from "../../components/NavLinkUniversal";

import { RoleContext } from "../../Context/RoleContext";
import { useRegisterMutation } from "../../api/endpoints/authApi";

import { showSuccess, showError } from "../../Utils/toast";
import { setCredentials } from "../../redux/authSlice";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { updateRoles } = useContext(RoleContext);

  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // =====================================================
  // Handle Change
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  // =====================================================
  // Validation
  // =====================================================

  const validate = () => {
    const newErrors = {};

    const fullName = form.full_name.trim();
    const email = form.email.trim();
    const password = form.password;

    // ===================================================
    // Full Name
    // ===================================================

    if (!fullName) {
      newErrors.full_name = "الاسم مطلوب";
    } else if (fullName.length < 2) {
      newErrors.full_name = "الاسم يجب أن يكون حرفين على الأقل";
    } else if (fullName.length > 100) {
      newErrors.full_name = "الاسم طويل جداً";
    }

    // ===================================================
    // Email
    // ===================================================

    if (!email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (/\s/.test(email)) {
      newErrors.email =
        "البريد الإلكتروني لا يجب أن يحتوي على مسافات";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {
      newErrors.email =
        "يرجى إدخال بريد إلكتروني صحيح";
    }

    // ===================================================
    // Password
    // ===================================================

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

  // =====================================================
  // Extract Error Message
  // =====================================================

  const getErrorMessage = (error) => {
    if (!error) {
      return "حدث خطأ غير متوقع";
    }

    const data = error?.data;

    // -----------------------------------------------
    // String
    // -----------------------------------------------

    if (typeof data === "string") {
      return data;
    }

    // -----------------------------------------------
    // Message
    // -----------------------------------------------

    if (data?.message) {
      return Array.isArray(data.message)
        ? data.message[0]
        : data.message;
    }

    // -----------------------------------------------
    // Detail
    // -----------------------------------------------

    if (data?.detail) {
      return Array.isArray(data.detail)
        ? data.detail[0]
        : data.detail;
    }

    // -----------------------------------------------
    // Email
    // -----------------------------------------------

    if (data?.email) {
      return Array.isArray(data.email)
        ? data.email[0]
        : data.email;
    }

    // -----------------------------------------------
    // Full Name
    // -----------------------------------------------

    if (data?.full_name) {
      return Array.isArray(data.full_name)
        ? data.full_name[0]
        : data.full_name;
    }

    // -----------------------------------------------
    // Password
    // -----------------------------------------------

    if (data?.password) {
      return Array.isArray(data.password)
        ? data.password[0]
        : data.password;
    }

    // -----------------------------------------------
    // Non Field Errors
    // -----------------------------------------------

    if (data?.non_field_errors) {
      return Array.isArray(data.non_field_errors)
        ? data.non_field_errors[0]
        : data.non_field_errors;
    }

    // -----------------------------------------------
    // Any Django Error
    // -----------------------------------------------

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

    // -----------------------------------------------
    // JS Error
    // -----------------------------------------------

    if (error?.message) {
      return error.message;
    }

    return "فشل إنشاء الحساب. حاول مرة أخرى";
  };

  // =====================================================
  // Normalize Roles
  // =====================================================

  const normalizeRoles = (roles) => {
    if (!Array.isArray(roles)) {
      roles = roles ? [roles] : [];
    }

    return roles
      .filter(Boolean)
      .map((role) => {
        if (typeof role === "string") {
          return role.toLowerCase().trim();
        }

        return role;
      })
      .filter(Boolean);
  };

  // =====================================================
  // Submit
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // منع الضغط المتكرر
    if (isLoading) {
      return;
    }

    // Validation
    const isValid = validate();

    if (!isValid) {
      return;
    }

    const fullName = form.full_name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    try {
      // =================================================
      // 1. Register
      // =================================================

      const response = await register({
        full_name: fullName,
        email,
        password,
      }).unwrap();

      console.log("=================================");
      console.log("REGISTER SUCCESS");
      console.log("REGISTER RESPONSE:", response);
      console.log("=================================");

      // =================================================
      // 2. Tokens
      // =================================================

      const accessToken = response?.access;
      const refreshToken = response?.refresh;

      if (!accessToken) {
        throw new Error(
          "تم إنشاء الحساب ولكن لم يتم استلام Access Token"
        );
      }

      // =================================================
      // 3. User
      // =================================================

      const serverUser = response?.user || {};

      const userId =
        serverUser?.id ??
        response?.id ??
        null;

      const userEmail =
        serverUser?.email ||
        response?.email ||
        email;

      const userName =
        serverUser?.full_name ||
        response?.full_name ||
        fullName;

      // =================================================
      // 4. Roles
      // =================================================

      const backendRoles = normalizeRoles(
        response?.roles ?? serverUser?.roles
      );

      /*
       * مهم جداً:
       *
       * الـ backend عند إنشاء المستخدم الجديد ممكن يرجع:
       *
       * roles: []
       *
       * لذلك نستخدم visitor للواجهة فقط.
       *
       * هذا لا يعني أننا غيّرنا Role في Django.
       */

      const frontendRoles =
        backendRoles.length > 0
          ? backendRoles
          : ["visitor"];

      console.log("BACKEND ROLES:", backendRoles);
      console.log("FRONTEND ROLES:", frontendRoles);

      // =================================================
      // 5. Build User
      // =================================================

      const user = {
        id: userId,
        email: userEmail,
        name: userName,
        roles: frontendRoles,
      };

      console.log("FINAL USER:", user);

      // =================================================
      // 6. Save Authentication
      // =================================================

      dispatch(
        setCredentials({
          user,
          token: accessToken,
          refreshToken: refreshToken || null,
          userId,
          roles: frontendRoles,
        })
      );

      // =================================================
      // 7. Update Context
      // =================================================

      updateRoles(frontendRoles);

      // =================================================
      // 8. Verify LocalStorage
      // =================================================

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      console.log(
        "ROLES SAVED:",
        localStorage.getItem("roles")
      );

      console.log(
        "USER SAVED:",
        localStorage.getItem("user")
      );

      // =================================================
      // 9. Success
      // =================================================

      showSuccess(
        `مرحباً ${user.name}، تم إنشاء حسابك بنجاح!`
      );

      // =================================================
      // 10. Navigate
      // =================================================

      navigate("/visitor-mainpage", {
        replace: true,
      });

    } catch (error) {
      console.error("=================================");
      console.error("REGISTER ERROR");
      console.error(error);
      console.error("=================================");

      const errorMessage = getErrorMessage(error);

      showError(errorMessage);

      setErrors({
        general: errorMessage,
      });
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="flex h-screen w-full overflow-hidden font-sans"
      dir="rtl"
    >
      {/* =================================================
          FORM
      ================================================= */}

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

            {/* =================================================
                NAME
            ================================================= */}

            <Input
              label="الاسم"
              placeholder="أدخل اسمك الكامل"
              name="full_name"
              type="text"
              value={form.full_name}
              onChange={handleChange}
              error={errors.full_name}
            />

            {/* =================================================
                EMAIL
            ================================================= */}

            <Input
              label="البريد الإلكتروني"
              placeholder="أدخل بريدك الإلكتروني"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            {/* =================================================
                PASSWORD
            ================================================= */}

            <Input
              label="كلمة المرور"
              placeholder="أدخل كلمة المرور"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            {/* =================================================
                SUBMIT
            ================================================= */}

            <Button
              label={
                isLoading
                  ? "جاري إنشاء الحساب..."
                  : "إنشاء الحساب"
              }
              type="submit"
              disabled={isLoading}
              className="flex justify-center max-w-[300px] bg-main-color mt-10 mx-auto w-full text-white rounded-xl py-3 font-bold"
            />

          </form>

          {/* =================================================
              LOGIN LINK
          ================================================= */}

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

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="hidden md:flex md:w-1/2 bg-main-color relative items-end justify-center">

        <div
          className="
            absolute
            right-0
            bottom-0
            w-0
            h-0
            border-t-[100vh]
            border-t-transparent
            border-r-[15vw]
            border-r-black/10
          "
        />

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