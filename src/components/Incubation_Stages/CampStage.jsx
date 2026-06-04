import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import AlertBox from "../AlertBox";
import { useRequestAbsenceMutation } from "../../api/endpoints/dashboardApi"

const CampStage = ({ data, onComplete }) => {
  const [absenceReason, setAbsenceReason] = useState("");
  const [absenceError, setAbsenceError] = useState("");
  const [absenceSuccess, setAbsenceSuccess] = useState("");
  const [requestAbsence, { isLoading: isRequestingAbsence }] = useRequestAbsenceMutation();
  const nextSession = data?.next_session;
  const sessions = data?.sessions || [];
  const isAbsenceEnabled = data?.absence_request_enabled;
  const handleAbsenceRequest = async () => {
    if (!absenceReason.trim()) {
      setAbsenceError("الرجاء إدخال سبب الغياب");
      return;
    }

    setAbsenceError("");
    setAbsenceSuccess("");

    try {
  
      await requestAbsence({ reason: absenceReason.trim() }).unwrap();
      
      setAbsenceSuccess("تم إرسال طلب الغياب بنجاح");
      setAbsenceReason("");
      
      if (onComplete) onComplete();
      
      setTimeout(() => setAbsenceSuccess(""), 4000);
    } catch (err) {
      console.error("Error requesting absence:", err);
      setAbsenceError(
        err?.data?.detail ||
        err?.data?.message ||
        Object.values(err?.data || {})?.[0]?.[0] ||
        "حدث خطأ في إرسال طلب الغياب"
        );
    }
  };

  return (
    <div className="md:p-6 space-y-8 min-h-screen overflow-x-hidden bg-white-color">
      
      {/* رسالة التنبيه */}
      <div className="w-full">
        <AlertBox message="تأكد من حضور الجلسات بنسبة 75% وعدم تأخير تسليم المهام المطلوبة لتجنب التأثير على استمرارك في الحاضنة." />
      </div>
      {nextSession ? (
        <div className="bg-white p-5 rounded-lg shadow-lg space-y-3 border border-r-4 border-r-main-color max-w-2xl">
          <h3 className="font-bold text-lg text-second-color border-b pb-2">تفاصيل الجلسة القادمة</h3>
          <p><span className="font-bold text-gray-700">العنوان:</span> {nextSession.title}</p>
          <p><span className="font-bold text-gray-700">التاريخ:</span> {nextSession.date || "غير محدد بعد"}</p>
          <p><span className="font-bold text-gray-700">الوقت:</span> {nextSession.time_range || "غير محدد"}</p>
          <p><span className="font-bold text-gray-700">الموقع:</span> {nextSession.location || "أونلاين / غير محدد"}</p>
          <p><span className="font-bold text-gray-700">المهام المطلوبة:</span> {nextSession.tasks || "لا يوجد مهام حالية"}</p>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-gray-600 shadow-sm border max-w-2xl">
          لا توجد جلسات قادمة مجدولة حالياً في المعسكر التدريبي.
        </div>
      )}

      {/* مكوّن طلب الغياب - يظهر فقط إذا سمح الباك اند وكانت هناك جلسة قادمة */}
      {isAbsenceEnabled && nextSession && (
        <div className="bg-white p-5 rounded-lg shadow-lg space-y-4 max-w-xl border border-gray-100">
          <p className="font-bold text-second-color">هل ستغيب عن الجلسة القادمة؟ تقدّم بطلب عذر:</p>

          {absenceError && <p className="text-red-500 text-sm font-medium">⚠️ {absenceError}</p>}
          {absenceSuccess && <p className="text-green-600 text-sm font-medium">✓ {absenceSuccess}</p>}

          <Input
            label="سبب الغياب"
            placeholder="اشرح بشكل مختصر ومقنع سبب غيابك للإدارة"
            value={absenceReason}
            onChange={(e) => {
              setAbsenceReason(e.target.value);
              setAbsenceError("");
            }}
            className="w-full"
          />

          <Button
            label={isRequestingAbsence ? "جاري الإرسال..." : "تقديم طلب الغياب"}
            className="bg-main-color text-white px-6 py-2 rounded-lg"
            onClick={handleAbsenceRequest}
            disabled={isRequestingAbsence}
          />
        </div>
      )}
      <div className="w-full">
        <h3 className="text-xl font-bold text-second-color mb-4">جدول جلسات المعسكر</h3>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="w-full text-center bg-white border-collapse min-w-[700px]">
            <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
              <tr>
                <th className="p-3">عنوان الجلسة</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">المدرب</th>
                <th className="p-3">المهام المطلوبة</th>
                <th className="p-3">التوقيت</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium text-gray-900">{s.title}</td>
                    <td className="p-3 text-gray-600">{s.date || "-"}</td>
                    <td className="p-3 text-gray-600">{s.trainer_name || "غير محدد"}</td>
                    <td className="p-3 text-gray-500 text-sm max-w-xs truncate" title={s.tasks}>{s.tasks || "لا يوجد"}</td>
                    <td className="p-3 text-gray-600">
                      {s.start_time && s.end_time ? `${s.start_time.slice(0, 5)} - ${s.end_time.slice(0, 5)}` : "-"}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        s.session_status === "انتهت" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"
                      }`}>
                        {s.session_status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-gray-400">لا يوجد جلسات مضافة في هذا الموسم حتى الآن.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampStage;