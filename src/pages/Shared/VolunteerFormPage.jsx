import React, { useState } from 'react';
import { useUpgradeToVolunteerMutation } from "../../api/endpoints/rolesApi";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import VolunteerForm from '../../components/Forms/VolunteerForm';
import { showSuccess, showError } from "../../Utils/toast";

const VolunteerFormPage = () => {
  const navigate = useNavigate();
  const [upgradeToVolunteer, { isLoading }] = useUpgradeToVolunteerMutation();
  const [showPendingModal, setShowPendingModal] = useState(false);

  const DAY_MAPPING = {
  "الأحد": "SUNDAY",
  "الاثنين": "MONDAY",
  "الثلاثاء": "TUESDAY",
  "الأربعاء": "WEDNESDAY",
  "الخميس": "THURSDAY",
  "الجمعة": "FRIDAY",
  "السبت": "SATURDAY",
};

const SKILL_MAPPING = {
  "Backend": "backend",
  "Frontend": "frontend",
  "UI/UX": "ui_ux",
  "Business": "business",
  "Marketing": "marketing",
  "Legal": "legal",
};

  const handleSubmit = async (rawFormData) => {
    try {
     
      const { availability, ...restOfData } = rawFormData;

      const formattedAvailabilityArray = Object.entries(availability || {})
      //eslint-disable-next-line
        .filter(([_, dayConfig]) => dayConfig.active === true) 
        .map(([dayName, dayConfig]) => ({
          day: DAY_MAPPING[dayName],                      
          start_time: dayConfig.from || "00:00", 
          end_time: dayConfig.to || "00:00"
        }));

      const apiPayload = {
        ...restOfData,
        primary_skills: SKILL_MAPPING[restOfData.primary_skills],
        availability: formattedAvailabilityArray 
      };

      console.log("===  الـ Payload النهائي (مصفوفة أيام) ===", apiPayload);

      const res = await upgradeToVolunteer(apiPayload).unwrap();

      if (res?.detail || res?.message) {
        showSuccess(res.detail || "تم تقديم طلبك بنجاح");
        setShowPendingModal(true);
      }
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      const errorMsg = error?.data?.message || error?.data?.detail || "حدث خطأ أثناء إرسال طلب التطوع";
      showError(errorMsg);
    }
  };

  return (
    <div className='bg-white-color min-h-screen w-full' dir="rtl">
      <div className='container pt-10 text-right'>
        <h1 className='text-2xl font-bold text-second-color'>أهلاً بك كمتطوع!</h1>
        <p className='text-gray-600 mt-2 mb-6'>
          أكمل بياناتك للمراجعة من قبل الإدارة.
        </p>

        {/* تمرير الدالة للمكون */}
        <VolunteerForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} isSubmitting={isLoading} />

        {/* مودال تأكيد الإرسال */}
        <Modal
          isOpen={showPendingModal}
          onClose={() => {
            setShowPendingModal(false);
            navigate("/visitor-mainpage");
          }}
          title="تم إرسال البيانات!"
          footer={
            <Button
              label="حسناً"
              onClick={() => navigate(-1)}
              className="bg-main-color px-6"
            />
          }
        >
          <p className="text-sm text-gray-700 text-right">
            شكراً لك! سيتم مراجعة طلبك من قبل الإدارة قريباً والرد عليك.
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default VolunteerFormPage;