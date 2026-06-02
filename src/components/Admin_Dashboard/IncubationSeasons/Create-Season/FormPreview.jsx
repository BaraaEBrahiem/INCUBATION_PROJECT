import React from "react";
import Input from "../../../Input";
import Textarea from "../../../Textarea";
import Select from "../../../Select";
import RadioGroup from "../../../RadioGroup";
import Checkbox from "../../../CheckBox";
const FormPreview = ({ fields }) => {
  if (!fields || fields.length === 0) {
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
          <div className="flex flex-col gap-1 mb-4">
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
          <div className="flex flex-col gap-1 mb-4">
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
          <div className="flex flex-col gap-1 mb-4">
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
    <div className="flex flex-col gap-2 mb-4">
      <label className="font-medium text-sm">
        {field.label}
        <span className="text-red-500">
          {requiredMark}
        </span>
      </label>

      <select
        disabled
        className="w-full border border-second-color rounded-md px-3 py-2 bg-white"
      >
        <option value="">
          اختر
        </option>

        {field.options?.map(
          (opt, i) => (
            <option
              key={i}
              value={opt}
            >
              {opt}
            </option>
          )
        )}
      </select>
    </div>
  );

case "radio":
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="font-medium text-sm">
        {field.label}
        <span className="text-red-500">
          {requiredMark}
        </span>
      </label>

      {field.options?.map(
        (opt, i) => (
          <label
            key={i}
            className="flex items-center gap-2 text-sm"
          >
            <input
              type="radio"
              disabled
              name={field.id}
            />
            {opt}
          </label>
        )
      )}
    </div>
  );

case "checkbox":
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="font-medium text-sm">
        {field.label}
        <span className="text-red-500">
          {requiredMark}
        </span>
      </label>

      <div className="flex flex-col gap-2">
        {field.options?.map(
          (opt, i) => (
            <Checkbox
              key={i}
              label={opt}
              disabled
            />
          )
        )}
      </div>
    </div>
  );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-white-color h-min-screen w-full">
      <h2 className="text-base font-bold mb-4">نموذج تسجيل الموسم الصيفي</h2>

      <div className="flex flex-col">
        {fields.map((field) => (
          <div key={field.id}>{renderField(field)}</div>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
