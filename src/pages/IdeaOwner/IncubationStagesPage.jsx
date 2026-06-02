import { useState } from "react"
import CampStage from "../../components/Incubation_Stages/CampStage"
import CommitteeStage from "../../components/Incubation_Stages/CommitteeStage"
import FollowupStage from "../../components/Incubation_Stages/FollowupStage"
import ExhibitionStage from "../../components/Incubation_Stages/ExhibitionStage"
import SubmitRequestStage from "../../components/Incubation_Stages/SubmitRequestStage"
import Stepper from "../../components/Stepper"

const IncubationStagesPage = () => {
  // المرحلة الحالية (0 → 4)
  const [currentStage, setCurrentStage] = useState(2)

  // الانتقال للمرحلة التالية
  const handleStageComplete = () => {
    setCurrentStage(prev => Math.min(prev + 1, 4))
  }

  // قائمة المراحل
  const stages = [
    <SubmitRequestStage onComplete={handleStageComplete} />,
    <CampStage onComplete={handleStageComplete} />,
    <CommitteeStage onComplete={handleStageComplete} committeeResult={null} />,
    <FollowupStage onComplete={handleStageComplete} notes={[]} allNotesResolved={false} />,
    <ExhibitionStage onComplete={handleStageComplete} />
  ]
  return (
    <div className="min-h-screen bg-white-color p-4 md:p-6 space-y-8 overflow-x-hidden">

      
      <h1 className="text-2xl font-bold text-main-color">
        تابع تقدم مشروعك خلال مراحل الاحتضان من المعسكر حتى المعرض النهائي
      </h1>

      {/* المراحل */}
      <Stepper 
        steps={["تقديم الطلب", "المعسكر", "تقييم اللجنة", "الاحتضان والمتابعة", "المعرض"]} 
        current={currentStage}
        className="mt-4" />

      {/* المرحلة الحالية */}
      <div className="container mt-10">
        {stages[currentStage]}
      </div>

    </div>
    )
}

export default IncubationStagesPage