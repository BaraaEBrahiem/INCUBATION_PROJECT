import { useState } from "react";

import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";

// import { useGetVolunteersQuery, useGetVolunteerRequestsQuery, useGetEvaluatorsQuery, useGetTeamRequestsQuery } from "../../api/endpoints/admin/volunteersOptionsApi.js";

const VolunteersPage = () => {
  const [selected, setSelected] =
    useState("volunteers");

  const categories = [
    { id: "volunteers", label: "المتطوعين" },
    { id: "requests", label: "طلبات التطوع" },
    { id: "evaluators", label: "المقيمين" },
    { id: "user_requests", label: "طلبات المستخدمين" }
  ];
   //eslint-disable-next-line
  const [selected, setSelected] = useState("volunteers");

  // const { data: volunteersData, isLoading: isLoadingVolunteers } = useGetVolunteersQuery();
  // const { data: requestsData, isLoading: isLoadingRequests } = useGetVolunteerRequestsQuery();
  // const { data: evaluatorsData, isLoading: isLoadingEvaluators } = useGetEvaluatorsQuery();
  // const { data: teamRequestsData, isLoading: isLoadingTeamRequests } = useGetTeamRequestsQuery(); 

  const volunteersData = [
    {
      id: 1,
      full_name: "رانيا الأحمد",
      primary_skills: "UI/UX",
      avatar: "/src/assets/images/avatar.jpg",
      type: "volunteer",
      availability: [
        { day: "كل الأيام", start_time: "2:00pm", end_time: "4:00pm" }
      ]
    },
    {
      id: 2,
      full_name: "محمد علي",
      primary_skills: "تطوير برمجيات",
      avatar: "/src/assets/images/avatar.jpg",
      type: "volunteer",
      availability: [
        { day: "كل الأيام", start_time: "10:00am", end_time: "2:00pm" }
      ]
    },
  ];

  const requestsData = [
    {
      id: 10,
      full_name: "أحمد علي",
      primary_skills: "متقدم بطلب تطوع",
      avatar: "/images/user1.png",
      type: "request",
      availability: []
    },
    {
      id: 11,
      full_name: "نورا حسن",
      primary_skills: "متقدم بطلب تطوع",
      avatar: "/images/user1.png",
      type: "request",
      availability: []
    },
  ];

  const evaluatorsData = [
    {
      id: 20,
      full_name: "خالد يوسف",
      primary_skills: "مقيم مشاريع",
      avatar: "/images/user1.png",
      type: "evaluator",
      availability: []
    },
    {
      id: 21,
      full_name: "سارة أحمد",
      primary_skills: "مقيم تقني",
      avatar: "/images/user1.png",
      type: "evaluator",
      availability: []
    },
  ];
  
  const userRequestsData = [
    {
      id: 22,
      name: "ايه العبود",
      avatar: "/images/user1.png",
      type: "user_request"
    },
    {
      id: 23,
      name: "حسين العبود",
      avatar: "/images/user1.png",
      type: "user_request"
    },
  ];

  let currentData = [];

  switch (selected) {
    case "volunteers":
      currentData = volunteersData; 
      break;
    case "requests":
      currentData = requestsData;
      break;
    case "evaluators":
      currentData = evaluatorsData;
      break;
    case "user_requests":
      currentData = userRequestsData; // عند الربط ستصبح: currentData = teamRequestsData || [];
      break;
    default:
      currentData = [];
  }

  /*
  if (isLoadingVolunteers || isLoadingRequests || isLoadingEvaluators || isLoadingTeamRequests) {
    return (
      <div className="container p-6" dir="rtl">
        <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  */

  return (
    <div className="container p-6" dir="rtl">
      <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>

      <CategoryFilterBar
        categories={
          categories
        }
        selected={
          selected
        }
        onSelect={
          setSelected
        }
        className="bg-white-color"
      />

      {currentData.length ===
      0 ? (
        <div className="text-center py-10 text-gray-500">
          لا يوجد {selected === "volunteers" ? "متطوعين" : selected === "requests" ? "طلبات تطوع" : selected === "evaluators" ? "مقيمين" : "طلبات مستخدمين"} حالياً.
        </div>
      ) : (
        <ConsultantsList
          consultants={
            currentData
          }
          role="admin"
        />
      )}
    </div>
  );
};

export default VolunteersPage;