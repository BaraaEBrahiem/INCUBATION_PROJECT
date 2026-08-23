import React from "react";
import { useGetIdeaDashboardQuery } from "../../api/endpoints/dashboardApi"; 
import CampStage from "../../components/Incubation_Stages/CampStage";
import CommitteeStage from "../../components/Incubation_Stages/CommitteeStage";
import FollowupStage from "../../components/Incubation_Stages/FollowupStage";
import ExhibitionStage from "../../components/Incubation_Stages/ExhibitionStage";
import Stepper from "../../components/Stepper";

const STAGE_INDEX_MAP = {
  BOOTCAMP: 0,
  EVALUATION: 1,
  INCUBATION: 2,
  GRADUATED_POSITIVE: 3,
  GRADUATED_NEGATIVE: 3,
};

const STEPPER_LABELS = [
  "المعسكر التدريبي",
  "تقييم اللجنة",
  "الاحتضان والمتابعة",
  "المعرض النهائي",
];

const IncubationStagesPage = () => {
  const { data: dashboard, isLoading, isError, error, refetch } = useGetIdeaDashboardQuery();

  // 1. حالة التحميل
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-color"></div>
      </div>
    );
  }

  const errorMessage = error?.data?.[0] || error?.data?.message || "";
  const isNoCommitteeError = typeof errorMessage === "string" && errorMessage.includes("لا يوجد لجنة تقييم");

  if (isError && !isNoCommitteeError && !dashboard?.current_stage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
        <p className="text-red-500 font-bold text-lg">
          {errorMessage || "حدث خطأ أثناء تحميل بيانات لوحة التحكم، أو أنك لم تقم بتسجيل فكرة بعد."}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-main-color text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const serverStage = dashboard?.current_stage || "EVALUATION"; 
  const stageData = dashboard?.data;
  const currentStageIndex = STAGE_INDEX_MAP[serverStage] ?? 1;

  const renderStageComponent = () => {
    // التحقق مما إذا كانت البيانات فارغة أو تعود بخطأ عدم وجود لجنة
    const isStageDataEmpty = 
      isNoCommitteeError ||
      !stageData || 
      (Array.isArray(stageData) && stageData.length === 0) ||
      (typeof stageData === "object" && Object.keys(stageData).length === 0);

    if (isStageDataEmpty && serverStage !== "GRADUATED_NEGATIVE") {
      return (
        <div className="p-8 bg-blue-50 border border-blue-200 rounded-xl text-center max-w-2xl mx-auto my-8 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
            ⏳
          </div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            المرحلة الحالية: {STEPPER_LABELS[currentStageIndex]}
          </h3>
          <p className="text-blue-700">
            أنت الآن في هذه المرحلة! لم يتم تحديد الموعد أو التفاصيل الخاصة بك بعد، يرجى الانتظار لحين تحديث الجدول من قبل الإدارة.
          </p>
        </div>
      );
    }

    switch (serverStage) {
      case "BOOTCAMP":
        return <CampStage data={stageData} onComplete={refetch} />;
      case "EVALUATION":
        return <CommitteeStage data={stageData} onComplete={refetch} />;
      case "INCUBATION":
        return <FollowupStage data={stageData} onComplete={refetch} />;
      case "GRADUATED_POSITIVE":
        return <ExhibitionStage data={stageData} onComplete={refetch} />;
      case "GRADUATED_NEGATIVE":
        return (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center max-w-2xl mx-auto my-8">
            <p className="text-red-700 font-medium text-lg">
              {stageData?.message || "للأسف، لم يتم تأهل المشروع للمراحل القادمة."}
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center mt-10 text-gray-500 font-medium">
            المرحلة الحالية غير معروفة أو لم تبدأ بعد.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white-color p-4 md:p-6 space-y-8 overflow-x-hidden">
      <h1 className="text-2xl font-bold text-main-color text-right">
        تابع تقدم مشروعك خلال مراحل الاحتضان من المعسكر حتى المعرض النهائي
      </h1>

      <Stepper
        steps={STEPPER_LABELS}
        current={currentStageIndex}
        className="mt-4"
      />

      <div className="container mx-auto mt-10">
        {renderStageComponent()}
      </div>
    </div>
  );
};

export default IncubationStagesPage;