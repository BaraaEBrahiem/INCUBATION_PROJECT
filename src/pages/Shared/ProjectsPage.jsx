import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import Projects from "../../components/Projects";
import CategoryFilterBar from "../../components/CategoryFilterBar";

import { LuFileStack } from "react-icons/lu";
import { GrTechnology } from "react-icons/gr";
import { SlBookOpen } from "react-icons/sl";
import { GiStethoscope } from "react-icons/gi";


import { useGetPublicProjectsQuery } from "../../api/endpoints/publicProjectsApi";
import { useGetExhibitionProjectsQuery } from "../../api/endpoints/exhibitionApi";

const ProjectsPage = () => {
  const location = useLocation();
  const exhibitionYear = location.state?.year;
  const exhibitionId = location.state?.exhibitionId;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: publicProjects, isLoading: isLoadingPublic } = useGetPublicProjectsQuery(undefined, {
    skip: !!exhibitionId,
    
  });

  const { data: exhibitionProjects, isLoading: isLoadingExhibition } = useGetExhibitionProjectsQuery(exhibitionId, {
    skip: !exhibitionId,
  });

  const fallbackProjects = [
    {
      id: 1,

      name: "موقع للتواصل الاجتماعي",
      category: "تكنولوجي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      year: 2024
    },
    {
      id: 2,
      name: "منصة تعليمية",
      category: "تعليمي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      year: 2024
    },
    {
      id: 3,
      name: "نظام إدارة طلاب",
      category: "تعليمي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      year: 2023
    },
    {
      id: 4,
      name: "تطبيق طبي",
      category: "طبي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      year: 2024
    },
  ];

  const projects = exhibitionId 
    ? (exhibitionProjects || []) 
    : (publicProjects || fallbackProjects);

  const getPageTitle = () => {
    if (exhibitionYear) return `مشاريع معرض ${exhibitionYear}`;
    return "جميع المشاريع";
  };

  const getFilteredByContext = () => {
    if (exhibitionId) {
      return projects;
    }
    if (exhibitionYear) {
      return projects.filter((p) => p.year === exhibitionYear);
    }
    return projects;
  };

  const filteredByContext = getFilteredByContext();

  // الفلترة حسب الفئة والبحث
  const filteredProjects = filteredByContext.filter((project) => {
    const matchCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    const matchSearch =
      project.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const categories = [
    { id: "all", label: "الكل", icon: <LuFileStack /> },
    { id: "تكنولوجي", label: "تكنولوجي", icon: <GrTechnology /> },
    { id: "تعليمي", label: "تعليمي", icon: <SlBookOpen /> },
    { id: "طبي", label: "طبي", icon: <GiStethoscope /> },
  ];

  // دمج حالتي التحميل لضمان عدم حدوث مشاكل واجهة المستخدم
  const isLoading = exhibitionId ? isLoadingExhibition : isLoadingPublic;

  if (isLoading) return <p className="text-center mt-10">جاري التحميل...</p>;


  return (

    <div className='container mt-20 dir-rtl text-right'>
      <h2 className="text-xl font-bold mt-6 mb-4 text-main-color">
        {getPageTitle()}
      </h2>

      <div className="mt-4">
        <CategoryFilterBar
          categories={
            categories
          }
          selected={
            selectedCategory
          }
          onSelect={
            setSelectedCategory
          }
        />
      </div>

      <SearchBar
        onSearch={
          setSearchQuery
        }
      />

      <Projects
        projects={
          filteredProjects
        }
      />
    </div>
  );
};

export default ProjectsPage;