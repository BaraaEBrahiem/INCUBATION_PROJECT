import React, { useState } from "react";
import Button from "../../../Button";

const OptionsEditor = ({ field, updateField }) => {
  const [newOption, setNewOption] = useState("");

  const addOption = () => {
    if (!newOption.trim()) return;

    const updatedOptions = [...field.options, newOption.trim()];
    updateField(field.id, { options: updatedOptions });
    setNewOption("");
  };

  const deleteOption = (index) => {
    const updatedOptions = field.options.filter((_, i) => i !== index);
    updateField(field.id, { options: updatedOptions });
  };

  const updateOptionText = (index, value) => {
    const updatedOptions = [...field.options];
    updatedOptions[index] = value;
    updateField(field.id, { options: updatedOptions });
  };

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-bold mb-3">خيارات الحقل</h3>

      {/* إضافة خيار جديد */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="أدخل خياراً جديداً"
          className="flex-1 border border-second-color rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
        />

        <Button
          label="إضافة"
          onClick={addOption}
          className="bg-main-color"
        />
      </div>

      {/* عرض الخيارات الحالية */}
      <div className="flex flex-col gap-2">
        {field.options.map((opt, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-gray-50"
          >
            <input
              type="text"
              value={opt}
              onChange={(e) => updateOptionText(index, e.target.value)}
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />

            <button
              type="button"
              onClick={() => deleteOption(index)}
              className="text-red-500 text-xs font-semibold"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsEditor;
