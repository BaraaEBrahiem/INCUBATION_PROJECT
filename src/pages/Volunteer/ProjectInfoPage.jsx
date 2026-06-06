import React from 'react';
import InfoRow from '../../components/InfoRow';
import Button from '../../components/Button';
import { useParams, useNavigate } from "react-router-dom";
import { useGetCurrentPhaseQuery } from "../../api/endpoints/seasonApi";
import {
  useGetAssignProjectInfoQuery,
} from "../../api/endpoints/projectInfoApi";

const ProjectInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetAssignProjectInfoQuery(id);

  const {
    data: phaseData,
  } = useGetCurrentPhaseQuery();
  
  const projectData = data || {};


  const handleOpenForm = () => {
    const ideaId = projectData?.idea_id;

    if (!ideaId) {
      alert("تعذر معرفة المشروع");
      return;
    }

    const currentPhase = phaseData?.phase?.code;

    if (currentPhase === "INCUBATION") {
      navigate(`/incubation-review/${ideaId}`);
      return;
    }

    if (currentPhase === "EVALUATION") {
      navigate(`/evaluationform/${ideaId}`);
      return;
    }

    alert("المرحلة الحالية لا تدعم النماذج");
  };


  if (isLoading) {
    return (
      <div className="text-center mt-10 font-bold">
        جاري تحميل تفاصيل المشروع...
      </div>
    );
  }



  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-bold mb-4">
          حدث خطأ أثناء تحميل البيانات
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
  // -------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-white-color p-4" dir="rtl">
      <div className="container mx-auto"> 
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b pb-4">
          <div className="text-right">
            <h1 className="text-second-color text-xl md:text-2xl font-bold mb-2">تفاصيل المشروع</h1>
            <span className='text-main-color font-bold text-sm md:text-base'>تاريخ الجلسة: {projectData?.meeting_date ? new Date(projectData.meeting_date).toLocaleString("ar"): "غير محدد"}</span>
          </div>
        </div>
        
        {/* معلومات أساسية */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <InfoRow label="اسم المشروع :">{projectData?.project_details?.project_title}</InfoRow>
          <InfoRow label="مسؤول التعديل (القائد) :">{projectData?.project_details?.editor_name}</InfoRow>
          <InfoRow label="نوع المنتج :">{projectData?.project_details?.product_type}</InfoRow>
        </div>

        {/* 1. معلومات شخصية وقيادية */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">1. معلومات شخصية وقيادية</h2>
          <InfoRow label="الاسم :" >{projectData?.project_details?.owner_name}</InfoRow>
          <InfoRow label="رقم الهاتف :">{projectData?.project_details?.phone} </InfoRow>
          <InfoRow label="الاختصاص :">{projectData?.project_details?.specialization} </InfoRow>
          <InfoRow label="البريد الإلكتروني :">
            <span className='break-all md:break-normal'>{projectData?.project_details?.email}</span> 
          </InfoRow>
        </div>

        {/* 2. معلومات عن الفكرة */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">2. معلومات عن الفكرة</h2>
          <InfoRow label="عنوان الفكرة :">{projectData?.project_details?.idea_title}</InfoRow>
          <InfoRow label="القطاع المستهدف :" >{projectData?.project_details?.target_audience}</InfoRow>
          <InfoRow label="وصف مختصر للفكرة :">{projectData?.project_details?.description}</InfoRow>
        </div>

        {/* 3. المشكلة التي يحلها المشروع */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">3. المشكلة التي يحلها المشروع</h2>
          <div className="flex justify-between items-start text-right">
            <div className="font-bold text-black min-w-[180px] shrink-0">
              <span>المشكلة التي يحلها المشروع :</span>
            </div>
            <div className="flex-1 leading-relaxed pl-4">
              {projectData?.project_details?.problem}
            </div>
          </div>
        </div>

        {/* زر الفورم */}
        <div className="flex justify-end mt-6">
          <Button
            label="فورم التقييم والملاحظات"
            onClick={handleOpenForm}
            className="bg-main-color"
          />
        </div>
        

      </div>
    </div>
  );
};

export default ProjectInfoPage;
