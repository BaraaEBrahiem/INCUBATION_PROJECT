import React, { useState, useEffect } from "react";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Select from "../../Select";

// 1️⃣ استدعاء دالة الجلب الصحيحة والمتوافقة مع الباك إند
import { useGetFormStructureQuery } from "../../../api/endpoints/admin/dynamicFormApi";

const FormBuilder = ({ season }) => {
  const isOpen = season?.phase === "SUBMISSION";
  const seasonId = season?.id || season?.pk;

  const { data: formConfig, isLoading } = useGetFormStructureQuery(seasonId, {
    skip: !seasonId,
  });

  // استخراج الخطوات المرجعة من السيرفر (ووضع خطوة افتراضية كـ Fallback في حال لم يكتمل الرد بعد)
  const steps = formConfig?.steps || [{ id: 1, title: "المعلومات الأساسية", questions: [] }];
  
  // الـ State للتحكم بالخطوة النشطة الحالية أثناء عرض التفاصيل
  const [activeStepId, setActiveStepId] = useState(steps[0]?.id || 1);
  const [formValues, setFormValues] = useState({});

  // تحديث الخطوة النشطة تلقائياً بمجرد تحميل البيانات من السيرفر
  useEffect(() => {
    if (formConfig?.steps && formConfig.steps.length > 0) {
      //eslint-disable-next-line
      setActiveStepId(formConfig.steps[0].id);
      
      // تجهيز الـ initial values لكل الأسئلة في جميع الخطوات
      const initialValues = {};
      formConfig.steps.forEach((step) => {
        (step.questions || []).forEach((q) => {
          const fieldKey = q.is_static ? q.static_field : q.key;
          initialValues[fieldKey] = "";
        });
      });
      setFormValues(initialValues);
    }
  }, [formConfig]);

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const renderQuestion = (q, index) => {
    // تحديد المفتاح الفريد للسؤال (ثابت أو ديناميكي)
    const fieldKey = q.is_static ? q.static_field : q.key;
    
    const commonProps = {
      key: q.id || `${fieldKey}_${index}`,
      label: q.label,
      name: fieldKey,
      value: formValues[fieldKey] || "",
      onChange: (e) => handleChange(fieldKey, e.target.value),
      placeholder: q.placeholder || `أدخل ${q.label}`,
      required: q.required,
      disabled: !isOpen, 
    };

    switch (q.type) {
      case "select":
      case "select_multiple":{
        
        const formattedOptions = (q.choices || []).map(choice => ({
          label: choice.label,
          value: choice.value
        }));
        return <Select {...commonProps} options={formattedOptions} />;
      }
      case "textarea":
        return <Textarea {...commonProps} rows={4} />;
        
      default:
        return <Input {...commonProps} type={q.type || "text"} />;
    }
  };

  // الحصول على بيانات الخطوة المحددة حالياً
  const currentStep = steps.find((s) => s.id === activeStepId) || steps[0];
  const currentQuestions = currentStep?.questions || [];

  if (isLoading) {
    return (
      <div className="flex gap-6" dir="rtl">
        <div className="flex-1 p-5 text-center py-10">
          <p className="text-gray-500 font-bold">جاري تحميل هيكل وتفاصيل النموذج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6" dir="rtl">
      {/* القسم الرئيسي لعرض تفاصيل الاستمارة */}
      <div className="flex-1 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold mb-2 text-gray-800">
          {formConfig?.title || season?.name || "استمارة التقديم"}
          <span className="text-sm font-normal text-gray-500 mr-2">(معاينة الهيكل الحالي)</span>
        </h1>
        <p className="text-gray-400 text-xs mb-6">هذا هو الشكل الذي سيظهر للمستخدمين عند تعبئة طلباتهم.</p>

        {/* أزرار التنقل بين الخطوات (Tabs) */}
        {steps.length > 1 && (
          <div className="flex gap-2 border-b pb-3 mb-6 overflow-x-auto">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                className={`px-4 py-2 rounded-md font-semibold text-sm transition ${
                  step.id === activeStepId
                    ? "bg-main-color text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        )}

        {currentQuestions.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-lg text-gray-400">
            لا توجد أسئلة مضافة في هذه الخطوة حالياً.
          </div>
        ) : (
          <div className="space-y-6">
            {/* عرض الأسئلة العادية (نصوص، أرقام، إيميلات) في شبكة مصفوفة متناسقة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestions
                .filter((q) => q.type !== "textarea" && q.type !== "select" && q.type !== "select_multiple")
                .map((q, idx) => renderQuestion(q, idx))}
            </div>

            {/* عرض القوائم المنسدلة والنصوص الكبيرة (تأخذ سطر كامل تلقائياً لجمالية التصميم) */}
            <div className="space-y-4 border-t pt-4 border-gray-50">
              {currentQuestions
                .filter((q) => ["select", "select_multiple", "textarea"].includes(q.type))
                .map((q, idx) => renderQuestion(q, idx))}
            </div>
          </div>
        )}
      </div>

      {/* شريط الإحصائيات الجانبي الثابت */}
      <div className="w-64 h-fit border border-second-color bg-white rounded-lg shadow p-4 flex flex-col gap-3">
        <div className="border-b pb-2">
          <p className="text-xs text-gray-400">معلومات الموسم الحالية:</p>
        </div>
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-black">عدد الطلبات المستلمة: </span>
          {season?.ideas_count || season?.idea_count || 0}
        </p>
        {isOpen && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-black">المتبقي لإغلاق التقديم: </span>
            {season?.remaining_days || 0} أيام
          </p>
        )}
        <div className="mt-2 pt-2 border-t text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
            isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {isOpen ? "التقديم متاح حالياً" : "التقديم مغلق"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;