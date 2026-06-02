import React from "react";
import Input from "../Input";

const StepPersonalInfo = ({ form, errors, handleChange }) => {
  return (
    <>
      <h3 className="font-bold text-lg">المعلومات الشخصية</h3>

      <Input
        label="الاسم"
        placeholder="ما هو اسمك؟"
        name="name"
        value={form.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        className="w-1/2"
      />

      <Input
        label="رقم الهاتف"
        placeholder="ما هو رقم هاتفك؟"
        type="tel"
        name="phone"
        value={form.phone || ""}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={errors.phone}
        className="w-1/2 text-right"
      />

      <Input
        label="المحافظة"
        placeholder="ما هي محافظتك؟"
        name="recidence" // مطابقة لإملاء السيرفر الحرفي المتواجد بالمسودة
        value={form.recidence || ""}
        onChange={(e) => handleChange("recidence", e.target.value)}
        error={errors.recidence}
        className="w-1/2"
      />
    </>
  );
};

export default StepPersonalInfo;