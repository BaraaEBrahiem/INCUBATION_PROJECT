import React, { useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom" 
import IdeaForm from '../../components/Forms/IdeaForm'
import Modal from '../../components/Modal'
import Button from '../../components/Button'

const IdeaFormPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const currentSeasonId = searchParams.get('season') || 3;

  const handleSubmit = (response) => {
    if (response?.status === "SUBMITTED") {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className='bg-white-color h-screen py-8 sm:w-full'>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold'>من الفكرة إلى الأثر</h1>
        <p className='text-gray-600'>
          املأ الاستمارة وخلي مشروعك بداية طريقك الريادي
        </p>
      </div>

      {/* 🎯 التعديل السحري: نمرر الرقم الديناميكي بعد تحويله لنوع Number */}
      <IdeaForm
        seasonId={Number(currentSeasonId)}
        onSubmit={handleSubmit}
      />

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="🎉 تم تسجيلك كصاحب فكرة!"
        footer={
          <Button
            label="اذهب إلى لوحة التحكم"
            onClick={() => navigate("/profile")}
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