 // src/components/Forms/CampStage.js
import React, { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import AlertBox from "../AlertBox";

// -------------------------------------------------------------
// تعليق كود الـ API مؤقتاً لتجنب مشاكل الـ imports والأخطاء أثناء العمل المحلي
// -------------------------------------------------------------
// import { useGetCampSessionsQuery, useUpdateAttendanceMutation } from "../../api/endpoints/campApi";

const CampStage = ({ onComplete }) => {
  const [absenceReason, setAbsenceReason] = useState("");
  const [absenceError, setAbsenceError] = useState("");
  const [absenceSuccess, setAbsenceSuccess] = useState("");

  // -------------------------------------------------------------
  // تعليق دوال الـ RTK Query / API الفعلية المتوافقة مع الصور
  // -------------------------------------------------------------
  // const { data: apiSessions, isLoading, error, refetch } = useGetCampSessionsQuery();
  // const [updateAttendance, { isLoading: isUpdatingAttendance }] = useUpdateAttendanceMutation();

  // حالات وهمية للمحاكاة المحلية
  const isLoading = false;
  const error = null;
  const isUpdatingAttendance = false;

  // البيانات الوهمية (Fallback) المطابقة تماماً لهيكل الـ API الفعلي بالصور
  const FALLBACK_SESSIONS = [
    {
      id: 1,
      title: "جلسة الروبوتيكس الأولى",
      trainer_name: "أحمد",
      date: "2026-05-10",
      time: "02:00 PM",
      tasks: "تجهيز أول صفحتين من العرض التقديمي",
      attended: true // حاضر
    },
    {
      id: 2,
      title: "جلسة تطوير الأعمال",
      trainer_name: "سارة",
      date: "2026-05-15",
      time: "02:00 PM",
      tasks: "تحديد الفئة المستهدفة بدقة",
      attended: true // حاضر
    },
    {
      id: 3,
      title: "جلسة العرض التقديمي القادمة",
      trainer_name: "محمد",
      date: "2026-05-25",
      time: "03:00 PM",
      tasks: "مراجعة النموذج الأولي",
      attended: false // غائب أو لم يحضر بعد
    }
  ];

  // استخدام بيانات الـ API إذا وجدت، وإلا الـ Fallback
  const sessions = FALLBACK_SESSIONS; // استبدلها بـ apiSessions بعد تفعيل الـ API

  // -------------------------------------------------------------
  // حسابات الحضور الديناميكية بناءً على هيكلة الباكيند الفعلي
  // -------------------------------------------------------------
  const totalSessions = sessions.length;
  const attendedSessions = sessions.filter(s => s.attended === true).length;
  const attendanceRate = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;

  // استخراج الجلسة القادمة تلقائياً (أول جلسة لم يتم حضورها بعد)
  const nextSession = sessions.find(s => s.attended === false) || sessions[sessions.length - 1] || {};

  // -------------------------------------------------------------
  // إرسال طلب الغياب (POST لـ attendance الـ Endpoint الجديد)
  // -------------------------------------------------------------
 const handleAbsenceRequest = async () => {
    if (!absenceReason.trim()) {
      setAbsenceError("الرجاء إدخال سبب الغياب");
      return;
    }

    setAbsenceError("");
    setAbsenceSuccess("");

    try {
      // ❌ التعديل هنا: غيرنا الاسم لـ session ليتطابق مع طلب السيرفر بالصورة
      const payload = {
        session: nextSession?.id, // الحقل صار اسمه session ومقيم بـ id الجلسة
        reason: absenceReason
      };
      
      console.log("إرسال Payload طلب غياب للباكيند:", payload);

      // إذا كنت شغال على الـ API الفعلي (فك التعليق هنا):
      // await sendAbsenceRequest(payload).unwrap();

      setAbsenceSuccess("تم إرسال طلب الغياب بنجاح");
      setAbsenceReason("");
      setTimeout(() => setAbsenceSuccess(""), 3000);
    } catch (err) {
      // طباعة الخطأ القادم من السيرفر لمعرفته بدقة في الـ UI
      setAbsenceError(err?.data?.session?.[0] || "حدث خطأ أثناء إرسال الطلب.");
    }
  };

  // التحقق من نسبة الحضور لإكمال المرحلة والانتقال لما بعدها
  useEffect(() => {
    if (attendanceRate >= 75 && totalSessions > 0) {
      onComplete();
    }
  }, [attendanceRate, totalSessions, onComplete]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-8 min-h-screen">
        <p className="text-center text-gray-500 py-10">جاري تحميل بيانات المعسكر...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-8 min-h-screen">
        <p className="text-center text-red-500">حدث خطأ في تحميل البيانات</p>
        <button 
          // onClick={refetch}
          className="bg-main-color text-white px-4 py-2 rounded mt-4 mx-auto block"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="md:p-6 space-y-8 min-h-screen overflow-x-hidden bg-white-color">
      
      {/* التنبيه الإرشادي */}
      <div className="w-full">
        <AlertBox message="تأكد من حضور الجلسات بنسبة 75% وعدم تأخير تسليم المهام المطلوبة لتجنب التأثير على استمرارك في الحاضنة." />
      </div>

      {/* كرت نسبة الحضور المحدث */}
      <div className="bg-white p-4 rounded-lg w-fit shadow-lg border border-gray-100">
        <p className="font-bold text-second-color">نسبة الحضور الحالية: {attendanceRate.toFixed(1)}%</p>
        <p className="text-sm text-gray-600">الجلسات الحاضرة: {attendedSessions} من {totalSessions}</p>
      </div>

      {/* كرت معلومات الجلسة القادمة الديناميكي */}
      {nextSession && (
        <div className="bg-white p-5 rounded-lg shadow-lg space-y-2 max-w-md border-r-4 border-main-color">
          <h4 className="font-bold text-lg text-main-color mb-2">تفاصيل الجلسة القادمة</h4>
          <p><span className="font-bold">العنوان:</span> {nextSession.title}</p>
          <p><span className="font-bold">التاريخ:</span> {nextSession.date}</p>
          <p><span className="font-bold">الوقت:</span> {nextSession.time}</p>
          <p><span className="font-bold">المدرب:</span> {nextSession.trainer_name}</p>
          <p><span className="font-bold">المهام المطالب بها:</span> {nextSession.tasks || "لا يوجد مهام حالية"}</p>
        </div>
      )}

      {/* قسم تقديم طلب الغياب */}
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg max-w-md">
        <p className="font-bold text-gray-700">هل ستغيب عن الجلسة القادمة؟</p>

        {absenceError && <p className="text-red-500 text-sm">{absenceError}</p>}
        {absenceSuccess && <p className="text-green-500 text-sm">{absenceSuccess}</p>}

        <Input
          label="السبب"
          placeholder="اشرح بشكل مختصر سبب غيابك للمراجعة"
          value={absenceReason}
          onChange={(e) => {
            setAbsenceReason(e.target.value);
            setAbsenceError("");
          }}
          className="w-full"
        />

        <Button
          label={isUpdatingAttendance ? "جاري الإرسال..." : "طلب غياب"}
          className="bg-main-color text-white w-full md:w-auto"
          onClick={handleAbsenceRequest}
          disabled={isUpdatingAttendance}
        />
      </div>

      {/* جدول الجلسات المستوحى من حقول الباكيند */}
      <div className="w-full">
        <h3 className="text-xl font-bold text-second-color mb-4">جدول جلسات المعسكر التدريبي</h3>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="w-full text-center bg-white border-collapse min-w-[700px]">
            <thead className="bg-gray-100 text-gray-700 font-bold">
 <tr>
                <th className="p-3">عنوان الجلسة</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">المدرب</th>
                <th className="p-3">المهام المطلوبة</th>
                <th className="p-3">الوقت</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium">{s.title}</td>
                  <td className="p-3 text-sm text-gray-600">{s.date}</td>
                  <td className="p-3 text-sm">{s.trainer_name}</td>
                  <td className="p-3 text-sm text-gray-500 max-w-xs truncate" title={s.tasks}>
                    {s.tasks || "—"}
                  </td>
                  <td className="p-3 text-sm text-gray-600">{s.time}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      s.attended 
                        ? "bg-green-100 text-green-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {s.attended ? "تم الحضور" : "لم يحضر"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CampStage;