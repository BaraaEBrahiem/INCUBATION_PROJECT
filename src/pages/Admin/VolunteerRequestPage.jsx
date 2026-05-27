import { useParams, useNavigate } from "react-router-dom";
import InfoRow from "../../components/InfoRow";
import ApprovalActions from "../../components/ApprovalActions";
import Button from "../../components/Button";
import { useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { showSuccess, showError } from "../../Utils/toast";

/*
import { 
  useApproveVolunteerRequestMutation,
  useRejectVolunteerRequestMutation,
  useSendEvaluationInvitationMutation,
  useRemoveEvaluatorRoleMutation 
} from "../../api/endpoints/admin/volunteersOptionsApi.js"; 
*/

const usersMockData = {
  1: {
    name: "رانيا الأحمد",
    email: "rania@example.com",
    primary_skills: "UI/UX",
    additional_skills: ["تصميم واجهات", "تجربة مستخدم"],
    years_of_experience: "3 سنوات",
    current_company: "شركة تصميم",
    motivation: "تطوير مهاراتي",
    availability: [{ day: "monday", from: "10:00am", to: "2:00pm" }],
    availability_type: "أونلاين",
    volunteer_type: "تطوير واجهات المشاريع الناشئة",
    cv: null,
    location: "دمشق",
  },
  2: {
    name: "محمد علي",
    email: "mohamed@example.com",
    primary_skills: "تطوير برمجيات",
    additional_skills: ["بايثون", "جافا"],
    years_of_experience: "سنتان",
    current_company: "شركة تقنية",
    motivation: "اكتساب خبرة",
    availability: [{ day: "tuesday", from: "1:00pm", to: "5:00pm" }],
    availability_type: "حضورية",
    volunteer_type: "مساعدة في البرمجة",
    cv: null,
    location: "حلب",
  },
  10: {
    name: "أحمد علي",
    email: "ahmed@example.com",
    primary_skills: "تسويق رقمي",
    additional_skills: ["إدارة مشاريع صغيرة"],
    years_of_experience: "سنة",
    current_company: "شركة تسويق",
    motivation: "بناء خبرة",
    availability: [{ day: "wednesday", from: "2:00pm", to: "4:00pm" }],
    availability_type: "عن بعد",
    volunteer_type: "دعم المشاريع الناشئة",
    cv: null,
    location: "حمص",
  },
  11: {
    name: "نورا حسن",
    email: "noura@example.com",
    primary_skills: "UI/UX",
    additional_skills: ["تصميم الجرافيك"],
    years_of_experience: "سنتان",
    current_company: "شركة تقنية",
    motivation: "المساهمة المجتمعية",
    availability: [{ day: "thursday", from: "9:00am", to: "12:00pm" }],
    availability_type: "حضورية",
    volunteer_type: "تحسين تجربة المستخدم",
    cv: null,
    location: "اللاذقية",
  },
  20: {
    name: "خالد يوسف",
    email: "khaled@example.com",
    primary_skills: "تقييم المشاريع",
    additional_skills: ["إدارة مخاطر"],
    years_of_experience: "10 سنوات",
    current_company: "جهة استشارية",
    motivation: "دعم رواد الأعمال",
    availability: [{ day: "friday", from: "9:00am", to: "3:00pm" }],
    availability_type: "عن بعد",
    volunteer_type: "تقييم خطط العمل",
    cv: null,
    location: "طرطوس",
  },
  21: {
    name: "سارة أحمد",
    email: "sara@example.com",
    primary_skills: "تقييم تقني",
    additional_skills: ["تحليل نظم"],
    years_of_experience: "8 سنوات",
    current_company: "مركز أبحاث",
    motivation: "نقل الخبرة",
    availability: [{ day: "saturday", from: "11:00am", to: "3:00pm" }],
    availability_type: "أونلاين",
    volunteer_type: "مراجعة الكود",
    cv: null,
    location: "دمشق",
  },
};

const userStatusMap = {
  1: "VOLUNTEER",
  2: "VOLUNTEER",
  10: "PENDING",
  11: "PENDING",
  20: "EVALUATOR",
  21: "EVALUATOR",
};

const VolunteerRequestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /*
  const [approveVolunteerRequest] = useApproveVolunteerRequestMutation();
  const [rejectVolunteerRequest] = useRejectVolunteerRequestMutation();
  const [sendEvaluationInvitation] = useSendEvaluationInvitationMutation();
  const [removeEvaluatorRole] = useRemoveEvaluatorRoleMutation();
  */

  const request = usersMockData[id] || usersMockData[1];
  const status = userStatusMap[id] || "PENDING"; 

  const [EvaluateOpen, setEvaluateOpen] = useState(false);
  const [RemoveEvaluatorOpen, setRemoveEvaluatorOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [evaluationData, setEvaluationData] = useState({
    description: "",
    committee_date: "",
    expected_duration: "",
    required_task: "", 
  });

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      // 📡 للربط: await approveVolunteerRequest(id).unwrap();
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccess("تم قبول طلب التطوع بنجاح");
      navigate("/admin/volunteers");
    } catch (err) {
      showError(err?.data?.message || "حدث خطأ في قبول الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      // 📡 للربط: await rejectVolunteerRequest(id).unwrap();
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccess("تم رفض طلب التطوع");
      navigate("/admin/volunteers");
    } catch (err) {
      showError(err?.data?.message || "حدث خطأ في رفض الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendInvitation = async () => {
    setIsSubmitting(true);
    try {
      /*
      await sendEvaluationInvitation({
        evaluator_id: id,
        invitationData: {
          volunteer_id: Number(id),
          expected_duration: evaluationData.expected_duration,
          task: evaluationData.required_task // تحويل الحقل إلى الاسم البرمجي المطلق في الباك إند
        }
      }).unwrap();
      */
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccess("تم إرسال دعوة التقييم بنجاح");
      setEvaluateOpen(false);
      setEvaluationData({ description: "", committee_date: "", expected_duration: "", required_task: "" });
    } catch (err) {
      showError(err?.data?.message || "حدث خطأ في إرسال الدعوة");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveEvaluator = async () => {
    setIsSubmitting(true);
    try {
      // 📡 للربط: await removeEvaluatorRole(id).unwrap();
      await new Promise(resolve => setTimeout(resolve, 500));
      showSuccess("تم إزالة دور المقيم بنجاح");
      setRemoveEvaluatorOpen(false);
    } catch (err) {
      showError(err?.data?.message || "حدث خطأ في إزالة الدور");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white-color min-h-screen" dir="rtl">
      <div className="container">
        <h2 className="text-3xl font-bold text-second-color mb-6">
          {status === "PENDING"
            ? "طلب التطوع"
            : status === "VOLUNTEER"
            ? "تفاصيل المتطوع"
            : status === "EVALUATOR"
            ? "تفاصيل المقيم"
            : "طلب التطوع"}
        </h2>

        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <InfoRow label="الاسم الكامل">{request.name}</InfoRow>
          <InfoRow label="البريد الإلكتروني">{request.email}</InfoRow>
          <InfoRow label="عدد سنوات الخبرة">{request.years_of_experience}</InfoRow>
          <InfoRow label="جهة العمل الحالية">{request.current_company}</InfoRow>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <InfoRow label="أوقات الإتاحة الأسبوعية">
            {request.availability?.map((item, index) => (
              <div key={index}>{item.day}: {item.from} - {item.to}</div>
            ))}
          </InfoRow>
          <InfoRow label="الدافع للتطوع">{request.motivation}</InfoRow>
          <InfoRow label="نوع الإتاحة">{request.availability_type}</InfoRow>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <InfoRow label="الهدف من التطوع">{request.volunteer_type}</InfoRow>
          <InfoRow label="مجالات الخبرة الإضافية">{request.additional_skills?.join(", ")}</InfoRow>
          <InfoRow label="السيرة الذاتية">
            {request.cv ? <p>{request.cv}</p> : <p>لا توجد سيرة ذاتية مرفقة.</p>}
          </InfoRow>
        </div>

        {status === "PENDING" && (
          <ApprovalActions onApprove={handleApprove} onReject={handleReject} disabled={isSubmitting} />
        )}
        {status === "VOLUNTEER" && (
          <Button onClick={() => setEvaluateOpen(true)} label="طلب تقييم" className="bg-main-color" />
        )}
        {status === "EVALUATOR" && (
          <Button onClick={() => setRemoveEvaluatorOpen(true)} label="إزالة تقييم" className="bg-main-color" />
        )}
      </div>

      <Modal
        isOpen={EvaluateOpen}
        onClose={() => setEvaluateOpen(false)}
        title="إرسال طلب للتقييم"
        footer={<Button label="إرسال" onClick={handleSendInvitation} className="bg-main-color px-8" disabled={isSubmitting} />}
      >
        <form className="flex flex-col gap-4">
          <Input type="text" label="وصف الطلب" value={evaluationData.description} onChange={(e) => setEvaluationData({ ...evaluationData, description: e.target.value })} />
          <Input type="date" label="تاريخ اللجنة" value={evaluationData.committee_date} onChange={(e) => setEvaluationData({ ...evaluationData, committee_date: e.target.value })} />
          <Input type="text" label="المدة الزمنية المتوقعة" value={evaluationData.expected_duration} onChange={(e) => setEvaluationData({ ...evaluationData, expected_duration: e.target.value })} />
          <Input type="text" label="المهمة المطلوبة" value={evaluationData.required_task} onChange={(e) => setEvaluationData({ ...evaluationData, required_task: e.target.value })} />
        </form>
      </Modal>

      <Modal
        isOpen={RemoveEvaluatorOpen}
        onClose={() => setRemoveEvaluatorOpen(false)}
        title="إزالة التقييم"
        footer={
          <>
            <Button label="إزالة" onClick={handleRemoveEvaluator} className="bg-red-600 px-2 mx-2" disabled={isSubmitting} />
            <Button label="إلغاء" onClick={() => setRemoveEvaluatorOpen(false)} className="bg-gray-500 px-2" />
          </>
        }
      >
        <p>هل أنت متأكد من إزالة دور التقييم للمقيم؟</p>
      </Modal>
    </div>
  );
};

export default VolunteerRequestPage;