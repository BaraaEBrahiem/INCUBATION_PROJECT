import { useEffect } from "react";
// import { useSelector } from "react-redux";
// [API LINKS] استيراد الروابط والـ Hooks من ملف الـ endpoints
// import { useGetDashboardQuery, useGetEvaluationStatusQuery, useGetEvaluationNotesQuery } from "../../api/endpoints/incubationApi";
import Button from "../Button";
import ConsultationRequestBtn from "../ConsultationRequestBtn";

const CommitteeStage = ({ onComplete }) => {
  
  // [API LINK 1] الرابط العام لجلب بيانات الداشبورد (مثل meeting_date)
  // const { data: dashboardData } = useGetDashboardQuery();
  
  // [API LINK 2] الرابط الخاص بحالة التقييم (PENDING, IN_REVIEW, COMPLETED)
  // const { data: evaluationStatus } = useGetEvaluationStatusQuery();

  // [API LINK 3] الرابط الخاص بجلب ملاحظات اللجنة
  // const { data: notesData } = useGetEvaluationNotesQuery(userId);

  // محاكاة للبيانات (استبدلها بالبيانات الحقيقية عند الربط)
  const dashboardData = {
    current_stage: "EVALUATION",
    data: { 
      meeting_date: "2026-05-14T09:15:38Z",
      consultation_request_available: true// الحقل المسؤول عن ظهور الزر من السيرفر
    }
  };

  const evaluationStatus = { status: "COMPLETED" };
  const notesData = [{ note: "البروتايب غير كامل" }, { note: "طور مهاراتك اكثر" }];

  const currentStage = dashboardData?.current_stage;
  const meetingDate = dashboardData?.data?.meeting_date;
  const currentStatus = evaluationStatus?.status;

  // استخراج شرط صلاحية الاستشارة بشكل مستقل
  const canRequestConsultation = dashboardData?.data?.consultation_request_available ?? false;

  // منطق الانتقال للمرحلة التالية (يتم التفعيل عند اكتمال التقييم)
  // useEffect(() => {
  //   if (currentStatus === "COMPLETED") {
  //     onComplete();
  //   }
  // }, [currentStatus, onComplete]);

  return (
    <div className="p-6 rounded-xl space-y-8 min-h-screen bg-white-color">
      <h2 className="text-2xl font-bold text-second-color">تقييم اللجنة ({currentStage})</h2>

      {/* معلومات الحالة */}
      <div className="space-y-3 bg-white p-4 rounded-lg shadow-lg">
        <p><span className="font-bold pl-2">الحالة:</span> 
          {currentStatus === "PENDING" ? "بانتظار التقييم" : 
           currentStatus === "IN_REVIEW" ? "قيد المراجعة" : "تم اكتمال التقييم"}
        </p>
        <p><span className="font-bold pl-2">تاريخ جلسة اللجنة:</span> 
          {meetingDate ? new Date(meetingDate).toLocaleString() : "غير محدد"}
        </p>
          <h3 className="font-bold text-black">ملاحظات اللجنة:</h3>
        {notesData && notesData.length > 0 ? (
          <ul className="list-disc pr-5 space-y-2">
            {notesData.map((item, index) => (
              <li key={index} className="text-black">{item.note}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">لا توجد ملاحظات حالياً.</p>
        )}
      </div>

      {/* عرض ملاحظات اللجنة */}
   
      {/* زر طلب الاستشارة المشروط بالقيمة القادمة من الباك إند */}
      {canRequestConsultation && (
        <div className="flex justify-end">
          <ConsultationRequestBtn />
        </div>
      )}
    </div>
  );
};

export default CommitteeStage;