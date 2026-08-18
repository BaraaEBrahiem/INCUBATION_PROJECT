import React from "react";
import { useParams } from "react-router-dom";
import WorkshopCard from "../../components/Workshop/WorkshopCard";

// TODO: بعد الربط استخدمي هذا الـ hook
import { useGetWorkshopInfoByIdQuery } from "../../api/endpoints/workshopInfo";

const WorkshopInfoPage = () => {
  const { id } = useParams();

  // TODO: بعد الربط استخدمي هذا السطر بدل البيانات الثابتة
  const { data: workshop, isLoading, error} = useGetWorkshopInfoByIdQuery(id);

  // بيانات ثابتة حالياً (نفس ما هي)

  // TODO: بعد الربط شغلي حالة التحميل والخطأ
   if (isLoading) return <div>جاري التحميل...</div>
   if (error) return <div>حدث خطأ</div>

  if (!workshop) {
    return (
      <div className="bg-white-color min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <p className="text-gray-700 text-lg md:text-xl font-bold">الورشة غير موجودة</p>
        </div>
      </div>
    );
  }
  return (
   <div className="bg-white-color min-h-screen bg-gray-50 p-4 md:p-8 text-right" dir="rtl">
      <div className="container mx-auto max-w-full overflow-x-hidden">
        <h2 className="text-second-color text-xl md:text-2xl font-bold my-4 md:my-6 pr-2"> تفاصيل الورشة
        </h2>
    <div className="w-full flex flex-col gap-4">
         <WorkshopCard workshop={workshop} status={workshop.status} />
     </div>
      </div>
    </div>
  );
};

export default WorkshopInfoPage;