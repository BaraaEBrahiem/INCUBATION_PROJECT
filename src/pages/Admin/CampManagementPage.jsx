import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CampHeader from "../../components/Admin_Dashboard/Camp-management/CampHeader";
import PageTabs from "../../components/Admin_Dashboard/PageTabs";
import AbsenceRequestsSection from "../../components/Admin_Dashboard/Camp-management/AbsenceRequestsSection";
import ParticipantsSection from "../../components/Admin_Dashboard/Camp-management/ParticipantsSection";
import SessionsSection from "../../components/Admin_Dashboard/Camp-management/SessionsSection";
import {useSelector} from "react-redux";
const CampManagementPage = () => {
  const [activeTab, setActiveTab] = useState("absence");
   const { id } = useParams();
  const tabs = [
    { id: "absence", label: "طلبات الغياب" },
    { id: "participants", label: "المشاركين" },
    { id: "sessions", label: "إدارة الجلسات" },
  ];
   const userRoles = useSelector((state) => state.auth?.roles || []);

  const isSecretary = userRoles.some(
    (role) => String(role).toLowerCase().trim() === "secretary"
  );
 const sectabs = isSecretary
    ? tabs.filter(cat => cat.id !== "participants")
    : tabs;

  return (
    <div className="container p-6">

    
      <CampHeader seasonId={id} />
  
      {/* التبويبات */}
      <PageTabs tabs={sectabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* محتوى التبويبات */}
      {activeTab === "absence" && <AbsenceRequestsSection />}
      {activeTab === "participants" && <ParticipantsSection />}
      {activeTab === "sessions" && <SessionsSection seasonId={id}/>}
    </div>
  );
};

export default CampManagementPage;
