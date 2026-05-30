import React from "react";
import NavLinkUniversal from "./NavLinkUniversal";

import { useGetRequestDetailsQuery } from "../api/endpoints/admin/volunteersOptionsApi";

const RequestDetailsModal = ({
  isOpen,
  data: incomingData,
  onClose,
}) => {
  console.log("incomingData", incomingData);
  console.log("request id", incomingData?.id);

  const {
    data: apiData,
    isLoading,
  } = useGetRequestDetailsQuery(
    incomingData?.id,
    {
      skip: !incomingData?.id || !isOpen,
    }
  );

  if (!isOpen) return null;

  const data = apiData || incomingData;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* الحاوية الرئيسية للمودال */}
      <div
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-8 relative animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <h3 className="text-center font-bold text-xl mb-8 text-black">
          تفاصيل الطلب
        </h3>

        {/* شبكة البيانات - Grid لضبط المحاذاة */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-y-6 items-start text-[15px] bg-gray-100 p-4 rounded-lg">

          <span className="font-bold text-black">
            عنوان الفكرة :
          </span>
          <span className="text-black">
            {isLoading ? "جاري التحميل..." : data?.title}
          </span>

          <span className="font-bold text-black">
            نوع المهارة المطلوبة :
          </span>
          <span className="text-black">
  {data?.skill_required
    ? Object.values(data.skill_required).join(" - ")
    : "-"}
</span>

          <span className="font-bold text-black">
            عدد المتطوعين المطلوبين :
          </span>
          <span className="text-black">
            {isLoading
              ? "جاري التحميل..."
              : data?.members_needed}
          </span>

          <span className="font-bold text-black">
            شرح مختصر عن الفكرة :
          </span>
          <p className="text-black leading-relaxed">
            {isLoading
              ? "جاري التحميل..."
              : data?.description}
          </p>

        </div>

        {/* الزر السفلي وتمرير المعرف ديناميكياً لصفحة الاقتراحات */}
        <div className="mt-10 flex justify-center">
          <NavLinkUniversal
            to={`/selectingvolunteer/${data?.id}`}
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