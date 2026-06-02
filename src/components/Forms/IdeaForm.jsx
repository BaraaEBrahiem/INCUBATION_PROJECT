 import React, { useReducer, useState, useEffect } from "react";
import Button from "../Button";
import Stepper from "../Stepper";
import DynamicStep from "../DynamicStep";
import { initialForm, ideaReducer } from "../../hooks/useIdeaReducer";
import { useGetIdeaFormDesignQuery } from "../../api/endpoints/formConfigApi";

const BASE_URL = "http://127.0.0.1:8000/api/ideas/seasons/1";

// البيانات التجريبية (Fallback Data) المطابقة للباك إند تماماً
const FALLBACK_SECTORS = [
  { value: "agriculture", label: "الزراعة" },
  { value: "تعليمي", label: "التعليم" }, 
  { value: "health", label: "الصحة" },
  { value: "energy", label: "الطاقة" }
];


const FALLBACK_STEPS = [
  {
    name: "المعلومات الشخصية",
    fields: [
      { name: "name", label: "الاسم", type: "text", required: true },
      { name: "recidence", label: "المحافظة/السكن", type: "text", required: true },
      { name: "phone", label: "رقم الهاتف", type: "tel", required: true }
    ]
  },
  {
    name: "معلومات الفكرة",
    fields: [
      { name: "title", label: "عنوان الفكرة", type: "text", required: true },
      { name: "sector", label: "القطاع", type: "select", required: true },
      { name: "description", label: "وصف الفكرة", type: "text", required: true }
    ]
  },
  {
    name: "تفاصيل إضافية",
    fields: [
      { name: "target_audience", label: "الجمهور المستهدف", type: "text", required: true },
      { name: "product_type", label: "نوع المنتج", type: "select", required: true },
      { name: "duration", label: "مدة المشروع", type: "text", required: true },
      { name: "problem", label: "المشكلة التي يحلها المنتج", type: "text", required: true }
    ]
  },
  {
    name: "الفريق",
    fields: [
      { name: "team", label: "هل لديك فريق؟", type: "boolean", required: true },
      { name: "ايميلات اعضاء الفريق", label: "البريد الإلكتروني لأعضاء الفريق", type: "text", required: false }
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

  // =========================================================================
  // الدالة 1: جلب المسودة وهيكلية الفورم [مُعلّقة لمشاهدة التنفيذ عيانياً]
  // =========================================================================
  useEffect(() => {
    const loadDraftData = async () => {
      const url = `${BASE_URL}/submission-form/`;
      console.log("%c[API GET] جاري محاكاة طلب جلب المسودة من الرابط:", "color: #00bcd4", url);

      /* // كود التنفيذ الفعلي الموعود (عند الربط امسحي تعليق الـ Block هذا):
      try {
        const response = await axios.get(url, { headers: { Authorization: Bearer ${token} } });
        if (response.data && response.data.draft_data) {
          const draft = response.data.draft_data;
          Object.keys(draft).forEach((key) => {
            dispatch({ type: "UPDATE_FIELD", field: key, value: draft[key] });
          });
          if (response.data.current_step) {
            setCurrentStep(response.data.current_step - 1);
          }
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات المسودة:", error);
      }
      */

      // محاكاة للتنفيذ: تعبئة بيانات تجريبية (كما تظهر في الـ Draft Data بالصور المرفقة)
      const simulatedDraft = {
        name: "Dani Ali",
        phone: "0994405200",
        recidence: "دمشق"
      };
      
      console.log("[Simulation] تم تحميل بيانات المسودة المحفوظة مسبقاً بنجاح:", simulatedDraft);
      Object.keys(simulatedDraft).forEach((key) => {
        dispatch({ type: "UPDATE_FIELD", field: key, value: simulatedDraft[key] });
      });
    };
 loadDraftData();
  }, [seasonId]);

  const handleChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const currentStepFields = steps[currentStep]?.fields || [];
    const newErrors = {};

    currentStepFields.forEach((field) => {
      if (field.required && !form[field.name]) {
        newErrors[field.name] = `${field.label || field.name} مطلوب;`
      }
    });

    if (steps[currentStep]?.name === "الفريق") {
      if (form.team === undefined || form.team === null) {
        newErrors.team = "يرجى تحديد ما إذا كان لديك فريق أم لا";
      } else if (form.team === true) {
        if (!form["ايميلات اعضاء الفريق"] || form["ايميلات اعضاء الفريق"].length === 0) {
          newErrors["ايميلات اعضاء الفريق"] = "إيميلات أعضاء الفريق مطلوبة عند اختيار نعم";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================================================================
  // الدالة 2: حفظ الخطوة مؤقتاً عند التالي [مُعلّقة لمشاهدة التنفيذ عيانياً]
  // =========================================================================
  const handleNext = async () => {
    if (!validateStep()) return;

    const currentStepFields = steps[currentStep]?.fields || [];
    const stepData = {};
    
    currentStepFields.forEach(field => {
      stepData[field.name] = form[field.name];
    });

    const url = `${BASE_URL}/save-step/`;
    const requestBody = {
      step: currentStep + 1,
      data: stepData
    };

    console.log("%c[API POST] جاري محاكاة حفظ الخطوة مؤقتاً:", "color: #4caf50", url);
    console.log("الـ Body المرسل المتوقع للباك إند:", JSON.stringify(requestBody, null, 2));

    /*
    // كود التنفيذ الفعلي الموعود (عند الربط امسحي تعليق الـ Block هذا):
    try {
      const response = await axios.post(url, requestBody, { headers: { Authorization: Bearer ${token} } });
      if (response.status === 200 || response.status === 201) {
         setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      if (error.response?.data) {
         setErrors(error.response.data); // لإظهار أخطاء الـ Bad Request تحت الحقول مباشرة
      }
      return;
    }
    */

    // الانتقال للخطوة التالية بالتنفيذ الحالي
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  // =========================================================================
  // الدالة 3: الإرسال النهائي [مُعلّقة لمشاهدة التنفيذ عيانياً]
  // =========================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasMultipleSteps && !validateStep()) return;

    const url = `${BASE_URL}/submit-idea/`;
    console.log("%c[API POST] جاري محاكاة طلب الإرسال النهائي الشامل:", "color: #f44336", url);

    /*
    // كود التنفيذ الفعلي الموعود (عند الربط امسحي تعليق الـ Block هذا):
    try {
      const response = await axios.post(url, {}, { headers: { Authorization: Bearer ${token} } });
      if(response.status === 200 || response.status === 201) { 
         onSubmit(form);
         alert("تم إرسال الفكرة بنجاح وتثبيتها بالسيستم!");
      }
    } catch (error) {
      if (error.response?.data) {
         setErrors(error.response.data); // التقاط أخطاء النقص قبل التثبيت النهائي
      }
    }
    */

    alert("محاكاة: تم ضغط إرسال نهائي ونجحت العملية!");
    onSubmit(form);
  };

  if (isConfigLoading) {
    return (
      <div className="container space-y-6">
        <p className="text-center text-gray-500 py-10">جاري تحميل الفورم...</p>
      </div>
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
          <Button label="إرسال النهائي" type="submit" className="w-50 bg-main-color text-white px-4 py-2 rounded" />
        )}
      </div>
    </form>
  );
};

export default IdeaForm;