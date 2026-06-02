import { useEffect } from "react";
// import { useSelector } from "react-redux";
import ConsultationRequestBtn from "../ConsultationRequestBtn";
import AlertBox from "../AlertBox";
// [API LINKS] استيراد الـ Hooks
// import { useGetDashboardQuery, useGetIncubationOverviewQuery, useGetLatestNotesQuery } from "../../api/endpoints/incubationApi";

const FollowupStage = ({ onComplete }) => {
  
  // [API LINK 1] الرابط العام لجلب الداشبورد (لجلب current_stage و صلاحيات الأزرار)
  // const { data: dashboardData } = useGetDashboardQuery();
  
  // [API LINK 2] الرابط الخاص الأول لجلب بيانات المتابعة (next_meeting_date)
  // const { data: overviewData } = useGetIncubationOverviewQuery(ideaId);

  // [API LINK 3] الرابط الخاص الثاني لجلب الملاحظات (تأتي كمصفوفة مباشرة في الجذر)
  // const { data: notesData } = useGetLatestNotesQuery(userId);

  // =========================================================================
  // 🧪 محاكاة البيانات بناءً على الروابط المنفصلة في الصور الثلاثة
  // =========================================================================
  const dashboardData = {
    current_stage: "INCUBATION",
    data: {
      next_meeting_date: "2026-05-15T12:00:00Z",
      can_request_consultation: true, // الحقل المسؤول عن إظهار الزر من رابط الداشبورد
    }
  };

  // مصفوفة الملاحظات منفصلة في الجذر تماماً كما تأتي من رابط latest-notes
  const notesData = [
    { notes: "ملاحظة حسن", submitted_at: "2026-05-14T06:54:44.268562Z" },
    { notes: "ملاحظة حلا", submitted_at: "2026-05-14T06:55:57.858224Z" }
  ];
  // =========================================================================

  // استخراج البيانات المباشرة
  const currentStage = dashboardData?.current_stage;
  const stageData = dashboardData?.data; 
  const nextCommitteeDate = stageData?.next_meeting_date;

  // التحقق من صلاحية ظهور زر الاستشارة من كائن الـ data بالداشبورد
  const canRequestConsultation = stageData?.can_request_consultation ?? false;

  return (
    <div className="p-6 space-y-8 min-h-screen bg-white-color">
      {/* عنوان المرحلة */}
      <h2 className="text-2xl font-bold text-second-color">
        الاحتضان والمتابعة ({currentStage})
      </h2>

      {/* تاريخ اللجنة القادمة */}
      <p className="font-bold">
        تاريخ جلسة اللجنة القادمة: 
        <span className="text-main-color mr-2"> 
          {nextCommitteeDate ? new Date(nextCommitteeDate).toLocaleDateString() : "لم يتم تحديدها بعد"}
        </span>
      </p>

      {/* تنبيه */}
      <AlertBox message="عدم معالجة الملاحظات المطلوبة قد يؤثر على استمرار المشروع في الحاضنة خلال المراجعات القادمة." />

      {/* التقييمات والملاحظات - بقيت على حالها بدون أي تغيير */}
      <div>
        <h3 className="text-xl font-bold text-second-color mb-3">
          التقييمات والملاحظات
        </h3>

        {(!notesData || notesData.length === 0) ? (
          <p className="font-bold text-green-600">🎉 لا توجد ملاحظات حالياً</p>
        ) : (
          <ul className="space-y-3">
            {notesData.map((item, index) => (
              <li key={index} className="bg-white p-3 rounded-lg leading-relaxed shadow-sm border-r-4 border-second-color">
                <p>{item.notes}</p>
                <span className="text-xs text-gray-400">{new Date(item.submitted_at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* زر طلب الاستشارة يظهر فقط عندما تكون القيمة true */}
      {canRequestConsultation && (
        <div className="flex justify-end">
          <ConsultationRequestBtn />
        </div>
      )}
    </div>
  );
};

export default FollowupStage;