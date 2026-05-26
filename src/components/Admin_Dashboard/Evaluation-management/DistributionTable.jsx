import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../DataTable";
import Button from "../../Button";
import { useGetProjectsForEvaluationQuery } from "../../../api/endpoints/evaluationApi";
const DistributionTable = () => {
  const navigate = useNavigate();

  const {
    data: projects,
    isLoading,
    error,
    refetch,
  } = useGetProjectsForEvaluationQuery();

  // معالجة شكل البيانات إذا كانت من API
  let projectsList = Array.isArray(projects) ? projects : [];

  if (projects?.results && Array.isArray(projects.results)) {
    projectsList = projects.results;
  }

  if (projects?.data && Array.isArray(projects.data)) {
    projectsList = projects.data;
  }

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <div className="text-center">
          <Button
            label="تعيين المقيمين"
            onClick={() =>
              navigate(`/admin/assign-evaluators/${row.id}`)
            }
            className="bg-main-color text-white px-4 py-2 rounded-md text-xs md:text-sm"
          />
        </div>
      ),
    },
    {
      key: "sector",
      label: "القطاع المستهدف",
      render: (row) => (
        <span className="text-center block">
          {row.sector}
        </span>
      ),
    },
    {
      key: "target_audience",
      label: "الفئة المستهدفة",
      render: (row) => (
        <span className="text-center block">
          {row.target_audience}
        </span>
      ),
    },
    {
      key: "evaluators",
      label: "المقيمون الحاليون",
      render: (row) => {
        const evaluators = row.evaluators || [];

        if (evaluators.length === 0) {
          return (
            <span className="text-gray-400 italic text-xs">
              لم يتم التعيين بعد
            </span>
          );
        }

        return (
          <div className="flex flex-wrap justify-center items-center gap-2">
            {evaluators.map((ev, idx) => (
              <span
                key={ev.id || idx}
                className="bg-blue-50 text-blue-800 p-1 rounded text-xs border border-blue-200 whitespace-nowrap"
              >
                {ev.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      key: "title",
      label: "اسم المشروع",
    },
  ];

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-3">
          حدث خطأ في تحميل المشاريع
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
    <div className="p-4">
      {projectsList.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد مشاريع متاحة للتقييم
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={projectsList}
        />
      )}
    </div>
  );
};

export default DistributionTable;