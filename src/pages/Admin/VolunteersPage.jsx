import { useState } from "react";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";
import { useSelector } from "react-redux";

import {
  useGetVolunteersQuery,
  useGetVolunteerRequestsQuery,
  useGetEvaluatorsQuery,
  useGetadminTeamRequestsQuery,
} from "../../api/endpoints/admin/volunteersOptionsApi";

import avatarDefault from "../../assets/images/avatar.jpg";

const VolunteersPage = () => {
 
  const userRoles = useSelector((state) => state.auth?.roles || []);

  const isSecretary = userRoles.some(
    (role) => String(role).toLowerCase().trim() === "secretary"
  );

  const allCategories = [
    { id: "volunteers", label: "المتطوعين" },
    { id: "requests", label: "طلبات التطوع" },
    { id: "evaluators", label: "المقيمين" },
    { id: "user_requests", label: "طلبات المستخدمين" },
  ];

  const categories = isSecretary
    ? allCategories.filter(cat => cat.id !== "requests" && cat.id !== "user_requests")
    : allCategories;

  const [selected, setSelected] = useState("volunteers");

  // ==========================
  // API Queries (بدون أي تغيير)
  // ==========================

  const {
    data: volunteersResponse,
    isLoading: isLoadingVolunteers,
  } = useGetVolunteersQuery();

  const {
    data: requestsResponse,
    isLoading: isLoadingRequests,
  } = useGetVolunteerRequestsQuery();

  const {
    data: evaluatorsResponse,
    isLoading: isLoadingEvaluators,
  } = useGetEvaluatorsQuery();

  const {
    data: teamRequestsResponse,
    isLoading: isLoadingTeamRequests,
  } = useGetadminTeamRequestsQuery();

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

  const formatAvailability = (availability = []) => {
    return availability.map((slot) => {
      if (typeof slot !== "string") {
        return slot;
      }

      const [dayPart, timePart] = slot.split(": ");

      if (!timePart) {
        return {
          day: daysMap[dayPart] || dayPart,
          start_time: "",
          end_time: "",
        };
      }

      const [start_time, end_time] = timePart.split(" - ");

      return {
        day: daysMap[dayPart] || dayPart,
        start_time,
        end_time,
      };
    });
  };

  // ==========================
  // Mock fallback data
  // ==========================

  const volunteersMockData = [
    {
      id: 1,
      full_name: "رانيا الأحمد",
      specialization: "UI/UX",
      avatar: avatarDefault,
      type: "volunteer",
      availability: [
        {
          day: "كل الأيام",
          start_time: "2:00pm",
          end_time: "4:00pm",
        },
      ],
    },
  ];

  // ==========================
  // Normalize API Data
  // ==========================

  const volunteersData =
    volunteersResponse?.map((item) => ({
      id: item.id,
      full_name: item.name || item.full_name,
      primary_skills: item.specialization || item.primary_skills,
      avatar: item.avatar || avatarDefault,
      availability: formatAvailability(item.availability),
      type: "volunteer",
    })) || volunteersMockData;

  const requestsData =
    requestsResponse?.map((item) => ({
      id: item.id,
      full_name: item.name || item.full_name,
      primary_skills: item.primary_skills || "متقدم بطلب تطوع",
      avatar: item.avatar || avatarDefault,
      availability: formatAvailability(item.availability),
      type: "request",
    })) || [];

  const evaluatorsData =
    evaluatorsResponse?.map((item) => ({
      id: item.id,
      full_name: item.name || item.full_name,
      primary_skills: item.primary_skills || "مقيم",
      avatar: item.avatar || avatarDefault,
      availability: formatAvailability(item.availability),
      type: "evaluator",
    })) || [];

  const userRequestsData =
    teamRequestsResponse?.map((item) => ({
      id: item.id,
      full_name: item.name || item.full_name,
      avatar: item.avatar || avatarDefault,
      type: "user_request",
    })) || [];

  // ==========================
  // Current Data Selector
  // ==========================

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
      currentData = userRequestsData;
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
      <div className="container p-6" dir="rtl">
        <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container p-6" dir="rtl">
      <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>

      <CategoryFilterBar
        categories={categories}
        selected={selected}
        onSelect={setSelected}
        className="bg-white-color"
      />

      {currentData?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا يوجد{" "}
          {selected === "volunteers"
            ? "متطوعين"
            : selected === "requests"
            ? "طلبات تطوع"
            : selected === "evaluators"
            ? "مقيمين"
            : "طلبات مستخدمين"}{" "}
          حالياً.
        </div>
      ) : (
        <ConsultantsList 
          consultants={currentData} 
          role={isSecretary ? "secretary" : "admin"} 
        />
      )}
    </div>
  );
};

export default VolunteersPage;