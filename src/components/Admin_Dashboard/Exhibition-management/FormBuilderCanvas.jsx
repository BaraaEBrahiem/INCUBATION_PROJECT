import React from "react";
import QuestionProperties from "./QuestionProperties";
import OptionsEditor from "./OptionsEditor";

const FormBuilderCanvas = ({ fields, updateField, deleteField }) => {
  if (!fields || fields.length === 0) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex items-center justify-center border-t-2 border-main-color">
        لا يوجد أسئلة بعد، قم بإضافة حقل من قائمة أنواع الحقول.
      </div>
    );
  }

  const getFieldTypeLabel = (type) => {
    switch (type) {
      case "shortText":
        return "نص قصير";
      case "longText":
        return "نص طويل";
      case "radio":
        return "اختيار (Radio)";
      case "select":
        return "قائمة منسدلة";
      case "number":
        return "سؤال رقمي / رقم";
      case "checkbox":
        return "اختيار متعدد (Checkbox)";
      default:
        return "حقل";
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow p-6 border-t-4 border-main-color">
      <h2 className="text-base font-bold mb-4">نموذج التسجيل</h2>

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            {/* السطر العلوي: عنوان السؤال + نوعه + حذف */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, { label: e.target.value })
                  }
                  placeholder="اكتب عنوان السؤال"
                  className="w-full border border-second-color rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div className="text-xs text-gray-500 mt-2 min-w-[110px] text-right">
                {getFieldTypeLabel(field.type)}
              </div>

              <button
                type="button"
                onClick={() => deleteField(field.id)}
                className="text-red-500 text-sm font-semibold mt-1"
              >
                حذف
              </button>
            </div>

            {/* خصائص السؤال */}
            <QuestionProperties field={field} updateField={updateField} />

            {/* خيارات الحقول (select – radio – checkbox) */}
            {["select", "radio", "checkbox"].includes(field.type) && (
              <OptionsEditor field={field} updateField={updateField} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBuilderCanvas;
