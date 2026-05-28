import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader';
import AvailabilityBox from '../../components/AvailabilityBox';
import GeneralInfoBox from '../../components/GeneralInfoBox';
import Button from '../../components/Button';
import ProjectsSection from '../../components/ProjectsSection';
import avatar from "../../assets/images/avatar.jpg";
import ConsultationRequestBtn from '../../components/ConsultationRequestBtn';
// import { useGetProfileByIdQuery } from '../../api/endpoints/profileInfoApi';

const ProfileInfoPage = () => {
  // const { userId } = useParams();
  // const currentUserId = useSelector((state) => state.auth.userId); // المستخدم الحالي
  
  // const targetUserId = userId || currentUserId;

  // const { data:profileData, isLoading, error } = useGetProfileByIdQuery(targetUserId);

  // بيانات ثابتة حالياً
  const profileData = {
    image: avatar,
    name: "MAYA ALMOHAMAD",
    city: "حمص",
    specialty: "BACKEND",
    bio: "مطور Backend بخبرة ٤ سنوات. شغوف ببناء منصات ناشئة، ويحب مساعدة الفرق التقنية الجديدة.",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    behance: "https://behance.net/username"
  };

  const generalInfo = {
    experience: "٢-٥ سنوات",
    projectsCount: 3,
    mainSkills: ["Backend", "Laravel", "APIs"],
    volunteerTypes: ["استشارات", "تنفيذ مهام تقنية"], 
    Skills: ["Node.js", "Flutter", "React", "UI Wireframing"],
    Collaboration: ["تعاون طويل (شهرين+)", "تعاون قصير (Sprint قصير)"] 
  };
  
  const availabilityData = {
    days: [
      { name: "الثلاثاء", from: "٢", to: "٤", period: "PM" },
      { name: "الخميس", from: "٢", to: "٤", period: "PM" },
    ],
    weeklyHours: 8
  };

  const projectsData = [
    { name: "GreenApp" },
    { name: "GreenApp" },
    { name: "GreenApp" }
  ];

  // if (isLoading) return <div>جاري التحميل...</div>
  // if (error) return <div>حدث خطأ</div>

  return (
    <div className="h-full relative overflow-x-hidden" dir="rtl">
      <ProfileHeader profile={profileData} />
      
      <div className="container flex justify-center items-center mt-6">
        <AvailabilityBox availability={availabilityData} />
        <GeneralInfoBox info={generalInfo} />
      </div>

      <div className="flex items-center gap-3 mr-20 mt-10">
        <Button label="طلب انضمام" className="bg-main-color" />
        <ConsultationRequestBtn />
      </div>

      <div className="mt-70">
        <ProjectsSection projects={projectsData} />
      </div>
    </div>
  );
};

export default ProfileInfoPage;   