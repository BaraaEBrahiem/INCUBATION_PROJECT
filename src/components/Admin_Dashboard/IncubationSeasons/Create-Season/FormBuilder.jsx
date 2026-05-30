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
// import React, { useState, useEffect } from "react";
// import FieldTypesPanel from "./FieldTypesPanel";
// import FormBuilderCanvas from "./FormBuilderCanvas";
// import FormPreview from "./FormPreview";
// import { showError, showSuccess } from "../../Utils/toast";
// import { useSaveFormStructureMutation, useGetFormStructureQuery } from "../../api/endpoints/admin/dynamicFormApi.js";

// const FormBuilderManager = () => {
//   const [formData, setFormData] = useState({
//     title: "فورم تقديم الأفكار",
//     steps: [{ id: 1, title: "المعلومات الشخصية", order: 1, questions: [] }]
//   });

//   const [activeStepId, setActiveStepId] = useState(1);
//   const [isPreviewMode, setIsPreviewMode] = useState(false);

//   const { data: serverForm, isLoading: isFetching } = useGetFormStructureQuery();
//   const [saveFormStructure, { isLoading: isPublishing }] = useSaveFormStructureMutation();

//   useEffect(() => {
//     if (serverForm && serverForm.steps && serverForm.steps.length > 0) {
//       //eslint-disable-next-line
//       setFormData(serverForm);
//       setActiveStepId(serverForm.steps[0].id);
//     }
//   }, [serverForm]);

//   const currentStep = formData.steps.find((s) => s.id === activeStepId) || formData.steps[0];

//   const addStep = () => {
//     const newOrder = formData.steps.length + 1;
//     const newStep = {
//       id: Date.now(),
//       title: ` خطوة جديدة رقم ${newOrder}`,
//       order: newOrder,
//       questions: []
//     };
//     setFormData({ ...formData, steps: [...formData.steps, newStep] });
//   };

//   const addFieldToCurrentStep = (fieldType, staticConfig = null) => {
//     const isStatic = !!staticConfig;
//     const newField = {
//       id: Date.now(),
//       key: isStatic ? staticConfig.static_field : `dynamic_${Date.now()}`,
//       label: isStatic ? staticConfig.label : "سؤال جديد",
//       type: fieldType,
//       required: true,
//       order: currentStep.questions.length + 1,
//       source: isStatic ? "STATIC" : "DYNAMIC",
//       static_field: isStatic ? staticConfig.static_field : null,
//       options: []
//     };

//     setFormData({
//       ...formData,
//       steps: formData.steps.map((s) => s.id === activeStepId ? { ...s, questions: [...s.questions, newField] } : s)
//     });
//   };

//   const prepareFormDataForBackend = (rawFormData) => {
//     return {
//       title: rawFormData.title || "فورم تقديم الأفكار",
//       steps: rawFormData.steps.map((step, stepIndex) => {
//         const formattedStep = {
//           title: step.title,
//           order: stepIndex + 1,
//         };
//         if (step.id && String(step.id).length < 10) {
//           formattedStep.id = step.id;
//         }

//         formattedStep.questions = step.questions.map((q, qIndex) => {
//           const isStatic = q.source === "STATIC" || q.is_static === true;
//           if (isStatic) {
//             const staticQuestion = {
//               is_static: true,
//               static_field: q.static_field,
//               required: q.required ?? true,
//               order: qIndex + 1,
//             };
//             if (q.id && String(q.id).length < 10) {
//               staticQuestion.id = q.id;
//             }
//             return staticQuestion;
//           } else {
//             const dynamicQuestion = {
//               is_static: false,
//               key: q.key || `dynamic_key_${qIndex}`,
//               label: q.label,
//               type: q.type || "text",
//               required: q.required ?? true,
//               order: qIndex + 1,
//             };
//             if (q.id && String(q.id).length < 10) {
//               dynamicQuestion.id = q.id;
//             }

//             if (["select", "select_multiple"].includes(q.type)) {
//               const rawOptions = q.options || q.choices || [];
//               dynamicQuestion.choices = rawOptions.map((opt, optIndex) => {
//                 const formattedChoice = {
//                   value: opt.value || `val_${optIndex}`,
//                   label: opt.label || opt.text,
//                   order: optIndex + 1,
//                 };
//                 if (opt.id && String(opt.id).length < 10) {
//                   formattedChoice.id = opt.id;
//                 }
//                 return formattedChoice;
//               });
//             }
//             return dynamicQuestion;
//           }
//         });
//         return formattedStep;
//       }),
//     };
//   };

//   const handlePublishForm = async () => {
//     try {
//       const cleanPayload = prepareFormDataForBackend(formData);
//       await saveFormStructure(cleanPayload).unwrap();
//       showSuccess("تم نشر وتحديث نموذج الاستمارة بنجاح");
//     } catch (err) {
//       showError(err?.data?.detail || "حدث خطأ أثناء محاولة نشر النموذج");
//     }
//   };

//   if (isFetching) {
//     return <div className="text-center mt-20 font-bold">جاري تحميل هيكل النموذج...</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-between" dir="rtl">
      
//       <div className="mb-2">
//         <div className=" p-4 rounded-lg shadow mb-6">
//           <h4 className="text-md">يرجى تعبئة كافة الحقول لضمان قبول طلباتكم في الحاضنة</h4>
//         </div>

//         {isPreviewMode ? (
//           <FormPreview steps={formData.steps} />
//         ) : (
//           <div className="flex gap-6 items-start">
            
//             <div className="flex-1 flex flex-col gap-4">
//               <div className="flex gap-4 bg-white p-3 rounded-lg shadow items-center overflow-x-auto">
//                 <span className="text-lg font-bold text-black ml-2">الخطوات:</span>
//                 {formData.steps.map((step) => (
//                   <button
//                     key={step.id}
//                     onClick={() => setActiveStepId(step.id)}
//                     className={`px-2 py-2 rounded-md text-l font-bold ${step.id === activeStepId ? "bg-main-color text-white" : "bg-gray-200"}`}
//                   >
//                     {step.title} (الترتيب: {step.order})
//                   </button>
//                 ))}
//                 <button onClick={addStep} className="px-3 py-1 bg-main-color text-white rounded-md text-lg mr-auto">
//                   + إنشاء خطوة
//                 </button>
//               </div>

//               <FormBuilderCanvas
//                 fields={currentStep?.questions || []}
//                 updateField={(id, props) => setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.map(q => q.id === id ? {...q, ...props} : q)} : s)})}
//                 deleteField={(id) => setFormData({...formData, steps: formData.steps.map(s => s.id === activeStepId ? {...s, questions: s.questions.filter(q => q.id !== id)} : s)})}
//               />
//             </div>

//             <FieldTypesPanel addField={addFieldToCurrentStep} />

//           </div>
//         )}
//       </div>

//       <div className=" flex justify-center gap-4 z-50">
//         <button onClick={() => setIsPreviewMode(!isPreviewMode)} className="px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold">
//           {isPreviewMode ? "العودة للتعديل" : "معاينة النموذج"}
//         </button>
//         <button 
//           onClick={handlePublishForm} 
//           disabled={isPublishing}
//           className=" px-4 py-2 bg-main-color text-white rounded-md text-lg font-semibold"
//         >
//           {isPublishing ? "جاري النشر..." : "نشر النموذج"}
//         </button>
//       </div>

//     </div>
//   );
// };

// export default FormBuilderManager;