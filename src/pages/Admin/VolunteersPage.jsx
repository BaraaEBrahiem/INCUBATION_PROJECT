import { useState } from "react";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";

<<<<<<< HEAD
// import { useGetVolunteersQuery, useGetVolunteerRequestsQuery, useGetEvaluatorsQuery, useGetTeamRequestsQuery } from "../../api/endpoints/admin/volunteersOptionsApi.js";
=======
import {
  useGetVolunteersQuery,
  useGetVolunteerRequestsQuery,
  useGetEvaluatorsQuery,
  useGetTeamRequestsQuery,
} from "../../api/endpoints/admin/volunteersOptionsApi";
>>>>>>> adminFeature

import avatarDefault from "../../assets/images/avatar.jpg";

const VolunteersPage = () => {
<<<<<<< HEAD

  const [selected, setSelected] = useState("volunteers");

  const categories = [
    { id: "volunteers", label: "المتطوعين" },
    { id: "requests", label: "طلبات التطوع" },
    { id: "evaluators", label: "المقيمين" },
    { id: "user_requests", label: "طلبات المستخدمين" }
  ];

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
      full_name: "ايه العبود",
      avatar: "/images/user1.png",
      type: "user_request"
    },
    {
      id: 23,
      full_name: "حسين العبود",
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
=======
  const categories = [
    { id: "volunteers", label: "المتطوعين" },
    { id: "requests", label: "طلبات التطوع" },
    { id: "evaluators", label: "المقيمين" },
    { id: "user_requests", label: "طلبات المستخدمين" },
  ];

  const [selected, setSelected] =
    useState("volunteers");

  // ==========================
  // API Queries
  // ==========================

  const {
    data: volunteersResponse,
    isLoading: isLoadingVolunteers,
  } = useGetVolunteersQuery();

  const {
    data: requestsResponse,
    isLoading: isLoadingRequests,
  } =
    useGetVolunteerRequestsQuery();

  const {
    data: evaluatorsResponse,
    isLoading: isLoadingEvaluators,
  } = useGetEvaluatorsQuery();

  const {
    data: teamRequestsResponse,
    isLoading: isLoadingTeamRequests,
  } = useGetTeamRequestsQuery();

  // ==========================
  // Days translation
  // ==========================

  const daysMap = {
    SATURDAY: "السبت",
    SUNDAY: "الأحد",
    MONDAY: "الإثنين",
    TUESDAY: "الثلاثاء",
    WEDNESDAY: "الأربعاء",
    THURSDAY: "الخميس",
    FRIDAY: "الجمعة",
  };

  // ==========================
  // Format availability from API
  // ==========================

  const formatAvailability = (
    availability = []
  ) => {
    return availability.map(
      (slot) => {
        if (
          typeof slot !== "string"
        ) {
          return slot;
        }

        const [
          dayPart,
          timePart,
        ] = slot.split(": ");

        if (!timePart) {
          return {
            day:
              daysMap[
                dayPart
              ] || dayPart,
            start_time: "",
            end_time: "",
          };
        }

        const [
          start_time,
          end_time,
        ] = timePart.split(
          " - "
        );

        return {
          day:
            daysMap[
              dayPart
            ] || dayPart,
          start_time,
          end_time,
        };
      }
    );
  };

  // ==========================
  // Mock fallback data
  // ==========================

  const volunteersMockData = [
    {
      id: 1,
      full_name:
        "رانيا الأحمد",
      specialization:
        "UI/UX",
      avatar:
        avatarDefault,
      type: "volunteer",
      availability: [
        {
          day: "كل الأيام",
          start_time:
            "2:00pm",
          end_time:
            "4:00pm",
        },
      ],
    },
  ];

  // ==========================
  // Normalize API Data
  // ==========================

  const volunteersData =
    volunteersResponse?.map(
      (item) => ({
        id: item.id,

        full_name:
          item.name ||
          item.full_name,

        specialization:
          item.specialization ||
          item.primary_skills,

        avatar:
          item.avatar ||
          avatarDefault,

        availability:
          formatAvailability(
            item.availability
          ),

        type:
          "volunteer",
      })
    ) ||
    volunteersMockData;

  const requestsData =
    requestsResponse?.map(
      (item) => ({
        id: item.id,

        full_name:
          item.name ||
          item.full_name,

        specialization:
          item.specialization ||
          "متقدم بطلب تطوع",

        avatar:
          item.avatar ||
          avatarDefault,

        availability:
          formatAvailability(
            item.availability
          ),

        type: "request",
      })
    ) || [];

  const evaluatorsData =
    evaluatorsResponse?.map(
      (item) => ({
        id: item.id,

        full_name:
          item.name ||
          item.full_name,

        specialization:
          item.specialization ||
          "مقيم",

        avatar:
          item.avatar ||
          avatarDefault,

        availability:
          formatAvailability(
            item.availability
          ),

        type:
          "evaluator",
      })
    ) || [];

  const userRequestsData =
    teamRequestsResponse?.map(
      (item) => ({
        id: item.id,

        full_name:
          item.name ||
          item.full_name,

        avatar:
          item.avatar ||
          avatarDefault,

        type:
          "user_request",
      })
    ) || [];

  // ==========================
  // Current Data Selector
  // ==========================

  let currentData = [];

  switch (selected) {
    case "volunteers":
      currentData =
        volunteersData;
      break;

    case "requests":
      currentData =
        requestsData;
      break;

    case "evaluators":
      currentData =
        evaluatorsData;
      break;

    case "user_requests":
      currentData =
        userRequestsData;
      break;

    default:
      currentData = [];
  }

  // ==========================
  // Loading State
  // ==========================

  if (
    isLoadingVolunteers ||
    isLoadingRequests ||
    isLoadingEvaluators ||
    isLoadingTeamRequests
  ) {
    return (
      <div
        className="container p-6"
        dir="rtl"
      >
        <h2 className="text-3xl font-bold mb-6">
          إدارة المتطوعين
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(
            (i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 rounded-lg animate-pulse"
              />
            )
          )}
>>>>>>> adminFeature
        </div>
      </div>
    );
  }
<<<<<<< HEAD
  */

  return (
    <div className="container p-6" dir="rtl">
      <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>
=======

  return (
    <div
      className="container p-6"
      dir="rtl"
    >
      <h2 className="text-3xl font-bold mb-6">
        إدارة المتطوعين
      </h2>
>>>>>>> adminFeature

      <CategoryFilterBar
        categories={categories}
        selected={selected}
        onSelect={setSelected}
        className="bg-white-color"
      />

<<<<<<< HEAD
      {currentData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا يوجد {
            selected === "volunteers" ? "متطوعين" : 
            selected === "requests" ? "طلبات تطوع" : 
            selected === "evaluators" ? "مقيمين" : 
            "طلبات مستخدمين"
          } حالياً.
=======
      {currentData?.length ===
      0 ? (
        <div className="text-center py-10 text-gray-500">
          لا يوجد{" "}
          {selected ===
          "volunteers"
            ? "متطوعين"
            : selected ===
              "requests"
            ? "طلبات تطوع"
            : selected ===
              "evaluators"
            ? "مقيمين"
            : "طلبات مستخدمين"}{" "}
          حالياً.
>>>>>>> adminFeature
        </div>
      ) : (
        <ConsultantsList
          consultants={currentData}
          role="admin"
        />
      )}
    </div>
  );
};

export default VolunteersPage;