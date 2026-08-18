import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPeople } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import { showSuccess, showError } from "../../../Utils/toast";
import { useEndCampMutation } from "../../../api/endpoints/admin/campApi";

const CampHeader = ({ seasonId }) => { 
  const navigate = useNavigate();
  const [campStatus, setCampStatus] = useState("نشط");
  const [error, setError] = useState("");
  const [endCamp, { isLoading }] = useEndCampMutation();

  const handleEndCamp = async () => {
    if (!seasonId) {
      showError("لا يمكن تحديد الموسم الحالي. يرجى المحاولة مرة أخرى.");
      return;
    }

    const confirmEnd = window.confirm(
      "هل أنت متأكد من إنهاء المعسكر؟ سيتم إرسال إشعار لجميع المشاركين."
    );
    if (!confirmEnd) return;

    setError("");
    try {
      await endCamp(seasonId).unwrap();
      setCampStatus("منتهي");
      showSuccess("تم إنهاء المعسكر بنجاح. تم إرسال الإشعارات.");
    } catch (err) {
      console.error("Error ending camp:", err);
      const msg = err?.data?.message || "حدث خطأ في إنهاء المعسكر";
      showError(msg);
    }
  };
return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-6 w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleEndCamp}
          disabled={isLoading || campStatus === "منتهي"}
          className={`bg-main-color text-base sm:text-xl text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 ${
            isLoading || campStatus === "منتهي" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "جاري الإنهاء..." : "إعلان انتهاء جلسات المعسكر"}
          <AiFillNotification className="inline-block" />
        </button>

        <button
          onClick={() => navigate("/admin/incubated")}
          className="bg-white text-base sm:text-xl border border-second-color px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          نتائج المعسكر <MdPeople className="inline-block" />
        </button>
      </div>
      <div className="bg-white px-4 py-2 rounded-md flex items-center gap-2 w-fit">
        <span
          className={`w-3 h-3 rounded-full ${
            campStatus === "نشط" ? "bg-green-color" : "bg-red-500"
          }`}
        />
        <span className="text-base sm:text-xl">حالة المعسكر : {campStatus}</span>
      </div>

      {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow-lg bridges">
          {error}
        </div>
      )}
    </div>
  );
};

export default CampHeader;