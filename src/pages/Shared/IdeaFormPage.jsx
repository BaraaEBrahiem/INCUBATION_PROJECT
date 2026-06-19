import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import IdeaForm from '../../components/Forms/IdeaForm'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { useGetActiveSeasonQuery } from '../../api/endpoints/seasonApi' 

const IdeaFormPage = () => {
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { data: activeSeason, isLoading: isLoadingSeason } = useGetActiveSeasonQuery();

  const handleSubmit = (response) => {
    if (response?.status === "SUBMITTED") {
      setShowSuccessModal(true);
    }
  };

  if (isLoadingSeason) {
    return <div className="text-center py-10">جاري التحقق من الموسم النشط...</div>;
  }

  const currentSeasonId = activeSeason?.season?.season_id;

  return (
    <div className='bg-white-color h-screen py-8 sm:w-full'>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold'>من الفكرة إلى الأثر</h1>
        <p className='text-gray-600'>
          املأ الاستمارة وخلي مشروعك بداية طريقك الريادي
        </p>
      </div>

      {currentSeasonId ? (
        <IdeaForm
          seasonId={currentSeasonId}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="text-center text-red-500 py-10">لا يوجد أي موسم نشط ومتاح للتقديم حالياً!</div>
      )}

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