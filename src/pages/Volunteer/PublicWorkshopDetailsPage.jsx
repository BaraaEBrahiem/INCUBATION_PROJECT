import React from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button";

import {
  useGetPublicWorkshopDetailsQuery,
  useRegisterWorkshopMutation,
} from "../../api/endpoints/workshopInfo";

import {
  showSuccess,
  showError,
} from "../../Utils/toast";

const PublicWorkshopDetailsPage = () => {
  const { workshop_id } = useParams();

  const {
    data: workshop,
    isLoading,
    error,
  } = useGetPublicWorkshopDetailsQuery(workshop_id);

  const [
    registerWorkshop,
    { isLoading: isRegistering },
  ] = useRegisterWorkshopMutation();

  const handleRegister = async () => {
    try {
      const response =
        await registerWorkshop(
          workshop_id
        ).unwrap();

      showSuccess(
        response.detail || "تم التسجيل"
      );

    } catch (err) {

      showError(
        err?.data?.detail ||
        "حدث خطأ أثناء التسجيل"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        جاري تحميل بيانات الورشة...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        حدث خطأ أثناء تحميل بيانات الورشة
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">

      <div className="bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-second-color mb-6 text-right">
          {workshop.title}
        </h1>

        {workshop.image && (
          <img
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        <div
          className="space-y-4 text-right"
          dir="rtl"
        >

          <div>
            <span className="font-bold">
              الوصف:
            </span>
            <p className="mt-2">
              {workshop.description}
            </p>
          </div>

          <div>
            <span className="font-bold">
              تاريخ البدء:
            </span>{" "}
            {workshop.start_date}
          </div>

          <div>
            <span className="font-bold">
              أيام الورشة:
            </span>{" "}
            {workshop.days}
          </div>

          <div>
            <span className="font-bold">
              الوقت:
            </span>{" "}
            {formatTime(workshop.time_from)}
            {" - "}
            {formatTime(workshop.time_to)}
          </div>

          <div>
            <span className="font-bold">
              الدورة مناسبة لـ:
            </span>{" "}
            {workshop.target_audience}
          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <Button
            label={
              isRegistering
                ? "جاري التسجيل..."
                : "سجل الآن"
            }
            onClick={handleRegister}
            disabled={isRegistering}
            className="bg-main-color"
          />

        </div>

      </div>

    </div>
  );
};

function formatTime(timeString) {

  if (!timeString) return "";

  const [hour, minute] =
    timeString.split(":");

  const h = Number(hour);

  const period =
    h >= 12 ? "PM" : "AM";

  const displayHour =
    h % 12 || 12;

  return `${displayHour}:${minute} ${period}`;
}

export default PublicWorkshopDetailsPage;