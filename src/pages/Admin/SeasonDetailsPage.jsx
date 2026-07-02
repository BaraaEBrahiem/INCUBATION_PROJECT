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
    // 🎯 أضفنا overflow-x-hidden لحماية حدود الصفحة كاملة على الموبايل
    <div className="w-full min-h-screen bg-white-color pt-10 overflow-x-hidden">
      <div className="container px-4 sm:px-6">
        
        {/* زر إدارة المعسكر: مرن على الموبايل ليتموضع بأناقة، وثابت في مكانه على اللابتوب */}
        <div className="flex justify-end mb-4 sm:mb-0">
          <button
            onClick={() => {
              if (!id) {
                showError("لا يمكن تحديد الموسم الحالي");
                return;
              }
                navigate(`/admin/camp-management/${id}`);
            }}
            // 🎯 تم ضبط المقاس ليكون text-base و px-4 على الموبايل ليناسب الشاشات الصغيرة، ويعود text-xl و px-7 على اللابتوب
            className="bg-main-color font-bold text-white text-base sm:text-xl rounded px-4 py-2 sm:px-7 sm:py-3 w-full sm:w-auto text-center"
          >
           إدارة المعسكر
          </button>
        </div>

        <h1 className="text-xl font-bold mb-6">تفاصيل الموسم</h1>

        {/* 🎯 أزرار التبويبات: أضفنا overflow-x-auto و whitespace-nowrap لتصبح قابلة للتمرير الأفقي الناعم بإصبع واحد على الموبايل دون كسر الصفحة، وتظهر طبيعية على اللابتوب */}
        <div className="flex gap-2 sm:gap-4 mb-6 border-b pb-2 overflow-x-auto whitespace-nowrap block no-scrollbar">
          <button
            onClick={() => setActiveTab("settings")}
            // 🎯 كلاسات متجاوبة: الخط والبادينغ أصغر على الهاتف ويعود لـ text-xl و px-7 على اللابتوب md:
            className={`px-4 py-2 sm:px-7 sm:py-3 font-bold text-base sm:text-xl rounded inline-block ${
              activeTab === "settings" ? "bg-main-color text-white" : "bg-white border border-second-color"
            }`}
          >
            الإعدادات
          </button>
          
          <button
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2 sm:px-7 sm:py-3 font-bold text-base sm:text-xl rounded inline-block ${
              activeTab === "form" ? "bg-main-color text-white" : "bg-white border border-second-color"
            }`}
          >
            تصميم النموذج
          </button>
          
          <button
            onClick={() => setActiveTab("review")}
            className={`px-4 py-2 sm:px-7 sm:py-3 font-bold text-base sm:text-xl rounded inline-block ${
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