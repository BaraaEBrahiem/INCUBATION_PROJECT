import React, { useState } from "react";
import CurrentTeamList from "../../components/CurrentTeamList";
import SuggestedVolunteersList from "../../components/SuggestedVolunteerList";
// import { useGetTeamQuery, useGetSuggestedVolunteersQuery } from "../../api/endpoints/teamApi";

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState("current");

  // TODO: بعد الربط هذا السطر بدل البيانات الثابتة
  // const { data: teamData, isLoading: isTeamLoading, error: teamError } = useGetTeamQuery();
  // const { data: suggestedData, isLoading: isSuggestedLoading, error: suggestedError } = useGetSuggestedVolunteersQuery();

  // -----------------------------
  // تعديل: بيانات ثابتة تطابق تماماً هيكلية الـ API الظاهرة في البوستمان
  // -----------------------------
  const apiTeamMock = {
    has_team: true,
    current_team: [
      { id: 3, name: "hala ahmad", email: "hala@gmail.com", can_message: true },
      { id: 4, name: "hasan hasan", email: "hasan@gmail.com", can_message: true },
    ]
  };

  // تعديل 1: قراءة المتغيرات من الـ Mock بنفس المسميات المتوقعة من الباك إند (Snake Case)
  const hasTeam = apiTeamMock?.has_team || false;
  const currentTeam = apiTeamMock?.current_team || [];

  // تعديل 2: تحديث مصفوفة المتطوعين المقترحين لتطابق مخرجات الباك إند الحقيقي (primary_skill)
  const suggestedVolunteersMock = [
    { id: 3, name: "hala ahmad", email: "hala@gmail.com", primary_skill: "backend" },
    { id: 4, name: "hasan hasan", email: "hasan@gmail.com", primary_skill: "frontend" },
  ];

  // مواءمة برمجية سريعة لضمان التوافق مع الكومبوننت الحالي إذا كان يتوقع كلمة role
  const adaptedSuggestedVolunteers = suggestedVolunteersMock.map(vol => ({
    ...vol,
    role: vol.primary_skill // تحويل داخلي آمن ليعمل كرتك الحالي فوراً
  }));

  // -------------------------------------------------------------
  // T0D0: بعد الربط الفعلي مع الـ API، الكود الصحيح لاستخراج البيانات
  // -------------------------------------------------------------
  // const hasTeam = teamData?.has_team || false;
  // const currentTeam = teamData?.current_team || [];
  // // لو الـ API تبع المتطوعين بيرجع مصفوفة مباشرة كما بالصورة:
  // const suggestedVolunteers = suggestedData ? suggestedData.map(vol => ({ ...vol, role: vol.primary_skill })) : [];

  // TODO: بعد الربط حالة التحميل والخطأ
  // if (isTeamLoading || isSuggestedLoading) {
  //   return (
  //     <div className="container py-6">
  //       <p className="text-center text-gray-500 mt-20">جاري تحميل البيانات...</p>
  //     </div>
  //   );
  // }

  // if (teamError || suggestedError) {
  //   return (
  //     <div className="container py-6">
  //       <p className="text-center text-red-500 mt-20">حدث خطأ في تحميل البيانات</p>
  //     </div>
  //   );
  // }

  return (
    <div className="container py-6" dir="rtl">
      <h1 className="text-3xl font-bold text-second-color mb-6">الفريق</h1>

      {/* التبويبات */}
      <div className="flex gap-4 mb-6">
        {/* تبويب الفريق الحالي */}
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-2 rounded-xl border cursor-pointer ${
            activeTab === "current" ? "bg-second-color text-white font-bold" : "bg-white"
          }`}
        >
          الفريق الحالي
        </button>

        {/* تبويب المتطوعين المقترحين يظهر فقط إذا صاحب الفكرة ليس لديه فريق */}
        {!hasTeam && (
          <button
            onClick={() => setActiveTab("suggested")}
            className={`px-4 py-2 rounded-xl border cursor-pointer ${
              activeTab === "suggested" ? "bg-second-color text-white font-bold" : "bg-white"
            }`}
          >
            المتطوعون المقترحون
          </button>
        )}
      </div>

      {/* المحتوى */}
      {activeTab === "current" ? (
        <CurrentTeamList members={currentTeam} />
      ) : (
        <SuggestedVolunteersList volunteers={adaptedSuggestedVolunteers} />
      )}
    </div>
  );
};

export default TeamPage;