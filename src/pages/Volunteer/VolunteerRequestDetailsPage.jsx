import { useParams } from "react-router-dom";
import VolunteerRequestDetails from "../../components/VolunteerRequestDetails";
import { useGetVolunteerRequestByIdQuery } from "../../api/endpoints/requestsApi";
import { 
  useHandleJoinRequestDecisionMutation 
} from "../../api/endpoints/approvalApi";

const VolunteerRequestDetailsPage = () => {
  const { id } = useParams();

  //  كود الـ API الحقيقي (يُفعل عند الربط الفعلي بدل الـ useState والـ useEffect)
  // const { data: apiData, isLoading, error, refetch } = useGetVolunteerRequestByIdQuery(id);
  // const [approveRequest, { isLoading: isApproving }] = useApproveMutation();
  // const [rejectRequest, { isLoading: isRejecting }] = useRejectMutation();
  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useGetVolunteerRequestByIdQuery(id);

  const [handleDecision, { isLoading: isActionLoading }] =
    useHandleJoinRequestDecisionMutation();
 

      // تجهيز البيانات للواجهة
const request = apiData
  ? {
      id,

      name: apiData.requester?.name,
      email: apiData.requester?.email,

      required_skill: apiData.request?.required_skill,

      target_audience: apiData.project?.target_audience,

      title: apiData.project?.title,

      tasks: apiData.request?.tasks,

      description: apiData.request?.description,

      problem: apiData.project?.problem,
    }
  : null;

//----------------------------------------------------------
 
// قبول الطلب
  const approveVolunteer = async () => {
    try {

      await handleDecision({
        id,
        action: "accept",
      }).unwrap();

      alert("تم قبول طلب التطوع بنجاح");

      refetch();

    } catch (err) {
      console.error(err);
      alert("حدث خطأ في قبول الطلب");
    }
  };

  // رفض الطلب
  const rejectVolunteer = async () => {
    try {

      await handleDecision({
        id,
        action: "reject",
      }).unwrap();

      alert("تم رفض طلب التطوع");

      refetch();

    } catch (err) {
      console.error(err);
      alert("حدث خطأ في رفض الطلب");
    }
  };



  
  if (isLoading) {
    return (
      <div className="bg-white-color h-screen p-6" dir="rtl">
        <div className="container text-center">
          <p className="text-gray-500 mt-20 font-bold">جاري تحميل بيانات الطلب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white-color h-screen p-6" dir="rtl">
        <div className="container text-center">
          <p className="text-red-500 mt-20 font-bold">حدث خطأ في تحميل بيانات الطلب</p>
          <button onClick={refetch} className="bg-main-color text-white px-4 py-2 rounded mt-4">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }
  

  if (!request) return <p className="text-center text-gray-500 mt-20">جاري التحميل...</p>;

  return (
    <div className="bg-white-color min-h-screen p-6" dir="rtl">
      <div className="container">
        <h1 className="text-3xl text-second-color font-bold mb-6">تفاصيل طلب التطوع</h1>
        
        <VolunteerRequestDetails
          request={request}
          onApprove={approveVolunteer}
          onReject={rejectVolunteer}
          isActionLoading={isActionLoading}// يمرر عند الربط الفعلي لمنع النقر المتكرر
        />
      </div>
    </div>
  );
};

export default VolunteerRequestDetailsPage;