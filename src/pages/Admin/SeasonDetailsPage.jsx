import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeasonSettings from "../../components/Admin_Dashboard/IncubationSeasons/SeasonSettings";
import FormBuilder from "../../components/Admin_Dashboard/IncubationSeasons/FormBuilder";
import ApplicationsReview from "../../components/Admin_Dashboard/IncubationSeasons/ApplicationsReview";
import { showSuccess, showError } from "../../Utils/toast";
import { useGetSeasonDetailsQuery, useCloseSubmissionsMutation } from "../../api/endpoints/admin/seasonsApi";
import Button from "../../components/Button";

const SeasonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: seasonData, isLoading, error, refetch } = useGetSeasonDetailsQuery(id);
  const [closeSubmissions] = useCloseSubmissionsMutation();

  const [activeTab, setActiveTab] = useState("settings");

  // حالات التحميل والخطأ
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white-color pt-10">
        <div className="container text-center py-20">
          <p className="text-gray-500">جاري تحميل تفاصيل الموسم...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-white-color pt-10">
        <div className="container text-center py-20">
          <p className="text-red-500 mb-3">حدث خطأ في تحميل تفاصيل الموسم</p>
          <button onClick={refetch} className="bg-main-color text-white px-4 py-2 rounded">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }


  const season = seasonData?.data || seasonData;

  if (!season) return null;

 
  console.log("=== 📦 FULL SEASON OBJECT FROM API ===", season);

  const handleCloseSubmission = async (season_id) => {
    try {
      await closeSubmissions(season_id).unwrap();
      showSuccess("تم إغلاق التقديم بنجاح");
      refetch(); // إعادة جلب البيانات لتحديث الحالة في الواجهة فوراً
    } catch (err) {
      showError(err?.data?.message || "حدث خطأ أثناء إغلاق التقديم");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white-color pt-10">
      <div className="container">
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (!id) {
                showError("لا يمكن تحديد الموسم الحالي");
                return;
              }
              navigate(`/admin/camp-management/${id}`);
            }}
            label="إدارة المعسكر"
            className="bg-main-color text-white rounded px-3 py-1"
          />
        </div>

        <h1 className="text-xl font-bold mb-6">تفاصيل الموسم</h1>

        <div className="flex gap-4 mb-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === "settings" ? "bg-main-color text-white" : "bg-white border border-second-color"
            }`}
          >
            الإعدادات
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === "form" ? "bg-main-color text-white" : "bg-white border border-second-color"
            }`}
          >
            تصميم النموذج
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === "review" ? "bg-main-color text-white" : "bg-white border border-second-color"
            }`}
          >
            مراجعة الطلبات
          </button>
        </div>

        {activeTab === "settings" && (
          <SeasonSettings
            season={season}
            onSave={(updated) => console.log("حفظ:", updated)}
            onCloseSubmission={handleCloseSubmission}
          />
        )}
        {activeTab === "form" && <FormBuilder season={season} />}
        {activeTab === "review" && (
          <ApplicationsReview season={season} applications={season.ideas || []} />
        )}
      </div>
    </div>
  );
};

export default SeasonDetailsPage;