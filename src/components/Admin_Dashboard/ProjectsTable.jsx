import React, {
  useState,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import EvaluatorsModal from "./Evaluation-management/EvaluatorsModal";

import {
  useGetIncubatedProjectsQuery,
  useGetIncubationEvaluatorsQuery,
} from "../../api/endpoints/publicProjectsApi";

export default function ProjectsTable({
  onOpenScheduleModal,
  onSelectProject,
}) {
  const navigate =
    useNavigate();

  const {
    data: projectsFromApi,
    isLoading,
    error,
    refetch,
  } =
    useGetIncubatedProjectsQuery();

  const [
    selectedProjectId,
    setSelectedProjectId,
  ] = useState(null);

  const [
    modals,
    setModals,
  ] = useState({
    evals: false,
    data: [],
  });

  // جلب المقيمين للمشروع المحدد
  const {
    data:
      evaluatorsFromApi = [],
  } =
    useGetIncubationEvaluatorsQuery(
      selectedProjectId,
      {
        skip:
          !selectedProjectId,
      }
    );

  // تجهيز البيانات
  let projectsList =
    Array.isArray(
      projectsFromApi
    )
      ? projectsFromApi
      : [];

  if (
    projectsFromApi?.results
  ) {
    projectsList =
      projectsFromApi.results;
  }

  if (
    projectsFromApi?.data
  ) {
    projectsList =
      projectsFromApi.data;
  }

  // تحديث مودال المقيمين
  useEffect(() => {
    if (
      evaluatorsFromApi &&
      modals.evals
    ) {
      setModals(
        (prev) => ({
          ...prev,
          data:
            Array.isArray(
              evaluatorsFromApi
            )
              ? evaluatorsFromApi
              : evaluatorsFromApi?.results ||
                evaluatorsFromApi?.data ||
                [],
        })
      );
    }
  }, [
    evaluatorsFromApi,
    modals.evals,
  ]);

  // فتح مودال المقيمين
  const openEvaluators = (
    projectId
  ) => {
    setSelectedProjectId(
      projectId
    );

    setModals({
      evals: true,
      data: [],
    });
  };

  // فتح تفاصيل المشروع
  const openProjectDetails = (
    projectId
  ) => {
    navigate(
      `/projectinfo/${projectId}`
    );
  };

  // تحديد المشروع من السطر
  const selectProject = (
    projectId
  ) => {
    setSelectedProjectId(
      projectId
    );

    onSelectProject?.(
      projectId
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        جاري تحميل
        المشاريع...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-3">
          حدث خطأ في تحميل
          المشاريع
        </p>

        <button
          onClick={refetch}
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();

              openProjectDetails(
                row.idea_id
              );
            }}
            className="bg-main-color text-white px-4 py-2 rounded-lg text-sm"
          >
            عرض التفاصيل
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();

              onOpenScheduleModal?.(
                row.idea_id
              );
            }}
            className="bg-main-color text-white px-4 py-2 rounded-lg text-sm"
          >
            جدولة جلسة متابعة
          </button>
        </div>
      ),
    },

    {
      key:
        "progress_status",
      label:
        "الوضع الحالي للمشروع",
      render: (row) => (
        <span className="font-bold text-green-700">
          {row.progress_status ||
            "-"}
        </span>
      ),
    },

    {
      key:
        "evaluators",
      label:
        "المقيمون الحاليون",
      render: (row) => (
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();

            openEvaluators(
              row.idea_id
            );
          }}
        >
          عرض
        </span>
      ),
    },

    {
      key:
        "next_meeting",
      label:
        "تاريخ التقييم القادم",
      render: (row) => (
        <span>
          {row.next_meeting ||
            "لم يتم تحديد موعد"}
        </span>
      ),
    },

    {
      key: "title",
      label:
        "اسم المشروع",
      render: (row) => (
        <span>
          {row.title ||
            "-"}
        </span>
      ),
    },
  ];

  return (
    <div
      className="p-4"
      dir="rtl"
    >
      <DataTable
        columns={columns}
        data={projectsList}
        selectedRowId={
          selectedProjectId
        }
        onRowClick={
          selectProject
        }
      />

      <EvaluatorsModal
        isOpen={
          modals.evals
        }
        onClose={() =>
          setModals(
            (prev) => ({
              ...prev,
              evals: false,
            })
          )
        }
        evaluators={
          modals.data
        }
      />
    </div>
  );
}