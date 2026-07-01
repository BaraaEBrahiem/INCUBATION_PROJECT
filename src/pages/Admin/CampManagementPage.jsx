import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CampHeader from "../../components/Admin_Dashboard/Camp-management/CampHeader";
import PageTabs from "../../components/Admin_Dashboard/PageTabs";
import AbsenceRequestsSection from "../../components/Admin_Dashboard/Camp-management/AbsenceRequestsSection";
import ParticipantsSection from "../../components/Admin_Dashboard/Camp-management/ParticipantsSection";
import SessionsSection from "../../components/Admin_Dashboard/Camp-management/SessionsSection";
const CampManagementPage = () => {
  const [activeTab, setActiveTab] = useState("absence");
   const { id } = useParams();
  const tabs = [
    { id: "absence", label: "طلبات الغياب" },
    { id: "participants", label: "المشاركين" },
    { id: "sessions", label: "إدارة الجلسات" },
  ];

return (
    // 🎯 أعدنا container p-6 الأصلي الخاص بكِ ليعود اللابتوب كما كان تماماً دون أي تغيير بكسل واحد
    // 🎯 وأضفنا max-w-full مع overflow-x-auto ليسمح لكِ بتحريك وتمرير التبويبات والجداول بحرية على الموبايل
    <div className="container p-6 max-w-full overflow-x-auto">

      {/* الهيدر */}
      <CampHeader seasonId={id} />

      {/* التبويبات */}
      <PageTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* محتوى التبويبات */}
      {activeTab === "absence" && <AbsenceRequestsSection />}
      {activeTab === "participants" && <ParticipantsSection />}
      {activeTab === "sessions" && <SessionsSection seasonId={id}/>}
    </div>
  );
};
export default CampManagementPage;
