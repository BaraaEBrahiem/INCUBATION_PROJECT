import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VolunteerRequestDetails from "../../components/VolunteerRequestDetails";
// import { useGetVolunteerRequestByIdQuery } from "../../api/endpoints/requestsApi";
// import { useApproveMutation, useRejectMutation } from "../../api/endpoints/approvalApi";
// import { showSuccess, showError } from "../../Utils/toast";

const VolunteerRequestDetailsPage = () => {
  const { id } = useParams();

  //  كود الـ API الحقيقي (يُفعل عند الربط الفعلي بدل الـ useState والـ useEffect)
  // const { data: apiData, isLoading, error, refetch } = useGetVolunteerRequestByIdQuery(id);
  // const [approveRequest, { isLoading: isApproving }] = useApproveMutation();
  // const [rejectRequest, { isLoading: isRejecting }] = useRejectMutation();

  const [request, setRequest] = useState(null);
//----------------------------------------------------------
  useEffect(() => {
    const fetchRequest = () => {
     
      const apiResponseMock = {
        requester: {
          name: "alaa ali",
          email: "alaa@gmail.com",
        },
        project: {
          title: "منصة لادارة المشاريع الريادية",
          target_audience: "اصحاب الافكار الريادية",
          problem: "hhhhhh",
        },
        request: {
          required_skill: "ui_ux",
          tasks: "رسم واجهات",
          description: "منصة لتنظيم وادراة المشاريع في حاضنة تقانة المعلومات والاتصالات في حمص",
        }
      };

      const formattedRequest = {
        id: id,
        name: apiResponseMock.requester.name,
        email: apiResponseMock.requester.email,
        skill: apiResponseMock.request.required_skill,
        targetGroup: apiResponseMock.project.target_audience,
        projectTitle: apiResponseMock.project.title,
        tasks: apiResponseMock.request.tasks,
        ideaSummary: apiResponseMock.request.description,
        problem: apiResponseMock.project.problem,
      };

      setRequest(formattedRequest);
    };

    fetchRequest();
  }, [id]);

  // -------------------------------------------------------------
  // دالة الموافقة (محاكاة حالياً + الكود الحقيقي في تعليقات)
  // -------------------------------------------------------------
  const approveVolunteer = async () => {
    /* 
    try {
      await approveRequest({ type: "volunteer", id }).unwrap();
      showSuccess("تم قبول طلب التطوع بنجاح");
      refetch();
    } catch (err) {
      console.error("Error approving request:", err);
      showError(err?.data?.message || "حدث خطأ في قبول الطلب");
    }
    */

    console.log("تمت الموافقة على طلب التطوع (محاكاة محلياً) للـ ID:", id);
    alert("تم قبول طلب التطوع بنجاح (محاكاة)");
  };

  // -------------------------------------------------------------
  // دالة الرفض (محاكاة حالياً + الكود الحقيقي في تعليقات)
  // -------------------------------------------------------------
  const rejectVolunteer = async () => {
    const reasonText = prompt("الرجاء إدخال سبب الرفض:");
    if (!reasonText || !reasonText.trim()) return;

    /* 
    try {
      await rejectRequest({ type: "volunteer", id, reason: reasonText }).unwrap();
      showSuccess("تم رفض طلب التطوع");
      refetch();
    } catch (err) {
      console.error("Error rejecting request:", err);
      showError(err?.data?.message || "حدث خطأ في رفض الطلب");
    }
    */

    console.log("تم رفض طلب التطوع (محاكاة محلياً) بسبب:", reasonText);
    alert(`تم رفض طلب التطوع بنجاح (محاكاة) بسب: ${reasonText}`);
  };

  /*
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
  */

  if (!request) return <p className="text-center text-gray-500 mt-20">جاري التحميل...</p>;

  return (
    <div className="bg-white-color min-h-screen p-6" dir="rtl">
      <div className="container">
        <h1 className="text-3xl text-second-color font-bold mb-6">تفاصيل طلب التطوع</h1>
        
        <VolunteerRequestDetails
          request={request}
          onApprove={approveVolunteer}
          onReject={rejectVolunteer}
          // isActionLoading={isApproving || isRejecting} // يمرر عند الربط الفعلي لمنع النقر المتكرر
        />
      </div>
    </div>
  );
};

export default VolunteerRequestDetailsPage;