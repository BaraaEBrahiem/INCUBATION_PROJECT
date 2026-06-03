import React, { useState, useEffect } from "react";
import DynamicStep from "../DynamicStep";
import Button from "../Button";
import AlertBox from "../AlertBox";
import { useSaveExhibitionDataMutation } from "../../api/endpoints/dashboardApi";

// -----------------------------
// Fallback (في حالة عدم وجود حقول من الـ API)
// -----------------------------
const FALLBACK_FIELDS = [
  { name: "teamName", label: "اسم الفريق إن وجد", type: "text", required: false },
  { name: "projectName", label: "اسم المشروع", type: "text", required: true },
  { name: "email", label: "بريد إلكتروني للتواصل", type: "email", required: true },
  { name: "membersEmails", label: "البريد الإلكتروني لكل عضو", type: "text", required: false, placeholder: "example@email.com, another@email.com" },
  { name: "members", label: "أعضاء الفريق", type: "text", required: false, placeholder: "أسماء الأعضاء مفصولة بفواصل" },
  { name: "goal", label: "هدف المشروع", type: "text", required: true },
  { name: "projectLink", label: "رابط المشروع إن وجد (يفضل)", type: "text", required: false, placeholder: "https://..." },
  { name: "services", label: "خدمات المشروع", type: "text", required: false },
  { name: "image", label: "شعار المشروع أو الصورة التعريفية", type: "file", required: false }, // دعم حقل الصورة افتراضياً
];

