import React from "react";
import ConsultationRequestBtn from "../ConsultationRequestBtn";

const CommitteeStage = ({ data }) => {

  const meetingDateRaw = data?.meeting_date;
  const serverStatus = data?.status; // PENDING, IN_REVIEW, COMPLETED
  const isConsultationAvailable = data?.consultation_request_available;

  const formatDateTime = (isoString) => {
    if (!isoString) return "لم يحدد بعد";
    const dateObj = new Date(isoString);
    
    const date = dateObj.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // تنسيق الوقت (مثال: 02:00 م)
    const time = dateObj.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${date} الساعة ${time}`;
  };

  const statusMapping = {
    "PENDING": {
      label: "بانتظار التقييم والمقابلة",
      colorClass: "bg-amber-100 text-amber-800 border-amber-200",
      note: "تم تحديد موعد الجلسة التقيمية الخاصة بمشروعك، يرجى الالتزام بالحضور في الوقت المحدد والمثول أمام اللجنة."
    },
    "IN_REVIEW": {
      label: "قيد المراجعة والتدقيق",
      colorClass: "bg-blue-100 text-blue-800 border-blue-200",
      note: "تمت المقابلة، والطلب الآن قيد الدراسة والمداولة من قِبل أعضاء لجنة التحكيم لإصدار النتيجة النهائية."
    },
    "COMPLETED": {
      label: "تم التقييم واكتمال المراجعة",
      colorClass: "bg-green-100 text-green-800 border-green-200",
      note: "انتهت اللجنة من تقييم مشروعك بالكامل. سيتم نقلك تلقائياً للمرحلة القادمة فور تحديث حالة المشروع من الإدارة."
    }
  };

  const currentStatusConfig = statusMapping[serverStatus] || {
    label: "قيد المعالجة",
    colorClass: "bg-gray-100 text-gray-700 border-gray-200",
    note: "جاري تحميل وتحديث حالة التقييم..."
  };

  return (
    <div className="p-4 md:p-6 rounded-xl space-y-8 min-h-[70vh] bg-white-color">
      {/* عنوان المرحلة */}
      <h2 className="text-2xl font-bold text-second-color">
        تقييم لجنة التحكيم والمقابلات
      </h2>

      {/* بطاقة معلومات الحالة والتفاصيل */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl border border-gray-100 space-y-5">
        
        {/* الحالة */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="font-bold text-gray-700 min-w-[140px]">حالة التقييم الحالية:</span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${currentStatusConfig.colorClass} w-fit`}>
            {currentStatusConfig.label}
          </span>
        </div>

        {/* موعد الجلسة */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t border-gray-50 pt-3">
          <span className="font-bold text-gray-700 min-w-[140px]">تاريخ ووقت الجلسة:</span>
          <p className="text-gray-900 font-medium">
            {formatDateTime(meetingDateRaw)}
          </p>
        </div>

        {/* الملاحظة التوجيهية الديناميكية */}
        <div className="flex flex-col gap-2 border-t border-gray-50 pt-3">
          <span className="font-bold text-gray-700">توجيهات وإرشادات:</span>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
            {currentStatusConfig.note}
          </p>
        </div>
      </div>

      <div className="space-y-3 max-w-3xl">
        <h4 className="font-bold text-gray-700 text-sm">هل تحتاج مساعدة للتحضير؟</h4>
        <div className="flex">
          {/* الزر يتم تفعيله أو إلغاؤه بناءً على القيمة المرسلة من الـ Provider بالباك اند */}
          <ConsultationRequestBtn disabled={!isConsultationAvailable} />
        </div>
      </div>
    </div>
  );
};

export default CommitteeStage;