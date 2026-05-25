// src/components/Forms/IdeaForm.js
import React, { useReducer, useState, useEffect } from "react";
import Button from "../Button";
import Stepper from "../Stepper";
import DynamicStep from "../DynamicStep";
import { initialForm, ideaReducer } from "../../hooks/useIdeaReducer";

// -------------------------------------------------------------
// تعليق كود الـ API مؤقتاً لتجنب مشاكل الـ imports والأخطاء أثناء العمل المحلي
// -------------------------------------------------------------
// import { useGetSeasonFormDesignQuery } from "../../api/endpoints/formConfigApi";
// import { useSaveStepMutation, useSubmitIdeaMutation } from "../../api/endpoints/ideasApi"; 

const FALLBACK_SECTORS = [
  { value: "agriculture", label: "الزراعة" },
  { value: "education", label: "التعليم" },
  { value: "health", label: "الصحة" },
  { value: "energy", label: "الطاقة" }
];

const FALLBACK_STEPS = [
  {
    id: 1,
    title: "المعلومات الشخصية",
    questions: [
      { key: "phone", label: "رقم الهاتف", type: "text", required: true, placeholder: "رقم الهاتف", choices: [] },
      { key: "recidence", label: "الاقامة", type: "text", required: true, placeholder: "مكان السكن", choices: [] },
      { key: "name", label: "الاسم", type: "text", required: true, placeholder: null, choices: [] }
    ]
  },
  {
    id: 2,
    title: "معلومات الفكرة",
    questions: [
      { key: "title", label: "عنوان الفكرة", type: "text", required: true, placeholder: null, choices: [] },
      { key: "sector", label: "القطاع المستهدف", type: "text", required: true, placeholder: "صحة\\تعليم\\طبي", choices: [] },
      { key: "description", label: "وصف مختصر للفكرة", type: "text", required: true, placeholder: "وصف الفكرة", choices: [] }
    ]
  },
  {
    id: 3,
    title: "معلومات اضافية",
    questions: [
      { key: "target_audience", label: "الجمهور المستهدف", type: "text", required: true, placeholder: "الفئة المستهدفة", choices: [] },
      { key: "product_type", label: "نوع المنتج", type: "select", required: true, placeholder: "ويب\\تطبيق", choices: [
          { id: 1, value: "app", label: "تطبيق" },
          { id: 2, value: "web", label: "موقع" }
        ]
      },
      { key: "duration", label: "المدة المتوقعة لانجاز المشروع", type: "text", required: true, placeholder: "المدة المتوقعة بالاشهر", choices: [] },
      { key: "problem", label: "المشكلة التي يحلها المشروع", type: "text", required: true, placeholder: "المشكلة التي يحلها المشروع", choices: [] }
    ]
  },
  {
    id: 4,
    title: "معلومات الفريق",
    questions: [
      { key: "team", label: "هل لديك فريق؟", type: "boolean", required: true, placeholder: null, choices: [] },
      { key: "اعضاء الفريق", label: "ايميلات اعضاء الفريق", type: "list_text", required: true, placeholder: null, choices: [] }
    ]
  }
];

