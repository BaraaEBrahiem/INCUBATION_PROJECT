import React from "react";
import QuestionProperties from "../../Exhibition-management/QuestionProperties";
import OptionsEditor from "./OptionsEditor";

const STATIC_LABELS = {
  title: "عنوان الفكرة/المشروع",
  description: "وصف الفكرة",
  target_audience: "الفئة المستهدفة",
  sector: "القطاع"
};

const FormBuilderCanvas = ({ fields, updateField, deleteField }) => {
  if (!fields || fields.length === 0) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex items-center justify-center border-t-2 border-main-color">
        لا يوجد أسئلة بعد، قم بإضافة حقل من قائمة أنواع الحقول أو الأسئلة الثابتة.
      </div>
    );
  }

  const getFieldTypeLabel = (field) => {
    const isStatic = field.source === "STATIC" || field.is_static === true;
    if (isStatic) {
      const staticName = STATIC_LABELS[field.static_field] || "حقل ثابت";
      return `حقل ثابت (${staticName})`;
    }

    switch (field.type) {
      case "text":
      case "shortText":
        return "نص قصير";
      case "longText":
        return "نص طويل";
      case "radio":
        return "اختيار (Radio)";
      case "select":
        return "قائمة منسدلة";
      case "boolean":
        return "سؤال نعم / لا";
      case "number":
        return "سؤال رقمي / رقم";
      case "checkbox":
      case "select_multiple":
        return "اختيار متعدد";
      default:
        return "حقل";
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow p-6 border-t-4 border-main-color">
      <h2 className="text-base font-bold mb-4">نموذج التسجيل</h2>

      <div className="flex flex-col gap-4">
        {fields.map((field) => {
          const isStatic = field.source === "STATIC" || field.is_static === true;
          const displayLabel = isStatic ? (STATIC_LABELS[field.static_field] || "حقل ثابت من النظام") : (field.label || "");

          return (
            <div
              key={field.id}
              className={`border rounded-lg p-4 ${
                isStatic ? "bg-teal-50/50 border-teal-200" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={displayLabel}
                    disabled={isStatic}
                    onChange={(e) =>
                      updateField(field.id, { label: e.target.value })
                    }
                    placeholder="اكتب عنوان السؤال"
                    className="w-full border border-second-color rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-teal-700 disabled:bg-gray-100"
                  />
                </div>

                <div className="text-xs text-gray-500 mt-2 min-w-[110px] text-right">
                  {getFieldTypeLabel(field)}
                </div>

                <button
                  type="button"
                  onClick={() => deleteField(field.id)}
                  className="text-red-500 text-sm font-semibold mt-1"
                >
                  حذف
                </button>
              </div>

              <QuestionProperties field={field} updateField={updateField} />

              {["select", "select_multiple"].includes(field.type) && !isStatic && (
  <OptionsEditor field={field} updateField={updateField} />
)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormBuilderCanvas;