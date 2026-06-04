import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectDetailsCard from "../../components/ProjectDetailsCard";
import LoadingOverlay from "../../components/LoadingOverlay";
import { showError } from "../../utils/toast"; 


import { useGetProjectDetailsQuery } from "../../api/endpoints/publicProjectsApi";

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const { data: project, isLoading, error } = useGetProjectDetailsQuery(id);

  useEffect(() => {
    if (error) {
      const errorMsg = error?.data?.detail || "حدث خطأ أثناء تحميل تفاصيل المشروع";
      showError(errorMsg);
    }
  }, [error]);


  if (isLoading) {
    return <LoadingOverlay>جاري جلب وثائق الاستمارة وتفاصيل المشروع...</LoadingOverlay>;
  }

  const fallbackProjects = [
    {
      id: 1,
      title: "موقع للتواصل الاجتماعي",
      sector: "تكنولوجيا",
      team_members: ["نصوح شاهين", "ضياء الدين الصافي"],
      project_goal: "الهدف من المشروع هو توفير منصة آمنة للتواصل والترابط المجتمعي بين رواد الأعمال.",
      project_services: [
        "خدمة غرف النقاش الحية والافتراضية",
        "مشاركة الملفات والمستندات التقنية",
        "تنسيق المواعيد والاجتماعات الدورية"
      ],
      emails: ["info@greenpanda.com"],
      owner_email: "owner@greenpanda.com"
    }
  ];


  const finalProject = project || fallbackProjects.find((p) => p.id === Number(id));

  return (
    <div className="container py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-6" dir="rtl">
      {finalProject ? (
  
        <ProjectDetailsCard project={finalProject} />
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl py-16 text-center">
          <span className="text-4xl mb-2">🔍</span>
          <p className="text-gray-500 font-bold text-lg">لم يتم العثور على المشروع المطلوب</p>
          <p className="text-gray-400 text-xs mt-1">تأكد من صحة الرابط أو أن المشروع قد تم اعتماده من قبل الإدارة.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;