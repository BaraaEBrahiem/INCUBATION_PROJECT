import React from 'react';
// import { useParams } from 'react-router-dom';
import InfoRow from '../../components/InfoRow';
// import { useGetProjectInfoQuery } from '../../api/endpoints/projectsInfoApi';

const ProjectInfoPage = () => {
  // const { id } = useParams();

  // const { data: projectData, isLoading, error } = useGetProjectInfoQuery(id);

  // بيانات ثابتة حالياً
  const projectData = {
    meeting_date: "2024-07-15T14:30:00Z",
    project_details: {
      project_title: "منصة الشراكة الرقمية (Digital Partnership Platform)",
      editor_name: "ريم العلي",
      product_type: "منصة برمجية (SaaS) وتطبيق ويب." ,
      owner_name: "ريم فهد العلي",
      phone: "0987123456",
      specialization: "هندسة برمجيات",
      email: "reem.alali@example.com",
      idea_title: "منصة لربط المشاريع الناشئة بالمستشارين والمتطوعين في مجال الذكاء الاصطناعي.",
      target_audience: "التقنية المالية (FinTech) والتجارة الإلكترونية.",
      description: "بناء منصة SaaS لتقديم خدمة مطابقة ذكية (Smart Matching) تربط الشركات الناشئة التي تحتاج إلى تطوير حلول الذكاء الاصطناعي (AI) بالخبراء المستعدين لتقديم خدماتهم بالساعة أو مقابل حصة بسيطة.",
      problem: "تواجه الشركات الناشئة صعوبة في العثور على خبراء موثوقين في مجال الذكاء الاصطناعي لتطوير حلولها، بينما يمتلك العديد من الخبراء مهارات قيمة لا يتم استغلالها بشكل كامل.",
    }
  };

  // if (isLoading) return <div>جاري التحميل...</div>
  // if (error) return <div>حدث خطأ</div>

 return ( <div className="min-h-screen bg-white-color p-4">
      <div className="container mx-auto"> 
        <h1 className="text-second-color text-xl md:text-2xl font-bold mb-4 text-right">تفاصيل المشروع</h1>
        <span className='text-main-color font-bold text-xl mb-4'>تاريخ الجلسة :{projectData.meeting_date}</span>
        
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <InfoRow label="اسم المشروع :">{projectData.project_details.project_title}</InfoRow>
          <InfoRow label="مسؤول التعديل (القائد) :">{projectData.project_details.editor_name}</InfoRow>
          <InfoRow label="نوع المنتج :">{projectData.project_details.product_type}</InfoRow>
        </div>

        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">1. معلومات شخصية وقيادية</h2>
          <InfoRow label="الاسم :" >{projectData.project_details.owner_name}</InfoRow>
          <InfoRow label="رقم الهاتف :">{projectData.project_details.phone} </InfoRow>
          <InfoRow label="الاختصاص :">{projectData.project_details.specialization} </InfoRow>
          <InfoRow label="البريد الإلكتروني :">
          <span className='break-all md:break-normal'>{projectData.project_details.email}</span> </InfoRow>
              </div>

        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">2. معلومات عن الفكرة</h2>
          <InfoRow label="عنوان الفكرة :">{projectData.project_details.idea_title}</InfoRow>
          <InfoRow label="القطاع المستهدف :" >{projectData.project_details.target_audience}</InfoRow>
          <InfoRow label="وصف مختصر للفكرة :">{projectData.project_details.description}</InfoRow>
        </div>

        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">3.المشكلة التي يحلها المشروع </h2>
          <div className="flex justify-between items-start text-right">
            <div className="font-bold text-black min-w-[180px] shrink-0">
              <span>المشكلة التي يحلها المشروع :</span>
            </div>
            <div className="flex-1 leading-relaxed pl-4">
              {projectData.project_details.problem}
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default ProjectInfoPage;