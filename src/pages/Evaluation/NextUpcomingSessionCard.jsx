import React from "react";
import Button from "../../components/Button";
import NavLinkUniversal from "../../components/NavLinkUniversal";

import {
  useGetNextUpcomingSessionQuery,
} from "../../api/endpoints/evaluationApi";

const NextUpcomingSessionCard = () => {

  const {
    data: session,
    isLoading,
    error,
  } = useGetNextUpcomingSessionQuery();

  if (isLoading) {
    return (
      <div>
        <p className="font-bold text-gray-500">
          جاري تحميل أقرب جلسة...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="font-bold text-red-500">
          حدث خطأ أثناء جلب الجلسة
        </p>
      </div>
    );
  }

  if (!session || session.message) {
    return (
      <div>
        <p className="font-bold text-gray-500 text-center">
          لا توجد جلسات قادمة حالياً
        </p>
      </div>
    );
  }

  const meetingDate = new Date(
    session.meeting_date
  );

  const arabicDays = {
    Sunday: "الأحد",
    Monday: "الاثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
  };

  const dayName =
    arabicDays[
      meetingDate.toLocaleDateString(
        "en-US",
        { weekday: "long" }
      )
    ];

  const dateText =
    `${dayName} ${meetingDate.toLocaleDateString("ar-EG")}`;

  const timeText =
    meetingDate.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );

  return (
    <div
      className=" p-6 flex justify-between items-center"
      dir="rtl"
    >
      <div className="text-right">

        <h3 className="font-bold text-2xl mb-4 text-second-color">
          لديك جلسة تقييم
        </h3>

        <p className="font-medium text-lg mb-2">
          <span className="font-bold text-black pl-3">
            بتاريخ:
          </span>

          {dateText}
        </p>

        <p className="font-medium text-lg mb-2">
          <span className="font-bold text-black pl-3">
            الوقت:
          </span>

          {timeText}
        </p>

        <p className="font-medium text-lg">
          <span className="font-bold text-black pl-3">
            المشروع:
          </span>

          {session.idea_title}
        </p>

      </div>

      <NavLinkUniversal
        to="/evaluation-center"
        label={
          <Button
            label="الاطلاع على المشاريع"
            className="bg-main-color"
          />
        }
      />
    </div>
  );
};

export default NextUpcomingSessionCard;