import React, { useReducer, useState } from "react";
import Button from "../Button";
import Stepper from "../Stepper";
import DynamicStep from "../DynamicStep";
import { initialForm, ideaReducer } from "../../hooks/useIdeaReducer";
import { useGetIdeaFormDesignQuery } from "../../api/endpoints/formConfigApi";

const FALLBACK_SECTORS = [
  { value: "agriculture", label: "الزراعة" },
  { value: "education", label: "التعليم" },
  { value: "health", label: "الصحة" },
  { value: "energy", label: "الطاقة" }
];

const FALLBACK_STEPS = [
  {
    name: "المعلومات الشخصية",
    fields: [
      { name: "name", label: "الاسم", type: "text", required: true },
      { name: "city", label: "المدينة", type: "text", required: true },
      { name: "tel", label: "رقم الهاتف", type: "tel", required: true }
    ]
  },
  {
    name: "معلومات الفكرة",
    fields: [
      { name: "title", label: "عنوان الفكرة", type: "text", required: true },
      { name: "sector", label: "القطاع", type: "select", required: true },
      { name: "description", label: "وصف الفكرة", type: "text", required: true },
      { name: "product_type", label: "نوع المنتج", type: "text", required: true } // تعديل: تحويله إلى product_type ليطابق الـ API
    ]
  },
  {
    name: "تفاصيل إضافية",
    fields: [
      { name: "targetAudience", label: "الجمهور المستهدف", type: "text", required: true },
      { name: "productProblem", label: "المشكلة التي يحلها المنتج", type: "text", required: true },
      { name: "projectDuration", label: "مدة المشروع", type: "text", required: true }
    ]
  },
  {
    name: "الفريق",
    fields: [
      { name: "hasTeam", label: "هل لديك فريق؟", type: "radio", required: true }, // تعديل: أصبح مطلوباً لمنع خطأ الباك إند
      { name: "teamMembers", label: "أعضاء الفريق", type: "text", required: false },
      { name: "teamEmails", label: "البريد الإلكتروني لكل عضو", type: "text", required: false }
    ]
  }
];

const IdeaForm = ({ onSubmit, seasonId }) => {
  const { data: formConfigFromApi, isLoading: isConfigLoading } = useGetIdeaFormDesignQuery(seasonId);
  const [form, dispatch] = useReducer(ideaReducer, initialForm);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const ideaFormConfig = formConfigFromApi?.idea_form || {};
  const sectors = ideaFormConfig.sectors || FALLBACK_SECTORS;
  const steps = ideaFormConfig.steps || FALLBACK_STEPS;
  const requiredFields = ideaFormConfig.requiredFields || [];

  const hasMultipleSteps = steps.length > 1;

  const handleChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const currentStepFields = steps[currentStep]?.fields || [];
    const newErrors = {};

    currentStepFields.forEach((field) => {
      if (field.required && !form[field.name]) {
        newErrors[field.name] = `${field.label || field.name} مطلوب;`;
      }
      if (requiredFields.includes(field.name) && !form[field.name]) {
        newErrors[field.name] = `${field.label || field.name} مطلوب;`;
      }
    });

    // التحقق المخصص بناءً على اختيار وجود فريق (لتجنب أخطاء الإرسال النهائي في الـ PDF)
    if (steps[currentStep]?.name === "الفريق") {
      if (!form.hasTeam) {
        newErrors.hasTeam = "يرجى تحديد ما إذا كان لديك فريق أم لا";
      } else if (form.hasTeam === "yes") {
        if (!form.teamMembers) newErrors.teamMembers = "أعضاء الفريق مطلوبون عند اختيار نعم";
        if (!form.teamEmails) newErrors.teamEmails = "البريد الإلكتروني لكل عضو مطلوب";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => validateStep() && setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);
 const handleSubmit = (e) => {
    e.preventDefault();
    if (hasMultipleSteps && !validateStep()) return;
    
    if (!hasMultipleSteps) {
      const allFields = steps.flatMap((s) => s.fields);
      const newErrors = {};
      allFields.forEach((field) => {
        if ((field.required || requiredFields.includes(field.name)) && !form[field.name]) {
          newErrors[field.name] = `${field.label || field.name} مطلوب;`;
        }
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    onSubmit(form);
  };

  if (isConfigLoading) {
    return (
      <div className="container space-y-6">
        <p className="text-center text-gray-500 py-10">جاري تحميل الفورم...</p>
      </div>
    );
  }

  if (!hasMultipleSteps) {
    const allFields = steps[0]?.fields || [];
    const stepName = steps[0]?.name || "نموذج التسجيل";
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
          <Button label="إرسال" type="submit" className="w-50 bg-main-color text-white px-4 py-2 rounded" />
        </div>
      </form>
    );
  }

  const currentStepFields = steps[currentStep]?.fields || [];
  const currentStepName = steps[currentStep]?.name || "";
  
  return (
    <form onSubmit={handleSubmit} className="container space-y-6">
      <Stepper steps={steps.map((s) => s.name)} current={currentStep} />
      <DynamicStep
        stepName={currentStepName}
        fields={currentStepFields}
        form={form}
        errors={errors}
        handleChange={handleChange}
        sectors={sectors}
      />
      <div className="flex gap-4 mt-6">
        {currentStep > 0 && (
          <Button label="رجوع" type="button" onClick={handlePrevious} className="w-50 bg-gray-300 px-4 py-2 rounded" />
        )}
        {currentStep < steps.length - 1 ? (
          <Button label="التالي" type="button" onClick={handleNext} className="w-50 bg-main-color text-white px-4 py-2 rounded" />
        ) : (
          <Button label="إرسال" type="submit" className="w-50 bg-main-color text-white px-4 py-2 rounded" />
        )}
      </div>
    </form>
  );
};

export default IdeaForm;