const ExhibitionStage = ({ data, refetchDashboard }) => {
  // استقبال داتا الـ Dashboard الموحدة من الأب
  const exhibitionDateRaw = data?.exhibition_date;
  const canEdit = data?.can_edit ?? false; // فقط الـ Owner الذي لم يسلم بعد يحق له التعديل
  const isOwner = data?.is_owner ?? false;
  const apiFormConfig = data?.form?.fields || data?.form?.steps?.[0]?.fields; 
  const submittedData = data?.submitted_data?.data || data?.submitted_data; // البيانات المسلمة مسبقاً إن وجدت

  // اعتماد الحقول القادمة من الباك أو الـ Fallback
  const currentStepFields = apiFormConfig || FALLBACK_FIELDS;

  const [saveExhibitionData, { isLoading: isSaving }] = useSaveExhibitionDataMutation();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // تنسيق التاريخ والوقت الخاص بالمعرض
  const formatDateTime = (isoString) => {
    if (!isoString) return "سيتم تحديده قريباً";
    const dateObj = new Date(isoString);
    return dateObj.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // تهيئة الفورم بالبيانات المسلّمة أو بحقول فارغة
  useEffect(() => {
    const initialForm = {};
    currentStepFields.forEach((field) => {
      if (submittedData && submittedData[field.name] !== undefined) {
        initialForm[field.name] = submittedData[field.name];
      } else {
        initialForm[field.name] = "";
      }
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
    setForm(initialForm);
  }, [submittedData, currentStepFields]);

  const handleChange = (key, value) => {
    if (!canEdit) return; // منع التعديل إذا لم يكن يملك الصلاحية
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    currentStepFields.forEach((field) => {
      // نتحقق من الحقول المطلوبة (باستثناء حقول الملفات إذا كانت تحتوي مسبقاً على رابط قديم)
      if (field.required && !form[field.name]) {
        newErrors[field.name] = `${field.label} مطلوب`;
      }
    });

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canEdit) return;
    setSubmitError("");
    setSubmitSuccess("");

    if (!validate()) return;

    try {
      // 1. التحقق الفوري ما إذا كان الفورم يحتوي على ملفات مرفوعة (مثل كائن الصورة)
      const hasFiles = Object.values(form).some((val) => val instanceof File);

      let payload;

      if (hasFiles) {
        // بناء Multipart FormData لرفع الملفات مع البيانات النصية تزامناً
        const formData = new FormData();
        const textData = {};

        Object.keys(form).forEach((key) => {
          if (form[key] instanceof File) {
            // إضافة الصورة كـ File مستقل في الجذور ليقرأها السيرفر من FILES
            formData.append(key, form[key]);
          } else {
            // تجميع الحقول النصية العادية
            textData[key] = form[key];
          }
        });

        formData.append("data", JSON.stringify(textData));
        payload = formData;
      } else {
     
        payload = {
          data: form,
        };
      }
      await saveExhibitionData(payload).unwrap();
      setSubmitSuccess("تم حفظ وتسليم بيانات المعرض بنجاح! بالتوفيق في العرض النهائي.");
      
      if (refetchDashboard) {
        setTimeout(() => {
          refetchDashboard();
        }, 1500);
      }
    } catch (error) {
      console.error("Error saving exhibition data:", error);
      setSubmitError(error?.data?.message || error?.data?.detail || "حدث خطأ أثناء تسليم البيانات");
    }
  };

  return (
    <div className="p-4 md:p-6 rounded-xl space-y-6 min-h-[80vh] bg-white-color">
      
      {/* هيدر المرحلة والتوقيت */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-second-color">مرحلة المعرض النهائي والتخرج</h2>
          <p className="text-gray-500 text-sm mt-0.5">يرجى استكمال بيانات بطاقة المشروع التي ستعرض أمام زوار المستثمرين.</p>
        </div>
        <div className="bg-main-color/5 border border-main-color/20 text-main-color font-bold px-4 py-2 rounded-xl text-center">
          <span className="text-xs block font-medium text-gray-500">موعد المعرض المعتمد:</span>
          {formatDateTime(exhibitionDateRaw)}
        </div>
      </div>

      {/* بوكس التنبيهات بناءً على صلاحية المستخدم */}
      {!isOwner && (
        <AlertBox message="عرض البيانات فقط: أنت مسجل كعضو فريق في هذا المشروع، مالك الفكرة (Owner) هو المخول الوحيد بتعبئة وتسليم البيانات." />
      )}
      {isOwner && !canEdit && submittedData && (
        <AlertBox message="لقد قمت بتسليم النموذج مسبقاً بنجاح، البيانات الآن قيد المراجعة والعرض ولا يمكن تعديلها." />
      )}
      {canEdit && (
        <AlertBox message="تنبيه للمالك: املأ الحقول بعناية، بمجرد النقر على زر الإرسال سيتم قفل النموذج وإرساله للمشرفين والمستثمرين." />
      )}

      {/* رسائل النجاح والخطأ */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center font-semibold text-sm">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-center font-semibold text-sm">
          {submitSuccess}
        </div>
      )}

      {/* الفورم الديناميكي مقسم بالتساوي على عمودين بشكل أنيق ومستقر */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* العمود الأول: الحقول الزوجية */}
          <div className="space-y-5">
            {currentStepFields
              .filter((_, idx) => idx % 2 === 0)
              .map((field) => (
                <div key={field.name} className={!canEdit ? "pointer-events-none opacity-85" : ""}>
                  <DynamicStep
                    stepName=""
                    fields={[field]}
                    form={form}
                    errors={errors}
                    handleChange={handleChange}
                  />
                </div>
              ))}
          </div>

          {/* العمود الثاني: الحقول الفردية */}
          <div className="space-y-5">
            {currentStepFields
              .filter((_, idx) => idx % 2 === 1)
              .map((field) => (
                <div key={field.name} className={!canEdit ? "pointer-events-none opacity-85" : ""}>
                  <DynamicStep
                    stepName=""
                    fields={[field]}
                    form={form}
                    errors={errors}
                    handleChange={handleChange}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* أزرار التحكم والإرسال للمالك فقط */}
        {canEdit && (
          <div className="flex items-center justify-center pt-4 border-t border-gray-100">
            <Button
              label={isSaving ? "جاري إرسال البيانات..." : "تأكيد وتسليم الاستمارة"}
              className="bg-main-color px-10 py-3 text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.01]"
              type="submit"
              disabled={isSaving}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ExhibitionStage;