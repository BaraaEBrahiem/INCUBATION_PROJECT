import React from 'react'
import { useNavigate } from "react-router-dom"
import IdeaForm from '../../components/Forms/IdeaForm'
import Modal from '../../components/Modal'
import Button from '../../components/Button'

import { useState } from 'react'

const IdeaFormPage = () => {
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = (response) => {

    if (
      response?.status ===
      "SUBMITTED"
    ) {
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

    <IdeaForm
      seasonId={1}
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

export default IdeaFormPage