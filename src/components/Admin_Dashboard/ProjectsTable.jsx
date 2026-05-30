import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import EvaluatorsModal from "./Evaluation-management/EvaluatorsModal";

<<<<<<< HEAD
// import { useGetIncubatedProjectsQuery } from "../../api/endpoints/publicProjectsApi";
//import {useGetEvaluatorsForMeetingQuery} from "../../api/endpoints/evaluationApi";
export default function ProjectsTable({ onOpenScheduleModal }) {
  const navigate = useNavigate();

  // const { data: projectsFromApi, isLoading, error, refetch } = useGetIncubatedProjectsQuery();
//  const { data: evaluatorsFromApi } = useGetEvaluatorsForMeetingQuery(projectId, { skip: !projectId });
  
  const projectsData = [
    {
      idea_id: 1,
      title: "منصة إلكترونية",
      next_meeting: "12/4/2026",
      progress_status: "جيد جداً",
    },
    {
      idea_id: 2,
      title: "تطبيق توصيل",
      next_meeting: "15/4/2026",
      progress_status: "ممتاز",
    }
  ];

  const assignedEvaluatorsData = {
    1: [
      { id: 1, name: "أحمد المحمد", specialization: "UI/UX", image: null },
      { id: 2, name: "رانيا الأحمد", specialization: "تسويق رقمي", image: null },
    ],
    2: [
      { id: 3, name: "خالد حسن", specialization: "Mobile Apps", image: null },
    ],
  };
=======
import {
  useGetIncubatedProjectsQuery,
  useGetIncubationEvaluatorsQuery,
} from "../../api/endpoints/publicProjectsApi";

export default function ProjectsTable({
  onOpenScheduleModal,
  selectedProjectId,
  onSelectProject,
}) {
  const navigate =
    useNavigate();
>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889

  // استخدام البيانات الثابتة حالياً
  const projects = projectsData;
  const assignedEvaluators = assignedEvaluatorsData;
  // const isLoading = false;
  // const error = null;

  // معالجة شكل البيانات إذا كانت من API
  let projectsList = Array.isArray(projects) ? projects : [];
  if (projects?.results && Array.isArray(projects.results)) {
    projectsList = projects.results;
  }
  if (projects?.data && Array.isArray(projects.data)) {
    projectsList = projects.data;
  }

  const [modals, setModals] = useState({
    evals: false,
    data: []
  });

  const openEvaluators = (projectId) => {
    const evaluators = assignedEvaluators[projectId] || [];
    setModals({
      evals: true,
      data: evaluators
    });
  };

  const openProjectDetails = (projectId) => {
    navigate(`/admin/projects-details/${projectId}`);
  };

<<<<<<< HEAD
  // حالة التحميل
  // if (isLoading) {
  //   return (
  //     <div className="p-4 text-center">
  //       <p className="text-gray-500">جاري تحميل المشاريع...</p>
  //     </div>
  //   );
  // }

  // حالة الخطأ
  // if (error) {
  //   return (
  //     <div className="p-4 text-center">
  //       <p className="text-red-500 mb-3">حدث خطأ في تحميل المشاريع</p>
  //       <button
  //         onClick={refetch}
  //         className="bg-main-color text-white px-4 py-2 rounded"
  //       >
  //         إعادة المحاولة
  //       </button>
  //     </div>
  //   );
  // }
=======
  // ✅ تم التعديل هون فقط
  const {
    data:
      evaluatorsFromApi,
    isLoading:
      evaluatorsLoading,
  } =
    useGetIncubationEvaluatorsQuery(
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
  // Evaluators Data
  // ======================

  let evaluators =
    [];

  if (
    Array.isArray(
      evaluatorsFromApi
    )
  ) {
    evaluators =
      evaluatorsFromApi;
  }

  if (
    evaluatorsFromApi
      ?.results &&
    Array.isArray(
      evaluatorsFromApi.results
    )
  ) {
    evaluators =
      evaluatorsFromApi.results;
  }

  if (
    evaluatorsFromApi
      ?.data &&
    Array.isArray(
      evaluatorsFromApi.data
    )
  ) {
    evaluators =
      evaluatorsFromApi.data;
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
>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <div className="flex flex-col gap-2">
        <button
          onClick={() => openProjectDetails(row.idea_id)}
          className="bg-main-color text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1e3356]"
        >
          عرض التفاصيل
        </button>
          <button
            onClick={() => onOpenScheduleModal?.(row.idea_id)}
            className="bg-main-color text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1e3356]"
          >
            جدولة جلسة متابعة
          </button>
          </div>
      ),
    }, 
    {
      key: "progress_status",
      label: "الوضع الحالي للمشروع",
      render: (row) => (
        <span className="font-bold text-green-700">{row.progress_status}</span>
      ),
    },
    {
      key: "evaluators",
      label: "المقيمون الحاليون",
      render: (row) => (
        <span
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
          onClick={() => openEvaluators(row.idea_id)}
        >
          عرض ({assignedEvaluators[row.idea_id]?.length || 0})
        </span>
      ),
    },
    {
      key: "next_meeting",
      label: "تاريخ التقييم القادم",
    },
    {
      key: "title",
      label: "اسم المشروع",
    },
  ];

  return (
    <div className="p-4" dir="rtl">
      {projectsList.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد مشاريع محتضنة حالياً
        </div>
      ) : (
        <div className="">
          <DataTable columns={columns} data={projectsList} />
        </div>
      )}

      {/* مودال المقيمين */}
      <EvaluatorsModal
<<<<<<< HEAD
        isOpen={modals.evals}
        onClose={() => setModals({ ...modals, evals: false })}
        evaluators={modals.data}
=======
        isOpen={
          modals.evals
        }
        onClose={
          closeEvaluators
        }
        evaluators={
          evaluators
        }
        isLoading={
          evaluatorsLoading
        }
>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889
      />
    </div>
  );
}

