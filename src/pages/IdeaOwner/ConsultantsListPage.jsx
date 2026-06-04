import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ConsultantsList from "../../components/ConsultantsList";
import LoadingOverlay from "../../components/LoadingOverlay";
import { showError } from "../../Utils/toast";

import { useGetConsultantsBySpecialtyQuery } from "../../api/endpoints/consultantsApi";

const ConsultantsListPage = () => {
  // استقبال المعرّف من الرابط (مثال: uiux, backend, frontend)
  const { categoryId } = useParams();

  // 1. جلب البيانات من السيرفر وتمرير الـ categoryId كـ بارامتر للمسار
  const { 
    data: consultantsResponse, 
    isLoading, 
    error, 
    refetch 
  } = useGetConsultantsBySpecialtyQuery(categoryId);

  // 2. مراقبة الأخطاء وإطلاق التوست العائم فوراً
  useEffect(() => {
    if (error) {
      const errorMsg = error?.data?.detail || "حدث خطأ أثناء تحميل قائمة المستشارين";
      showError(errorMsg);
    }
  }, [error]);

  // 3. معالجة حالة التحميل باستخدام المكون الموحد الأنيق
  if (isLoading) {
    return (
      <LoadingOverlay>
        جاري البحث عن المستشارين المتاحين في هذا الاختصاص...
      </LoadingOverlay>
    );
  }

  // 4. استخراج المستشارين بذكاء بناءً على ردود الباك اند المتنوعة
  // إذا أعاد الباك اند "results" نأخذها، وإذا لم يجد (أو أعاد رسالة نصية) نعتمد مصفوفة فارغة
  const consultants = consultantsResponse?.results || [];

  return (
    <div className="container py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* هيدر الصفحة والـ Category */}
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-second-color uppercase">
          المستشارون المتاحون: <span className="text-main-color font-medium">{categoryId}</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          يمكنك حجز جلسة استشارية مع الخبراء المعتمدين لتطوير مشروعك.
        </p>
      </div>

      {/* عرض قائمة المستشارين أو معالجة حالة المصفوفة الفارغة */}
      {consultants.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6">
          <ConsultantsList consultants={consultants} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl py-16 text-center">
          <span className="text-4xl mb-3">ℹ️</span>
          <p className="text-gray-500 font-bold text-lg">
            لا يوجد مستشارون متاحون في هذا الاختصاص حالياً.
          </p>
          <p className="text-gray-400 text-sm mt-1 max-w-xs">
            يرجى مراجعة المنصة لاحقاً أو التواصل مع الإدارة لطلب دعم مخصص.
          </p>
          {error && (
            <button 
              onClick={refetch}
              className="mt-4 bg-second-color text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-all cursor-pointer"
            >
              إعادة محاولة الاتصال
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsultantsListPage;