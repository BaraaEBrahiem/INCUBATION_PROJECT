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
  useSaveCriteriaMutation,
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

  const [saveCriteria] =
    useSaveCriteriaMutation();

  const [showPreview, setShowPreview] =
    useState(false);

  const [criteria, setCriteria] =
    useState([]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // تحميل البيانات من API
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
  const updateCriterion =
    async (
      id,
      field,
      value
    ) => {
      const criterion =
        criteria.find(
          (c) => c.id === id
        );

      if (!criterion) return;

      const updatedCriterion =
        {
          ...criterion,
          [field]: value,
        };

      // تحديث فوري بالواجهة
      setCriteria((prev) =>
        prev.map((c) =>
          c.id === id
            ? updatedCriterion
            : c
        )
      );

      try {
        await updateCriterionApi(
          {
            id,
            title:
              updatedCriterion.title,
            max_score:
              updatedCriterion.max_score,
          }
        ).unwrap();
      } 
      catch (err) {
        console.error(err);
        showError(
          " "
        );
        refetch();
      }
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
        showError(
          "فشل حذف المعيار"
        );
      }
    };

  // إضافة معيار
  const addCriterion =
    async () => {
      try {
        const response =
          await createCriterion(
            {
              title:
                " ",
              max_score: 0,
            }
          ).unwrap();

        setCriteria((prev) => [
          ...prev,
          response,
        ]);

        showSuccess(
          "تم إضافة معيار"
        );
      } catch (err) {
        console.error(err);
        showError(
          "فشل إضافة معيار"
        );
      }
    };

  // مجموع الدرجات
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
        await saveCriteria().unwrap();

        showSuccess(
          "تم نشر المعايير بنجاح"
        );

        refetch();
      } catch (err) {
        console.error(err);

        showError(
          err?.data?.message ||
            "حدث خطأ في النشر"
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        جاري تحميل
        المعايير...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          حدث خطأ في تحميل
          المعايير
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
          setShowPreview(
            false
          )
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
          بناء معايير
          التقييم
        </h2>

        <button
          onClick={
            addCriterion
          }
          className="flex items-center gap-2 text-main-color font-bold hover:opacity-80 transition text-base"
        >
          <BiPlusCircle
            size={22}
          />
          إضافة معيار
          جديد
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
          <p className="text-main-color font-bold flex flex-col sm:flex-row justify-center items-center gap-2">
            <span className="text-xl">
              المجموع الكلي
              للدرجات
              القصوى :
            </span>

            <span className="text-xl font-black">
              {total}
            </span>
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm mx-auto">
        <button
          onClick={
            handlePublish
          }
          disabled={
            isSubmitting
          }
          className={`flex-1 bg-main-color text-white py-2 px-4 rounded-lg font-bold text-xl ${
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
          className="flex-1 border border-second-color text-black py-2 px-4 rounded-lg font-bold text-xl"
        >
          معاينة النموذج
        </button>
      </div>
    </div>
  );
};

export default CriteriaManager;