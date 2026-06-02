 import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import AlertBox from "../AlertBox";
import { showSuccess, showError } from "../../Utils/toast";

// استيراد دوال التوست المخصصة

// import { useSelector } from "react-redux";
// import { useGetDashboardQuery, useRequestAbsenceMutation } from "../../api/endpoints/incubationApi";

const CampStage = ({ onComplete }) => {
  const [absenceReason, setAbsenceReason] = useState("");

  // [API LINK] جلب بيانات الداشبورد التي تحتوي على المراحل والبيانات الحالية
  // const { data: dashboardData, isLoading, error } = useGetDashboardQuery();
  
  // [API LINK] دالة إرسال طلب الغياب للجلسة القادمة
  // const [requestAbsence, { isLoading: isRequestingAbsence }] = useRequestAbsenceMutation();

  // محاكاة للبيانات (استبدلها بـ dashboardData عند الربط)
  const dashboardData = {
    current_stage: "BOOTCAMP",
    data: {
      next_session: { id: 7, title: "جلسة اختبار 2", date: "2026-05-16", time_range: "09:00 - 10:00", location: "homs",tasks:"جلسة اختبار2" },
      sessions: [
        { id: 4, title: "جلسة اختبار 1", date: "2026-05-13", trainer_name: "hala ahmad", time_range: "06:00 - 07:00", tasks: "تجهيز فيغما", session_status: "انتهت" }
      ],
      absence_request_enabled: true
    }
  };

  // التوصيل المتوافق مع الصور تماماً
  const currentStage = dashboardData.current_stage;
  const { next_session, sessions, absence_request_enabled } = dashboardData.data;

  const handleAbsenceRequest = async () => {
    if (!absenceReason.trim()) {
      showError("الرجاء إدخال سبب الغياب"); // توست الخطأ عند ترك الحقل فارغاً
      return;
    }

    try {
      // [API LINK] هنا يتم استدعاء الـ API الخاص بطلب الغياب
      // await requestAbsence({ reason: absenceReason, session_id: next_session.id }).unwrap();
      
      showSuccess("تم إرسال طلب الغياب بنجاح"); // توست النجاح المخصص
      setAbsenceReason("");
    } catch (err) {
      showError("حدث خطأ أثناء إرسال الطلب"); // توست الخطأ في حال فشل الـ API
    }
  };

  return (
    <div className="md:p-6 space-y-8 min-h-screen bg-white-color">
      <div className="w-full">
        <AlertBox message="تأكد من متابعة متطلبات المرحلة الحالية." />
      </div>

    {/* معلومات الجلسة القادمة - مطابقة لهيكل الـ JSON */}
      <div className="bg-white p-4 ">
        <h3 className="text-lg font-bold text-second-color  pb-2">تفاصيل الجلسة القادمة ({currentStage})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-bold text-black">العنوان:</span> {next_session.title}</p>
          <p><span className="font-bold text-black">التاريخ:</span> {next_session.date}</p>
          <p><span className="font-bold text-black">الوقت:</span> {next_session.time_range}</p>
          <p><span className="font-bold text-black">الموقع:</span> {next_session.location}</p>
        
        
          <p><span className="font-bold text-black">المهام المطلوبة:</span>{next_session.tasks}</p>
        </div>
      </div>

{absence_request_enabled && (
        <div className="space-y-3">
          <p className="font-bold">هل ستغيب عن الجلسة القادمة؟</p>
          <Input
            label="شرح"
            value={absenceReason}
            onChange={(e) => setAbsenceReason(e.target.value)}
          />
          <Button label="طلب غياب" onClick={handleAbsenceRequest} className="bg-main-color text-white" />
        </div>
      )}
{/* جدول الجلسات */}
      <div className="w-full">
        <h3 className="text-xl font-bold text-second-color mb-4">جدول الجلسات</h3>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-second-color">
          <table className="w-full text-center bg-white border-collapse min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 ">عنوان الجلسة</th>
 <th className="p-2">التاريخ</th>
                <th className="p-2 ">المدرب</th>
                <th className="p-2 ">المهام المطلوبة</th>
                <th className="p-2">الوقت</th>
                <th className="p-2">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {/* [API LINK] استبدل sessions بالمصفوفة القادمة من الـ API */}
              {sessions.map((s, i) => (
                <tr key={i} className=" border-second-color">
                  <td className="p-2">{s.title}</td>
                  <td className="p-2">{s.date}</td>
                  <td className="p-2">{s.trainer_name}</td>
                  <td className="p-2">{s.tasks}</td>
                  <td className="p-2">{s.time_range}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      s.session_status === 'انتهت' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {s.session_status}
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