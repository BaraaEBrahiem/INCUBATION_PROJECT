import { useState } from "react";

import CategoryFilterBar from "../../components/CategoryFilterBar";
import ConsultantsList from "../../components/ConsultantsList";

import {
  useGetVolunteersQuery,
  useGetVolunteerRequestsQuery,
  useGetEvaluatorsQuery,
} from "../../api/endpoints/admin/volunteersOptionsApi";

const VolunteersPage = () => {
  const [selected, setSelected] =
    useState("volunteers");

  const categories = [
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