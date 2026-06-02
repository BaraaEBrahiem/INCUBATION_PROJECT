 import React from "react";
import Input from "./Input";
import Select from "./Select";

const FALLBACK_PRODUCT_OPTIONS = [
  { value: "app", label: "تطبيق موبايل" },
  { value: "website", label: "موقع إلكتروني" },
  { value: "device", label: "جهاز / عتاد مادي" },
  { value: "service", label: "خدمة" }
];

const DynamicStep = ({ stepName, fields, form, errors, handleChange, sectors = [] }) => {
  
  const renderField = (field) => {
    const fieldName = field.name; 
    if (!fieldName) return null;

    const value = form[fieldName];
    const error = errors ? errors[fieldName] : "";
    const fieldConfig = field;

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
        const productOptions = fieldConfig.choices && fieldConfig.choices.length > 0
          ? fieldConfig.choices.map(c => ({ value: c.value, label: c.label }))
          : FALLBACK_PRODUCT_OPTIONS;

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
                  checked={value === true || value === "true" || value === "yes"}
                  onChange={() => handleChange(fieldName, true)} 
                />
                نعم
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={fieldName}
                  value="false"
                  checked={value === false || value === "false" || value === "no"}
                  onChange={() => {
                    handleChange(fieldName, false);
                    handleChange("ايميلات اعضاء الفريق", []);
                    handleChange("team_members_names_local", "");
                  }}
                />
                لا
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );
      }
      
      // التعديل المشترك: دعم المفاتيح العربية، إظهار حقل الأسماء محلياً، وطباعة معلومات الـ Case بالكونسول
      case "team_members":
      case "ايميلات اعضاء الفريق": { 
        if (form.team !== true && form.team !== "true" && form.team !== "yes") return null;
        
        // طباعة تأكيدية بالمتصفح لمعرفة أن الـ Case يعمل بشكل صحيح ومثالي

        return (
          <div key={fieldName} className="space-y-4 w-full">
 {/* حقل الأسماء المحلي للعرض بالواجهة (UI) */}
            <Input
              label="أسماء أعضاء الفريق"
              name="team_members_names_local" 
              value={form["team_members_names_local"] || ""}
              onChange={(e) => handleChange("team_members_names_local", e.target.value)}
              error={errors ? errors["team_members_names_local"] : ""}
              placeholder="أسماء الأعضاء مفصولة بفواصل (مثال: أحمد, محمد)"
            />

            {/* حقل الإيميلات المربوط بالسيرفر كـ مصفوفة Array */}
            <Input
              label={fieldConfig.label || "إيميلات أعضاء الفريق"}
              name={fieldName}
              value={Array.isArray(value) ? value.join(", ") : (value || "")}
              onChange={(e) => {
                const val = e.target.value;
                const emailArray = val.split(",").map(email => email.trim()).filter(email => email !== "");
                handleChange(fieldName, emailArray);
              }}
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
                          fieldConfig.type === "number" ? "number" : "text";
        
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
      {stepName && <h2 className="text-xl font-bold text-second-color mb-4">{stepName}</h2>}
      <div className="space-y-4">
        {fields.map(field => renderField(field))}
      </div>
    </div>
  );
};

export default DynamicStep;