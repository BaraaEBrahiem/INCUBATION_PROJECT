import React, { useState, useEffect } from "react";
import FieldTypesPanel from "./FieldTypesPanel";
import FormBuilderCanvas from "./FormBuilderCanvas";
import FormPreview from "./FormPreview";
import { useGetFormStructureQuery } from "../../../../api/endpoints/admin/dynamicFormApi";

const FormBuilderManager = ({ onSubmit, isSubmitting: isPublishing, seasonId = null, isNewSeason = false }) => {
  const [formData, setFormData] = useState({
    title: "فورم تقديم الأفكار",
    steps: [{ id: 1, title: "المعلومات الشخصية", order: 1, questions: [] }]
  });

  const [activeStepId, setActiveStepId] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { data: serverForm, isLoading: isFetching } = useGetFormStructureQuery(seasonId, {
    skip: !seasonId || isNewSeason,
  });

  useEffect(() => {
    if (serverForm && serverForm.steps && serverForm.steps.length > 0) {
      //eslint-disable-next-line
      setFormData(serverForm);
      setActiveStepId(serverForm.steps[0].id);
    }
  }, [serverForm]);

  const currentStep = formData.steps.find((s) => s.id === activeStepId) || formData.steps[0];

  const addStep = () => {
    const newOrder = formData.steps.length + 1;
    const newStep = {
      id: Date.now(), // id مؤقت للفرونت إند
      title: `خطوة جديدة رقم ${newOrder}`,
      order: newOrder,
      questions: []
    };
    setFormData({ ...formData, steps: [...formData.steps, newStep] });
  };

  const addFieldToCurrentStep = (fieldType, staticConfig = null) => {
    const isStatic = !!staticConfig;
    const newField = {
      id: Date.now(), // id مؤقت للفرونت إند
      key: isStatic ? staticConfig.static_field : `dynamic_${Date.now()}`,
      label: isStatic ? staticConfig.label : "سؤال جديد",
      type: fieldType,
      required: true,
      order: currentStep ? currentStep.questions.length + 1 : 1,
      source: isStatic ? "STATIC" : "DYNAMIC",
      static_field: isStatic ? staticConfig.static_field : null,
      options: []
    };

    setFormData({
      ...formData,
      steps: formData.steps.map((s) => s.id === activeStepId ? { ...s, questions: [...s.questions, newField] } : s)
    });
  };
  const prepareFormDataForBackend = (rawFormData) => {
    return {
      title: rawFormData.title || "فورم تقديم الأفكار",
      steps: rawFormData.steps.map((step, stepIndex) => {
        const formattedStep = {
          title: step.title,
          order: stepIndex + 1,
        };

        if (!isNewSeason && step.id && String(step.id).length < 10) {
          formattedStep.id = step.id;
        }

        formattedStep.questions = (step.questions || []).map((q, qIndex) => {
          const isStatic = q.source === "STATIC" || q.is_static === true;
          
          if (isStatic) {
            const staticQuestion = {
              is_static: true,
              static_field: q.static_field,
              required: q.required ?? true,
              order: qIndex + 1,
            };
            // لا نرسل الـ id في المواسم الجديدة
            if (!isNewSeason && q.id && String(q.id).length < 10) {
              staticQuestion.id = q.id;
            }
            return staticQuestion;
          } else {
            // =====================================
// تحويل أنواع الفرونت → أنواع الباك
// =====================================

const backendTypeMap = {
  text: "text",
  longText: "text",
  radio: "select",
  checkbox:
    "select_multiple",
  dropdown:
    "select",
  select: "select",
  boolean:
    "boolean",
  list:
    "list_text",
  number:
    "number",
};

const dynamicQuestion = {
  is_static: false,

  key:
    q.key ||
    `dynamic_key_${qIndex}`,

  label:
    q.label ||
    "سؤال جديد",

  type:
    backendTypeMap[
      q.type
    ] || "text",

  required:
    q.required ??
    true,

  order:
    qIndex + 1,
};
            
            // لا نرسل الـ id في المواسم الجديدة
            if (!isNewSeason && q.id && String(q.id).length < 10) {
              dynamicQuestion.id = q.id;
            }

            if (
  ["select", "select_multiple"].includes(q.type)
) {
  const rawOptions =
    q.options ||
    q.choices ||
    [];

  dynamicQuestion.choices =
    rawOptions.map(
      (opt, optIndex) => {
        const optionLabel =
          typeof opt ===
          "string"
            ? opt
            : opt.label ||
              opt.text ||
              opt.value ||
              `خيار ${
                optIndex + 1
              }`;

        const formattedChoice =
          {
            value:
              typeof opt ===
              "string"
                ? opt
                : opt.value ||
                  `val_${optIndex}`,

            label:
              optionLabel,

            order:
              optIndex + 1,
          };

        if (
          !isNewSeason &&
          opt.id &&
          String(
            opt.id
          ).length < 10
        ) {
          formattedChoice.id =
            opt.id;
        }

        return formattedChoice;
      }
    );
}
            return dynamicQuestion;
          }
        });
        return formattedStep;
      }),
    };
  };

  const handlePublishForm = () => {
    const cleanPayload = prepareFormDataForBackend(formData);
    console.log(
    "PAYLOAD ===>",
    cleanPayload);
    if (onSubmit) {
      onSubmit(cleanPayload);
    }
  };
  
  

  if (isFetching && seasonId && !isNewSeason) {
    return <div className="text-center mt-20 font-bold">جاري تحميل هيكل النموذج...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-between" dir="rtl">
      <div className="mb-2">
        <div className="p-4 rounded-lg shadow mb-6 bg-white">
          <h4 className="text-md">يرجى تعبئة كافة الحقول لضمان قبول طلباتكم في الحاضنة</h4>
        </div>

        {isPreviewMode ? (
          <FormPreview steps={formData.steps} />
        ) : (
          <div className="flex gap-6 items-start">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex gap-4 bg-white p-3 rounded-lg shadow items-center overflow-x-auto">
                <span className="text-lg font-bold text-black ml-2">الخطوات:</span>
                {formData.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`px-2 py-2 rounded-md text-l font-bold ${step.id === activeStepId ? "bg-main-color text-white" : "bg-gray-200"}`}
                  >
                    {step.title} (الترتيب: {step.order})
                  </button>
                ))}
                <button onClick={addStep} className="px-3 py-1 bg-main-color text-white rounded-md text-lg mr-auto">
                  + إنشاء خطوة
                </button>
              </div>

              <FormBuilderCanvas
                fields={currentStep?.questions || []}
                updateField={(id, props) => setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.map(q => q.id === id ? {...q, ...props} : q)} : s)})}
                deleteField={(id) => setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.filter(q => q.id !== id)} : s)})}
              />
            </div>

            <FieldTypesPanel addField={addFieldToCurrentStep} />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 z-50 mt-6">
        <button 
          onClick={() => setIsPreviewMode(!isPreviewMode)} 
          className="px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold"
        >
          {isPreviewMode ? "العودة للتعديل" : "معاينة النموذج"}
        </button>

        <button 
          onClick={handlePublishForm} 
          disabled={isPublishing}
          className="px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold"
        >
          {isPublishing ? "جاري النشر..." : "نشر النموذج"}
        </button>
      </div>
    </div>
  );
};

export default FormBuilderManager;