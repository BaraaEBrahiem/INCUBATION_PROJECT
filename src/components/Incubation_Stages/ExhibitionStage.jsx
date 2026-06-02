 import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import AlertBox from "../AlertBox";
import Button from "../Button";

// استيراد دوال التوست المخصصة 
import { showSuccess, showError } from "../../utils/toast";

// [API LINKS] الروابط والـ Hooks متل المراحل السابقة
// import { useGetDashboardQuery, useGetExhibitionDashboardQuery, useSaveExhibitionDataMutation } from "../../api/endpoints/incubationApi";

const ExhibitionStage = ({ onComplete }) => {
  // const userId = useSelector((state) => state.auth.userId);

  // الـ Hooks الحقيقية للباك إند (قم بإلغاء التعليق عنها عند الربط الفعلي)
  // const { data: dashboardResponse, isLoading: isDashboardLoading } = useGetDashboardQuery();
  // const { data: exhibitionResponse, isLoading: isExhibitionLoading } = useGetExhibitionDashboardQuery();
  // const [saveExhibitionData, { isLoading: isSaving }] = useSaveExhibitionDataMutation();

  // =========================================================================
  // 🧪 محاكاة البيانات
  // =========================================================================
  const isDashboardLoading = false;
  const isExhibitionLoading = false;
  const isSaving = false;

  const dashboardResponse = {
    current_stage: "EXHIBITION", 
    data: {
      exhibition_date: "2026-05-30T06:00:00Z"
    }
  };

  const exhibitionResponse = {
    phase: "EXHIBITION",
    exhibition_date: "2026-05-30T06:00:00Z",
    is_owner: false,  
    can_edit: true,  
    form: {
      id: 1,
      title: "معرض صيف 2026",
      is_active: true,
      questions: [
        { id: 9, key: "title", label: "عنوان المشروع", type: "text", required: true, order: 1 },
        { id: 10, key: "sector", label: "القطاع", type: "text", required: true, order: 2 },
        { id: 2, key: "project_goal", label: "الهدف", type: "text", required: true, order: 3 },
        { id: 11, key: "services", label: "الخدمات", type: "text", required: true, order: 4 },
        { id: 12, key: "team_member_names", label: "أسماء أعضاء الفريق", type: "text", required: true, order: 5 },
        { id: 6, key: "team_member_emails", label: "إيميلات أعضاء الفريق", type: "text", required: true, order: 6 },
        { id: 8, key: "owner_email", label: "إيميل المالك", type: "text", required: true, order: 7 }
      ]
    },
    submitted_data: null
  };
  // =========================================================================

  const currentStage = dashboardResponse?.current_stage;
  const isOwner = exhibitionResponse?.is_owner ?? false;
  const canEdit = exhibitionResponse?.can_edit ?? false;
  const exhibitionDate = dashboardResponse?.data?.exhibition_date || exhibitionResponse?.exhibition_date;

  const getFieldsConfig = () => {
    if (exhibitionResponse?.submitted_data) {
      return [
        { name: "title", label: "عنوان المشروع", required: true },
        { name: "sector", label: "القطاع", required: true },
        { name: "project_goal", label: "الهدف", required: true },
        { name: "services", label: "الخدمات", required: true },
        { name: "team_member_names", label: "أسماء أعضاء الفريق", required: true },
        { name: "team_member_emails", label: "إيميلات أعضاء الفريق", required: true },
        { name: "owner_email", label: "إيميل المالك", required: true },
      ];
    }
    
    const questions = exhibitionResponse?.form?.questions || [];
    return [...questions]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(q => ({
        name: q.key,
        label: q.label,
        required: q.required
      }));
  };

  const allFields = getFieldsConfig();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  useEffect(() => {
    if (isFormInitialized || currentStage === "GRADUATED_NEGATIVE") return;
    if (isDashboardLoading || isExhibitionLoading) return;
 if (exhibitionResponse?.submitted_data) {
      setForm(exhibitionResponse.submitted_data);
      setIsFormInitialized(true);
    } else if (allFields.length > 0) {
      const initialForm = {};
      allFields.forEach(field => {
        initialForm[field.name] = "";
      });
      setForm(initialForm);
      setIsFormInitialized(true);
    }
  }, [exhibitionResponse, allFields, isFormInitialized, currentStage, isDashboardLoading, isExhibitionLoading]);

  const handleChange = (key, value) => {
    if (!isOwner || !canEdit) return; 
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    allFields.forEach(field => {
      if (field.required && !form[field.name]?.toString().trim()) {
        newErrors[field.name] = `${field.label} مطلوب;`
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOwner || !canEdit) return; 
    if (!validate()) {
      showError("يرجى ملء جميع الحقول المطلوبة بشكل صحيح."); 
      return;
    }

    try {
      // عند فك التعليق: استلام الاستجابة المباشرة التي تحتوي على الـ message من الباك إند
      // const response = await saveExhibitionData({ data: form }).unwrap();
      // showSuccess(response?.message || "Exhibition form submitted successfully.");
      
      // للمحاكاة الحالية:
      showSuccess("Exhibition form submitted successfully."); 
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    } catch (error) {
      // إظهار رسالة الخطأ القادمة من السيرفر إن وجدت أو رسالة افتراضية
      const serverError = error?.data?.message || "حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً.";
      showError(serverError); 
    }
  };

  if (isDashboardLoading || isExhibitionLoading) {
    return (
      <div className="p-6 text-center font-bold text-gray-500">جاري تحميل البيانات...</div>
    );
  }

  if (currentStage === "GRADUATED_NEGATIVE") {
    return (
      <div className="p-6 space-y-6 min-h-screen bg-white-color flex flex-col items-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">حالة المشروع النهائية</h2>
        <div className="w-full max-w-2xl">
          <AlertBox message={dashboardResponse?.data?.message || "غير مؤهل للوصول إلى مرحلة المعرض"} />
        </div>
      </div>
    );
  }

  const renderInputField = (field) => {
    const isDisabled = !isOwner || !canEdit;
    return (
      <div key={field.name} className="flex flex-col space-y-2 w-full">
        <label className="text-sm font-bold text-gray-700">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={form[field.name] || ""}
          disabled={isDisabled}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-second-color transition-all
            ${isDisabled ? "bg-gray-100 text-black border-second-color cursor-not-allowed opacity-90" : "bg-white text-black border-second-color"}
            ${errors[field.name] ? "border-red-500 focus:ring-red-500" : ""}
          `}
          placeholder={`${field.label}...`}
        />
        {errors[field.name] && (
          <span className="text-xs font-bold text-red-500">{errors[field.name]}</span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-white-color">
      
      {/* الهيدر وتاريخ المعرض */}
      <div className="border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-bold text-second-color mb-2">
 {exhibitionResponse?.form?.title || "بطاقة معرض المشاريع"} ({currentStage})
        </h2>
        <p className="font-bold text-gray-700">
          تاريخ المعرض النهائي: 
          <span className="text-main-color mr-2">
            {exhibitionDate ? new Date(exhibitionDate).toLocaleDateString() : "لم يحدد بعد"}
          </span>
        </p>
      </div>

      {/* التنبيهات الذكية بحسب صلاحيات الحالة */}
      {!isOwner ? (
        <AlertBox message="💡 وضع استعراض (عضو فريق): يمكنك فقط قراءة بطاقة المعرض المرسلة مسبقاً من قبل مالك المشروع." />
      ) : !canEdit ? (
        <AlertBox message="🔒 وضع العرض فقط: تم إغلاق فترة التعديل على بطاقة المعرض ولا يمكن تغيير البيانات الحالية." />
      ) : (
        <AlertBox message="✍️ وضع المالك: يرجى ملء حقول الفورم بالكامل لتأكيد وإنشاء بطاقة المعرض الخاصة بك." />
      )}

      {/* الفورم الموحد الموزع على عمودين متطابقين */}
      <form onSubmit={handleSubmit} className="mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start justify-center gap-8">
          
          {/* العمود الأول */}
          <div className="w-full md:w-[45%] space-y-6 ">
            {allFields.filter((_, idx) => idx % 2 === 0).map(field => renderInputField(field))}
          </div>

          {/* العمود الثاني */}
          <div className="w-full md:w-[45%] space-y-6">
            {allFields.filter((_, idx) => idx % 2 === 1).map(field => renderInputField(field))}
          </div>

        </div>

        {/* أزرار التحكم والـ Action */}
        {isOwner && canEdit ? (
          <div className="flex items-center justify-center mt-4">
            <Button 
              label={isSaving ? "جاري الإرسال..." : "إنشاء بطاقة المعرض"}
              className="bg-main-color px-8 py-2 text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
              type="submit"
              disabled={isSaving}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center mt-6 text-gray-500 font-bold bg-gray-50 py-3 rounded-lg border border-dashed border-gray-300">
            🔒 وضع القراءة فقط - تم تثبيت بيانات البطاقة بنجاح
          </div>
        )}
      </form>
    </div>
  );
};

export default ExhibitionStage;