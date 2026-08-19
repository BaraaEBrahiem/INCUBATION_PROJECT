import React, { useState } from "react";
import EvaluationDetails from "./EvaluationDetails";
import Modal from "../../Modal";
import DataTable from "../DataTable";
import {
  useGetProjectsWithEvaluatorsQuery,
  useApproveProjectMutation,
  useRejectProjectMutation,
  useGetAssignedEvaluatorsQuery,
} from "../../../api/endpoints/evaluationApi";
import { showSuccess, showError } from "../../../Utils/toast";

const ResultsTable = () => {
  // جلب المشاريع من API
  const {
    data: projectsData,
    isLoading,
    error,
    refetch,
  } = useGetProjectsWithEvaluatorsQuery();

  // قبول / رفض المشروع
  const [approveProject] =
    useApproveProjectMutation();

  const [rejectProject] =
    useRejectProjectMutation();

  const [view, setView] =
    useState("table");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [activeDropdown, setActiveDropdown] =
    useState(null);

  const [isAcceptModalOpen, setIsAcceptModalOpen] =
    useState(false);

  const [isRejectModalOpen, setIsRejectModalOpen] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // جلب المقيمين للمشروع المحدد
  const {
    data: evaluatorsData = [],
  } = useGetAssignedEvaluatorsQuery(
    selectedProject?.idea_id,
    {
      skip: !selectedProject?.idea_id,
    }
  );

  // معالجة response
  let projects = Array.isArray(projectsData)
    ? projectsData
    : [];

  if (
    projectsData?.results &&
    Array.isArray(projectsData.results)
  ) {
    projects = projectsData.results;
  }

  if (
    projectsData?.data &&
    Array.isArray(projectsData.data)
  ) {
    projects = projectsData.data;
  }

  const toggleDropdown = (idea_id) => {
    setActiveDropdown(
      activeDropdown === idea_id
        ? null
        : idea_id
    );
  };

  const handleAccept = async () => {
    if (!selectedProject) return;

    setIsSubmitting(true);

    try {
      await approveProject(
        selectedProject.idea_id
      ).unwrap();

      showSuccess(
      "تم قبول المشروع بنجاح"
      );

    // سكّر التفاصيل وارجع للجدول
      setView("table");

    // سكّر المودال
      setIsAcceptModalOpen(false);

    // نظّف state
      setSelectedProject(null);

    // حدث البيانات
      refetch();

    } catch (error) {
  console.error("Error accepting project:", error);

  const errorMessage =
    error?.data?.error ||
    error?.data?.message ||
    error?.data?.detail ||
    "حدث خطأ في قبول المشروع";

  showError(errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedProject) return;

    setIsSubmitting(true);

    try {
      await rejectProject(
        selectedProject.idea_id
      ).unwrap();

      showSuccess(
      "تم رفض المشروع بنجاح"
      );

      setView("table");
      setIsRejectModalOpen(false);
      setSelectedProject(null);

      refetch();

    } catch (error) {
  console.error("Error rejecting project:", error);

  const errorMessage =
    error?.data?.error ||
    error?.data?.message ||
    error?.data?.detail ||
    "حدث خطأ في رفض المشروع";

  showError(errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };

  
  // صفحة تفاصيل التقييم
  if (view === "details") {
    console.log(selectedProject.meeting_date);
    return (
      <EvaluationDetails
        evaluators={evaluatorsData}
        selectedProject={selectedProject}
        onBack={() => setView("table")}
        onAccept={handleAccept}
        onReject={handleReject}
        isSubmitting={isSubmitting}
      />
    );
  }

  const isEvaluationCompleted = (
    row
  ) => {
    return (
      row.evaluation_result !== null &&
      row.evaluation_result !==
        undefined
    );
  };

  // أعمدة الجدول
  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => {
        const completed =
          isEvaluationCompleted(
            row
          );

        return (
          <div className="relative inline-block text-left">
            <button
              onClick={() =>
                toggleDropdown(
                  row.idea_id
                )
              }
              className="text-lg p-2 hover:text-blue-600"
            >
              ⋮
            </button>

            {activeDropdown ===
              row.idea_id && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white shadow-2xl rounded-lg p-2 flex flex-col gap-2 z-50">
                {completed && (
                  <button
                    onClick={() => {
                      setSelectedProject(
                        row
                      );
                      setView(
                        "details"
                      );
                      setActiveDropdown(
                        null
                      );
                    }}
                    className="bg-main-color text-white py-2 px-4 rounded-lg text-sm font-bold hover:bg-[#1e3356]"
                  >
                    تفاصيل التقييم
                  </button>
                )}

                {completed && (
                  <button
                    onClick={() => {
                      setSelectedProject(
                        row
                      );
                      setIsAcceptModalOpen(
                        true
                      );
                      setActiveDropdown(
                        null
                      );
                    }}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700"
                  >
                    قبول
                  </button>
                )}

                {completed && (
                  <button
                    onClick={() => {
                      setSelectedProject(
                        row
                      );
                      setIsRejectModalOpen(
                        true
                      );
                      setActiveDropdown(
                        null
                      );
                    }}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700"
                  >
                    رفض
                  </button>
                )}

                {!completed && (
                  <div className="text-center text-gray-500 text-sm py-2 px-4">
                    ينتظر اكتمال
                    التقييم
                  </div>
                )}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "owner_email",
      label: "البريد الإلكتروني",
      render: (row) => (
        <span className="underline text-blue-500">
          {row.owner_email ||
            "-"}
        </span>
      ),
    },
    {
      key: "evaluation_status",
      label: "حالة التقييم",
      render: (row) => {
        const completed =
          isEvaluationCompleted(
            row
          );

        return (
          <span
            className={`px-2 py-1 rounded text-sm font-bold ${
              completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {completed
              ? "تم التقييم"
              : "يتم التقييم"}
          </span>
        );
      },
    },
    {
      key: "evaluation_result",
      label: "نتيجة التقييم",
      render: (row) => (
        <span className="font-semibold">
          {row.evaluation_result ??
            "-"}
        </span>
      ),
    },
    {
      key: "target_audience",
      label:
        "الجمهور المستهدف",
      render: (row) => (
        <span>
          {row.target_audience ??
            "-"}
        </span>
      ),
    },
    {
      key: "sector",
      label:
        "القطاع المستهدف",
      render: (row) => (
        <span>
          {row.sector ?? "-"}
        </span>
      ),
    },
    {
      key: "project_name",
      label: "اسم المشروع",
      render: (row) => (
        <span>
          {row.project_name ||
            row.title ||
            "-"}
        </span>
      ),
    },
  ];

  // Loading
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        جاري تحميل
        المشاريع...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-3">
          حدث خطأ في تحميل
          البيانات
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

  return (
    <div
      className="p-4"
      dir="rtl"
    >
      {/* مودال القبول */}
      <Modal
        isOpen={
          isAcceptModalOpen
        }
        onClose={() =>
          setIsAcceptModalOpen(
            false
          )
        }
        title="تأكيد قبول المشروع"
        footer={
          <button
            onClick={
              handleAccept
            }
            disabled={
              isSubmitting
            }
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "جاري المعالجة..."
              : "تأكيد"}
          </button>
        }
      >
        <p className="text-gray-700 text-center py-4">
          هل أنت متأكد من
          قبول هذا المشروع؟
          <br />
          <span className="text-sm text-gray-500">
            سيتم إرسال إشعار
            للمستخدم
          </span>
        </p>
      </Modal>

      {/* مودال الرفض */}
      <Modal
        isOpen={
          isRejectModalOpen
        }
        onClose={() =>
          setIsRejectModalOpen(
            false
          )
        }
        title="تأكيد رفض المشروع"
        footer={
          <button
            onClick={
              handleReject
            }
            disabled={
              isSubmitting
            }
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "جاري المعالجة..."
              : "تأكيد"}
          </button>
        }
      >
        <p className="text-gray-700 text-center py-4">
          هل أنت متأكد من
          رفض هذا المشروع؟
          <br />
          <span className="text-sm text-gray-500">
            سيتم إرسال إشعار
            للمستخدم
          </span>
        </p>
      </Modal>

      {/* الجدول */}
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={projects}
        />
      </div>
    </div>
  );
};

export default ResultsTable;