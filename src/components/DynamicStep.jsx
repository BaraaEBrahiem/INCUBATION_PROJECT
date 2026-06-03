// src/components/Forms/DynamicStep.js
import React, { useState, useEffect } from "react";
import Input from "./Input";
import Select from "./Select";

const DynamicStep = ({ stepName, fields, form, errors, handleChange, sectors = [] }) => {

  const [imagePreviews, setImagePreviews] = useState({});
  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleFileChange = (fieldName, file) => {
    if (!file) return;

    handleChange(fieldName, file);


    const previewUrl = URL.createObjectURL(file);
    setImagePreviews((prev) => {
      
      if (prev[fieldName]) URL.revokeObjectURL(prev[fieldName]);
      return { ...prev, [fieldName]: previewUrl };
    });
  };

  // دالة لعرض الحقل حسب نوعه
  const renderField = (field) => {
    const fieldName = field.name;
    const value = form[fieldName];
    const error = errors[fieldName];
    const fieldConfig = field;

    if (fieldName === "image" || fieldConfig.type === "file" || fieldConfig.type === "image") {
   
      const currentPreview = imagePreviews[fieldName] || (typeof value === "string" ? value : null);

      return (
        <div key={fieldName} className="space-y-3">
          <Input
            label={fieldConfig.label || "رفع صورة المشروع / الشعار"}
            name={fieldName}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(fieldName, e.target.files[0])}
            error={error}
            required={fieldConfig.required}
            placeholder={fieldConfig.placeholder}
          />
          
          {/* صندوق المعاينة الفوري للصورة بشكل مستقر وجميل */}
          {currentPreview && (
            <div className="relative w-32 h-32 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center group shadow-sm animate-fade-in">
              <img
                src={currentPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                صورة محددة
              </div>
            </div>
          )}
        </div>
      );
    }

    // 2. معالجة باقي الحقول المخصصة والنصية عبر الحالات السابقة
    switch (fieldName) {
      case "sector": {
        return (
          <Select
            key={fieldName}
            label={fieldConfig.label || "القطاع"}
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
      
      case "hasTeam": {
        return (
          <div key={fieldName} className="space-y-2">
            <label className="font-bold block text-gray-700">
              {fieldConfig.label || "هل لديك فريق؟"}
              {fieldConfig.required && <span className="text-red-500 mr-1">*</span>}
            </label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
                <input
                  type="radio"
                  name={fieldName}
                  value="yes"
                  checked={value === "yes"}
                  className="w-4 h-4 accent-main-color"
                  onChange={(e) => handleChange(fieldName, e.target.value)}
                />
                نعم
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
                <input
                  type="radio"
                  name={fieldName}
                  value="no"
                  checked={value === "no"}
                  className="w-4 h-4 accent-main-color"
                  onChange={(e) => handleChange(fieldName, e.target.value)}
                />
                لا
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      }
      
      case "teamMembers":
      case "teamEmails": {
        if (form.hasTeam !== "yes") return null;
        
        const labels = {
          teamMembers: "أعضاء الفريق",
          teamEmails: "البريد الإلكتروني لكل عضو"
        };
        
        const placeholders = {
          teamMembers: "أسماء الأعضاء مفصولة بفواصل",
          teamEmails: "example@email.com, another@email.com"
        };
        
        return (
          <Input
            key={fieldName}
            label={fieldConfig.label || labels[fieldName]}
            name={fieldName}
            value={value || ""}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            error={error}
            placeholder={fieldConfig.placeholder || placeholders[fieldName]}
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
            inputMode={fieldConfig.type === "number" ? "numeric" : undefined}
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