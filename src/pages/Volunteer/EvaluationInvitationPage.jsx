import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  useGetInvitationDetailsQuery, 
  useUpdateInvitationStatusMutation 
} from "../../api/endpoints/evaluationApi"; 
import { showSuccess, showError } from "../../Utils/toast";

const EvaluationInvitationPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const { data: invitationData, isLoading, error } = useGetInvitationDetailsQuery(id);

  const [updateStatus, { isLoading: isUpdating }] = useUpdateInvitationStatusMutation();

  const handleDecision = async (decision) => {
    try {
     
      await updateStatus({ id: id, action: decision }).unwrap();
      
      showSuccess(decision === "accept" ? "تم قبول الدعوة بنجاح" : "تم رفض الدعوة");
    } catch (err) {
      console.error(err);
      showError(err?.data?.detail || "حدث خطأ أثناء معالجة طلبك");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-20 font-bold text-gray-600">جاري تحميل تفاصيل الدعوة...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 font-bold text-red-500">حدث خطأ، تأكد من اتصال السيرفر أو صحة الـ ID!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8" dir="rtl">
      {/* شريط العنوان */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 flex items-center justify-between mb-8 border border-gray-200">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">تفاصيل طلب اللجنة</h1>
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* كرت التفاصيل */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-main-color"></div>

        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-850 pb-3 border-b-2 border-emerald-100 inline-block px-6">
            لجنة تقييم المشاريع (دعوة تقييم)
          </h2>
        </div>

     
        <div className="space-y-6 text-right md:px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-2 text-md md:text-lg">
            <span className="font-bold text-gray-800 min-w-[140px]">المهمة المطلوبة:</span>
            <span className="text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg w-full">
              {invitationData?.task}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 text-md md:text-lg">
            <span className="font-bold text-gray-800 min-w-[140px]">المدة المتوقعة:</span>
            <span className="text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg w-full font-sans" dir="ltr">
              {invitationData?.expected_duration}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 text-md md:text-lg">
            <span className="font-bold text-gray-800 min-w-[140px]">حالة الطلب الحالية:</span>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold w-fit ${
              invitationData?.status === "PENDING" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
            }`}>
              {invitationData?.status === "PENDING" ? "قيد الانتظار" : invitationData?.status}
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => handleDecision("accept")}
            disabled={isUpdating || invitationData?.status !== "PENDING"}
            className="w-full sm:w-44 font-bold text-white py-3 px-6 rounded-xl text-lg shadow-md transition-all duration-200 bg-green-color hover:bg-emerald-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isUpdating ? "جاري الإرسال..." : "موافقة"}
          </button>

          <button
            onClick={() => handleDecision("reject")}
            disabled={isUpdating || invitationData?.status !== "PENDING"}
            className="w-full sm:w-44 font-bold text-white py-3 px-6 rounded-xl text-lg shadow-md transition-all duration-200 bg-red-color hover:bg-red-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            رفض
          </button>
        </div>

      </div>
    </div>
  );
};

export default EvaluationInvitationPage;