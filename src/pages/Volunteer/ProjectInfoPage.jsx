import React from 'react';
import InfoRow from '../../components/InfoRow';
import Button from '../../components/Button';
import { useParams, useNavigate } from "react-router-dom";
import { useGetCurrentPhaseQuery } from "../../api/endpoints/seasonApi";
import { 
  useGetAssignProjectInfoQuery, 
  useGetProjectIncubationInfoQuery 
} from "../../api/endpoints/projectInfoApi";

const ProjectInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //   جلب المرحلة الحالية للنظام
  const { data: phaseData, isLoading: isPhaseLoading } = useGetCurrentPhaseQuery();
  const currentPhase = phaseData?.phase?.code;

  // جلب بيانات التقييم 
  const {
    data: evaluationData,
    isLoading: isEvaluationLoading,
    error: evaluationError,
    refetch: refetchEvaluation,
  } = useGetAssignProjectInfoQuery(id, { skip: currentPhase !== "EVALUATION" });

  //  جلب بيانات الاحتضان 
  const {
    data: incubationData,
    isLoading: isIncubationLoading,
    error: incubationError,
    refetch: refetchIncubation,
  } = useGetProjectIncubationInfoQuery(id, { skip: currentPhase !== "INCUBATION" });

  //  دمج البيانات ديناميكياً حسب المرحلة الحالية
  const isEvaluation = currentPhase === "EVALUATION";
  const rawData = isEvaluation ? evaluationData : incubationData;
  const projectData = rawData || {};

  // في التقييم تكون داخل project_details، وفي الاحتضان تكون مباشرة في جذر الكائن
  const projectDetails = isEvaluation ? projectData?.project_details : projectData;
  const teamMembers = isEvaluation ? [] : (projectData?.team_members || []);

  // معالجة حالات التحميل لجميع الطلبات المشتركة
  const isLoading = isPhaseLoading || (isEvaluation ? isEvaluationLoading : isIncubationLoading);
  const error = isEvaluation ? evaluationError : incubationError;
  const refetch = isEvaluation ? refetchEvaluation : refetchIncubation;

  const handleOpenForm = () => {
    const ideaId = projectData?.idea_id || id;

    if (!ideaId) {
      alert("تعذر معرفة المشروع");
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
        جاري تحميل تفاصيل المشروع وتحديد المرحلة...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-bold mb-4">حدث خطأ أثناء تحميل البيانات</p>
        <button onClick={refetch} className="bg-main-color text-white px-4 py-2 rounded">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-color p-4" dir="rtl">
      <div className="container mx-auto"> 
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b pb-4">
          <div className="text-right">
            <h1 className="text-second-color text-xl md:text-2xl font-bold mb-2">تفاصيل المشروع</h1>
            
            {/*  يظهر التاريخ فقط في التقييم ويختفي  في الاحتضان */}
            {isEvaluation && (
              <span className='text-main-color font-bold text-sm md:text-base'>
                تاريخ الجلسة: {projectData?.meeting_date ? new Date(projectData.meeting_date).toLocaleString("ar"): "غير محدد"}
              </span>
            )}
          </div>
        </div>
        
        {/* معلومات أساسية */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <InfoRow label="اسم المشروع :">{projectDetails?.project_title}</InfoRow>
          <InfoRow label="مسؤول التعديل (القائد) :">{projectDetails?.editor_name}</InfoRow>
          <InfoRow label="نوع المنتج :">{projectDetails?.product_type}</InfoRow>
        </div>

        {/* 1. معلومات شخصية وقيادية */}
        <div className="bg-white p-8 rounded-sm shadow-md border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">1. معلومات شخصية وقيادية</h2>
          <InfoRow label="الاسم :" >{projectDetails?.owner_name}</InfoRow>
          <InfoRow label="رقم الهاتف :">{projectDetails?.phone} </InfoRow>
          <InfoRow label="الاختصاص :">{projectDetails?.specialization || "غير محدد"} </InfoRow>
          <InfoRow label="البريد الإلكتروني :">
            <span className='break-all md:break-normal'>{projectDetails?.email}</span> 
          </InfoRow>
        </div>

        {/*  معلومات الفريق: تظهر فقط في الاحتضان وإذا كانت هناك مصفوفة */}
        {!isEvaluation && teamMembers.length > 0 && (
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

        {/* 2. معلومات عن الفكرة */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">2. معلومات عن الفكرة</h2>
          <InfoRow label="عنوان الفكرة :">{projectDetails?.idea_title}</InfoRow>
          <InfoRow label="القطاع المستهدف :" >{projectDetails?.target_audience}</InfoRow>
          <InfoRow label="وصف مختصر للفكرة :">{projectDetails?.description}</InfoRow>
        </div>

        {/* 3. المشكلة التي يحلها المشروع */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-black mb-4 border-b border-second-color pb-2">3. المشكلة التي يحلها المشروع</h2>
          <div className="flex justify-between items-start text-right">
            <div className="font-bold text-black min-w-[180px] shrink-0">
              <span>المشكلة التي يحلها المشروع :</span>
            </div>
            <div className="flex-1 leading-relaxed pl-4">
              {projectDetails?.problem}
            </div>
          </div>
        </div>

        {/* زر الفورم الديناميكي */}
        {currentPhase === "EVALUATION" && (
        <div className="flex justify-end mt-6">
          <Button
            label={"فورم التقييم والملاحظات"}
            onClick={handleOpenForm}
            className="bg-main-color"
          />
        </div>
        )}
        
      </div>
    </div>
  );
};

export default ProjectInfoPage;