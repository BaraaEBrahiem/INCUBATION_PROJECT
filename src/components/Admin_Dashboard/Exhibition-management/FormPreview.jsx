import React from "react";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Checkbox from "../../CheckBox";

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
      // =========================
      // SHORT TEXT
      // =========================
      case "short_text":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              <span className="text-red-500 mr-1">
                {requiredMark}
              </span>
            </label>

            <Input
              type="text"
              disabled
              placeholder="إجابة نصية قصيرة"
            />
          </div>
        );

      // =========================
      // LONG TEXT
      // =========================
      case "long_text":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              <span className="text-red-500 mr-1">
                {requiredMark}
              </span>
            </label>

            <Textarea
              disabled
              rows={4}
              placeholder="إجابة نصية طويلة"
            />
          </div>
        );

      // =========================
      // NUMBER
      // =========================
      case "number":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              <span className="text-red-500 mr-1">
                {requiredMark}
              </span>
            </label>

            <Input
              type="number"
              disabled
              placeholder="أدخل رقم"
            />
          </div>
        );

      // =========================
      // SINGLE CHOICE
      // =========================
      case "single_choice":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              <span className="text-red-500 mr-1">
                {requiredMark}
              </span>
            </label>

            <select
              disabled
              className="w-full border border-second-color rounded-md px-3 py-3 bg-white outline-none"
            >
              <option value="">
                اختر
              </option>

              {field.options?.map((opt, i) => {
                const label =
                  typeof opt === "string"
                    ? opt
                    : opt.label;

                return (
                  <option
                    key={i}
                    value={label}
                  >
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        );

      // =========================
      // MULTIPLE CHOICE
      // =========================
      case "multiple_choice":
        return (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              <span className="text-red-500 mr-1">
                {requiredMark}
              </span>
            </label>

            <div className="flex flex-col gap-3 bg-gray-50 rounded-lg p-3">
              {field.options?.map((opt, i) => (
                <Checkbox
                  key={i}
                  label={opt.label || opt}
                />
              ))}
            </div>
          </div>
        );

      // =========================
      // YES / NO BOOLEAN
      // =========================
      case "yes_no":
        return (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              <span className="text-red-500 mr-1">
                {requiredMark}
              </span>
            </label>

            <div className="flex gap-8 bg-gray-50 rounded-lg p-3">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  disabled
                  name={field.id}
                />
                نعم
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  disabled
                  name={field.id}
                />
                لا
              </label>
            </div>
          </div>
        );

      // =========================
      // IMAGE
      // =========================
      case "image":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              <span className="text-red-500 mr-1">
                {requiredMark}
              </span>
            </label>

            <input
              type="file"
              disabled
              accept="image/*"
              className="w-full border border-second-color rounded-md px-3 py-2 bg-white cursor-not-allowed"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-main-color mb-8">
          معاينة نموذج المعرض
        </h2>

        <div className="space-y-7">
          {fields.map((field) => (
            <div
              key={field.id}
              className="border border-gray-100 rounded-xl p-5 bg-white"
            >
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;