const IdeaForm = ({ onSubmit }) => {
  // -------------------------------------------------------------
  // تعليق دوال الـ RTK Query / API
  // -------------------------------------------------------------
  // const { data: formConfigFromApi, isLoading: isConfigLoading } = useGetSeasonFormDesignQuery();
  // const [saveStep, { isLoading: isSavingStep }] = useSaveStepMutation();
  // const [submitIdea, { isLoading: isSubmitting }] = useSubmitIdeaMutation();
  
  // حالات وهمية (Mocked States) بديلة للـ API للحفاظ على استقرار الكود أثناء التعليق
  const isConfigLoading = false; 
  const isSavingStep = false;
  const isSubmitting = false;
  const formConfigFromApi = null; 

  const [form, dispatch] = useReducer(ideaReducer, initialForm);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const sectors = FALLBACK_SECTORS;
  const steps = formConfigFromApi?.steps || FALLBACK_STEPS;
  const requiredFields = formConfigFromApi?.requiredFields || [];

  const hasMultipleSteps = steps.length > 1;

  useEffect(() => {
    if (formConfigFromApi?.current_step) {
      setCurrentStep(formConfigFromApi.current_step - 1); 
    }
  }, [formConfigFromApi]);
 const handleChange = (field, value) => {
    let finalValue = value;
    // تحويل القيمة القادمة لحقل الفريق لـ Boolean حقيقي ليتوافق مع الباكيند
    if (field === "team") {
      if (value === "true" || value === true || value === "yes") finalValue = true;
      if (value === "false" || value === false || value === "no") finalValue = false;
    }

    dispatch({
      type: "UPDATE_FIELD",
      field: field,
      value: finalValue
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = () => {
    const currentStepFields = steps[currentStep]?.questions || [];
    const newErrors = {};
    
    currentStepFields.forEach(field => {
      const value = form[field.key];
      
      // نتخطى الـ Validation التقليدي لحقل الـ team هنا لأنه يتم معالجته بالأسفل بشكل مخصص
      if (field.required && field.key !== "team" && (value === undefined || value === null || value === "")) {
        newErrors[field.key] =` ${field.label || field.key} مطلوب`;
      }
      
      if (requiredFields.includes(field.key) && field.key !== "team" && (value === undefined || value === null || value === "")) {
        newErrors[field.key] =` ${field.label || field.key} مطلوب`;
      }
    });
    
    // التعديل الذكي: التحقق من حقل الفريق سواء كان Boolean أو نصاً قديماً
    if (form.team === true || form.team === "yes") {
      if (!form["اعضاء الفريق"] || form["اعضاء الفريق"].length === 0) {
        newErrors["اعضاء الفريق"] = "ايميلات اعضاء الفريق مطلوبة";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getStepPayload = (stepIndex) => {
    const currentStepFields = steps[stepIndex]?.questions || [];
    const stepData = {};
    
    currentStepFields.forEach(field => {
      stepData[field.key] = form[field.key];
    });

    return {
      step: stepIndex + 1,
      data: stepData
    };
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    try {
      const payload = getStepPayload(currentStep);
      console.log("تم حفظ الخطوة محلياً بنجاح، الـ Payload المرسل:", payload);
      
      // تعليق إرسال الخطوة للسيرفر
      // await saveStep(payload).unwrap();
      
      setCurrentStep(currentStep + 1);
    } catch (apiError) {
      if (apiError?.data) {
        setErrors(apiError.data);
      } else {
        alert("حدث خطأ ما.");
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const payload = getStepPayload(currentStep);
      console.log("حفظ الخطوة الأخيرة محلياً:", payload);
      console.log("كل بيانات الفورم النهائية الجاهزة للإرسال:", form);

      // تعليق الـ API Calls النهائية
      // await saveStep(payload).unwrap();
      // const submitResponse = await submitIdea({}).unwrap();
      
      if (onSubmit) onSubmit(form); 
      
    } catch (apiError) {
      if (apiError?.data) {
        setErrors(apiError.data);
      } else {
        alert("حدث خطأ أثناء الإرسال.");
      }
    }
  };

  if (isConfigLoading) {
    return (
      <div className="container space-y-6">
        <p className="text-center text-gray-500 py-10">جاري تحميل الفورم...</p>
      </div>
    );
  }

  if (!hasMultipleSteps) {
    const allFields = steps[0]?.questions || [];
    const stepName = steps[0]?.title || "نموذج التسجيل";
    
    return (
      <form onSubmit={handleSubmit} className="container space-y-6">
        <DynamicStep
          stepName={stepName}
          fields={allFields}
          form={form}
          errors={errors}
          handleChange={handleChange}
          sectors={sectors}
        />
        
        <div className="flex justify-center mt-4">
          <Button
            label="إرسال"
            type="submit"
            className="w-50 bg-main-color text-white px-4 py-2 rounded"
          />
        </div>
      </form>
    );
  }
 const currentStepFields = steps[currentStep]?.questions || [];
  const currentStepName = steps[currentStep]?.title || "";

  return (
    <form onSubmit={handleSubmit} className="container space-y-6">
      <Stepper steps={steps.map(s => s.title)} current={currentStep} />

      <DynamicStep
        stepName={currentStepName}
        fields={currentStepFields}
        form={form}
        errors={errors}
        handleChange={handleChange}
        sectors={sectors}
      />

      <div className="flex gap-4">
        {currentStep < steps.length - 1 && (
          <Button
            label="التالي"
            type="button"
            onClick={handleNext}
            className="w-50 bg-main-color text-white px-4 py-2 rounded"
          />
        )}

        {currentStep > 0 && (
          <Button
            label="رجوع"
            type="button"
            onClick={handlePrevious}
            className="w-50 bg-gray-500 px-4 py-2 rounded"
          />
        )}

        {currentStep === steps.length - 1 && (
          <Button
            label="إرسال الفكرة"
            type="submit"
            className="w-50 bg-main-color text-white px-4 py-2 rounded"
          />
        )}
      </div>
    </form>
  );
};

export default IdeaForm;