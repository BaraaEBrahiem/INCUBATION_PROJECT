import React, { useState } from "react";
import avatar from "../../../assets/images/avatar.jpg";
import Modal from "../../Modal";
import Button from "../../Button";

const EvaluationDetails = ({
  evaluators = [],
  onBack,
  onAccept,
  onReject,
  isSubmitting = false,
}) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] =
    useState(false);

  const [isRejectModalOpen, setIsRejectModalOpen] =
    useState(false);

  // جلب تاريخ الاجتماع من أول evaluator
  const currentDate =
    evaluators?.[0]?.meeting_date ||
    "لم يتم تحديد موعد";

  return (
    <div
      className="p-6 min-h-screen relative font-sans"
      dir="rtl"
    >
      {/* مودال القبول */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() =>
          setIsAcceptModalOpen(false)
        }
        title="تأكيد قبول التقييم"
        footer={
          <button
            onClick={async () => {
              try {
                await onAccept?.();
                setIsAcceptModalOpen(false);
              } catch (error) {
                console.error(
                  "Accept error:",
                  error
                );
              }
            }}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            {isSubmitting
              ? "جاري المعالجة..."
              : "تأكيد"}
          </button>
        }
      >
        <p className="text-gray-700">
          هل أنت متأكد من قبول التقييم؟
        </p>
      </Modal>

      {/* مودال الرفض */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() =>
          setIsRejectModalOpen(false)
        }
        title="هل انت متأكد من الرفض؟"
        footer={
          <button
            onClick={async () => {
              try {
                await onReject?.();
                setIsRejectModalOpen(false);
              } catch (error) {
                console.error(
                  "Reject error:",
                  error
                );
              }
            }}
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            {isSubmitting
              ? "جاري المعالجة..."
              : "إرسال"}
          </button>
        }
      >
        <p>سيتم ارسال اشعار بالرفض</p>
      </Modal>

      {/* العنوان */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-main-color">
          تاريخ التقييم {currentDate}
        </h1>

        <button
          onClick={onBack}
          className="text-2xl text-black px-2 border rounded-full"
        >
          ←
        </button>
      </div>

      {/* بطاقات المقيمين */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {evaluators.length > 0 ? (
          evaluators.map((ev, index) => (
            <div
              key={
                ev.id ||
                ev.evaluator_id ||
                index
              }
              className="p-6 rounded-xl shadow-xl border border-gray-100 bg-white flex flex-col"
            >
              {/* الاسم + الصورة */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="font-bold text-2xl text-second-color mb-1">
                    {ev.evaluator_name ||
                      "غير معروف"}
                  </h2>

                  <p className="text-xl text-black">
                    <span className="font-bold">
                      اختصاص: <br/>
                    </span>{" "}
                    {ev.specialization ||
                      "-"}
                  </p>
                </div>

                <div className="w-16 h-18 rounded-full overflow-hidden border-2 border-gray-100 shadow-md">
                  <img
                    src={
                      ev.evaluator_image ||
                      avatar
                    }
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* الملاحظات */}
              <div className="text-right">
                <p className="text-xl font-bold text-black mb-1">
                  الملاحظات:
                </p>

                <div className="text-xl text-black leading-relaxed space-y-1">
                  <p className="text-black">
                    "
                    {ev.notes ||
                      "لا يوجد ملاحظات إضافية"}
                    "
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center bg-white rounded-2xl border border-gray-300">
            <p className="text-gray-700 font-medium text-md">
              لم يتم اختيار أي مقيمين
              لعرض تفاصيلهم.
            </p>
          </div>
        )}
      </div>

      {/* أزرار القبول والرفض */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm mx-auto">
        <Button
          label={"رفض"}
          onClick={() =>
            setIsRejectModalOpen(true)
          }
          className="bg-red-color w-50"
        />

        <Button
          label={"قبول"}
          onClick={() =>
            setIsAcceptModalOpen(true)
          }
          className="bg-green-color w-50"
        />
      </div>
    </div>
  );
};

export default EvaluationDetails;