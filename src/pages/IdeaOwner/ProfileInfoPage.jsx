import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader';
import AvailabilityBox from '../../components/AvailabilityBox';
import GeneralInfoBox from '../../components/GeneralInfoBox';
import Button from '../../components/Button';
import ConsultationRequestBtn from '../../components/ConsultationRequestBtn';
import { useGetProfileByIdQuery } from '../../api/endpoints/profileInfoApi';

const ProfileInfoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.auth.userId); 
  const userRole = useSelector((state) => state.auth.role) || ""; 

  const targetUserId = userId || currentUserId;

  const { data: profileData, isLoading, error } = useGetProfileByIdQuery(targetUserId, {
    skip: !targetUserId,
  });

  if (isLoading) {
    return (
      <div className="text-center mt-20 font-bold">
        جاري تحميل بيانات الملف الشخصي...
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        حدث خطأ أثناء تحميل البيانات أو الملف غير موجود.
      </div>
    );
  }

  const isIdeaOwner = userRole.includes("idea_owner") || userRole === "idea_owner";

  return (
   <div>
    <div className="w-full bg-main-color p-4 rounded-b-2xl">
      <ProfileHeader profile={profileData} />
      </div>
       <div className="container h-full " dir="rtl">
      <div className="flex justify-center items-center mt-20">
        <AvailabilityBox 
          availability={profileData.availability} 
          availabilityType={profileData.availability_type} 
        />
        <GeneralInfoBox info={profileData} />
      </div>

      {isIdeaOwner && (
        <div className="flex items-center gap-3 mr-20 mt-10">
          <Button 
            label="طلب انضمام" 
            className="bg-main-color" 
            onClick={() => { navigate("/volunteerform") }} 
          />
          <ConsultationRequestBtn />
        </div>
      )}
      <div className="flex items-center gap-3 mr-20 mt-10">
      <Button
      label={"العودة للتعديل"}
      onClick={() => {navigate(-1)}}
      className='bg-main-color'/>
      </div>
    </div>
  </div>
  );
};

export default ProfileInfoPage;