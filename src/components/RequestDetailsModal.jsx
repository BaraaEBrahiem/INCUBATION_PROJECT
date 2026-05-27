import React from "react";
import NavLinkUniversal from "./NavLinkUniversal";

// import { useGetRequestDetailsQuery } from "../../api/endpoints/admin/volunteersOptionsApi.js";

const RequestDetailsModal = ({ isOpen, data: incomingData, onClose }) => {
  if (!isOpen) return null;

  // const { data: apiData, isLoading } = useGetRequestDetailsQuery(incomingData?.id, { skip: !incomingData?.id });

  const mockData = {
    id: incomingData?.id || 1,
    title: "منصة لربط المشاريع الناشئة بالمستشارين",
    skill_required: "UI UX Designer",
    members_needed: "3 متطوعين",
    description: "بناء منصة SaaS لتقديم خدمة مطابقة ذكية تربط الشركات الناشئة التي تحتاج إلى تطوير حلول الذكاء الاصطناعي بالخبراء المستعدين لتقديم خدماتهم.",
    idea: {
      idea_id: 101
    }
  };

  // الاعتماد على البيانات القادمة من الكرت أو الـ API، والعودة للبيانات الثابتة في حال عدم توفرها
  const data = incomingData || mockData;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      {/* الحاوية الرئيسية للمودال */}
      <div 
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-8 relative animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // لمنع إغلاق المودال عند الضغط داخله
        dir="rtl"
      >
        <h3 className="text-center font-bold text-xl mb-8 text-black">تفاصيل الطلب</h3>

        {/* شبكة البيانات - Grid لضبط المحاذاة */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-y-6 items-start text-[15px] bg-gray-100 p-4 rounded-lg">
          
          <span className="font-bold text-black">عنوان الفكرة :</span>
          <span className="text-black">{data.title}</span>

          <span className="font-bold text-black">نوع المهارة المطلوبة :</span>
          <span className="text-black">{data.skill_required}</span>

          <span className="font-bold text-black">عدد المتطوعين المطلوبين :</span>
          <span className="text-black">{data.members_needed}</span>

          <span className="font-bold text-black">شرح مختصر عن الفكرة :</span>
          <p className="text-black leading-relaxed">{data.description}</p>
          
        </div>

        {/* الزر السفلي وتمرير المعرف ديناميكياً لصفحة الاقتراحات */}
        <div className="mt-10 flex justify-center">
          <NavLinkUniversal
            to={`/selectingvolunteer/${data.id}`} 
            label="اقتراح متطوعين"
            className="bg-main-color text-white px-8 py-2.5 rounded-md font-medium text-center hover:bg-main-color/90 transition-colors w-full"
            onClick={onClose} 
          />
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;