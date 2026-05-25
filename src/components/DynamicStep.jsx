 // src/components/Forms/DynamicStep.js
import React from "react";
import Input from "./Input";
import Select from "./Select";

const DynamicStep = ({ stepName, fields, form, errors, handleChange, sectors = [] }) => {
  
  // دالة لعرض الحقل حسب نوعه
  const renderField = (field) => {
    const fieldName = field.key; 
    const value = form[fieldName];
    const error = errors[fieldName];
    const fieldConfig = field;

    // حقول خاصة (تختلف عن الـ Input العادي)
    switch (fieldName) {
      case "sector": {
        return (
          <Select
            key={fieldName}
            label={fieldConfig.label || "القطاع المستهدف"}
            name={fieldName}
            value={value || ""}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            error={error}
            options={sectors}
            placeholder={fieldConfig.placeholder || "اختر القطاع"}
            required={fieldConfig.required}
          />
        );
      }
      
      case "product_type": {
        const productOptions = fieldConfig.choices?.map(c => ({ value: c.value, label: c.label })) || [];
        return (
          <Select
            key={fieldName}
            label={fieldConfig.label || "نوع المنتج"}
            name={fieldName}
            value={value || ""}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            error={error}
            options={productOptions}
            placeholder={fieldConfig.placeholder || "اختر نوع المنتج"}
            required={fieldConfig.required}
          />
        );
      }
      
      case "team": {
        return (
          <div key={fieldName} className="space-y-2">
            <label className="font-bold block">
              {fieldConfig.label || "هل لديك فريق؟"}
              {fieldConfig.required && <span className="text-red-500 mr-1">*</span>}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={fieldName}
                  value="true"
                  // التعديل هنا: يفحص الحالتين (المحلي والباكيند) لضمان بقاء الزر مفعلاً
                  checked={value === true || value === "true" || value === "yes"}
                  onChange={(e) => handleChange(fieldName, true)} // نمرر true مباشرة
                />
                نعم
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={fieldName}
                  value="false"
                  checked={value === false ||  value === "false" ||  value === "no"}
                  onChange={(e) => handleChange(fieldName, false)} // نمرر false مباشرة
                />
                لا
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );
      }
      
      // تفكيك الحقل الواحد إلى حقلين (أعضاء الفريق + إيميلات أعضاء الفريق)
      case "اعضاء الفريق": {
        // التعديل هنا: إظهار الحقول إذا كانت القيمة true أو "yes"
        if (form.team !== true && form.team !== "yes" && form.team !== "true") return null;
        
        return (
          <div key={fieldName} className="space-y-4 w-full">
            {/* الحقل الأول: أسماء الأعضاء */}
            <Input
              label="أعضاء الفريق"
              name="teamMembersName" // يحفظ في الـ state تحت هذا الاسم
              value={form["teamMembersName"] || ""}
              onChange={(e) => handleChange("teamMembersName", e.target.value)}
              error={errors["teamMembersName"]}
              placeholder="أسماء الأعضاء مفصولة بفواصل"
              required={fieldConfig.required}
            />

            {/* الحقل الثاني: إيميلات الأعضاء */}
 <Input
              label={fieldConfig.label || "ايميلات اعضاء الفريق"}
              name={fieldName} // يحفظ في الـ state تحت المفتاح الأساسي القادم من الـ API
              value={value || ""}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              error={error}
              placeholder={fieldConfig.placeholder || "example@email.com, another@email.com"}
              required={fieldConfig.required}
            />
          </div>
        );
      }
      
      case "image": {
        return (
          <Input
            key={fieldName}
            label={fieldConfig.label || "رفع صورة"}
            name={fieldName}
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(fieldName, e.target.files[0])}
            error={error}
            required={fieldConfig.required}
          />
        );
      }
      
      default: {
        const inputType = fieldConfig.type === "email" ? "email" : 
                          fieldConfig.type === "number" ? { type: "number", inputMode: "numeric" } : "text";
        
        return (
          <Input
            key={fieldName}
            label={fieldConfig.label || fieldName}
            name={fieldName}
            type={inputType}
            value={value || ""}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            error={error}
            placeholder={fieldConfig.placeholder}
            required={fieldConfig.required}
          />
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-second-color mb-4">{stepName}</h2>
      <div className="space-y-4">
        {fields.map(field => renderField(field))}
      </div>
    </div>
  );
};

export default DynamicStep;