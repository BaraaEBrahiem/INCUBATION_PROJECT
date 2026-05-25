import React from "react";
import NavLinkUniversal from "./NavLinkUniversal";

const RequestDetailsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // بيانات ستاتيك للتجربة
  const data = {
    title: "عنوان الفكرة",
    skill: "نوع المهارة المطلوبة",
    count: "عدد المتطوعين المطلوبين",
    desc: "شرح مختصر عن الفكرة"
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center " onClick={onClose}>
      {/* الحاوية الرئيسية للمودال */}
      <div 
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-8 relative animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // لمنع إغلاق المودال عند الضغط داخله
        dir="rtl"
      >
        <h3 className="text-center font-bold text-xl mb-8 text-black">تفاصيل الطلب</h3>

        {/* شبكة البيانات - Grid لتقليل عدد الـ Divs وضبط المحاذاة */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-y-6 items-start text-[15px] bg-gray-100 p-3 rounded-sm">
          
          <span className="font-bold text-black">عنوان الفكرة :</span>
          <span className="text-black">{data.title}</span>

          <span className="font-bold text-black">نوع المهارة المطلوبة :</span>
          <span className="text-black">{data.skill}</span>

          <span className="font-bold text-black">عدد المتطوعين المطلوبين :</span>
          <span className="text-black ">{data.count}</span>

          <span className="font-bold text-black">شرح مختصر عن الفكرة :</span>
          <p className="text-black leading-relaxed">{data.desc}</p>
          
        </div>

        {/* الزر السفلي */}
       <div className="mt-10 flex justify-center">
  <NavLinkUniversal
    to="/selectingvolunteer"
    label="اقتراح"
    // أضف كلاسات التنسيق الخاصة بالزر هنا
    className="bg-main-color text-white w-400 py-2.5 rounded-md font-medium text-center"
    onClick={onClose} // إذا كنت تريد إغلاق المودال عند الانتقال
  />
</div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;