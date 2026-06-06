import React from 'react';
import InfoRow from '../../components/InfoRow';
import Button from '../../components/Button';
import { useParams} from "react-router-dom";

import { useGetProjectIncubationInfoQuery } from "../../api/endpoints/projectInfoApi";

const IncubationProjectInfoPage = () => {
  const { id } = useParams();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetProjectIncubationInfoQuery(id);

  const projectData = data || {};

  const teamMembers = projectData?.team_members || [];

  if (isLoading) {
    return (
      <div className="text-center mt-10 font-bold">
        جاري تحميل تفاصيل مشروع الاحتضان...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-bold mb-4">
          حدث خطأ أثناء تحميل بيانات المشروع
        </p>
        <button
          onClick={refetch}
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-color p-4" dir="rtl">
      <div className="container mx-auto"> 
        
        {/* العناوين الرئيسية بدون تاريخ الجلسة الخاص بالتقييم */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b pb-4">
          <div className="text-right">
            <h1 className="text-second-color text-xl md:text-2xl font-bold mb-2">تفاصيل مشروع المحتضن</h1>
            <p className="text-gray-500 text-xs md:text-sm">معاينة وإدارة بيانات فكرة المشروع وفريق العمل خلال فترة الاحتضان.</p>
          </div>
        </div>
        
        {/* معلومات أساسية عن المشروع */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <InfoRow label="اسم المشروع :">{projectData?.project_title}</InfoRow>
          <InfoRow label="مسؤول التعديل (القائد) :">{projectData?.editor_name}</InfoRow>
          <InfoRow label="نوع المنتج :">{projectData?.product_type}</InfoRow>
        </div>

        {/* 1. معلومات شخصية وقيادية */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">1. معلومات شخصية وقيادية</h2>
          <InfoRow label="الاسم :" >{projectData?.owner_name}</InfoRow>
          <InfoRow label="رقم الهاتف :">{projectData?.phone} </InfoRow>
          <InfoRow label="الاختصاص :">{projectData?.specialization || "غير محدد"} </InfoRow>
          <InfoRow label="البريد الإلكتروني :">
            <span className='break-all md:break-normal'>{projectData?.email}</span> 
          </InfoRow>
        </div>
         {/* 2. معلومات عن الفريق */}
        {teamMembers.length > 0 && (
          <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
            <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">معلومات الفريق</h2>
            <div className="flex flex-col gap-2">
              {teamMembers.map((member, index) => (
                <InfoRow key={index} label={`اسم العضو (${index + 1}) :`}>
                  {member.name}
                </InfoRow>
              ))}
            </div>
          </div>
        )}

        {/* 3. معلومات عن الفكرة */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">2. معلومات عن الفكرة</h2>
          <InfoRow label="عنوان الفكرة :">{projectData?.idea_title}</InfoRow>
          <InfoRow label="القطاع المستهدف :" >{projectData?.target_audience}</InfoRow>
          <InfoRow label="وصف مختصر للفكرة :">{projectData?.description}</InfoRow>
        </div>

        {/* 4. المشكلة التي يحلها المشروع */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">3. المشكلة التي يحلها المشروع</h2>
          <div className="flex justify-between items-start text-right">
            <div className="font-bold text-black min-w-[180px] shrink-0">
              <span>المشكلة التي يحلها المشروع :</span>
            </div>
            <div className="flex-1 leading-relaxed pl-4">
              {projectData?.problem}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncubationProjectInfoPage;