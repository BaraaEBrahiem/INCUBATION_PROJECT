import React from "react";
import { MdTextFields } from "react-icons/md";
import { LuText } from "react-icons/lu";
import { FaCheckSquare } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { TbNumbers } from "react-icons/tb";

const FieldTypesPanel = ({ addField }) => {

  const fieldTypes = [
    { type: "text", label: "نص قصير", icon: <MdTextFields /> },
    { type: "longText", label: "نص طويل", icon: <LuText /> },
    { type: "select_multiple", label: "اختيار متعدد", icon: <FaCheckSquare /> },
    { type: "select", label: "قائمة منسدلة", icon: <RiFileList3Fill /> },
    {type: "boolean",label: "سؤال نعم / لا",icon: <FaCheckCircle />},
    { type: "number", label: "ادخال رقم", icon: <TbNumbers /> },
  ];

  const staticFields = [
    { static_field: "title", label: "عنوان الفكرة" },
    { static_field: "description", label: "وصف الفكرة" },
    { static_field: "target_audience", label: "الجمهور المستهدف" },
    { static_field: "sector", label: "القطاع المستهدف" },
  ];

  return (
   // تم تغيير الأبعاد الثابتة w-75 h-150 إلى w-full و max-w-sm لمرونة العرض
<div className="w-full lg:w-80 bg-white rounded-lg border border-second-color shadow p-4 flex flex-col gap-4">
  <div>
    <h2 className="text-lg font-bold mb-3 pb-1">أنواع الحقول</h2>
    {/* Grid متجاوب: عمودين دائماً، لكن مع مسافات مريحة */}
    <div className="grid grid-cols-2 gap-3">
      {fieldTypes.map((f) => (
        <button 
          key={f.type} 
          onClick={() => addField(f.type)} 
          className="border border-second-color rounded p-2 flex flex-col items-center gap-1 text-2xl hover:border-teal-700 transition-colors"
        >
          {f.icon} <span className="text-[14px]">{f.label}</span>
        </button>
      ))}
    </div>
  </div>

  <div>
    <h2 className="text-lg font-bold mb-4 pt-5 pb-4">الأسئلة الثابتة</h2>
    <div className="grid grid-cols-2 gap-3">
      {staticFields.map((f) => (
        <button 
          key={f.static_field} 
          onClick={() => addField("text", f)} 
          className="border-2 border-dashed border-second-color rounded p-2 text-center hover:border-teal-600 min-h-[55px] flex items-center justify-center"
        >
          <span className="text-[14px] font-bold text-black">{f.label}</span>
        </button>
      ))}
    </div>
  </div>
</div>  );
};

export default FieldTypesPanel;