import React, { useState, /*useEffect*/ } from "react";
import CurrentTeamList from "../../components/CurrentTeamList";
import SuggestedVolunteersList from "../../components/SuggestedVolunteerList";
import LoadingOverlay from "../../components/LoadingOverlay"; 

// import { showError } from "../../Utils/toast"; 

import { useGetTeamQuery, useGetSuggestedVolunteersQuery } from "../../api/endpoints/teamApi";

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState("current");

  // جلب البيانات من السيرفر
  const { data: teamData, isLoading: isTeamLoading, error: teamError } = useGetTeamQuery();
  const { data: suggestedData, isLoading: isSuggestedLoading, error: suggestedError } = useGetSuggestedVolunteersQuery();

  // // مفعول جانبي (Effect) لإطلاق التوست فور حدوث أي خطأ في جلب البيانات من الباك اند
  // useEffect(() => {
  //   if (teamError || suggestedError) {
  //     const errorMsg = 
  //       teamError?.data?.detail || 
  //       suggestedError?.data?.detail || 
  //       "حدث خطأ أثناء تحديث بيانات الفريق من السيرفر";
      
  //     showError(errorMsg);
  //   }
  // }, [teamError, suggestedError]);

  if (isTeamLoading || isSuggestedLoading) {
    return (
      <LoadingOverlay>
        جاري تحميل بيانات الفريق والمتطوعين المقترحين... يرجى الانتظار
      </LoadingOverlay>
    );
  }

  const hasTeam = teamData?.has_team || false; 
  const currentTeam = teamData?.current_team || []; 
  const suggestedVolunteers = suggestedData || []; 

  return (
    <div className="container py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* هيدر الصفحة يبقى ظاهراً دائماً */}
      <div className="border-b border-gray-100 pb-4">
        <h1 className="text-3xl font-bold text-second-color">إدارة وبناء الفريق</h1>
        <p className="text-gray-500 text-sm mt-1">تصفح أعضاء فريقك الحاليين أو قم بقبول المتطوعين الموصى بهم من قبل الإدارة.</p>
      </div>

      {/* التبويبات الذكية */}
      <div className="flex gap-3 bg-gray-50 p-1.5 rounded-2xl w-fit border border-gray-100">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-6 py-2.5 rounded-xl font-bold text-xl transition-all cursor-pointer ${
            activeTab === "current"
              ? "bg-second-color text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100/70"
          }`}
        >
          الفريق الحالي ({currentTeam.length})
        </button>

        {!hasTeam && (
          <button
            onClick={() => setActiveTab("suggested")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === "suggested"
                ? "bg-second-color text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100/70"
            }`}
          >
            المتطوعون المقترحون ({suggestedVolunteers.length})
          </button>
        )}
      </div>

      {/* عرض القوائم أو عرض رسالة تنبيهية خفيفة في حال فشل الاتصال */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 min-h-[40vh]">
        {teamError || suggestedError ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-400 text-sm font-medium">فشل في عرض القوائم بسبب مشكلة في الاتصال.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 text-xs font-bold text-second-color underline cursor-pointer"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        ) : activeTab === "current" ? (
          <CurrentTeamList members={currentTeam} />
        ) : (
          <SuggestedVolunteersList volunteers={suggestedVolunteers} />
        )}
      </div>
    </div>
  );
};

export default TeamPage;