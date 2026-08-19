import React, { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import {
  showSuccess,
  showError,
} from "../../../Utils/toast";

import {
  useSetExhibitionDateMutation,
} from "../../../api/endpoints/admin/exhibitionApi";

export default function ExhibitionSchedule() {
  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [
    setExhibitionDate,
    { isLoading },
  ] =
    useSetExhibitionDateMutation();

  const handleSendNotification =
    async () => {
      if (!date || !time) {
        showError(
          "يرجى إدخال تاريخ ووقت المعرض"
        );
        return;
      }

      const payload = {
        date,
        time,
      };

      try {
        await setExhibitionDate(
          payload
        ).unwrap();

        showSuccess(
          "تم إرسال موعد المعرض لجميع المستخدمين بنجاح."
        );

        // تنظيف الحقول
        setDate("");
        setTime("");
      } catch (error) {
  console.error(
    "Error setting exhibition date:",
    error
  );

  showError(error);

}
    };

  return (
    <div
      className="p-6 bg-white rounded-xl shadow-sm max-w-xl"
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-6">
        تحديد موعد المعرض
      </h2>

      <div className="flex flex-col gap-4">
        <Input
          label="تاريخ المعرض"
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
        />

        <Input
          label="الوقت"
          type="time"
          value={time}
          onChange={(e) =>
            setTime(
              e.target.value
            )
          }
        />

        <Button
          label={
            isLoading
              ? "جاري الإرسال..."
              : "إرسال إشعار"
          }
          onClick={
            handleSendNotification
          }
          disabled={
            isLoading
          }
          className="bg-main-color"
        />
      </div>
    </div>
  );
}