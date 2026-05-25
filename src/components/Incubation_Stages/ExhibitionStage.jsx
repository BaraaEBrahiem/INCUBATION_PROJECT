 // src/components/Incubation_Stages/ExhibitionStage.js
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import AlertBox from "../AlertBox";
import { useGetExhibitionFormConfigQuery } from "../../api/endpoints/formConfigApi";
import { useSaveExhibitionDataMutation, useGetExhibitionDataQuery } from "../../api/endpoints/incubationApi";

// -------------------------------------------------------------
// الـ JSON الثابت المطابق تماماً لبيانات الباك إند القادمة في الصور
// -------------------------------------------------------------
const BACKEND_JSON_FALLBACK = [
  { id: 1, key: "title", label: "عنوان المشروع", type: "text", required: true },
  { id: 2, key: "sector", label: "القطاع", type: "text", required: true },
  { id: 3, key: "project_goal", label: "الهدف", type: "text", required: true },
  { id: 4, key: "services", label: "الخدمات", type: "text", required: false },
  { id: 5, key: "team member names", label: "أسماء أعضاء الفريق", type: "text", required: false },
  { id: 6, key: "team member emails", label: "إيميلات أعضاء الفريق", type: "text", required: false }
];

const ExhibitionStage = ({ onComplete }) => {
  const userId = useSelector((state) => state.auth.userId);
  
  // جلب إعدادات الفورم الديناميكية
  const { data: formConfig, isLoading: isConfigLoading } = useGetExhibitionFormConfigQuery();
  
  // جلب البيانات المحفوظة سابقاً
  const { data: savedData, isLoading: isLoadingData } = useGetExhibitionDataQuery(userId, {
    skip: !userId,
  });
  const [saveExhibitionData, { isLoading: isSaving }] = useSaveExhibitionDataMutation();

  // 1. إذا نجح الـ API نأخذ منه، وإذا فشل أو كان فارغاً نأخذ الجيسون الثابت المطابق للصورة فوراً
  const dynamicQuestions = formConfig?.form?.questions?.length > 0 
    ? formConfig.form.questions 
    : BACKEND_JSON_FALLBACK;

  const exhibitionDate = formConfig?.exhibition_date || "2026";
  const formTitle = formConfig?.form?.title || "معرض صيف 2026";

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // تهيئة وتحديث قيم الفورم بناءً على الـ keys الخاصة بالـ JSON الثابت أو القادم من الباك
  useEffect(() => {
    if (dynamicQuestions.length > 0) {
      const initialForm = {};
      dynamicQuestions.forEach(q => {
        initialForm[q.key] = savedData?.[q.key] || savedData?.data?.[q.key] || "";
      });
      setForm(prev => {
        if (JSON.stringify(prev) === JSON.stringify(initialForm)) return prev;
        return initialForm;
      });
    }
  }, [dynamicQuestions, savedData]);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    dynamicQuestions.forEach(q => {
      if (q.required && !form[q.key]) {
        newErrors[q.key] = `${q.label} مطلوب;`
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!validate()) return;

    try {
      // مطابقة هيكل الـ POST تماماً مع الصورة الثانية (تغليف بداخل كائن data)
      const payload = {
        data: {
          ...form
        }
      };

      await saveExhibitionData(payload).unwrap();
      setSubmitSuccess("Exhibition form submitted successfully.");
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    } catch (error) {
      console.error("Error saving exhibition data:", error);
      setSubmitError(error?.data?.message || "حدث خطأ في حفظ البيانات");
    }
  };
 // حيلة صغيرة: حتى لو الـ Loading معلق، طالما لدينا Fallback جاهز، سنلغي الـ Loading لضمان ظهور الحقول فوراً
  const isFormEmpty = Object.keys(form).length === 0;
  if ((isConfigLoading || isLoadingData) && isFormEmpty) {
    return (
      <div className="p-6 space-y-8 min-h-screen bg-white-color">
        <p className="text-center text-black text-lg animate-pulse">جاري تحميل حقول المعرض...</p>
      </div>
    );
  }

  // تقسيم مصفوفة الأسئلة (سواء القادمة أو الثابتة) إلى عمودين
  const leftColumnQuestions = dynamicQuestions.filter((_, idx) => idx % 2 === 0);
  const rightColumnQuestions = dynamicQuestions.filter((_, idx) => idx % 2 === 1);

  const renderField = (q) => (
    <div key={q.key} className="flex flex-col space-y-2 text-right w-full">
      <label className="text-sm font-semibold text-black">
        {q.label} {q.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={form[q.key] || ""}
        onChange={(e) => handleChange(q.key, e.target.value)}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-color ${
          errors[q.key] ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={`أدخل ${q.label}`}
      />
      {errors[q.key] && (
        <span className="text-xs text-red-500 font-medium">{errors[q.key]}</span>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-8 min-h-screen bg-white-color" dir="rtl">
      {formTitle && (
        <h2 className="text-xl font-bold text-second-color mb-4">{formTitle}</h2>
      )}
      <p className="font-bold text-black">
        تاريخ المعرض:
        <span className="text-main-color mr-2"> {exhibitionDate}</span>
      </p>

      <AlertBox message="املأ الحقول التي تريد اظهارها فقط في بطاقة المشروع." />

      {submitError && (
        <div className="bg-red-100 text-red-700 p-3 rounded text-center font-medium">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="bg-green-100 text-green-700 p-3 rounded text-center font-medium">
          {submitSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto space-y-8">
        <div className="flex flex-row-reverse items-start justify-center gap-8 w-full">
          
          {/* العمود الأول (يمين) */}
          <div className="w-[45%] space-y-6">
            {leftColumnQuestions.map(q => renderField(q))}
          </div>

          {/* العمود الثاني (يسار) */}
          <div className="w-[45%] space-y-6">
            {rightColumnQuestions.map(q => renderField(q))}
          </div>

        </div>

        <div className="flex items-center justify-center mt-6">
          <Button 
            label={isSaving ? "جاري الحفظ..." : "إرسال"}
            className="bg-main-color text-white px-10 py-2.5 rounded-md font-bold shadow-md hover:bg-opacity-90 transition-all"
            type="submit"
            disabled={isSaving}
          />
        </div>
      </form>
    </div>
  );
};

export default ExhibitionStage;