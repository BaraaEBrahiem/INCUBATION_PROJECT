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
    const requiredMark = field.required ? "※" : "";
    switch (field.type) {
      case "shortText":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id}>
            <label className="font-medium text-sm">
              <span className="text-red-500 text-2xl">{requiredMark}</span>
            </label>
            <Input
              label={field.label}
              type="text"
              disabled
            />
          </div>
        );

      case "longText":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id}>
            <label className="font-medium text-sm">
              <span className="text-red-500">{requiredMark}</span>
            </label>
            <Textarea
              label={field.label}
              disabled
              rows={4}
            />
          </div>
        );

      case "number":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id}>
            <label className="font-medium text-sm">
              <span className="text-red-500">{requiredMark}</span>
            </label>
            <Input    
              label={field.label}
              type="number"
              disabled
            />
          </div>
        );

      case "select":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id}>
            <label className="font-medium text-sm">
              <span className="text-red-500">{requiredMark}</span>
            </label>
            <Select
              label={field.label}
              disabled
              options={field.options || []}
            />
          </div>
        );

      case "radio":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id}>
            <label className="font-medium text-sm">
              {field.label}
              <span className="text-red-500">{requiredMark}</span>
            </label>
            <div className="flex flex-col gap-2">
              {(field.options || ["نعم", "لا"]).map((opt, i) => (
                <label key={i} className="flex items-center gap-2 text-sm">
                  <RadioGroup label={opt.label || opt} disabled />
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex flex-col gap-1 mb-4" key={field.id}>
            <label className="font-medium text-sm">
                {field.label}
              <span className="text-red-500">{requiredMark}</span>
            </label>
            <div className="flex flex-col gap-2">
              {field.options?.map((opt, i) => (
                <label key={i} className="flex items-center gap-2 text-sm">
                  <Checkbox label={opt.label || opt} disabled />
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow w-full max-w-4xl mx-auto">
    
      <div className="flex flex-col gap-6">
        {steps.map((step, idx) => (
          <div key={step.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
 <h3 className="text-sm font-bold text-main-color mb-4">
              الخطوة {idx + 1}: {step.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.questions.map((field) => renderField(field))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;