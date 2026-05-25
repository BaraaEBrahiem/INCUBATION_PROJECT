import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataTable from "../../components/Admin_Dashboard/DataTable";
import Checkbox from "../../components/CheckBox";
import { showSuccess, showError } from "../../Utils/toast";

import { useGetAvailableEvaluatorsQuery } from "../../api/endpoints/evaluationApi";
import { useAssignIncubationEvaluatorsMutation } from "../../api/endpoints/publicProjectsApi";

const AssignIncubationEvaluatorsPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  // جلب المقيمين
  const { data: evaluatorsData, isLoading, error, refetch } =
    useGetAvailableEvaluatorsQuery();

  // mutation
  const [assignIncubationEvaluators] =
    useAssignIncubationEvaluatorsMutation();

  const [sel, setSel] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // تجهيز البيانات
  let evaluators = Array.isArray(evaluatorsData) ? evaluatorsData : [];

  if (evaluatorsData?.results && Array.isArray(evaluatorsData.results)) {
    evaluators = evaluatorsData.results;
  }

  if (evaluatorsData?.data && Array.isArray(evaluatorsData.data)) {
    evaluators = evaluatorsData.data;
  }

  // اختيار/إلغاء اختيار
  const toggle = (id) => {
    setSel((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // التعيين
  const handleAssign = async () => {
    console.log("PROJECT ID:", projectId);
    console.log("SELECTED IDS (sel):", sel); 
    if (!sel.length) {
      showError("الرجاء اختيار مقيمين على الأقل");
      return;
    }

    setIsSubmitting(true);

    try {
      await assignIncubationEvaluators({
        idea_id: Number(projectId),
        mentor_user_ids: sel.map(Number),
      }).unwrap();

      showSuccess("تم تعيين مقيمي الاحتضان بنجاح");

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      console.error(err);
      showError(err?.data?.message || "حدث خطأ في التعيين");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">جاري تحميل المقيمين...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">حدث خطأ في تحميل المقيمين</p>

        <button
          onClick={refetch}
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // الأعمدة
  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => {
        const rowId = row.user_id;
        return (
          <Checkbox
            name={`ev-${rowId}`}
            checked={sel.includes(rowId)}
            onChange={() => toggle(rowId)}
          />
        );
      },
    },
    {
      key: "additional_skills",
      label: "المهارات الإضافية",
      render: (row) => row.additional_skills?.join(" - ") || "—",
    },
    {
      key: "primary_skills",
      label: "المهارات الأساسية",
      render: (row) => row.primary_skills || "—",
    },
    {
      key: "specialization",
      label: "التخصص",
      render: (row) => row.specialization || "—",
    },
    {
      key: "full_name",
      label: "الاسم",
      render: (row) => row.full_name,
    },
  ];

  return (
    <div className="container relative w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          تعيين مقيمي الاحتضان للمشروع #{projectId}
        </h2>

        <button
          onClick={handleAssign}
          disabled={isSubmitting}
          className={`bg-main-color text-white px-6 py-2 rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "جاري التعيين..." : "تعيين"}
        </button>
      </div>

      {evaluators.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا يوجد مقيمين متاحين
        </div>
      ) : (
        <DataTable columns={columns} data={evaluators} />
      )}
    </div>
  );
};

export default AssignIncubationEvaluatorsPage;