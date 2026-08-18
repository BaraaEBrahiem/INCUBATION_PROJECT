import React, { useState } from "react";
import NewSeasonSettings from "../../components/Admin_Dashboard/IncubationSeasons/Create-Season/NewSeasonSettings"; // مكون إعدادات الموسم الجديد المطور
import FormBuilderManager from "../../components/Admin_Dashboard/IncubationSeasons/Create-Season/FormBuilderManager"; // مكون تصميم الاستمارة المطور
import { showSuccess, showError } from "../../Utils/toast";

import { useSaveFormStructureMutation } from "../../api/endpoints/admin/dynamicFormApi";

const CreateSeasonPage = () => {
 
  const [activeTab, setActiveTab] = useState("settings");
  
  const [createdSeasonId, setCreatedSeasonId] = useState(null);

  const [saveFormStructure, { isLoading: isPublishing }] = useSaveFormStructureMutation();

  const handleSeasonCreatedSuccess = (newSeasonData) => {
    // تخزين الـ id القادم من قاعدة البيانات (السيرفر)
    setCreatedSeasonId(newSeasonData.id);
    // نقله تلقائياً وبسلاسة إلى تبويب تصميم استمارة التقديم
    setActiveTab("builder");
  };

  // 2️⃣ دالة معالجة نشر الاستمارة وإرسال الـ Payload النهائي إلى الباك إند
  const handleFormSubmit = async (cleanPayload) => {
    if (!createdSeasonId) {
      showError("عذراً، لم يتم العثور على معرّف الموسم الحالي");
      return;
    }

    try {
      // 🌟 التعديل الثالث: إرسال المعاملات { seasonId, payload } تماماً كما يتوقعها ملف الـ API الخاص بكِ
      await saveFormStructure({ 
        seasonId: createdSeasonId, 
        payload: cleanPayload 
      }).unwrap();
      
      showSuccess("تم إنشاء الموسم الجديد وتصميم الاستمارة بالكامل بنجاح! 🎉");
    } catch (err) {
      console.error("Form Publish Error:", err);
      showError(err?.data?.detail || err?.data?.message || "حدث خطأ أثناء نشر استمارة النموذج");
    }
  };

 return (
  <div className="bg-white-color min-h-screen">
    <div className="container mx-auto p-4 md:p-6" dir="rtl">
      {/* رأس الصفحة والعناوين */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">إنشاء موسم حاضنة جديد</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          قم بتهيئة إعدادات الموسم وتواريخ التقديم، ثم صمم استمارة قبول الطلبات الخاصة به.
        </p>
      </div>

      {/* شريط تبويبات التنقل (Tabs): جعلناه flex-wrap ليتناسب مع الموبايل */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6 gap-2">
        <button
          onClick={() => setActiveTab("settings")}
          className={`py-2 px-3 md:px-4 font-semibold text-lg md:text-xl border-b-2 rounded-sm transition-all ${
            activeTab === "settings"
              ? "bg-gray-300 text-main-color"
              : "border-transparent text-gray-500 hover:text-gray-600"
          }`}
        >
          1. إعدادات وتواريخ الموسم
        </button>

        <button
          disabled={!createdSeasonId} 
          onClick={() => setActiveTab("builder")}
          className={`py-2 px-3 md:px-4 font-semibold text-lg md:text-xl border-b-2 transition-all ${
            !createdSeasonId 
              ? "text-gray-300 cursor-not-allowed border-transparent" 
              : activeTab === "builder"
              ? "bg-gray-300 text-main-color"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          2. تصميم استمارة التقديم
        </button>
      </div>

      {/* عرض المكون المناسب بناءً على التبويب النشط */}
      <div className="mt-4">
        {activeTab === "settings" && (
          <NewSeasonSettings onSubmit={handleSeasonCreatedSuccess} />
        )}

        {activeTab === "builder" && createdSeasonId && (
          <FormBuilderManager
            seasonId={createdSeasonId}
            onSubmit={handleFormSubmit}
            isSubmitting={isPublishing}
            isNewSeason={true}
          />
        )}
      </div>
    </div>
  </div>
);}
export default CreateSeasonPage;