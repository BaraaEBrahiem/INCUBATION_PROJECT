 import React, { useState } from "react";
import FieldTypesPanel from "./FieldTypesPanel";
import FormBuilderCanvas from "./FormBuilderCanvas";
import FormPreview from "./FormPreview";

const FormBuilderManager = () => {
  const [formData, setFormData] = useState({
    steps: [{ id: 1, title: "المعلومات الشخصية", order: 1, questions: [] }]
  });

  const [activeStepId, setActiveStepId] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const currentStep = formData.steps.find((s) => s.id === activeStepId) || formData.steps[0];

  // إضافة خطوة بضغطة زر واحدة بدون أي نوافذ منبثقة أو تعقيد
  const addStep = () => {
    const newOrder = formData.steps.length + 1;
    const newStep = {
      id: Date.now(),
      title:` خطوة جديدة رقم ${newOrder}`,
      order: newOrder,
      questions: []
    };
    setFormData({ ...formData, steps: [...formData.steps, newStep] });
  };

  // إضافة حقل للخطوة الحالية
  const addFieldToCurrentStep = (fieldType, staticConfig = null) => {
    const isStatic = !!staticConfig;
    const newField = {
      id: Date.now(),
      key: isStatic ? staticConfig.static_field : `dynamic_${Date.now()}`,
      label: isStatic ? staticConfig.label : "سؤال جديد",
      type: fieldType,
      required: true,
      order: currentStep.questions.length + 1,
      source: isStatic ? "STATIC" : "DYNAMIC",
      static_field: isStatic ? staticConfig.static_field : null,
      options: []
    };

    setFormData({
      ...formData,
      steps: formData.steps.map((s) => s.id === activeStepId ? { ...s, questions: [...s.questions, newField] } : s)
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-between" dir="rtl">
      
      {/* المحتوى الرئيسي للموقع */}
      <div className="mb-2">
        <div className=" p-4 rounded-lg shadow mb-6">
          <h4 className="text-md">يرجى تعبئة كافة الحقول لضمان قبول طلباتكم في الحاضنة</h4>
        </div>

        {isPreviewMode ? (
          <FormPreview steps={formData.steps} />
        ) : (
          /* التموضع المطلوب: الكانفاس يمين، والأدوات يسار */
          <div className="flex gap-6 items-start">
            
            {/* ساحة العمل والخطوات (اليمين) */}
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
                fields={currentStep.questions}
                updateField={(id, props) => setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.map(q => q.id === id ? {...q, ...props} : q)} : s)})}
                deleteField={(id) => setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.filter(q => q.id !== id)} : s)})}
              />
            </div>

            {/* الأدوات والأسئلة (اليسار) */}
            <FieldTypesPanel addField={addFieldToCurrentStep} />

          </div>
        )}
      </div>
 {/* أزرار المعاينة والنشر بالأسفل (Footer) */}
      <div className=" flex justify-center gap-4 z-50">
        <button onClick={() => setIsPreviewMode(!isPreviewMode)} className="px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold">
          {isPreviewMode ? "العودة للتعديل" : "معاينة النموذج"}
        </button>
        <button onClick={() => console.log(formData)} className=" px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold">
          نشر النموذج
        </button>
      </div>

    </div>
  );
};

export default FormBuilderManager;