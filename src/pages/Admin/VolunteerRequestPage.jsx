import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import InfoRow from "../../components/InfoRow";
import ApprovalActions from "../../components/ApprovalActions";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

import {
  showSuccess,
  showError,
} from "../../Utils/toast";

import {
  useGetVolunteerRequestByIdQuery,
} from "../../api/endpoints/requestsApi";

import {
  useApproveVolunteerRequestMutation,
  useRejectVolunteerRequestMutation,
  useSendEvaluationInvitationMutation,
  useRemoveEvaluatorRoleMutation,
} from "../../api/endpoints/admin/volunteersOptionsApi";

const VolunteerRequestPage =
  () => {
    const { id } =
      useParams();

    const navigate =
      useNavigate();

    // ======================
    // Modal States
    // ======================

    const [
      evaluateOpen,
      setEvaluateOpen,
    ] = useState(false);

    const [
      removeEvaluatorOpen,
      setRemoveEvaluatorOpen,
    ] = useState(false);

    // ======================
    // Form State
    // ======================

    const [
      evaluationData,
      setEvaluationData,
    ] = useState({
      volunteer_id:
        Number(id),

      description:
        "",

      expected_duration:
        "",

      task: "",
    });

    // ======================
    // API Queries
    // ======================

    const {
      data: volunteer,
      isLoading,
      error,
      refetch,
    } =
      useGetVolunteerRequestByIdQuery(
        id
      );

    // ======================
    // API Mutations
    // ======================

    const [
      approveVolunteer,
      {
        isLoading:
          approving,
      },
    ] =
      useApproveVolunteerRequestMutation();

    const [
      rejectVolunteer,
      {
        isLoading:
          rejecting,
      },
    ] =
      useRejectVolunteerRequestMutation();

    const [
      sendInvitation,
      {
        isLoading:
          sendingInvitation,
      },
    ] =
      useSendEvaluationInvitationMutation();

    const [
      removeEvaluator,
      {
        isLoading:
          removingEvaluator,
      },
    ] =
      useRemoveEvaluatorRoleMutation();

    // ======================
    // Derived State
    // ======================

    const isSubmitting =
      approving ||
      rejecting ||
      sendingInvitation ||
      removingEvaluator;

    const request =
      volunteer || {};

    const status =
      request?.status?.toUpperCase?.() ||
      "PENDING";

    const roles =
      request?.roles ||
      [];

    const isEvaluator =
      roles.includes(
        "EVALUATOR"
      );

    const isVolunteer =
      roles.includes(
        "VOLUNTEER"
      );

    // ======================
    // Actions
    // ======================

    const handleApprove =
      async () => {
        try {
          await approveVolunteer(
            id
          ).unwrap();

          showSuccess(
            "تم قبول طلب التطوع بنجاح"
          );

          navigate(
            "/admin/volunteers"
          );
        } catch (
          err
        ) {
          console.error(
            err
          );

          showError(
            err?.data
              ?.message ||
              "حدث خطأ في قبول الطلب"
          );
        }
      };

    const handleReject =
      async () => {
        try {
          await rejectVolunteer(
            id
          ).unwrap();

          showSuccess(
            "تم رفض طلب التطوع"
          );

          navigate(
            "/admin/volunteers"
          );
        } catch (
          err
        ) {
          console.error(
            err
          );

          showError(
            err?.data
              ?.message ||
              "حدث خطأ في رفض الطلب"
          );
        }
      };

    const handleSendInvitation =
      async () => {
        try {
          await sendInvitation({
            volunteer_id:request.user_id,

            data: {

              description:
                evaluationData.description,

              expected_duration:
                evaluationData.expected_duration,

              task:
                evaluationData.task,
            },
          }).unwrap();

          showSuccess(
            "تم إرسال دعوة التقييم بنجاح"
          );

          setEvaluateOpen(
            false
          );

          setEvaluationData(
            {
              volunteer_id:
                Number(id),

              description:
                "",

              expected_duration:
                "",

              task: "",
            }
          );
        } catch (
          err
        ) {
          console.error(
            err
          );

          showError(
            err?.data
              ?.message ||
              "حدث خطأ في إرسال الدعوة"
          );
        }
      };

    const handleRemoveEvaluator =
      async () => {
        try {
          await removeEvaluator(
            id
          ).unwrap();

          showSuccess(
            "تم إزالة دور المقيم بنجاح"
          );

          setRemoveEvaluatorOpen(
            false
          );

          navigate(
            "/admin/volunteers"
          );
        } catch (
          err
        ) {
          console.error(
            err
          );

          showError(
            err?.data
              ?.message ||
              "حدث خطأ في إزالة الدور"
          );
        }
      };

    // ======================
    // Loading
    // ======================

    if (isLoading) {
      return (
        <div className="p-6 text-center">
          جاري تحميل
          البيانات...
        </div>
      );
    }

    // ======================
    // Error
    // ======================

    if (error) {
      return (
        <div className="p-6 text-center">
          <p className="text-red-500 mb-4">
            حدث خطأ أثناء
            تحميل البيانات
          </p>

          <Button
            label="إعادة المحاولة"
            onClick={
              refetch
            }
            className="bg-main-color"
          />
        </div>
      );
    }

    return (
      <div className="p-6 bg-white-color min-h-screen">
        <div className="container">
          <h2 className="text-3xl font-bold text-second-color mb-6">
            {status ===
            "PENDING"
              ? "طلب التطوع"
              : isEvaluator
              ? "تفاصيل المقيم"
              : isVolunteer
              ? "تفاصيل المتطوع"
              : "تفاصيل المتطوع"}
          </h2>

          {/* معلومات أساسية */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <InfoRow label="الاسم الكامل">
              {request?.name ||
                "-"}
            </InfoRow>

            <InfoRow label="البريد الإلكتروني">
              {request?.email ||
                "-"}
            </InfoRow>

            <InfoRow label="الاختصاص الأساسي">
              {request?.specialization ||
                request?.primary_skills ||
                "-"}
            </InfoRow>

            <InfoRow label="عدد سنوات الخبرة">
              {request?.years_of_experience ||
                "-"}
            </InfoRow>

            <InfoRow label="جهة العمل الحالية">
              {request?.current_company ||
                "-"}
            </InfoRow>
          </div>

          {/* بيانات التطوع */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <InfoRow label="أوقات الإتاحة الأسبوعية">
              {request
                ?.availability
                ?.length ? (
                request.availability.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                    >
                      {
                        item.day
                      }
                      :
                      {
                        item.from
                      }{" "}
                      -
                      {
                        item.to
                      }
                    </div>
                  )
                )
              ) : (
                <span>
                  لا توجد
                  بيانات
                </span>
              )}
            </InfoRow>

            <InfoRow label="الدافع للتطوع">
              {request?.motivation ||
                "-"}
            </InfoRow>

            <InfoRow label="نوع الإتاحة">
              {request?.availability_type ||
                "-"}
            </InfoRow>
          </div>

          {/* مهارات إضافية */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <InfoRow label="مجالات الخبرة الإضافية">
              {Array.isArray(
                request?.additional_skills
              )
                ? request.additional_skills.join(
                    "، "
                  )
                : request?.additional_skills ||
                  "-"}
            </InfoRow>

            <InfoRow label="الهدف من التطوع">
              {request?.volunteer_type ||
                "-"}
            </InfoRow>
          </div>

          {/* Actions */}
          {status ===
            "PENDING" && (
            <ApprovalActions
              onApprove={
                handleApprove
              }
              onReject={
                handleReject
              }
              disabled={
                isSubmitting
              }
            />
          )}

          {status ===
            "APPROVED" &&
            isEvaluator && (
              <Button
                onClick={() =>
                  setRemoveEvaluatorOpen(
                    true
                  )
                }
                label="إزالة المقيم"
                className="bg-red-600"
              />
            )}

          {status ===
            "APPROVED" &&
            !isEvaluator &&
            isVolunteer && (
              <Button
                onClick={() =>
                  setEvaluateOpen(
                    true
                  )
                }
                label="إرسال  دعوة انضمام  للجنة التقييم"
                className="bg-main-color"
              />
            )}
        </div>

        {/* مودال الدعوة */}
        <Modal
          isOpen={
            evaluateOpen
          }
          onClose={() =>
            setEvaluateOpen(
              false
            )
          }
          title="إرسال دعوة تقييم"
          footer={
            <Button
              label={
                sendingInvitation
                  ? "جاري الإرسال..."
                  : "إرسال"
              }
              onClick={
                handleSendInvitation
              }
              className="bg-main-color px-8"
              disabled={
                isSubmitting
              }
            />
          }
        >
          <form className="flex flex-col gap-4">
            <Input
              type="text"
              label="وصف الدعوة"
              value={
                evaluationData.description
              }
              onChange={(
                e
              ) =>
                setEvaluationData(
                  {
                    ...evaluationData,
                    description:
                      e.target
                        .value,
                  }
                )
              }
            />

            <Input
              type="text"
              label="المدة المتوقعة"
              value={
                evaluationData.expected_duration
              }
              onChange={(
                e
              ) =>
                setEvaluationData(
                  {
                    ...evaluationData,
                    expected_duration:
                      e.target
                        .value,
                  }
                )
              }
            />

            <Input
              type="text"
              label="المهمة المطلوبة"
              value={
                evaluationData.task
              }
              onChange={(
                e
              ) =>
                setEvaluationData(
                  {
                    ...evaluationData,
                    task:
                      e.target
                        .value,
                  }
                )
              }
            />
          </form>
        </Modal>

        {/* إزالة المقيم */}
        <Modal
  isOpen={
    removeEvaluatorOpen
  }
  onClose={() =>
    setRemoveEvaluatorOpen(
      false
    )
  }
  title="إزالة المقيم"
  footer={
    <div className="flex gap-2 justify-center">
      <Button
        label={
          removingEvaluator
            ? "جاري الإزالة..."
            : "إزالة"
        }
        onClick={
          handleRemoveEvaluator
        }
        className="bg-red-600"
        disabled={
          isSubmitting
        }
      />

      <Button
        label="إلغاء"
        onClick={() =>
          setRemoveEvaluatorOpen(
            false
          )
        }
        className="bg-gray-500"
      />
    </div>
  }
>
  <p className="text-center">
    هل أنت متأكد من
    إزالة دور
    المقيم؟
  </p>
</Modal>
      </div>
    );
  };

export default VolunteerRequestPage;