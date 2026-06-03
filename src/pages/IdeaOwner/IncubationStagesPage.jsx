import { useGetIdeaDashboardQuery } from "../../api/endpoints/dashboardApi"; 
import CampStage from "../../components/Incubation_Stages/CampStage";
import CommitteeStage from "../../components/Incubation_Stages/CommitteeStage";
import FollowupStage from "../../components/Incubation_Stages/FollowupStage";
import ExhibitionStage from "../../components/Incubation_Stages/ExhibitionStage";
import Stepper from "../../components/Stepper";

// المطابقة الاحترافية الجديدة: البداية من المعسكر
const STAGE_INDEX_MAP = {
  "BOOTCAMP": 0,
  "EVALUATION": 1,
  "INCUBATION": 2,
  "EXHIBITION": 3,
  "GRADUATED_NEGATIVE": 3 // يوجه للمرحلة الأخيرة لرؤية رسالة عدم التأهل
};

const IncubationStagesPage = () => {
  const { data: dashboard, isLoading, isError, refetch } = useGetIdeaDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-color"></div>
      </div>
    );
  }

  if (isError || !dashboard?.current_stage) {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        حدث خطأ أثناء تحميل بيانات لوحة التحكم، أو أنك لم تقم بتسجيل فكرة بعد.
      </div>
    );
  }

  const serverStage = dashboard.current_stage; 
  const stageData = dashboard.data; 

  // جلب الـ Index الصحيح للـ Stepper
  const currentStageIndex = STAGE_INDEX_MAP[serverStage] ?? 0;

  const renderStageComponent = () => {
    switch (serverStage) {
      case "BOOTCAMP":
        return <CampStage data={stageData} onComplete={refetch} />;
      case "EVALUATION":
        return <CommitteeStage committeeResult={stageData} onComplete={refetch} />;
      case "INCUBATION":
        return <FollowupStage notes={stageData?.notes || []} allNotesResolved={stageData?.allNotesResolved || false} onComplete={refetch} />;
      case "EXHIBITION":
        return <ExhibitionStage data={stageData} onComplete={refetch} />;
      case "GRADUATED_NEGATIVE":
        return (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-700 font-medium text-lg">{stageData?.message}</p>
          </div>
        );
      default:
        return <div className="text-center mt-10">مرحلة غير معروفة</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white-color p-4 md:p-6 space-y-8 overflow-x-hidden">
      
      <h1 className="text-2xl font-bold text-main-color">
        تابع تقدم مشروعك خلال مراحل الاحتضان من المعسكر حتى المعرض النهائي
      </h1>

      {/* الـ Stepper يبدأ الآن من المعسكر متوافقاً مع الـ Backend */}
      <Stepper 
        steps={["المعسكر التدريبي", "تقييم اللجنة", "الاحتضان والمتابعة", "المعرض النهائي"]} 
        current={currentStageIndex}
        className="mt-4" 
      />

      <div className="container mt-10">
        {renderStageComponent()}
      </div>

    </div>
  );
};

export default IncubationStagesPage;