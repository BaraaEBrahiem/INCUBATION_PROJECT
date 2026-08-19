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

      console.error(err);
      showError(err);
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
  // إضافة px-4 لضمان عدم التصاق المحتوى بحواف الموبايل
  <div className="container mx-auto py-10 md:py-20 px-4"> 
    <h1 className="text-4xl font-bold text-second-color mb-6 text-right">
      {workshop.title}
    </h1>
    
    {/* إضافة flex-col للموبايل و flex-row للابتوب مع ضمان التباعد */}
    <div className="flex flex-col-reverse lg:flex-row justify-center items-start gap-8 p-0 md:p-8">
      
      <div
        className="space-y-6 text-right w-full"
        dir="rtl"
      >
        <div>
          <span className="font-bold pb-5">📌 الوصف:</span>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {workshop.description}
          </p>
        </div>

        <div>
          <span className="font-bold">📅 تاريخ البدء:</span>{" "}
          {workshop.start_date}
        </div>

        <div>
          <span className="font-bold">📆 أيام الورشة:</span>{" "}
          {workshop.days}
        </div>

        <div>
          <span className="font-bold">🕒 الوقت:</span>{" "}
          {formatTime(workshop.time_from)}
          {" - "}
          {formatTime(workshop.time_to)}
        </div>

        <div>
          <span className="font-bold">🎯 الدورة مناسبة لـ:</span>{" "}
          {workshop.target_audience}
        </div>
      </div>

      {workshop.image && (
        // تعديل أبعاد الصورة لتكون مناسبة للموبايل واللابتوب
        <div className="w-full lg:w-1/2">
          <img
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}
    </div>

    <div className="mt-8 flex justify-center">
      <Button
        label={
          isRegistering
            ? "جاري التسجيل..."
            : "سجل الآن"
        }
        onClick={handleRegister}
        disabled={isRegistering}
        className="bg-main-color w-full md:w-auto px-8"
      />
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