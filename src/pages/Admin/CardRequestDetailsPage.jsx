import React, { useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Modal from "../../components/Modal";
import Input from "../../components/Input";

import {
  IoImageOutline,
} from "react-icons/io5";

import {
  showError,
  showSuccess,
} from "../../Utils/toast";

import {
  useGetExhibitionCardRequestDetailsQuery,
  useSubmitProjectDecisionMutation,
} from "../../api/endpoints/admin/exhibitionApi";

export default function CardRequestDetailsPage() {
  const {
    submissionId,
  } = useParams();

  const navigate =
    useNavigate();

  const [
    rejectModal,
    setRejectModal,
  ] = useState(false);

  const [
    acceptModal,
    setAcceptModal,
  ] = useState(false);

  const [
    rejectNotes,
    setRejectNotes,
  ] = useState("");

  const [
    acceptMessage,
    setAcceptMessage,
  ] = useState("");

  // ==========================
  // fetch details
  // ==========================
  const {
    data,
    isLoading,
    error,
  } =
    useGetExhibitionCardRequestDetailsQuery(
      submissionId
    );

  // ==========================
  // submit decision
  // ==========================
  const [
    submitDecision,
    {
      isLoading:
        isSubmittingDecision,
    },
  ] =
    useSubmitProjectDecisionMutation();

  // ==========================
  // reject
  // ==========================
  const handleReject =
    async () => {
      if (
        !rejectNotes.trim()
      ) {
        showError(
          "يرجى كتابة سبب الرفض أولاً."
        );
        return;
      }

      try {
        await submitDecision(
          {
            submission_id:
              submissionId,
            decision:
              "rejected",
            message:
              rejectNotes,
          }
        ).unwrap();

        showSuccess(
          "تم رفض الطلب بنجاح"
        );

        setRejectModal(
          false
        );

        navigate(
          `/requests-details/${submissionId}`
        );
      } catch (err) {
    console.error(err);
    showError(err);
  
      }
    };

  // ==========================
  // accept
  // ==========================
  const handleAccept =
    async () => {
      if (
        !acceptMessage.trim()
      ) {
        showError(
          "يرجى كتابة إشعار القبول."
        );
        return;
      }

      try {
        await submitDecision(
          {
            submission_id:
              submissionId,
            decision:
              "approved",
            message:
              acceptMessage,
          }
        ).unwrap();

        showSuccess(
          "تم قبول الطلب بنجاح"
        );

        setAcceptModal(
          false
        );

        navigate(
          `/requests-details/${submissionId}`
        );
      } catch (err) {
    console.error(err);
    showError(err);
  
      }
    };

  // ==========================
  // loading
  // ==========================
  if (isLoading) {
    return (
      <div className="text-center mt-20 text-lg font-bold">
        جاري تحميل
        تفاصيل الطلب...
      </div>
    );
  }

  // ==========================
  // error
  // ==========================
  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        حدث خطأ أثناء
        تحميل تفاصيل
        الطلب.
      </div>
    );
  }

  return (
    <div
      className="bg-[#f4f4f4] min-h-screen p-8"
      dir="rtl"
    >
      <div className="container mx-auto">

        <div className="bg-white shadow-lg rounded overflow-hidden flex flex-col md:flex-row">
          {/* التفاصيل */}
          <div className="md:w-1/2 p-8 text-right">

            <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">
              تفاصيل المشروع
            </h2>

            <div className="space-y-4 text-sm leading-8">

              <p>
                <span className="font-bold">
                  اسم المشروع:
                </span>{" "}
                {data?.title ||
                  "-"}
              </p>

              <p>
                <span className="font-bold">
                  قائد الفريق :
                </span>{" "}
                {data?.owner_name ||
                  "-"}
              </p>

              <p>
                <span className="font-bold">
                  إيميل قائد الفريق:
                </span>{" "}
                {data?.owner_email ||
                  "غير متوفر"}
              </p>

              <p>
                <span className="font-bold">
                  القطاع:
                </span>{" "}
                {data?.sector ||
                  "-"}
              </p>

              <div>
                <p className="font-bold">
                  أعضاء الفريق:
                </p>

                <ul className="pr-6 list-disc mt-2">
                  {data
                    ?.team_members
                    ?.length ? (
                    data.team_members.map(
                      (
                        member,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          {
                            member
                          }
                        </li>
                      )
                    )
                  ) : (
                    <li>
                      لا يوجد
                      أعضاء
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <p className="font-bold">
                  إيميلات
                  الفريق:
                </p>

                <ul className="pr-6 list-disc mt-2">
                  {data
                    ?.emails
                    ?.length ? (
                    data.emails.map(
                      (
                        email,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          {
                            email
                          }
                        </li>
                      )
                    )
                  ) : (
                    <li>
                      لا توجد
                      إيميلات
                    </li>
                  )}
                </ul>
              </div>

              <p>
                <span className="font-bold">
                  اهداف المشروع:
                </span>{" "}
                {data?.project_goal ||
                  "غير متوفر"}
              </p>

              <div>
                <p className="font-bold">
                  خدمات المشروع:
                </p>

                {Array.isArray(
                  data?.project_services
                ) ? (
                  <ul className="pr-6 list-decimal mt-2">
                    {data.project_services.map(
                      (
                        service,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          {
                            service
                          }
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="mt-2">
                    {data?.project_services ||
                      "غير متوفر"}
                  </p>
                )}
              </div>

              <p>
                <span className="font-bold">
                  حالة الطلب:
                </span>{" "}
                <span
                  className={`font-bold ${
                    data?.status ===
                    "approved"
                      ? "text-green-600"
                      : data?.status ===
                        "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {data?.status ===
                  "approved"
                    ? "مقبول"
                    : data?.status ===
                      "rejected"
                    ? "مرفوض"
                    : "قيد المراجعة"}
                </span>
              </p>
            </div>

            {/* أزرار التحكم */}
            {data?.status ===
              "pending" && (
              <div className="flex gap-4 mt-10">

                <button
                  onClick={() =>
                    setAcceptModal(
                      true
                    )
                  }
                  disabled={
                    isSubmittingDecision
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition"
                >
                  قبول
                  الطلب
                </button>

                <button
                  onClick={() =>
                    setRejectModal(
                      true
                    )
                  }
                  disabled={
                    isSubmittingDecision
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition"
                >
                  رفض
                  الطلب
                </button>

              </div>
            )}
          </div>
          {/* الصورة */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center min-h-[550px]">

            {data?.project_image ? (
              <img
  src={`http://127.0.0.1:8000${encodeURI(data.project_image)}`}
  alt={data.owner_name}
  className="w-full h-full object-contain"
/>

            ) : (
              <div className="text-center text-gray-400">
                <IoImageOutline className="text-8xl mx-auto mb-4" />
                <p>
                  لا توجد صورة
                  للمشروع
                </p>
              </div>
            )}
          </div>

        {/* مودال الرفض */}
        <Modal
          isOpen={
            rejectModal
          }
          onClose={() =>
            setRejectModal(
              false
            )
          }
          title="سبب الرفض"
          footer={
            <button
              onClick={
                handleReject
              }
              className="bg-main-color text-white px-6 py-2 rounded-lg"
            >
              {isSubmittingDecision
                ? "جاري الإرسال..."
                : "إرسال"}
            </button>
          }
        >
          <Input
            placeholder="اكتب سبب الرفض..."
            value={
              rejectNotes
            }
            onChange={(
              e
            ) =>
              setRejectNotes(
                e.target
                  .value
              )
            }
          />
        </Modal>

        {/* مودال القبول */}
        <Modal
          isOpen={
            acceptModal
          }
          onClose={() =>
            setAcceptModal(
              false
            )
          }
          title="إشعار القبول"
          footer={
            <button
              onClick={
                handleAccept
              }
              className="bg-main-color text-white px-6 py-2 rounded-lg"
            >
              {isSubmittingDecision
                ? "جاري الإرسال..."
                : "إرسال"}
            </button>
          }
        >
          <Input
            placeholder="اكتب رسالة القبول..."
            value={
              acceptMessage
            }
            onChange={(
              e
            ) =>
              setAcceptMessage(
                e.target
                  .value
              )
            }
          />
        </Modal>
      </div>
    </div>
    </div>
  );
}