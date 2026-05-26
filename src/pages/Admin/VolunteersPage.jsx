import { useState } from "react";

import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";

<<<<<<< HEAD
// import { useGetVolunteersQuery, useGetVolunteerRequestsQuery, useGetEvaluatorsQuery } from "../../api/endpoints/admin/volunteersOptionsApi.js";
=======
import {
  useGetVolunteersQuery,
  useGetVolunteerRequestsQuery,
  useGetEvaluatorsQuery,
} from "../../api/endpoints/admin/volunteersOptionsApi";
>>>>>>> 0e04d4dbb466e862bda0a2a52d87e4d2d3157442

const VolunteersPage = () => {
  const [selected, setSelected] =
    useState("volunteers");

  const categories = [
<<<<<<< HEAD
    { id: "volunteers", label: "المتطوعين" },
    { id: "requests", label: "طلبات التطوع" },
    { id: "evaluators", label: "المقيمين" },
    {id: "user_requests" , label: "طلبات المستخدمين"}
  ];

  const [selected, setSelected] = useState("volunteers");

  // const { data: volunteersData, isLoading: isLoadingVolunteers } = useGetVolunteersQuery();
  // const { data: requestsData, isLoading: isLoadingRequests } = useGetVolunteerRequestsQuery();
  // const { data: evaluatorsData, isLoading: isLoadingEvaluators } = useGetEvaluatorsQuery();

  const volunteersData = [
    {
      id: 1,
      name: "رانيا الأحمد",
      specialty: "UI/UX",
      activeTime: "2:00pm إلى 4:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "volunteer",
    },
    {
      id: 2,
      name: "محمد علي",
      specialty: "تطوير برمجيات",
      activeTime: "10:00am إلى 2:00pm",
      image: "/src/assets/images/avatar.jpg",
      type: "volunteer",
    },
  ];

  const requestsData = [
    {
      id: 10,
      name: "أحمد علي",
      specialty: "متقدم بطلب تطوع",
      activeTime: "—",
      image: "/images/user1.png",
      type: "request",
    },
    {
      id: 11,
      name: "نورا حسن",
      specialty: "متقدم بطلب تطوع",
      activeTime: "—",
      image: "/images/user1.png",
      type: "request",
    },
  ];

  const evaluatorsData = [
    {
      id: 20,
      name: "خالد يوسف",
      specialty: "مقيم مشاريع",
      activeTime: "—",
      image: "/images/user1.png",
      type: "evaluator",
    },
    {
      id: 21,
      name: "سارة أحمد",
      specialty: "مقيم تقني",
      activeTime: "—",
      image: "/images/user1.png",
      type: "evaluator",
    },
    
  ];
  
const userRequestsData = [
    {
      id: 22,
      name: "ايه العبود",
      specialty: "طلب صاحب الفكرة اقتراح فريق له",
      image: "/images/user1.png",
      type: "user_request", 
    },
    {
      id: 23,
      name: "حسين العبود",
      specialty: "طلب صاحب الفكرة اقتراح فريق له",
      image: "/images/user1.png",
      type: "user_request", 
    },
];
  // تحديد البيانات حسب التبويب المختار
  let currentData = [];
  // let isLoading = false;

  switch (selected) {
    case "volunteers":
      currentData = volunteersData;
      // isLoading = false; //  isLoadingVolunteers
      break;
    case "requests":
      currentData = requestsData;
      // isLoading = false; //  isLoadingRequests
      break;
    case "evaluators":
      currentData = evaluatorsData;
      // isLoading = false; //  isLoadingEvaluators
      break;
    case "user_requests":
      currentData = userRequestsData;
      break;
    default:
      currentData = [];
=======
    {
      id: "volunteers",
      label: "المتطوعين",
    },
    {
      id: "requests",
      label: "طلبات التطوع",
    },
    {
      id: "evaluators",
      label: "المقيمين",
    },
  ];

  // =========================
  // API
  // =========================

  const volunteersQuery =
    useGetVolunteersQuery();

  const requestsQuery =
    useGetVolunteerRequestsQuery();

  const evaluatorsQuery =
    useGetEvaluatorsQuery();

  // =========================
  // Normalize Response
  // =========================

  const normalizeData = (
    response
  ) => {
    if (!response)
      return [];

    // إذا رجع array مباشرة
    if (
      Array.isArray(
        response
      )
    ) {
      return response;
    }

    // DRF pagination
    if (
      Array.isArray(
        response?.results
      )
    ) {
      return response.results;
    }

    // data wrapper
    if (
      Array.isArray(
        response?.data
      )
    ) {
      return response.data;
    }

    return [];
  };

  // =========================
  // Current tab data
  // =========================

  const tabConfig = {
    volunteers: {
      query:
        volunteersQuery,
      emptyText:
        "لا يوجد متطوعون حالياً",
    },

    requests: {
      query:
        requestsQuery,
      emptyText:
        "لا توجد طلبات تطوع حالياً",
    },

    evaluators: {
      query:
        evaluatorsQuery,
      emptyText:
        "لا يوجد مقيمون حالياً",
    },
  };

  const currentTab =
    tabConfig[
      selected
    ];

  const {
    data,
    isLoading,
    error,
    refetch,
  } = currentTab.query;

  const currentData =
    normalizeData(
      data
    );

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return (
      <div className="container p-6">
        <h2 className="text-3xl font-bold mb-6">
          إدارة المتطوعين
        </h2>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map(
            (i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 rounded-lg animate-pulse"
              />
            )
          )}
        </div>
      </div>
    );
>>>>>>> 0e04d4dbb466e862bda0a2a52d87e4d2d3157442
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <div className="container p-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          إدارة المتطوعين
        </h2>

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

        <div className="mt-10">
          <p className="text-red-500 mb-4">
            حدث خطأ أثناء
            تحميل البيانات
          </p>

          <button
            onClick={
              refetch
            }
            className="px-4 py-2 bg-main-color text-white rounded-lg"
          >
            إعادة
            المحاولة
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-bold mb-6">
        إدارة المتطوعين
      </h2>

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
          {
            currentTab.emptyText
          }
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