 import React from "react";
// import { useParams } from "react-router-dom";
import InfoRow from "../../components/InfoRow";
// import { useGetIncubationRequestQuery } from "../../api/endpoints/incubationApi";

const IncubationRequestDetails = () => {
  // const { id } = useParams();

  // const { data: request, isLoading, error, refetch } = useGetIncubationRequestQuery(id);

  // التعديل هنا: تعديل الـ Mock Data لتطابق تماماً هيكلة الـ API الظاهرة في البوستمان
  const requestData = {
    project_title: "منصة لادارة المشاريع الريادية",
    editor_name: "alaa ali",
    product_type: "ويب",
    owner_name: "alaa ali",
    phone: "0994450204",
    specialization: null, // بناءً على البوستمان راجع null
    email: "alaa@gmail.com",
    idea_title: "منصة لادارة المشاريع الريادية",
    target_audience: "اصحاب الافكار الريادية",
    description: "منصة لتنظيم وادراة المشاريع في حاضنة تقانة المعلومات والاتصالات في حمص",
    problem: "hhhhhh",
    // تعديل 1: تحويل اسم الحقل من team إلى team_members وجعل العناصر تحتوي على name فقط لتطابق الباك إند
    team_members: [
      { name: "alaa ali" },
      { name: "hala ahmad" },
      { name: "hasan hasan" },
    ],
    // الحقل duration غير موجود بالباك إند، تركته بالـ Mock للاحتياط
    
  };

  // استخدام البيانات من API إذا وجدت، وإلا استخدام الثابتة
  const request = requestData;
  // const isLoading = false;
  // const error = null;

  // if (isLoading) {
  //   return (
  //     <div className="bg-white-color w-full min-h-screen pt-5">
  //       <div className="container text-center py-20">
  //         <p className="text-gray-500">جاري تحميل طلب الاحتضان...</p>
  //       </div>
  //     </div>
  //   );
  // }

  
  // if (error) {
  //   return (
  //     <div className="bg-white-color w-full min-h-screen pt-5">
  //       <div className="container text-center py-20">
  //         <p className="text-red-500 mb-3">حدث خطأ في تحميل طلب الاحتضان</p>
  //         <button
  //           onClick={refetch}
  //           className="bg-main-color text-white px-4 py-2 rounded"
  //         >
  //           إعادة المحاولة
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white-color w-full min-h-screen pt-5">
      <div className="container">
        {/* عنوان الصفحة */}
        <h1 className="text-2xl text-second-color font-bold mb-6">طلب الاحتضان</h1>

        {/* القسم الأول: معلومات عامة */}
        <div className="bg-white shadow-lg p-4 rounded-lg mb-4">
          <InfoRow label="اسم المشروع:">
            {request.project_title}
          </InfoRow>

          <InfoRow label="مسؤول التعديل (الثاني):">
            {request.editor_name}
          </InfoRow>

          <InfoRow label="نوع المنتج:">
            {request.product_type}
          </InfoRow>
        </div>

        {/* القسم الثاني: معلومات شخصية */}
        <div className="bg-white shadow-lg p-4 rounded-lg mb-4">
          <h2 className="border-b border-second-color text-xl font-bold mb-4">1. معلومات شخصية وقيادية</h2>
          
          <InfoRow label="الاسم:">
            {request.owner_name}
          </InfoRow>

          <InfoRow label="رقم الهاتف:">
            {request.phone}
          </InfoRow>

          <InfoRow label="الاختصاص:">
            {request.specialization || "غير محدد"}
          </InfoRow>

          <InfoRow label="البريد الإلكتروني:">
            {request.email}
          </InfoRow>
        </div>

        {/* القسم الثالث: أعضاء الفريق */}
        <div className="bg-white shadow-lg p-4 rounded-lg mb-4">
          <h2 className="border-b border-second-color text-xl font-bold mb-4">2. أعضاء الفريق</h2>
          
          {/* تعديل 2: القراءة من team_members بدلاً من team وتعديل طريقة العرض لتناسب عدم وجود إيميل */}
          {!request.team_members || request.team_members.length === 0 ? (
 <p className="text-gray-500 text-center py-4">لا يوجد أعضاء فريق</p>
          ) : (
            request.team_members.map((member, index) => (
              <InfoRow key={index} label={`العضو ${index + 1}:`}>
                {member.name}
              </InfoRow>
            ))
          )}
        </div>

        {/* القسم الرابع: معلومات الفكرة */}
        <div className="bg-white shadow-lg p-4 rounded-lg mb-2">
          <h2 className="border-b border-second-color text-xl font-bold mb-4">3. معلومات عن الفكرة</h2>
          <InfoRow label="عنوان الفكرة:">
            {request.idea_title}
          </InfoRow>

          <InfoRow label="القطاع المستهدف:">
            {request.target_audience}
          </InfoRow>

          <InfoRow label="وصف مختصر للفكرة:">
            {request.description}
          </InfoRow>

          <InfoRow label="المشكلة التي يحلها:">
            {request.problem}
          </InfoRow>

         
        </div>
      </div>
    </div>
  );
};

export default IncubationRequestDetails;