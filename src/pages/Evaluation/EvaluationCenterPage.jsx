import React from "react";
import ProjectEvaluationCard from "../../components/ProjectEvaluationCard";
import Button from "../../components/Button";
import NavLinkUniversal from "../../components/NavLinkUniversal";
// import { useGetPublicProjectsQuery } from "../../api/endpoints/publicProjectsApi";

const FALLBACK_PROJECTS = [
  {
    id: 1,
    idea_id:1,
    title: "اسم المشروع",
    product_type: "منصة برمجية (SaaS) وتطبيق ويب",
    target_audience: "التقنية المالية (FinTech) والتجارة الإلكترونية",
  },
  {
    id: 2,
    idea_id:2,
    title: "مشروع آخر",
    product_type: "تطبيق جوال",
    target_audience: "الصحة الرقمية (HealthTech)",
  },
  {
    id: 3,
    idea_id:3,
    title: "منصة تعليمية",
    product_type: "منصة ويب",
    target_audience: "التعليم الإلكتروني (EdTech)",
  }
];

const EvaluationCenterPage = () => {
  // TODO: بعد الربط استخدمي هذا السطر بدل البيانات الثابتة
  // const { data: projectsFromApi, isLoading, error, refetch } = useGetPublicProjectsQuery();
  
  // حالياً: استخدام بيانات ثابتة
  const projects = FALLBACK_PROJECTS;
  // const isLoading = false;
  // const error = null;

  // حالة التحميل (لما يتحول للربط)
  // if (isLoading) {
  //   return (
  //     <div className="container py-6">
  //       <h1 className="text-3xl font-bold text-second-color mb-6">مركز التقييم</h1>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         {[1, 2].map((i) => (
  //           <div key={i} className="bg-gray-100 h-48 rounded-lg animate-pulse"></div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  // حالة الخطأ (لما يتحول للربط)
  // if (error) {
  //   return (
  //     <div className="container py-6">
  //       <h1 className="text-3xl font-bold text-second-color mb-6">مركز التقييم</h1>
  //       <div className="text-center py-10">
  //         <p className="text-red-500 mb-4">حدث خطأ في تحميل المشاريع</p>
  //         <button 
  //           onClick={refetch}
  //           className="bg-main-color text-white px-4 py-2 rounded"
  //         >
  //           إعادة المحاولة
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold text-second-color mb-6">
        مركز التقييم
      </h1>

      {projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">لا توجد مشاريع متاحة للتقييم حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {projects.map((project) => (
            <ProjectEvaluationCard
              key={project.id}
              project={project}
              onViewDetails={() => window.location.href = `/projectinfo/${project.id}`}
            />
          ))}
        </div>
      )}

      <div className="flex justify-start">
        <NavLinkUniversal 
          label={<Button label="نموذج التقييم" className="bg-main-color"/>} 
          to="/evaluationform"
        />
      </div>
    </div>
  );
};

export default EvaluationCenterPage;