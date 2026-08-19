import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import IdeaForm from '../../components/Forms/IdeaForm'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { useGetCurrentActiveSeasonQuery } from '../../api/endpoints/seasonApi' 

const IdeaFormPage = () => {
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  const { 
    data: activeSeason, 
    isLoading: isLoadingSeason,
    error: seasonError 
  } = useGetCurrentActiveSeasonQuery();

  const handleSubmit = (response) => {
    if (response?.status === "SUBMITTED") {
      setShowSuccessModal(true);
    }
  };

  // حالة التحميل
  if (isLoadingSeason) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">جاري التحقق من الموسم النشط...</p>
      </div>
    );
  }

  // 2. التحقق الدقيق من نشاط الموسم بناءً على الاستجابة
  const seasonData = activeSeason?.season;
  const isSeasonActive = seasonData?.season_id && seasonData?.season_status === true;

  return (
    <div className='bg-white-color h-screen py-8 sm:w-full'>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold'>من الفكرة إلى الأثر</h1>
        <p className='text-gray-600'>
          املأ الاستمارة وخلي مشروعك بداية طريقك الريادي
        </p>
      </div>

      {/* 3. معالجة حالات عدم توفر الموسم النشط أو وجود خطأ في API */}
      {seasonError || !isSeasonActive ? (
        <div className="flex flex-col items-center justify-center p-8 mt-10 max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl text-center">
          <svg className="w-12 h-12 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-bold text-red-700 mb-1">انتهت فترة التقديم للموسم حاليا</h3>
         
        </div>
      ) : (
        <IdeaForm
          seasonId={seasonData.season_id}
          onSubmit={handleSubmit}
        />
      )}

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="🎉 تم تسجيلك كصاحب فكرة!"
        footer={
          <Button
            label="اذهب إلى تسجيل الدخول"
            onClick={() => navigate("/login")}
            className="bg-main-color"
          />
        }
      >
        <p className="text-sm">
          مبروك! أنت الآن صاحب فكرة معتمد ويمكنك البدء فوراً.
        </p>
      </Modal>
    </div>
  )
}

export default IdeaFormPage;