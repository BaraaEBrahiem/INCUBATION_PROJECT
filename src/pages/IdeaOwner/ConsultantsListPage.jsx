import React from "react";
import { useParams } from "react-router-dom";
import ConsultantsList from "../../components/ConsultantsList";
import avatarDefault from "../../assets/images/avatar.jpg";
// import { useGetConsultantsBySpecialtyQuery } from "../../api/endpoints/consultantsApi";

const ConsultantsListPage = () => {
  const { categoryId } = useParams();

  // TODO: بعد الربط هذا السطر بدل البيانات الثابتة
  // const { data: consultants, isLoading, error, refetch } = useGetConsultantsBySpecialtyQuery(categoryId);

  // مصفوفة مطابقة 100% لهيكلية الباكيند الظاهرة في صور الـ Postman الأخيرة
  const consultantsData = [
    {
      id: 2,
      full_name: "hasan hasan",
      avatar: null, // راجع null كما بالصورة تماماً
      primary_skills: "backend", // التصفية تتم بناءً على هذا الحقل
      availability: [
        {
          day: "SUNDAY",
          start_time: "07:00:00",
          end_time: "10:00:00"
        },
        {
          day: "WEDNESDAY",
          start_time: "08:00:00",
          end_time: "11:00:00"
        }
      ]
    },
    {
      id: 1,
      full_name: "hala ahmad",
      avatar: null,
      primary_skills: "uiux",
      availability: [
        {
          day: "MONDAY",
          start_time: "09:00:00",
          end_time: "12:00:00"
        }
      ]
    }
  ];

  // تصفية المستشارين بناءً على الحقل الصحيح المطابق للاختبارات (primary_skills)
  const filteredConsultants = consultantsData.filter(
    (c) => c.primary_skills === categoryId
  );

  return (
    <div className="container py-6">
      <h2 className="text-xl font-bold mb-4 text-second-color">
        المستشارون المتاحون في اختصاص: {categoryId}
      </h2>

      {filteredConsultants.length > 0 ? (
        <ConsultantsList consultants={filteredConsultants} />
      ) : (
        <p className="text-gray-500 font-semibold">
          لا يوجد مستشارون لهذا الاختصاص حالياً.
        </p>
      )}
    </div>
  );
};

export default ConsultantsListPage;