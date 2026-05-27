import React from "react";

const QuestionProperties = ({ field, updateField }) => {
  return (
    <div className="flex items-center gap-4 mt-2">

      {/* مطلوب / اختياري */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => updateField(field.id, { required: e.target.checked })}
        />
        <span className="text-sm font-medium">الحقل مطلوب</span>
      </label>

    </div>
  );
};

export default QuestionProperties;
