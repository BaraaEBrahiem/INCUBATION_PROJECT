import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import InfoRow from "../../components/InfoRow";
import Modal from "../../components/Modal";
import { IoImageOutline } from "react-icons/io5";
import Input from "../../components/Input";
import { showError, showSuccess } from "../../Utils/toast";
import { 
  useGetExhibitionCardRequestDetailsQuery, 
  useSubmitProjectDecisionMutation 

} from "../../api/endpoints/admin/exhibitionApi";

export default function CardRequestDetailsPage() {
  const { submissionId = 1 } = useParams(); 
  const navigate = useNavigate();

  const [rejectModal, setRejectModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);

  const [rejectNotes, setRejectNotes] = useState("");
  const [acceptMessage, setAcceptMessage] = useState("");

  const { data, isLoading: isLoadingDetails, error: errorDetails } = useGetExhibitionCardRequestDetailsQuery(submissionId);


  const [submitDecision, { isLoading: isSubmittingDecision }] = useSubmitProjectDecisionMutation();


  const handleReject = async () => {
    if (!rejectNotes.trim()) {
      showError("يرجى كتابة سبب الرفض أولاً.");
      return;
    }

    try {
      await submitDecision({
        submissionId,
        decision: "rejected",
        message: rejectNotes,
      }).unwrap();

      showSuccess("تم تسجيل قرار الرفض وإرسال الإشعار بنجاح");
      setRejectModal(false);
      navigate("/admin/submissions"); 
    } catch (err) {
      console.error(err);
      showError(err?.data?.detail || "حدث خطأ أثناء إرسال قرار الرفض.");
    }
  };

  const handleAccept = async () => {
    if (!acceptMessage.trim()) {
      showError("يرجى كتابة نص إشعار القبول أولاً.");
      return;
    }

    try {
      await submitDecision({
        submissionId,
        decision: "approved",
        message: acceptMessage,
      }).unwrap();

      showSuccess("تم قبول طلب المشروع بنجاح!");
      setAcceptModal(false);
      navigate("/admin/submissions");
    } catch (err) {
      console.error(err);
      showError(err?.data?.detail || "حدث خطأ أثناء إرسال قرار القبول.");
    }
  };


  if (isLoadingDetails) {
    return <p className="text-center mt-20 font-bold">جاري تحميل تفاصيل الطلب...</p>;
  }


  if (errorDetails) {
    return <p className="text-center mt-20 text-red-500 font-bold">حدث خطأ أثناء تحميل بيانات هذا الطلب.</p>;
  }

  return (
    <div className="p-6 bg-white-color w-full min-h-screen" dir="rtl">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-second-color text-right">تفاصيل طلب المشروع</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* القسم الأيمن: البيانات الأساسية والحقول الديناميكية القادمة من الدالة الحقيقية */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* معلومات المشروع الأساسية */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-main-color">المعلومات الأساسية</h3>
              
              <InfoRow label="اسم المشروع:">
                {data?.project?.name}
              </InfoRow>

              <InfoRow label="مسؤول التعديل (القائد):">
                {data?.project?.owner_name}
              </InfoRow>

              <InfoRow label="حالة الطلب الحالية:">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  data?.status === "pending" ? "bg-amber-100 text-amber-800" : 
                  data?.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {data?.status === "pending" ? "قيد الانتظار" : data?.status === "approved" ? "مقبول" : "مرفوض"}
                </span>
              </InfoRow>
            </div>

            {/* عناصر الفكرة الديناميكية المقروءة من الـ API الحقيقي */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-4 border-b border-second-color pb-2">تفاصيل الفكرة (الفورم)</h3>

              {data?.fields && data.fields.length > 0 ? (
                data.fields.map((field, index) => (
                  <InfoRow key={index} label={`${field.label}:`}>
                    {field.answer || <span className="text-gray-400 italic">لا توجد إجابة</span>}
                  </InfoRow>
                ))
              ) : (
                <p className="text-gray-500 text-sm">لا توجد حقول مخصصة لهذا النموذج.</p>
              )}
            </div>

            {/* أزرار التحكم بالطلب */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setAcceptModal(true)}
                disabled={isSubmittingDecision}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                قبول الطلب
              </button>

              <button
                onClick={() => setRejectModal(true)}
                disabled={isSubmittingDecision}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:bg-gray-400"
              >
                رفض الطلب
              </button>
            </div>
          </div>

          {/* القسم الأيسر: عرض صورة المشروع قادمة من السيرفر */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 border-dashed rounded-lg min-h-[250px]">
            {data?.project?.image ? (
              <img
                src={data.project.image}
                alt="project"
                className="object-cover rounded-lg max-h-60"
              />
            ) : (
              <div className="text-center text-gray-400">
                <IoImageOutline className="text-8xl mx-auto mb-2" />
                <p className="text-sm">لا توجد صورة مرفوعة للمشروع</p>
              </div>
            )}
          </div>

        </div>

        {/* مودال الرفض */}
        <Modal
          isOpen={rejectModal}
          onClose={() => setRejectModal(false)}
          title="سبب الرفض"
          footer={
            <button
              onClick={handleReject}
              disabled={isSubmittingDecision}
              className="bg-main-color text-white px-6 py-2 rounded-lg font-bold disabled:bg-gray-400"
            >
              {isSubmittingDecision ? "جاري الإرسال..." : "إرسال إشعار الرفض"}
            </button>
          }
        >
          <Input
            placeholder="اكتب ما يجب تعديله في المشروع..."
            value={rejectNotes}
            onChange={(e) => setRejectNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-right"
          />
        </Modal>

        {/* مودال القبول */}
        <Modal
          isOpen={acceptModal}
          onClose={() => setAcceptModal(false)}
          title="إشعار القبول"
          footer={
            <button
              onClick={handleAccept}
              disabled={isSubmittingDecision}
              className="bg-main-color text-white px-6 py-2 rounded-lg font-bold disabled:bg-gray-400"
            >
              {isSubmittingDecision ? "جاري الإرسال..." : "إرسال إشعار القبول"}
            </button>
          }
        >
          <Input
            placeholder="اكتب نص إشعار القبول..."
            value={acceptMessage}
            onChange={(e) => setAcceptMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-right"
          />
        </Modal>

      </div>
    </div>
  );
}