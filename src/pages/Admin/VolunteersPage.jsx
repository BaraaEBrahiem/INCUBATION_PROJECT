 import { useState } from "react";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";
import {
  useGetVolunteersQuery,
  useGetVolunteerRequestsQuery,
  useGetEvaluatorsQuery,
} from "../../api/endpoints/admin/volunteersOptionsApi";

const VolunteersPage = () => {
  const [selected, setSelected] = useState("volunteers");

  // التبويبات كاملة
  const categories = [
    { id: "volunteers", label: "المتطوعين" },
    { id: "requests", label: "طلبات التطوع" },
    { id: "evaluators", label: "المقيمين" },
    { id: "user_requests", label: "طلبات المستخدمين" }
  ];

  // =========================
  // البيانات الوهمية المخصصة (مننوشك)
  // =========================
  const localVolunteersData = [
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

  const localRequestsData = [
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

  const localEvaluatorsData = [
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
  
  const localUserRequestsData = [
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

  // =========================
  // API Queries
  // =========================
  const volunteersQuery = useGetVolunteersQuery();
  const requestsQuery = useGetVolunteerRequestsQuery();
  const evaluatorsQuery = useGetEvaluatorsQuery();

  // =========================
  // Normalize Response
  // =========================
  const normalizeData = (response, fallbackData) => {
    if (!response) return fallbackData; // إذا لم تتوفر بيانات الـ API، نستخدم بياناتك المحلية
    if (Array.isArray(response)) return response.length > 0 ? response : fallbackData;
    if (Array.isArray(response?.results)) return response.results.length > 0 ? response.results : fallbackData;
    if (Array.isArray(response?.data)) return response.data.length > 0 ? response.data : fallbackData;
    return fallbackData;
  };

  // =========================
  // Current tab configuration
  // =========================
  const tabConfig = {
    volunteers: {
      query: volunteersQuery,
      localData: localVolunteersData,
      emptyText: "لا يوجد متطوعون حالياً",
    },
    requests: {
      query: requestsQuery,
      localData: localRequestsData,
      emptyText: "لا توجد طلبات تطوع حالياً",
    },
    evaluators: {
      query: evaluatorsQuery,
      localData: localEvaluatorsData,
      emptyText: "لا يوجد مقيمون حالياً",
    },
    user_requests: {
      query: { data: null, isLoading: false, error: null, refetch: () => {} }, // لعدم وجود API حالياً لها
      localData: localUserRequestsData,
      emptyText: "لا توجد طلبات مستخدمين حالياً",
    },
  };
 const currentTab = tabConfig[selected] || tabConfig["volunteers"];
  const { data, isLoading, error, refetch } = currentTab.query;
  
  // دمج ذكي: يعرض الـ API أولاً، وإن لم يجد، يعرض بياناتك المحلية مباشرة
  const currentData = normalizeData(data, currentTab.localData);

  // =========================
  // Loading State
  // =========================
  if (isLoading) {
    return (
      <div className="container p-6">
        <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>
        <CategoryFilterBar
          categories={categories}
          selected={selected}
          onSelect={setSelected}
          className="bg-white-color"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // =========================
  // Error State
  // =========================
  if (error) {
    return (
      <div className="container p-6 text-center">
        <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>
        <CategoryFilterBar
          categories={categories}
          selected={selected}
          onSelect={setSelected}
          className="bg-white-color"
        />
        <div className="mt-10">
          <p className="text-red-500 mb-4">حدث خطأ أثناء تحميل البيانات</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-main-color text-white rounded-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // Main UI
  // =========================
  return (
    <div className="container p-6">
      <h2 className="text-3xl font-bold mb-6">إدارة المتطوعين</h2>

      <CategoryFilterBar
        categories={categories}
        selected={selected}
        onSelect={setSelected}
        className="bg-white-color"
      />

      {currentData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {currentTab.emptyText}
        </div>
      ) : (
        <ConsultantsList consultants={currentData} role="admin" />
      )}
    </div>
  );
};

export default VolunteersPage;