import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import InfoRow from "../../components/InfoRow";
import ApprovalActions from "../../components/ApprovalActions";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

import { showSuccess, showError } from "../../Utils/toast";

import {
  useGetVolunteerDetailsQuery,
  useApproveVolunteerRequestMutation,
  useRejectVolunteerRequestMutation,
  useSendEvaluationInvitationMutation,
  useRemoveEvaluatorRoleMutation,
} from "../../api/endpoints/admin/volunteersOptionsApi.js";
import {useSelector} from "react-redux";

const VolunteerRequestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // =======================
  // API
  // =======================
  const {
    data: request,
    isLoading,
    isError,
  } = useGetVolunteerDetailsQuery(id);
  console.log("USER ID:", id);
  

  const [approveVolunteerRequest] =
    useApproveVolunteerRequestMutation();

  const [rejectVolunteerRequest] =
    useRejectVolunteerRequestMutation();

  const [sendEvaluationInvitation] =
    useSendEvaluationInvitationMutation();

  const [removeEvaluatorRole] =
    useRemoveEvaluatorRoleMutation();
     const userRoles = useSelector((state) => state.auth?.roles || []);

  const isSecretary = userRoles.some(
    (role) => String(role).toLowerCase().trim() === "secretary"
  );


  // =======================
  // States
  // =======================
  const [EvaluateOpen, setEvaluateOpen] = useState(false);
  const [RemoveEvaluatorOpen, setRemoveEvaluatorOpen] =
    useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [evaluationData, setEvaluationData] = useState({
    description: "",
    committee_date: "",
    expected_duration: "",
    required_task: "",
  });

  // =======================
  // Actions
  // =======================
  const handleApprove = async () => {
    setIsSubmitting(true);

    try {
      await approveVolunteerRequest(id).unwrap();

      showSuccess("تم قبول طلب التطوع بنجاح");

      navigate("/admin/volunteers");
    } catch (err) {
      showError(
        err?.data?.message ||
          "حدث خطأ في قبول الطلب"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);

    try {
      await rejectVolunteerRequest(id).unwrap();

      showSuccess("تم رفض طلب التطوع");

      navigate("/admin/volunteers");
    } catch (err) {
      showError(
        err?.data?.message ||
          "حدث خطأ في رفض الطلب"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendInvitation = async () => {
    setIsSubmitting(true);

    try {
      await sendEvaluationInvitation({
        evaluator_id: request?.user_id,
        invitationData: {
          volunteer_id: request?.id,
          expected_duration:
            evaluationData.expected_duration,
          task: evaluationData.required_task,
        },
      }).unwrap();

      showSuccess(
        "تم إرسال دعوة التقييم بنجاح"
      );

      setEvaluateOpen(false);

      setEvaluationData({
        description: "",
        committee_date: "",
        expected_duration: "",
        required_task: "",
      });
    } catch (err) {
      showError(
        err?.data?.message ||
          "حدث خطأ في إرسال الدعوة"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveEvaluator = async () => {
    setIsSubmitting(true);

    try {
      await removeEvaluatorRole(
        request?.id
      ).unwrap();

      showSuccess(
        "تم إزالة دور المقيم بنجاح"
      );

      setRemoveEvaluatorOpen(false);
    } catch (err) {
      showError(
        err?.data?.message ||
          "حدث خطأ في إزالة الدور"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =======================
  // Loading & Error
  // =======================
  if (isLoading) {
    return (
      <div className="text-center mt-10">
        جاري التحميل...
      </div>
    );
  }

  if (isError || !request) {
    return (
      <div className="text-center mt-10 text-red-500">
        حدث خطأ أثناء تحميل البيانات
      </div>
    );
  }

  // =======================
  // Logic
  // =======================
  const isPending =
    request.status === "PENDING";

  const isApproved =
    request.status === "APPROVED";

  const isEvaluator =
    request.is_evaluator;

  const daysInArabic = {
  SATURDAY: "السبت",
  SUNDAY: "الأحد",
  MONDAY: "الإثنين",
  TUESDAY: "الثلاثاء",
  WEDNESDAY: "الأربعاء",
  THURSDAY: "الخميس",
  FRIDAY: "الجمعة",
};

  return (
    <div
      className="p-6 bg-white-color min-h-screen"
      dir="rtl"
    >
      <div className="container">
        <h2 className="text-3xl font-bold text-second-color mb-6">
          {isPending
            ? "طلب التطوع"
            : isEvaluator
            ? "تفاصيل المقيم"
            : "تفاصيل المتطوع"}
        </h2>

        {/* المعلومات الأساسية */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <InfoRow label="الاسم الكامل">
            {request.name}
          </InfoRow>

          <InfoRow label="البريد الإلكتروني">
            {request.email}
          </InfoRow>

          <InfoRow label="عدد سنوات الخبرة">
            {request.years_of_experience}
          </InfoRow>

          <InfoRow label="جهة العمل الحالية">
            {request.current_company ||
              "غير محدد"}
          </InfoRow>

          <InfoRow label="المهارة الأساسية">
            {request.primary_skills}
          </InfoRow>

          <InfoRow label="التخصص">
            {request.specialization}
          </InfoRow>
        </div>

        {/* معلومات التطوع */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <InfoRow label="أوقات الإتاحة الأسبوعية">
  {request.availability?.length > 0 ? (
    request.availability.map(
      (item, index) => (
        <div key={index}>
          {daysInArabic[item.day] || item.day}
          {" : "}
          {item.from} - {item.to}
        </div>
      )
    )
  ) : (
    <p>لا يوجد</p>
  )}
</InfoRow>

          <InfoRow label="الدافع للتطوع">
            {request.motivation}
          </InfoRow>

          <InfoRow label="نوع الإتاحة">
            {request.availability_type}
          </InfoRow>

          <InfoRow label="السكن">
            {request.residence}
          </InfoRow>
        </div>

        {/* الهدف والخبرات */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <InfoRow label="تفضيلات الاستشارة">
  {request.volunteer_type || "لا يوجد"}
</InfoRow>


   <InfoRow label="مجالات الخبرة الإضافية">
  <div className="flex flex-col gap-1">
    {Array.isArray(request.additional_skills) ? (
      request.additional_skills.map((skill, index) => (
        <div key={index}>
          {typeof skill === "object"
            ? Object.values(skill).join(" - ")
            : skill}
        </div>
      ))
    ) : typeof request.additional_skills === "string" && request.additional_skills.trim() !== "" ? (

      <div>{request.additional_skills}</div>
    ) : (
      <div className="text-gray-400">لا يوجد مهارات إضافية</div>
    )}
  </div>
</InfoRow>
              
          <InfoRow label="نبذة">
            {request.bio ||
              "لا توجد معلومات"}
          </InfoRow>

          
        </div>

        {/* الأزرار */}
        {isPending && !isSecretary && (
          <div className="flex gap-3 mt-6 mr-auto">
            <Button
              onClick={handleApprove}
              disabled={isSubmitting}
              label={isSubmitting ? "جاري المعالجة..." : "موافقة"}
              className="bg-green-600 hover:bg-green-700 text-white w-28 h-12 rounded-lg text-base font-medium flex items-center justify-center"
            />

            <Button
              onClick={handleReject}
              disabled={isSubmitting}
              label={isSubmitting ? "جاري المعالجة..." : "رفض"}
              className="bg-red-600 hover:bg-red-700 text-white w-28 h-12 rounded-lg text-base font-medium flex items-center justify-center"
            />
          </div>
        )}

        {isApproved && !isEvaluator && !isSecretary && (
          <Button
            onClick={() =>
              setEvaluateOpen(true)
            }
            label="إرسال دعوة انضمام للجنة التقييم"
            className="bg-main-color"
          />
        )}

        {isApproved && isEvaluator && !isSecretary && (
          <Button
            onClick={() =>
              setRemoveEvaluatorOpen(true)
            }
            label="إزالة من لجنة التقييم"
            className="bg-red-600"
          />
        )}
      </div>

      {/* مودال إرسال دعوة */}
      <Modal
        isOpen={EvaluateOpen}
        onClose={() =>
          setEvaluateOpen(false)
        }
        title="إرسال طلب للتقييم"
        footer={
          <Button
            label="إرسال"
            onClick={
              handleSendInvitation
            }
            className="bg-main-color px-8"
            disabled={isSubmitting}
          />
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            label="وصف الطلب"
            value={
              evaluationData.description
            }
            onChange={(e) =>
              setEvaluationData({
                ...evaluationData,
                description:
                  e.target.value,
              })
            }
          />

          <Input
            type="text"
            label="المدة الزمنية المتوقعة"
            value={
              evaluationData.expected_duration
            }
            onChange={(e) =>
              setEvaluationData({
                ...evaluationData,
                expected_duration:
                  e.target.value,
              })
            }
          />

          <Input
            type="text"
            label="المهمة المطلوبة"
            value={
              evaluationData.required_task
            }
            onChange={(e) =>
              setEvaluationData({
                ...evaluationData,
                required_task:
                  e.target.value,
              })
            }
          />
        </form>
      </Modal>

      {/* مودال إزالة المقيم */}
      <Modal
        isOpen={RemoveEvaluatorOpen}
        onClose={() =>
          setRemoveEvaluatorOpen(
            false
          )
        }
        title="إزالة دور التقييم"
        footer={
          <>
            <Button
              label="إزالة"
              onClick={
                handleRemoveEvaluator
              }
              className="bg-red-600 px-2 mx-2"
              disabled={isSubmitting}
            />

            <Button
              label="إلغاء"
              onClick={() =>
                setRemoveEvaluatorOpen(
                  false
                )
              }
              className="bg-gray-500 px-2"
            />
          </>
        }
      >
        <p>
          هل أنت متأكد من إزالة
          دور التقييم للمقيم؟
        </p>
      </Modal>
    </div>
  );
};

export default VolunteerRequestPage;