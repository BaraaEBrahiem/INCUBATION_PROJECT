import React, {
  useState,
} from "react";

import {
  useRole,
} from "../hooks/useRole";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

import {
  useApproveGeneralMutation,
  useRejectGeneralMutation,
} from "../api/endpoints/approvalApi";

import {
  showSuccess,
  showError,
} from "../Utils/toast";

const WorkshopDetailsCard = ({
  workshop,
}) => {
  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    actionType,
    setActionType,
  ] = useState(null);

  const [
    message,
    setMessage,
  ] = useState("");

  const {
    roles,
  } = useRole();

  const adminRole =
    roles.includes(
      "admin"
    );

  const [
    approveGeneral,
  ] =
    useApproveGeneralMutation();

  const [
    rejectGeneral,
  ] =
    useRejectGeneralMutation();

  const openModal = (
    type
  ) => {
    setActionType(
      type
    );

    setIsModalOpen(
      true
    );
  };

  const handleSubmit =
    async () => {
      try {
        if (
          !message.trim()
        ) {
          showError(
            "يرجى إدخال سبب الرفض"
          );

          return;
        }

        await rejectGeneral(
          {
            type:
              "workshops",
            id:
              workshop.id,
            reason:
              message,
          }
        ).unwrap();

        showSuccess(
          "تم رفض الورشة بنجاح"
        );

        setMessage(
          ""
        );

        setIsModalOpen(
          false
        );
      } catch (
        err
      ) {
        showError(
          err?.data
            ?.message ||
            "حدث خطأ أثناء الرفض"
        );
      }
    };

  return (
    <div className="container">
      <div className="bg-white rounded-xl shadow-md p-6">

        {/* عنوان */}
        <h1 className="text-3xl font-bold text-main-color mb-6">
          {
            workshop?.title
          }
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* تفاصيل الورشة */}
          <div className="space-y-5 text-right">

            <p className="text-gray-700 leading-8 text-lg">
              {
                workshop?.description
              }
            </p>

            <p className="text-lg">
              <span className="font-bold">
                الفئة:
              </span>{" "}
              {workshop?.category ||
                "غير محدد"}
            </p>

            <p className="text-lg">
              <span className="font-bold">
                الأهداف:
              </span>{" "}
              {workshop?.objectives ||
                "لا يوجد"}
            </p>

            <p className="text-lg">
              <span className="font-bold">
                الفئة المستهدفة:
              </span>{" "}
              {workshop?.target_audience ||
                "غير محدد"}
            </p>

            <p className="text-lg">
              <span className="font-bold">
                تاريخ البداية:
              </span>{" "}
              {
                workshop?.start_date
              }
            </p>

            <p className="text-lg">
              <span className="font-bold">
                تاريخ النهاية:
              </span>{" "}
              {
                workshop?.end_date
              }
            </p>

            <p className="text-lg">
              <span className="font-bold">
                الوقت:
              </span>{" "}
              {
                workshop?.time_from
              }{" "}
              -{" "}
              {
                workshop?.time_to
              }
            </p>

            <p className="text-lg">
              <span className="font-bold">
                الأيام:
              </span>{" "}
              {Array.isArray(
                workshop?.days
              )
                ? workshop.days.join(
                    " - "
                  )
                : "غير محدد"}
            </p>

            <p className="text-lg">
              <span className="font-bold">
                عدد الجلسات:
              </span>{" "}
              {workshop?.sessions ||
                0}
            </p>

            <p className="text-lg">
              <span className="font-bold">
                الحالة:
              </span>{" "}
              <span
                className={`font-bold ${
                  workshop?.status ===
                  "ACCEPTED"
                    ? "text-green-600"
                    : workshop?.status ===
                      "REJECTED"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {
                  workshop?.status
                }
              </span>
            </p>

            {/* سبب الرفض */}
            {workshop?.status ===
              "REJECTED" && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-bold text-red-600 mb-2">
                  سبب الرفض
                </h3>

                <p className="text-gray-700">
                  {
                    workshop?.rejection_reason
                  }
                </p>
              </div>
            )}

            {/* المسجلين */}
            {workshop?.status ===
              "ACCEPTED" &&
              workshop
                ?.registrations
                ?.length >
                0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-xl mb-4">
                    المسجلون
                    في الورشة
                  </h3>

                  <div className="space-y-3">
                    {workshop.registrations.map(
                      (
                        registration,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="bg-gray-50 border rounded-lg p-4"
                        >
                          <p>
                            <span className="font-bold">
                              الاسم:
                            </span>{" "}
                            {
                              registration.name
                            }
                          </p>

                          <p>
                            <span className="font-bold">
                              البريد:
                            </span>{" "}
                            {
                              registration.email
                            }
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>

          {/* صورة */}
          <div className="flex justify-center items-start">
            {workshop?.image ? (
              <img
                src={
                  workshop.image
                }
                alt={
                  workshop.title
                }
                className="rounded-xl shadow-md object-cover w-full max-h-[450px]"
              />
            ) : (
              <div className="bg-gray-100 rounded-xl h-[350px] w-full flex items-center justify-center text-gray-400">
                لا توجد صورة
              </div>
            )}
          </div>
        </div>

        {/* أزرار الأدمن */}
        {adminRole &&
          workshop?.status ===
            "PENDING" && (
            <div className="flex justify-center gap-4 mt-8">

              {/* قبول */}
              <Button
                label="موافقة"
                onClick={async () => {
                  try {
                    await approveGeneral(
                      {
                        type:
                          "workshops",
                        id:
                          workshop.id,
                      }
                    ).unwrap();

                    showSuccess(
                      "تم قبول الورشة بنجاح"
                    );
                  } catch (
                    err
                  ) {
                    showError(
                      err
                        ?.data
                        ?.message ||
                        "حدث خطأ أثناء القبول"
                    );
                  }
                }}
                className="bg-green-600 text-white px-8 py-3"
              />

              {/* رفض */}
              <Button
                label="رفض"
                onClick={() =>
                  openModal(
                    "reject"
                  )
                }
                className="bg-red-600 text-white px-8 py-3"
              />
            </div>
          )}
      </div>

      {/* مودال الرفض فقط */}
      <Modal
        isOpen={
          isModalOpen
        }
        onClose={() =>
          setIsModalOpen(
            false
          )
        }
        title="رفض الورشة"
        footer={
          <Button
            label="إرسال"
            onClick={
              handleSubmit
            }
            className="bg-main-color text-white px-5 py-2"
          />
        }
      >
        <Input
          label="سبب الرفض"
          value={message}
          onChange={(
            e
          ) =>
            setMessage(
              e.target
                .value
            )
          }
          placeholder="اكتب سبب الرفض..."
        />
      </Modal>
    </div>
  );
};

export default WorkshopDetailsCard;