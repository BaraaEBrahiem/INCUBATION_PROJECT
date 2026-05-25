import React from "react";

import {
  useNavigate,
} from "react-router-dom";

import DataTable from "./DataTable";
import EvaluatorsModal from "./Evaluation-management/EvaluatorsModal";

import {
  useGetIncubatedProjectsQuery,
} from "../../api/endpoints/publicProjectsApi";

import {
  useGetEvaluatorsForMeetingQuery,
} from "../../api/endpoints/evaluationApi";

export default function ProjectsTable({
  onOpenScheduleModal,
  selectedProjectId,
  onSelectProject,
}) {
  const navigate =
    useNavigate();

  // ======================
  // State
  // ======================

  const [
    modals,
    setModals,
  ] = React.useState({
    evals: false,
  });

  // ======================
  // API
  // ======================

  const {
    data:
      projectsFromApi,
    isLoading,
    error,
    refetch,
  } =
    useGetIncubatedProjectsQuery();

  const {
    data:
      evaluatorsFromApi,
    isLoading:
      evaluatorsLoading,
  } =
    useGetEvaluatorsForMeetingQuery(
      selectedProjectId,
      {
        skip:
          !selectedProjectId,
      }
    );

  // ======================
  // Projects Data
  // ======================

  let projectsList =
    [];

  if (
    Array.isArray(
      projectsFromApi
    )
  ) {
    projectsList =
      projectsFromApi;
  }

  if (
    projectsFromApi
      ?.results &&
    Array.isArray(
      projectsFromApi.results
    )
  ) {
    projectsList =
      projectsFromApi.results;
  }

  if (
    projectsFromApi
      ?.data &&
    Array.isArray(
      projectsFromApi.data
    )
  ) {
    projectsList =
      projectsFromApi.data;
  }

  // ======================
  // Actions
  // ======================

  const openEvaluators =
    (
      projectId
    ) => {
      onSelectProject?.(
        projectId
      );

      setModals({
        evals: true,
      });
    };

  const closeEvaluators =
    () => {
      setModals({
        evals: false,
      });
    };

  const openProjectDetails =
    (
      projectId
    ) => {
      navigate(
        `/admin/projects-details/${projectId}`
      );
    };

  // ======================
  // Loading
  // ======================

  if (
    isLoading
  ) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">
          جاري تحميل
          المشاريع...
        </p>
      </div>
    );
  }

  // ======================
  // Error
  // ======================

  if (
    error
  ) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-3">
          حدث خطأ
          في تحميل
          المشاريع
        </p>

        <button
          onClick={
            refetch
          }
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة
          المحاولة
        </button>
      </div>
    );
  }

  // ======================
  // Table Columns
  // ======================

  const columns =
    [
      {
        key: "actions",
        label:
          "الإجراءات",

        render: (
          row
        ) => (
          <div className="flex flex-col gap-2">
            <button
              onClick={(
                e
              ) => {
                e.stopPropagation();

                openProjectDetails(
                  row.idea_id ||
                    row.id
                );
              }}
              className="bg-main-color text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1e3356]"
            >
              عرض
              التفاصيل
            </button>

            <button
              onClick={(
                e
              ) => {
                e.stopPropagation();

                onOpenScheduleModal?.(
                  row.idea_id ||
                    row.id
                );
              }}
              className="bg-main-color text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1e3356]"
            >
              جدولة
              جلسة
              متابعة
            </button>
          </div>
        ),
      },

      {
        key:
          "progress_status",

        label:
          "الوضع الحالي للمشروع",

        render: (
          row
        ) => (
          <span className="font-bold text-green-700">
            {row.progress_status ||
              "غير محدد"}
          </span>
        ),
      },

      {
        key:
          "evaluators",

        label:
          "المقيمون الحاليون",

        render: (
          row
        ) => (
          <span
            className="text-blue-600 underline cursor-pointer hover:text-blue-800"
            onClick={(
              e
            ) => {
              e.stopPropagation();

              openEvaluators(
                row.idea_id ||
                  row.id
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

        render: (
          row
        ) =>
          row.next_meeting ||
          "لا يوجد",
      },

      {
        key:
          "title",

        label:
          "اسم المشروع",

        render: (
          row
        ) =>
          row.title ||
          row.idea_title ||
          "بدون اسم",
      },
    ];

  return (
    <div
      className="p-4"
      dir="rtl"
    >
      {projectsList.length ===
      0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد
          مشاريع
          محتضنة
          حالياً
        </div>
      ) : (
        <DataTable
          columns={
            columns
          }
          data={
            projectsList
          }
          onRowClick={
            onSelectProject
          }
          selectedRowId={
            selectedProjectId
          }
        />
      )}

      {/* مودال المقيمين */}
      <EvaluatorsModal
        isOpen={
          modals.evals
        }
        onClose={
          closeEvaluators
        }
        evaluators={
          evaluatorsFromApi ||
          []
        }
        isLoading={
          evaluatorsLoading
        }
      />
    </div>
  );
}