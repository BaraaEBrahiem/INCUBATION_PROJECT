import React from "react";
import Input from "../Input";
import Select from "../Select";

const PRODUCT_TYPE_OPTIONS = [
  { value: "app", label: "تطبيق موبايل" },
  { value: "website", label: "موقع إلكتروني" },
  { value: "device", label: "جهاز / عتاد مادي" },
  { value: "service", label: "خدمة" }
];

const StepExtraDetails = ({ form, errors, handleChange }) => {
  const handleSelectChange = (e) => {
    const value = e && e.target ? e.target.value : e;
    handleChange("product_type", value);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg mb-4">تفاصيل إضافية</h3>

      <Select
        label="نوع المنتج"
        placeholder="اختر نوع المنتج"
        name="product_type"
        value={form.product_type || ""}
        onChange={handleSelectChange}
        options={PRODUCT_TYPE_OPTIONS}
        error={errors.product_type}
        className="w-1/2"
      />

      <Input
        label="الجمهور المستهدف"
        placeholder="من هم المستخدمون المستهدفون؟"
        name="target_audience"
        value={form.target_audience || ""}
        onChange={(e) => handleChange("target_audience", e.target.value)}
        error={errors.target_audience}
        className="w-1/2"
      />

      <Input
        label="المشكلة التي يحلها المنتج"
        placeholder="وصف لا تتجاوز 30 كلمة"
        name="problem"
        value={form.problem || ""}
        onChange={(e) => handleChange("problem", e.target.value)}
        error={errors.problem}
        className="w-1/2"
      />

      <Input
        label="المدة المتوقعة لانجاز المشروع بالأشهر"
        placeholder="مثال: 3 أشهر"
        name="duration"
        value={form.duration || ""}
        onChange={(e) => handleChange("duration", e.target.value)}
        error={errors.duration}
        className="w-1/2"
      />
    </div>
  );
};

export default StepExtraDetails;