import React, { useState, useEffect } from "react";
import { BiPlusCircle } from "react-icons/bi";
import EvaluationRow from "./EvaluationRaw";
import ExportReview from "./ExportReview";
import {
  showSuccess,
  showError,
} from "../../../Utils/toast";

import {
  useGetCriteriaQuery,
  useCreateCriterionMutation,
  useUpdateCriterionMutation,
  useDeleteCriterionMutation,
  usePublishCriteriaMutation,
} from "../../../api/endpoints/evaluationApi";

const CriteriaManager = () => {
  const {
    data: criteriaFromApi,
    isLoading,
    error,
    refetch,
  } = useGetCriteriaQuery();

  const [createCriterion] =
    useCreateCriterionMutation();

  const [updateCriterionApi] =
    useUpdateCriterionMutation();

  const [deleteCriterionApi] =
    useDeleteCriterionMutation();

  const [publishCriteria] =
    usePublishCriteriaMutation();

  const [showPreview, setShowPreview] =
    useState(false);

  const [criteria, setCriteria] =
    useState([]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // تحميل البيانات
  useEffect(() => {
    if (!criteriaFromApi) return;

    let data = [];

    if (Array.isArray(criteriaFromApi)) {
      data = criteriaFromApi;
    } else if (
      criteriaFromApi?.results
    ) {
      data =
        criteriaFromApi.results;
    }

    setCriteria(data);
  }, [criteriaFromApi]);

  // تعديل معيار
  const updateTimers = {};

  const updateCriterion = (id, field, value) => {
    setCriteria((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      );

      const updatedCriterion = updated.find((c) => c.id === id);

      if (updateTimers[id]) {
        clearTimeout(updateTimers[id]);
      }

      updateTimers[id] = setTimeout(async () => {
        if (!updatedCriterion?.title?.trim()) {
          return;
        }

        try {
          await updateCriterionApi({
            id,
            title: updatedCriterion.title,
            max_score: Number(updatedCriterion.max_score),
          }).unwrap();
        } catch (err) {
  console.error(err);
  showError(err);

        }
      }, 700);

      return updated;
    });
  };

  // حذف معيار
  const deleteCriterion =
    async (id) => {
      try {
        await deleteCriterionApi(
          id
        ).unwrap();

        setCriteria((prev) =>
          prev.filter(
            (c) => c.id !== id
          )
        );

        showSuccess(
          "تم حذف المعيار"
        );
      } catch (err) {
        console.error(err);

        showError(err ||
            "فشل حذف المعيار"
        );
      }
    };

  // إضافة معيار
  const addCriterion =
    async () => {
      try {
        const response =
          await createCriterion({
            title:
              "معيار جديد",
            max_score: 1,
          }).unwrap();

        setCriteria((prev) => [
          ...prev,
          response,
        ]);

        showSuccess(
          "تم إضافة معيار"
        );
      } catch (err) {
  console.error(err);
  showError(err);
}
    };

  // المجموع
  const total =
    criteria.reduce(
      (sum, c) =>
        sum +
        (Number(
          c.max_score
        ) || 0),
      0
    );

  // نشر النموذج
  const handlePublish =
    async () => {
      if (
        criteria.length === 0
      ) {
        showError(
          "لا يوجد معايير للنشر"
        );
        return;
      }

      const emptyTitle =
        criteria.find(
          (c) =>
            !c.title?.trim()
        );

      if (emptyTitle) {
        showError(
          "يرجى إدخال عنوان لكل معيار"
        );
        return;
      }

      setIsSubmitting(true);

      try {
        await publishCriteria().unwrap();

        showSuccess(
          "تم نشر النموذج بنجاح"
        );

        refetch();
      } catch (err) {
  console.error(err);
  showError(err);

      } finally {
        setIsSubmitting(false);
      }
    };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        جاري تحميل المعايير...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          حدث خطأ في تحميل المعايير
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

  if (showPreview) {
    return (
      <ExportReview
        criteria={criteria}
        onBack={() =>
          setShowPreview(false)
        }
      />
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto my-6 px-4"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-black">
          بناء معايير التقييم
        </h2>

        <button
          onClick={addCriterion}
          className="flex items-center gap-2 text-main-color font-bold hover:opacity-80 transition text-base"
        >
          <BiPlusCircle size={22} />
          إضافة معيار جديد
        </button>
      </div>

      <div className="space-y-3">
        {criteria.map(
          (item) => (
            <EvaluationRow
              key={item.id}
              {...item}
              onUpdate={
                updateCriterion
              }
              onDelete={
                deleteCriterion
              }
            />
          )
        )}
      </div>

      {criteria.length >
        0 && (
        <div className="mt-8 py-6 border-t border-gray-100 text-center">
          <p className="text-main-color font-bold flex justify-center gap-2">
            <span>
              المجموع الكلي:
            </span>
            <span>
              {total}
            </span>
          </p>
        </div>
      )}

      <div className="flex gap-3 mt-6 w-full max-w-sm mx-auto">
        <button
          onClick={
            handlePublish
          }
          disabled={
            isSubmitting
          }
          className={`flex-1 bg-main-color text-white py-2 px-4 rounded-lg font-bold ${
            isSubmitting
              ? "opacity-50"
              : ""
          }`}
        >
          {isSubmitting
            ? "جاري النشر..."
            : "نشر إلى اللجنة"}
        </button>

        <button
          onClick={() =>
            setShowPreview(
              true
            )
          }
          className="flex-1 border border-second-color py-2 px-4 rounded-lg font-bold"
        >
          معاينة النموذج
        </button>
      </div>
    </div>
  );
};

export default CriteriaManager;