import React from "react";
import { MdTextFields } from "react-icons/md";
import { LuText } from "react-icons/lu";
import { FaCheckSquare } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { TbNumbers } from "react-icons/tb";
const FieldTypesPanel = ({ addField }) => {
  const fieldTypes = [
  {
    type: "short_text",
    label: "نص قصير",
    icon: <MdTextFields />
  },

  {
    type: "long_text",
    label: "نص طويل",
    icon: <LuText />
  },

  {
    type: "multiple_choice",
    label: "اختيار متعدد",
    icon: <FaCheckSquare />
  },

  {
    type: "single_choice",
    label: "قائمة منسدلة",
    icon: <RiFileList3Fill />
  },

  {
    type: "yes_no",
    label: "سؤال نعم / لا",
    icon: <FaCheckCircle />
  },

  {
    type: "number",
    label: "ادخال رقم",
    icon: <TbNumbers />
  },

  // الجديد
  {
    type: "image",
    label: "رفع صورة",
    icon: "🖼️"
  }
];

  return (
    <div className="w-64 bg-white rounded-lg shadow p-4 flex flex-col gap-3">
      <h2 className="text-base font-bold mb-2">أنواع الحقول</h2>

      <div className="grid grid-cols-2 gap-6">
        {fieldTypes.map((field) => (
          <button
            key={field.type}
            onClick={() => addField(field.type)}
            className="bg-white border-2 border-second-color rounded-md px-8 py-4 flex flex-col items-center gap-2 text-2xl"
          >
            {field.icon}
            {field.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldTypesPanel;
