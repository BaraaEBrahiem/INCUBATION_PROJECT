// src/pages/Admin_Dashboard/AddSessionPage.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { showSuccess, showError } from "../../Utils/toast";
import {useAddSessionMutation } from "../../api/endpoints/admin/sessionsApi";
import { useGetVolunteersQuery } from "../../api/endpoints/admin/volunteersOptionsApi";

const AddSessionPage = () => {
  
  const params = useParams();
  const seasonId = params.seasonId || params.season_id || params.id;
  const navigate = useNavigate();
  const { data: volunteersData, isLoading: isLoadingVolunteers, error: volunteersError } = useGetVolunteersQuery();
  const [addSession, { isLoading: isSubmitting }] = useAddSessionMutation();

  const [session, setSession] = useState({
    title: "",
    trainer: "", 
    tasks: "",
    location: "",
    start_time: "",
    end_time: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
 
  // تحويل بيانات المدربين من الباك إلى الشكل المطلوب للـ Select
  let volunteers = [];
  if (volunteersData?.volunteers) {
    volunteers = volunteersData.volunteers.map(v => ({ value: v.user_id, label: v.name }));
  } else if (Array.isArray(volunteersData)) {
    volunteers = volunteersData.map(v => ({ value: v.user_id, label: v.name }));
  }

  const handleChange = (field, value) => {
    setSession({ ...session, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };
  
  const validate = () => {
  const newErrors = {};

  if (!session.title.trim()) {
    newErrors.title = "عنوان الجلسة مطلوب";
  }

  if (!session.trainer) {
    newErrors.trainer = "يرجى اختيار المدرب";
  }

  if (!session.location.trim()) {
    newErrors.location = "موقع المعسكر مطلوب";
  }

  if (!session.start_time) {
    newErrors.start_time = "وقت بدء الجلسة مطلوب";
  }

  if (!session.end_time) {
    newErrors.end_time = "وقت انتهاء الجلسة مطلوب";
  }

  if (!session.date) {
    newErrors.date = "تاريخ الجلسة مطلوب";
  }

  // التحقق من أن النهاية بعد البداية
  if (
    session.start_time &&
    session.end_time &&
    session.end_time <= session.start_time
  ) {
    newErrors.end_time =
      "يجب أن يكون وقت انتهاء الجلسة بعد وقت البدء";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async () => {
  if (!validate()) return;

  if (!seasonId) {
    showError("لا يمكن تحديد الموسم الحالي");
    return;
  }

  try {
    await addSession({
      sessionData: session,
      season_id: seasonId,
    }).unwrap();

    showSuccess(
      "تم إضافة الجلسة بنجاح. سيتم إرسال الإشعارات للمشاركين."
    );

    navigate(-1);

  } catch (err) {
    console.error("Create session error:", err);

    const backendErrors = err?.data || {};

    // أخطاء الحقول القادمة من Backend
    const newErrors = {};

    Object.keys(backendErrors).forEach((field) => {
      const value = backendErrors[field];

      if (Array.isArray(value)) {
        newErrors[field] = value[0];
      } else if (typeof value === "string") {
        newErrors[field] = value;
      }
    });

    // وضع أخطاء الحقول داخل الـ state
    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    // استخراج رسالة واضحة للـ Toast
    let errorMessage = "حدث خطأ في إضافة الجلسة";

    if (backendErrors.detail) {
      errorMessage = backendErrors.detail;
    } 
    else if (backendErrors.non_field_errors?.length) {
      errorMessage = backendErrors.non_field_errors[0];
    }
    else {
      const firstError = Object.values(backendErrors)[0];

      if (Array.isArray(firstError)) {
        errorMessage = firstError[0];
      } 
      else if (typeof firstError === "string") {
        errorMessage = firstError;
      }
    }

    showError(errorMessage);
  }


    try {
      await addSession({ sessionData: session, season_id: seasonId }).unwrap();
      showSuccess("تم إضافة الجلسة بنجاح. سيتم إرسال الإشعارات للمشاركين.");
      navigate(-1);
    } catch (err) {
      console.error(err);
      showError(err?.data?.details || "حدث خطأ في إضافة الجلسة");
    }
  };

  // حالات التحميل أو الخطأ للمدربين
  if (isLoadingVolunteers) {
    return (
      <div className="container px-6 py-20 text-center">
        <p className="text-gray-500">جاري تحميل قائمة المدربين...</p>
      </div>
    );
  }

  if (volunteersError) {
    return (
      <div className="container px-6 py-20 text-center">
        <p className="text-red-500">حدث خطأ في تحميل المدربين. يرجى تحديث الصفحة.</p>
      </div>
    );
  }

  return (
    <div className="container px-6 py-20">
      <h2 className="text-2xl text-second-color font-bold mb-8">إضافة جلسة</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
        <Input
          label="عنوان الجلسة"
          value={session.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
        />
        <Select
          label="تعيين المدرب"
          value={session.trainer}
          onChange={(e) =>
  handleChange(
    "trainer",
    Number(e.target.value)
  )
}
          options={volunteers}
          placeholder="اختر المدرب"
          error={errors.trainer}
          disabled={isLoadingVolunteers}
        />
        <Input
          label="المهام المطلوبة"
          value={session.tasks}
          onChange={(e) => handleChange("tasks", e.target.value)}
        />
        <Input
          label="موقع المعسكر"
          value={session.location}
          onChange={(e) => handleChange("location", e.target.value)}
          error={errors.location}
        />
        <Input
          label="وقت بدء الجلسة"
          type="time"
          value={session.start_time}
          onChange={(e) => handleChange("start_time", e.target.value)}
          error={errors.start_time}
        />
        <Input
          label="وقت انتهاء الجلسة"
          type="time"
          value={session.end_time}
          onChange={(e) => handleChange("end_time", e.target.value)}
          error={errors.end_time}
        />
        <Input
          label="تاريخ الجلسة"
          type="date"
          value={session.date}
          onChange={(e) => handleChange("date", e.target.value)}
          error={errors.date}
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button
          label={isSubmitting ? "جاري الإرسال..." : "إرسال الإشعار بالموعد"}
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-main-color w-50"
        />
      </div>
    </div>
  );
};

export default AddSessionPage;