import React, { useState } from "react";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import { LuFileStack } from "react-icons/lu";
import ConsultationRequestCard from "../../components/ConsultationRequestCard";
import VolunteerRequestCard from "../../components/VolunteerRequestCard";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useGetAllRequestsQuery } from "../../api/endpoints/requestsApi";
import { useHandleConsultationDecisionMutation } from "../../api/endpoints/approvalApi";

const categories = [ 
  { id: "all", label: "الكل", icon: <LuFileStack /> },
  { id: "consultations", label: "طلبات الاستشارة", icon: <MdOutlinePersonSearch /> },
  { id: "volunteers", label: "طلبات التطوع", icon: <FaRegHandshake /> },
];

const VolunteerRequestsPage = () => {
  const [selected, setSelected] = useState("all");

  const formatHelpType = (helpType) => {
  switch (helpType) {
    case "ONE_TIME":
      return "استشارة لمرة واحدة";

    case "ONGOING":
      return "متابعة دورية";

    default:
      return helpType;
  }
};

  // TODO: بعد الربط هذا السطر بدل البيانات الثابتة
  const { data: requestsData, isLoading, error, refetch } = useGetAllRequestsQuery();
  const [handleDecision] = useHandleConsultationDecisionMutation();

  // -----------------------------
  // بيانات ثابتة حالياً 
  // -----------------------------


  // TODO: بعد الربط هذا الكود واستبدلي البيانات الثابتة
  const consultationRequests = requestsData?.consultations || [];
  const volunteerRequests = requestsData?.join_requests || [];

  const getErrorMessage = (error, fallbackMessage) => {
  return (
    error?.data?.detail ||
    error?.data?.message ||
    error?.data?.error ||
    fallbackMessage
  );
};

  // دوال الموافقة والرفض
const handleApprove = async (id) => {
  try {
    await handleDecision({
      id,
      action: "accept",
    }).unwrap();

    alert("تم قبول طلب الاستشارة بنجاح");

    refetch();

    return true;
  } catch (error) {
    console.error(error);

    alert(
      getErrorMessage(
        error,
        "حدث خطأ أثناء قبول طلب الاستشارة."
      )
    );

    return false;
  }
};


const handleReject = async (id) => {
  try {
    await handleDecision({
      id,
      action: "reject",
    }).unwrap();

    alert("تم رفض طلب الاستشارة.");

    refetch();

    return true;
  } catch (error) {
    console.error(error);

    alert(
      getErrorMessage(
        error,
        "حدث خطأ أثناء رفض طلب الاستشارة."
      )
    );

    return false;
  }
};

  // TODO: بعد الربط شغلي حالة التحميل والخطأ
   if (isLoading) {
     return (
       <div className="bg-white-color h-screen p-6">
         <div className="container text-center">
           <p className="text-gray-500 mt-20">جاري تحميل الطلبات...</p>
         </div>
       </div>
     );
   }

   if (error) {
     return (
       <div className="bg-white-color h-screen p-6">
         <div className="container text-center">
           <p className="text-red-500 mt-20">حدث خطأ في تحميل الطلبات</p>
           <button 
             onClick={refetch}
             className="bg-main-color text-white px-4 py-2 rounded mt-4"
           >
             إعادة المحاولة
           </button>
         </div>
       </div>
     );
   }

     return (  <div className=" min-h-screen bg-gray-100 p-6">
      <div className="container ">

        {/* شريط الفئات */}
        <CategoryFilterBar
          categories={categories}
          selected={selected}
          onSelect={setSelected}
          className="bg-white-color"
        />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* طلبات الاستشارة */}
          {selected === "consultations" &&
            consultationRequests.map((req) => (
              <ConsultationRequestCard
                key={req.id}
                request={{
                ...req,
                help_type: formatHelpType(req.help_type),
              }}
                onApprove={() => handleApprove(req.id, "consultation")}
                onReject={() => handleReject(req.id, "consultation")}
                mode="request"
              />
            ))}

          {/* طلبات التطوع */}
          {selected === "volunteers" &&
            volunteerRequests.map((req) => (
              <VolunteerRequestCard 
                key={req.id} 
                request={req}
              />
            ))}

          {/* الكل */}
          {selected === "all" && (
            <>
              {consultationRequests.map((req) => (
                <ConsultationRequestCard
                  key={req.id}
                  request={{
                    ...req,
                    help_type: formatHelpType(req.help_type),
                  }}
                  onApprove={() => handleApprove(req.id, "consultation")}
                  onReject={() => handleReject(req.id, "consultation")}
                  mode="request"
                />
              ))}

              {volunteerRequests.map((req) => (
                <VolunteerRequestCard 
                  key={req.id} 
                  request={req}
                />
              ))}
            </>
          )}
        </div>

        {/* في حال عدم وجود طلبات */}
        {selected === "all" && 
          consultationRequests.length === 0 && 
          volunteerRequests.length === 0 && (
            <p className="text-center text-gray-500 mt-20">لا توجد طلبات حالياً</p>
          )}
        
        {selected === "consultations" && consultationRequests.length === 0 && (
          <p className="text-center text-gray-500 mt-20">لا توجد طلبات استشارة حالياً</p>
        )}
        
        {selected === "volunteers" && volunteerRequests.length === 0 && (
          <p className="text-center text-gray-500 mt-20">لا توجد طلبات تطوع حالياً</p>
        )}
      </div>
    </div>
  ); 
};

export default VolunteerRequestsPage;