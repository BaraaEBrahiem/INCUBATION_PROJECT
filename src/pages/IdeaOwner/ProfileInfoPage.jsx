import React, { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader';
import AvailabilityBox from '../../components/AvailabilityBox';
import GeneralInfoBox from '../../components/GeneralInfoBox';
import Button from '../../components/Button';
import Modal from '../../components/Modal'; 
import Input from '../../components/Input'; 
import LoadingOverlay from '../../components/LoadingOverlay'; 
import ConsultationRequestBtn from '../../components/ConsultationRequestBtn';
import { showSuccess, showError } from '../../utils/toast'; 

import { useGetProfileByIdQuery } from '../../api/endpoints/profileInfoApi';

import { useSendJoinRequestMutation } from '../../api/endpoints/teamApi'; 

const ProfileInfoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.auth.userId); 
  const userRole = useSelector((state) => state.auth.role) || ""; 

  const targetUserId = userId || currentUserId;

  // جلب بيانات الملف الشخصي
  const { data: profileData, isLoading, error } = useGetProfileByIdQuery(targetUserId, {
    skip: !targetUserId,
  });

  // التحكم بحالة مودال طلب الانضمام
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState("");
  const [validationError, setValidationError] = useState("");

  const [sendJoinRequest, { isLoading: isSubmittingJoin }] = useSendJoinRequestMutation();

  const isIdeaOwner = userRole.includes("volunteer") || userRole === "volunteer";

  const isOwnProfile = String(targetUserId) === String(currentUserId);

  if (isLoading) {
    return <LoadingOverlay>جاري تحميل بيانات الملف الشخصي... يرجى الانتظار</LoadingOverlay>;
  }

  if (error || !profileData) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-50 border border-red-100 p-6 rounded-2xl max-w-md shadow-sm">
          <p className="text-red-600 font-bold text-lg mb-1">حدث خطأ أثناء تحميل البيانات</p>
          <p className="text-gray-500 text-sm leading-relaxed">الملف الشخصي المطلوب غير موجود أو انتهت الجلسة.</p>
          <button onClick={() => navigate(-1)} className="mt-4 bg-second-color text-white px-5 py-2 rounded-xl text-xs font-bold">العودة للخلف</button>
        </div>
      </div>
    );
  }

  const handleOpenJoinModal = () => {
    setIsJoinModalOpen(true);
    setValidationError("");
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
    setDescription("");
    setTasks("");
    setValidationError("");
  };

  const handleJoinSubmit = async () => {
    if (!description.trim()) {
      setValidationError("الرجاء إدخال وصف للطلب");
      return;
    }
    if (!tasks.trim()) {
      setValidationError("الرجاء تحديد المهام المطلوبة من المتطوع");
      return;
    }

    try {
      await sendJoinRequest({
        volunteer_user_id: targetUserId,
        body: {
          description: description.trim(),
          tasks: tasks.trim(),
          required_skill: profileData?.primary_skills || profileData?.specialization, 
        }
      }).unwrap();

      showSuccess("تم إرسال طلب الانضمام بنجاح! طلبك قيد المراجعة من قبل المتطوع.");
      handleCloseJoinModal();
    } catch (err) {
      console.error("Join request failed:", err);
   
      const errorMsg = err?.data?.detail || err?.data?.non_field_errors?.[0] || "حدث خطأ أثناء إرسال طلب الانضمام";
      showError(errorMsg);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* هيدر الصفحة */}
      <div className="w-full bg-main-color p-4 rounded-b-2xl shadow-sm">
        <ProfileHeader profile={profileData} />
      </div>

      {/* محتوى بيانات البروفايل */}
      <div className="container mx-auto px-4 max-w-6xl" dir="rtl">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8">
          <AvailabilityBox 
            availability={profileData.availability} 
            availabilityType={profileData.availability_type} 
          />
          <GeneralInfoBox info={profileData} />
        </div>

        {/* شريط الإجراءات والعمليات  وبشرط ألا يكون بروفايله الشخصي */}
        {isIdeaOwner && !isOwnProfile && (
          <div className="flex items-center justify-center gap-4 mt-10 bg-gray-50 p-4 rounded-2xl border border-gray-100 max-w-2xl mx-auto">
            <Button 
              label="طلب انضمام للفريق" 
              className="bg-main-color text-white px-8 py-3 font-bold rounded-xl" 
              onClick={handleOpenJoinModal} 
            />
          
            <ConsultationRequestBtn consultant={profileData} />
          </div>
        )}

        {/* زر العودة والتحكم الإداري */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            label="العودة للصفحة السابقة"
            onClick={() => navigate(-1)}
            className="bg-second-color text-white px-6 py-2.5 rounded-xl text-sm font-medium opacity-80 hover:opacity-100 transition-all"
          />
        </div>
      </div>
      
      <Modal
        isOpen={isJoinModalOpen}
        onClose={handleCloseJoinModal}
        title={`دعوة انضمام للمشروع: ${profileData?.full_name || ''}`}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button 
              label={isSubmittingJoin ? "جاري إرسال الدعوة..." : "إرسال دعوة الانضمام"} 
              className="bg-main-color text-white px-6" 
              onClick={handleJoinSubmit}
              disabled={isSubmittingJoin}
            />
            <button 
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all" 
              onClick={handleCloseJoinModal}
            >
              إلغاء
            </button>
          </div>
        }
      >
        <form className="flex flex-col gap-4 pt-2" onSubmit={(e) => e.preventDefault()}>
          <p className="text-xs text-gray-500 leading-relaxed bg-blue-50/70 border border-blue-100 p-3 rounded-xl">
           سيتم إرسال هذا الطلب للمتطوع بناءً على طلب الفريق المعتمد مسبقاً لمشروعك
          </p>

          <Input
            type="text"
            label="تفاصيل الدعوة والطلب"
            placeholder="اكتب نبذة عن مشروعك ولماذا تريد هذا المتطوع بالذات..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setValidationError("");
            }}
          />

          <Input
            type="text"
            label="المهام والمستهدفات المطلوبة منه"
            placeholder="مثال: بناء الواجهات، مراجعة العقود، تهيئة الخوادم..."
            value={tasks}
            onChange={(e) => {
              setTasks(e.target.value);
              setValidationError("");
            }}
          />

          {validationError && (
            <p className="text-red-500 text-xs font-semibold bg-red-50 border border-red-100 p-2 rounded-lg text-center">
              ⚠️ {validationError}
            </p>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default ProfileInfoPage;