import React from "react";
import Input from "../../../Input";
import Textarea from "../../../Textarea";
import Select from "../../../Select";
import RadioGroup from "../../../RadioGroup";
import Checkbox from "../../../CheckBox";

const FormPreview = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex items-center justify-center text-gray-500">
        لا يوجد حقول لعرضها في المعاينة.
      </div>
    );
  }

  const renderField = (field) => {
    if (!field) return null;
    
    const requiredMark = field.required ? " *" : "";
    
    // تحويل الـ type إلى حروف صغيرة دائماً لمنع أي مشاكل في التكافؤ
    const fieldType = field.type ? field.type.toLowerCase() : "";

    switch (fieldType) {
   
      case "text":
      case "shorttext":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id || field.name}>
            <Input
              label={`${field.label || "حقل نصي قصير"}${requiredMark}`}
              type="text"
              disabled
            />
          </div>
        );

      case "longtext":
      case "textarea":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id || field.name}>
            <Textarea
              label={`${field.label || "حقل نصي طويل"}${requiredMark}`}
              disabled
              rows={4}
            />
          </div>
        );

      case "number":
      case "integer":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id || field.name}>
            <Input    
              label={`${field.label || "حقل رقمي"}${requiredMark}`}
              type="number"
              disabled
            />
          </div>
        );

      case "select":
  const selectOptions =
    (field.options || field.choices || []).map(
      (opt, index) => ({
        value:
          typeof opt === "string"
            ? opt
            : opt.value ||
              opt.label ||
              `option_${index}`,

        label:
          typeof opt === "string"
            ? opt
            : opt.label ||
              opt.value ||
              `خيار ${index + 1}`,
      })
    );

  return (
    <div
      className="flex flex-col gap-1 mb-4"
      key={field.id || field.name}
    >
      <Select
        label={`${field.label || "قائمة منسدلة"}${requiredMark}`}
        value=""
        placeholder="اختر"
        options={selectOptions}
      />
    </div>
  );
      case "radio":
  return (
    <div
      className="flex flex-col gap-2 mb-4"
      key={field.id || field.name}
    >
      <label className="font-medium text-sm text-gray-700">
        {field.label || "اختيار منفرد"}
        <span className="text-red-500 mr-1">
          {requiredMark}
        </span>
      </label>

      <div className="flex flex-col gap-2 bg-white p-3 rounded border border-gray-100">
        {(field.options ||
          field.choices ||
          []
        ).map((opt, i) => (
          <div
            key={i}
            className="flex items-center gap-2"
          >
            <RadioGroup
              label={
                opt.label || opt
              }
              disabled
            />
          </div>
        ))}
      </div>
    </div>
  );

      case "select_multiple":
  return (
    <div
      className="flex flex-col gap-2 mb-4"
      key={field.id || field.name}
    >
      <label className="font-medium text-sm text-gray-700">
        {field.label ||
          "اختيار متعدد"}

        <span className="text-red-500 mr-1">
          {requiredMark}
        </span>
      </label>

      <div className="flex flex-col gap-2 bg-white p-3 rounded border border-gray-100">
        {(field.options ||
          field.choices ||
          []
        ).map((opt, i) => (
          <div
            key={i}
            className="flex items-center gap-2"
          >
            <Checkbox
              label={
                opt.label || opt
              }
              disabled
            />
          </div>
        ))}
      </div>
    </div>
  );
    case "boolean":
  return (
    <div
      className="flex flex-col gap-2 mb-4"
      key={field.id || field.name}
    >
      <label className="font-medium text-sm text-gray-700">
        {field.label ||
          "نعم / لا"}

        <span className="text-red-500 mr-1">
          {requiredMark}
        </span>
      </label>

      <div className="flex gap-6 bg-white p-3 rounded border border-gray-100">
        <RadioGroup
          label="نعم"
          disabled
        />

        <RadioGroup
          label="لا"
          disabled
        />
      </div>
    </div>
  );
      default:
    
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id || field.name}>
            <Input
              label={`${field.label || "حقل مخصص"}${requiredMark}`}
              type="text"
              disabled
            />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow w-full max-w-4xl mx-auto" dir="rtl">
      <div className="flex flex-col gap-6">
        {steps.map((step, idx) => {
       
          const stepFields = step.questions || step.fields || [];

          return (
            <div key={step.id || idx} className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
              <h3 className="text-sm font-bold text-main-color mb-4 border-b border-gray-200 pb-2">
                الخطوة {idx + 1}: {step.title || "بدون عنوان"}
              </h3>
              
              {stepFields.length === 0 ? (
                <p className="text-xs text-gray-400 italic text-center py-4">
                  لا توجد أسئلة مضافة في هذه الخطوة بعد.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stepFields.map((field) => renderField(field))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormPreview;