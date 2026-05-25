import { useEffect } from "react";
// import { useSelector } from "react-redux";
import ConsultationRequestBtn from "../ConsultationRequestBtn";
// import { useGetCommitteeEvaluationQuery } from "../../api/endpoints/incubationApi";
import NavLinkUniversal from '../../components/NavLinkUniversal';
const CommitteeStage = ({ onComplete, committeeResult }) => {
  // جلب userId من Redux
  // const userId = useSelector((state) => state.auth.userId);

  // TODO: بعد الربط هذا السطر بدل props committeeResult
  // const { data: evaluationData, isLoading, error, refetch } = useGetCommitteeEvaluationQuery(userId);
  // const committeeResult = evaluationData?.committeeResult;
  // const committeeDate = evaluationData?.committeeDate;
  // const committeeNote = evaluationData?.committeeNote;

  const committeeDate = "12/1/2025";
  const committeeNote = committeeResult 
    ? "تم استلام نتيجة اللجنة" 
    : "سيصلك إشعار بالنتيجة";

  // -----------------------------
  // الانتقال للمرحلة التالية عند وجود نتيجة اللجنة
  // -----------------------------
  useEffect(() => {
    if (committeeResult) {
      onComplete();
    }
  }, [committeeResult, onComplete]);

  // if (isLoading) {
  //   return (
  //     <div className="p-6 rounded-xl space-y-8 min-h-screen bg-white-color">
  //       <p className="text-center text-gray-500">جاري تحميل بيانات التقييم...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="p-6 rounded-xl space-y-8 min-h-screen bg-white-color">
  //       <p className="text-center text-red-500">حدث خطأ في تحميل البيانات</p>
  //       <button 
  //         onClick={refetch}
  //         className="bg-main-color text-white px-4 py-2 rounded mt-4 mx-auto block"
  //       >
  //         إعادة المحاولة
  //       </button>
  //     </div>
  //   );
  // }

   return (
    <div className="p-6 rounded-xl space-y-8 min-h-screen bg-white-color">
      {/* عنوان المرحلة */}
      <h2 className="text-2xl font-bold text-second-color">
        تقييم اللجنة
      </h2>

      {/* معلومات الحالة */}
      <div className="space-y-3 bg-white p-4 rounded-lg shadow-lg w-75 md:w-100">
        <p>
          <span className="font-bold pl-2">الحالة:</span>
          {committeeResult ? "تم التقييم" : "بانتظار التقييم"}
        </p>

        <p>
          <span className="font-bold pl-2">تاريخ جلسة اللجنة:</span> {committeeDate}
        </p>

        <p>
          <span className="font-bold pl-2">ملاحظة:</span> {committeeNote}
        </p>
      </div>

      {/* زر طلب الاستشارة */}
      <div className="flex">
        <NavLinkUniversal
          to="/consultation"
          className="bg-main-color text-white px-4 py-2 rounded mt-4 mx-auto block"
        >
          طلب استشارة
        </NavLinkUniversal>
      </div>
    </div>
  );
};

export default CommitteeStage;