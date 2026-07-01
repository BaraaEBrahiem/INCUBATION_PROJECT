
import React, { useState, useEffect } from "react";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Select from "../../Select";
import { useGetFormStructureQuery } from "../../../api/endpoints/admin/dynamicFormApi";

const FormBuilder = ({ season }) => {
  const isOpen =
    season?.phase === "SUBMISSION";

  const seasonId =
    season?.id || season?.pk;

  const {
    data: formConfig,
    isLoading,
  } = useGetFormStructureQuery(
    seasonId,
    {
      skip: !seasonId,
    }
  );

  const steps =
    formConfig?.steps || [
      {
        id: 1,
        title:
          "المعلومات الأساسية",
        questions: [],
      },
    ];

  const [activeStepId, setActiveStepId] =
    useState(
      steps[0]?.id || 1
    );

  const [formValues, setFormValues] =
    useState({});

  useEffect(() => {
    if (
      formConfig?.steps &&
      formConfig.steps.length > 0
    ) {
      setActiveStepId(
        formConfig.steps[0].id
      );

      const initialValues = {};

      formConfig.steps.forEach(
        (step) => {
          (
            step.questions || []
          ).forEach((q) => {
            const fieldKey =
              q.is_static
                ? q.static_field
                : q.key;

            initialValues[
              fieldKey
            ] = "";
          });
        }
      );

      setFormValues(
        initialValues
      );
    }
  }, [formConfig]);

  const handleChange = (
    key,
    value
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderQuestion = (
    q,
    index
  ) => {
    const fieldKey =
      q.is_static
        ? q.static_field
        : q.key;

    const commonProps = {
      key:
        q.id ||
        `${fieldKey}_${index}`,
      label: q.label,
      name: fieldKey,
      value:
        formValues[
          fieldKey
        ] || "",
      onChange: (e) =>
        handleChange(
          fieldKey,
          e.target.value
        ),
      placeholder:
        q.placeholder ||
        `أدخل ${q.label}`,
      required:
        q.required,
    };

    switch (q.type) {
      // ====================
      // SELECT
      // ====================
      case "select": {
        const formattedOptions =
          (
            q.choices || []
          ).map(
            (choice) => ({
              label:
                choice.label,
              value:
                choice.value,
            })
          );

        return (
          <Select
            {...commonProps}
            disabled={
              false
            }
            options={
              formattedOptions
            }
            placeholder="اختر خياراً"
          />
        );
      }

      // ====================
      // MULTI SELECT
      // ====================
      case "select_multiple":
        return (
          <div
            key={q.id}
            className="flex flex-col gap-3 bg-white border border-gray-100 rounded-lg p-4"
          >
            <label className="font-bold text-sm text-gray-700">
              {q.label}

              {q.required && (
                <span className="text-red-500 mr-1">
                  *
                </span>
              )}
            </label>

            {(
              q.choices ||
              []
            ).map(
              (
                choice
              ) => (
                <label
                  key={
                    choice.id
                  }
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    disabled={
                      !isOpen
                    }
                    className="w-4 h-4"
                  />

                  {
                    choice.label
                  }
                </label>
              )
            )}
          </div>
        );

      // ====================
      // BOOLEAN YES / NO
      // ====================
      case "boolean":
        return (
          <div
            key={q.id}
            className="flex flex-col gap-3 bg-white border border-gray-100 rounded-lg p-4"
          >
            <label className="font-bold text-sm text-gray-700">
              {q.label}

              {q.required && (
                <span className="text-red-500 mr-1">
                  *
                </span>
              )}
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={
                    fieldKey
                  }
                  disabled={
                    !isOpen
                  }
                />
                نعم
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={
                    fieldKey
                  }
                  disabled={
                    !isOpen
                  }
                />
                لا
              </label>
            </div>
          </div>
        );

      // ====================
      // TEXTAREA
      // ====================
      case "textarea":
      case "longText":
        return (
          <Textarea
            {...commonProps}
            rows={4}
            disabled={
              !isOpen
            }
          />
        );

      // ====================
      // DEFAULT INPUT
      // ====================
      default:
        return (
          <Input
            {...commonProps}
            type={
              q.type ||
              "text"
            }
            disabled={
              !isOpen
            }
          />
        );
    }
  };

  const currentStep =
    steps.find(
      (s) =>
        s.id ===
        activeStepId
    ) || steps[0];

  const currentQuestions =
    currentStep?.questions ||
    [];

  if (isLoading) {
    return (
      <div
        className="flex gap-6"
        dir="rtl"
      >
        <div className="flex-1 p-5 text-center py-10">
          <p className="text-gray-500 font-bold">
            جاري تحميل
            هيكل النموذج...
          </p>
        </div>
      </div>
    );
  }

 return (
    // 🎯 التعديل هنا: تحويل لـ flex-col للموبايل و md:flex-row للابتوب لضمان ثبات التصميم الأصلي 100%
    <div
      className="flex flex-col md:flex-row gap-6 w-full"
      dir="rtl"
    >
      <div className="flex-1 p-5 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <h1 className="text-xl font-bold mb-2 text-gray-800">
          {formConfig?.title ||
            season?.name ||
            "استمارة التقديم"}
        </h1>

        <p className="text-gray-400 text-xs mb-6">
          هذا الشكل النهائي
          للمستخدم.
        </p>

        {steps.length >
          1 && (
          // 🎯 أضفنا كلاسات إخفاء شريط التمرير الرمادي للموبايل [scrollbar-width:none] [&::-webkit-scrollbar]:hidden لتتحرك خطوات الاستمارة بسلاسة إصبعية
          <div className="flex gap-2 border-b pb-3 mb-6 overflow-x-auto whitespace-nowrap block [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {steps.map(
              (
                step
              ) => (
                <button
                  key={
                    step.id
                  }
                  type="button"
                  onClick={() =>
                    setActiveStepId(
                      step.id
                    )
                  }
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition shrink-0 ${
                    step.id ===
                    activeStepId
                      ? "bg-main-color text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {
                    step.title
                  }
                </button>
              )
            )}
          </div>
        )}

        {currentQuestions.length ===
        0 ? (
          <div className="text-center py-10 border border-dashed rounded-lg text-gray-400">
            لا توجد أسئلة.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestions
                .filter(
                  (
                    q
                  ) =>
                    ![
                      "textarea",
                      "select",
                      "select_multiple",
                      "boolean",
                    ].includes(
                      q.type
                    )
                )
                .map(
                  (
                    q,
                    idx
                  ) =>
                    renderQuestion(
                      q,
                      idx
                    )
                )}
            </div>

            <div className="space-y-4 border-t pt-4 border-gray-50">
              {currentQuestions
                .filter(
                  (
                    q
                  ) =>
                    [
                      "textarea",
                      "select",
                      "select_multiple",
                      "boolean",
                    ].includes(
                      q.type
                    )
                )
                .map(
                  (
                    q,
                    idx
                  ) =>
                    renderQuestion(
                      q,
                      idx
                    )
                )}
            </div>
          </div>
        )}
      </div>

      {/* العمود الأيسر الإحصائي */}
      {/* 🎯 السر هنا: w-full ليمتد بكامل شاشة الهاتف، و md:w-64 ليثبت تماماً بمقاسه المعتاد على اللابتوب */}
      <div className="w-full md:w-64 h-fit border border-second-color bg-white rounded-lg shadow p-4 flex flex-col gap-3">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">
            عدد الطلبات:
          </span>{" "}
          {season?.ideas_count ||
            0}
        </p>

        <div className="mt-2 pt-2 border-t text-center">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              isOpen
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isOpen
              ? "التقديم متاح"
              : "التقديم مغلق"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
