import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataTable from "../../components/Admin_Dashboard/DataTable";
import Checkbox from "../../components/CheckBox";
import { showSuccess, showError } from "../../Utils/toast";

import {
  useGetAvailableEvaluatorsQuery,
  useAssignEvaluatorsMutation,
} from "../../api/endpoints/evaluationApi";

const AssignEvaluatorsPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  // جلب المقيمين المتاحين
  const {
    data: evaluatorsData,
    isLoading,
    error,
    refetch,
  } = useGetAvailableEvaluatorsQuery();

  // mutation التعيين
  const [assignEvaluators] =
    useAssignEvaluatorsMutation();

  const [sel, setSel] = useState([]);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // معالجة شكل response
  let evaluators = Array.isArray(
    evaluatorsData
  )
    ? evaluatorsData
    : [];

  if (
    evaluatorsData?.results &&
    Array.isArray(
      evaluatorsData.results
    )
  ) {
    evaluators =
      evaluatorsData.results;
  }

  if (
    evaluatorsData?.data &&
    Array.isArray(evaluatorsData.data)
  ) {
    evaluators =
      evaluatorsData.data;
  }

  const toggle = (id) => {
    setSel((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!sel.length) {
      showError(
        "الرجاء اختيار مقيمين على الأقل"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await assignEvaluators({
        idea_id: projectId,
        evaluators_ids: sel,
      }).unwrap();

      showSuccess(
        "تم تعيين المقيمين بنجاح"
      );

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      console.error(err);

      showError(
        err?.data?.message ||
          "حدث خطأ في تعيين المقيمين"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        جاري تحميل المقيمين...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">
          حدث خطأ في تحميل المقيمين
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
    <div className="flex justify-center items-center w-full">
      <Checkbox
        name={`ev-${row.user_id}`}
        checked={sel.includes(row.user_id)}
        onChange={() => toggle(row.user_id)}

      />
    </div>
  ),
},
    
    {
      key: "primary_skills",
      label: "المهارات الأساسية",
      render: (row) =>
        row.primary_skills || "—",
    },
    {
      key: "specialization",
      label: "التخصص",
      render: (row) =>
        row.specialization || "—",
    },
    {
      key: "full_name",
      label: "الاسم",
      render: (row) =>
        row.full_name,
    },
  ];

  return (
    <div className="container relative w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          تعيين المقيمين للمشروع #
          {projectId}
        </h2>

        <button
          onClick={handleAssign}
          disabled={isSubmitting}
          className={`bg-main-color text-white px-6 py-2 rounded-md hover:bg-teal-700 transition ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isSubmitting
            ? "جاري التعيين..."
            : "تعيين"}
        </button>
      </div>

      {evaluators.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا يوجد مقيمين متاحين
          للتعيين
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={evaluators}
        />
      )}
    </div>
  );
};

export default AssignEvaluatorsPage;