import React, { useState, useEffect } from "react";
import FieldTypesPanel from "./FieldTypesPanel";
import FormBuilderCanvas from "./FormBuilderCanvas";
import FormPreview from "./FormPreview";
import { useGetFormStructureQuery } from "../../../../api/endpoints/admin/dynamicFormApi";
import { showSuccess, showError } from "../../../../Utils/toast";
import { usePublishNewSeasonMutation, } from "../../../../api/endpoints/admin/seasonsApi";

const FormBuilderManager = ({ onSubmit, isSubmitting: isSaving, seasonId = null, isNewSeason = false }) => {
  const [formData, setFormData] = useState({
    title: "فورم تقديم الأفكار",
    steps: [{ id: 1, title: "المعلومات الشخصية", order: 1, questions: [] }]
  });

  const [activeStepId, setActiveStepId] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const [isFormSaved, setIsFormSaved] = useState(false);

  const { data: serverForm, isLoading: isFetching } = useGetFormStructureQuery(seasonId, {
    skip: !seasonId || isNewSeason,
  });

  const [publishNewSeason, { isLoading: isPublishingSeason }] = usePublishNewSeasonMutation();

  useEffect(() => {
    if (serverForm && serverForm.steps && serverForm.steps.length > 0) {
      //eslint-disable-next-line
      setFormData(serverForm);
      setActiveStepId(serverForm.steps[0].id);
    
      setIsFormSaved(true);
    }
  }, [serverForm]);

  const currentStep = formData.steps.find((s) => s.id === activeStepId) || formData.steps[0];

 
  const updateStepTitle = (newTitle) => {
    setFormData({
      ...formData,
      steps: formData.steps.map((s) => 
        s.id === activeStepId ? { ...s, title: newTitle } : s
      )
    });
   
    setIsFormSaved(false);
  };

  const addStep = () => {
    const newOrder = formData.steps.length + 1;
    const newStep = {
      id: Date.now(), // id مؤقت للفرونت إند
      title: `خطوة جديدة رقم ${newOrder}`,
      order: newOrder,
      questions: []
    };
    setFormData({ ...formData, steps: [...formData.steps, newStep] });
    setActiveStepId(newStep.id); 
    setIsFormSaved(false);
  };

  const addFieldToCurrentStep = (fieldType, staticConfig = null) => {
    const isStatic = !!staticConfig;
    const newField = {
  id: Date.now(),
  key: isStatic
    ? staticConfig.static_field
    : `dynamic_${Date.now()}`,

  label: isStatic
    ? staticConfig.label
    : "سؤال جديد",

  type: fieldType,

  required: true,

  order: currentStep
    ? currentStep.questions.length + 1
    : 1,

  source: isStatic
    ? "STATIC"
    : "DYNAMIC",

  static_field: isStatic
    ? staticConfig.static_field
    : null,

  options:
    ["select", "select_multiple"].includes(fieldType)
      ? []
      : null,
};

    setFormData({
      ...formData,
      steps: formData.steps.map((s) => s.id === activeStepId ? { ...s, questions: [...s.questions, newField] } : s)
    });
    setIsFormSaved(false);
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
            if (!isNewSeason && q.id && String(q.id).length < 10) {
              staticQuestion.id = q.id;
            }
            return staticQuestion;
          } else {
            const backendTypeMap = {
                text: "text",
                number: "number",
                select: "select",
                radio: "radio",
                boolean: "boolean",
                select_multiple: "select_multiple",
                list_text: "list_text",
            };

            const dynamicQuestion = {
              is_static: false,
              key: q.key || `dynamic_key_${qIndex}`,
              label: q.label || "سؤال جديد",
              type: backendTypeMap[q.type] || "text",
              required: q.required ?? true,
              order: qIndex + 1,
            };
            
            if (!isNewSeason && q.id && String(q.id).length < 10) {
              dynamicQuestion.id = q.id;
            }

            if (["select", "select_multiple"].includes(q.type)) {
              const rawOptions = q.options || q.choices || [];
              dynamicQuestion.choices = rawOptions.map((opt, optIndex) => {
                const optionLabel = typeof opt === "string"
                  ? opt
                  : opt.label || opt.text || opt.value || `خيار ${optIndex + 1}`;

                const formattedChoice = {
                  value: typeof opt === "string" ? opt : opt.value || `val_${optIndex}`,
                  label: optionLabel,
                  order: optIndex + 1,
                };

                if (!isNewSeason && opt.id && String(opt.id).length < 10) {
                  formattedChoice.id = opt.id;
                }
                return formattedChoice;
              });
            }
            return dynamicQuestion;
          }
        });
        return formattedStep;
      }),
    };
  };

  const handleSaveForm = async () => {
    const cleanPayload = prepareFormDataForBackend(formData);
    console.log("SAVING PAYLOAD ===>", cleanPayload);
    if (onSubmit) {
      try {
        await onSubmit(cleanPayload);
        // تم الحفظ بنجاح، نحول الزر لـ زر النشر التفعيل
        setIsFormSaved(true);
      } catch (err) {
        console.error("Save Form Error:", err);
      }
    }
  };

  const handlePublishSeason = async () => {
    if (!seasonId) {
      showError("خطأ: لم يتم العثور على معرّف هذا الموسم لنشره");
      return;
    }
    try {
      await publishNewSeason(seasonId).unwrap();
      showSuccess("تم نشر وتفعيل الموسم وفتح باب التقديم بنجاح! 🎉");
    } catch (err) {
      console.error("Publish Season Error:", err);
      showError(err?.data?.detail || err?.data?.message || "حدث خطأ أثناء نشر وتفعيل الموسم");
    }
  };

  if (isFetching && seasonId && !isNewSeason) {
    return <div className="text-center mt-20 font-bold">جاري تحميل هيكل النموذج...</div>;
  }

  const isActionLoading = isSaving || isPublishingSeason;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6" dir="rtl">
      <div className="mb-2">
        {isPreviewMode ? (
          <FormPreview steps={formData.steps} />
        ) : (
          <div className="flex gap-6 items-start">
            <div className="flex-1 flex flex-col gap-4">
              
              {/* شريط تبويبات الخطوات والتحكم بإنشائها */}
              <div className="flex gap-4 bg-white p-3 rounded-lg shadow items-center overflow-x-auto">
                <span className="text-lg font-bold text-black ml-2">الخطوات:</span>
                {formData.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`px-3 py-2 rounded-md text-sm font-bold transition-all ${
                      step.id === activeStepId ? "bg-main-color text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {step.title} (الترتيب: {step.order})
                  </button>
                ))}
                <button onClick={addStep} className="px-3 py-1 bg-main-color text-white rounded-md text-lg mr-auto hover:opacity-90">
                  + إنشاء خطوة
                </button>
              </div>

              {/* 🌟 الإضافة الأولى: مدخل نصي لتعديل اسم الخطوة الحالية ديناميكياً */}
              {currentStep && (
                <div className="bg-white p-4 rounded-lg shadow border-r-4 border-main-color flex flex-col gap-2">
                  <label className="font-bold text-sm text-gray-700">عنوان الخطوة الحالية:</label>
                  <input
                    type="text"
                    value={currentStep.title}
                    onChange={(e) => updateStepTitle(e.target.value)}
                    className="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-main-color text-sm"
                    placeholder="مثال: معلومات الفكرة، بيانات الفريق..."
                  />
                </div>
              )}

              <FormBuilderCanvas
                fields={currentStep?.questions || []}
                updateField={(id, props) => {
                  setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.map(q => q.id === id ? {...q, ...props} : q)} : s)});
                  setIsFormSaved(false);
                }}
                deleteField={(id) => {
                  setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.filter(q => q.id !== id)} : s)});
                  setIsFormSaved(false);
                }}
              />
            </div>

            <FieldTypesPanel addField={addFieldToCurrentStep} />
          </div>
        )}
      </div>

      {/* أزرار التحكم بالمعاينة والحفظ والنشر */}
      <div className="flex justify-center gap-4 z-50">
        <button 
          onClick={() => setIsPreviewMode(!isPreviewMode)} 
          className="px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold hover:opacity-90"
        >
          {isPreviewMode ? "العودة للتعديل" : "معاينة النموذج"}
        </button>

        {!isFormSaved ? (
          <button 
            onClick={handleSaveForm} 
            disabled={isActionLoading}
            className="px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? "جاري الحفظ..." : "حفظ النموذج"}
          </button>
        ) : (
          <button 
            onClick={handlePublishSeason} 
            disabled={isActionLoading}
            className="px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold hover:scale-105 disabled:opacity-50 transition-all"
          >
            {isPublishingSeason ? "جاري النشر..." : "نشر النموذج للعامة"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormBuilderManager;