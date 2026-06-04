import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import Projects from "../../components/Projects";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import LoadingOverlay from "../../components/LoadingOverlay";
import { showError } from "../../utils/toast";

import { LuFileStack } from "react-icons/lu";
import { GrTechnology } from "react-icons/gr";
import { SlBookOpen } from "react-icons/sl";
import { GiStethoscope } from "react-icons/gi";
import { useGetUserPublicProjectsQuery } from "../../api/endpoints/publicProjectsApi";
import { useGetPublicProjectsQuery } from "../../api/endpoints/publicProjectsApi";
import { useGetExhibitionProjectsQuery } from "../../api/endpoints/admin/exhibitionApi";

const ProjectsPage = () => {
  const location = useLocation();
  const exhibitionYear = location.state?.year;
  const exhibitionId = location.state?.exhibitionId;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { 
    data: publicProjects, 
    isLoading: isLoadingPublic,
    error: errorPublic 
  } = useGetPublicProjectsQuery(undefined, {
    skip: !!exhibitionId,
  });
  const { data: userPublicProjects } = useGetUserPublicProjectsQuery(undefined, {
    skip: !!exhibitionId,
  });

  const { 
    data: exhibitionProjects, 
    isLoading: isLoadingExhibition,
    error: errorExhibition 
  } = useGetExhibitionProjectsQuery(exhibitionId, {
    skip: !exhibitionId,
  });
  


  useEffect(() => {
    if (errorPublic || errorExhibition) {
      showError("حدث خطأ أثناء تحميل قائمة المشاريع، يرجى إعادة المحاولة لاحقاً.");
    }
  }, [errorPublic, errorExhibition]);

  const isLoading = exhibitionId ? isLoadingExhibition : isLoadingPublic;

  if (isLoading) {
    return <LoadingOverlay>جاري تحميل قائمة المشاريع وتنسيق العرض...</LoadingOverlay>;
  }

  const fallbackProjects = [
    {
      id: 1,
      title: "موقع للتواصل الاجتماعي",
      sector: "تكنولوجي",
      owner: "أحمد العلي",
      team_members: ["نصوح شاهين", "علي احمد"],
      year: 2026
    },
    {
      id: 2,
      title: "منصة تعليمية ذكية",
      sector: "تعليمي",
      owner: "سارة خالد",
      team_members: ["رنا محمود"],
      year: 2026
    },
  ];

const serverProjects = exhibitionId ? exhibitionProjects : (publicProjects || userPublicProjects);

const rawProjects = (serverProjects && serverProjects.length > 0) 
  ? serverProjects 
  : fallbackProjects;

  // تحديث العنوان بناءً على السنة القادمة
  const getPageTitle = () => {
    if (exhibitionYear) return `مشاريع معرض التخرج ${exhibitionYear}`;
    return "معرض المشاريع المتخرجة والريادية";
  };
  const filteredProjects = rawProjects.filter((project) => {
    
    const matchCategory =
      selectedCategory === "all" || 
      project.sector?.toLowerCase() === selectedCategory.toLowerCase();

  
    const matchSearch =
      !searchQuery.trim() ||
      project.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const categories = [
    { id: "all", label: "الكل", icon: <LuFileStack /> },
    { id: "تكنولوجي", label: "تكنولوجي", icon: <GrTechnology /> },
    { id: "تعليمي", label: "تعليمي", icon: <SlBookOpen /> },
    { id: "طبي", label: "طبي", icon: <GiStethoscope /> },
  ];

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4 md:px-8 space-y-6 text-right" dir="rtl">
      
      {/* هيدر الصفحة */}
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-bold text-main-color">
          {getPageTitle()}
        </h2>
      
      </div>

     
      <div className="space-y-4">
        <CategoryFilterBar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        
        <div className="max-w-md">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>

      {/* عرض المشاريع أو معالجة الغياب */}
      {filteredProjects.length > 0 ? (
        <div className="pt-4">
          <Projects projects={filteredProjects} details="exhibition" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl py-16 text-center">
          <span className="text-3xl mb-2">📁</span>
          <p className="text-gray-500 font-bold text-lg">لا توجد مشاريع مطابقة للبحث حالياً</p>
          <p className="text-gray-400 text-xs mt-1">جرب اختيار قطاع آخر أو تعديل العبارة المكتوبة.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;