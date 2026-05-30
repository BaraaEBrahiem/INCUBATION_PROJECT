import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import SearchBar from '../../components/SearchBar';
import CategoryFilterBar from '../../components/CategoryFilterBar';
import { LuFileStack } from "react-icons/lu";
import { GrTechnology } from "react-icons/gr";
import { SlBookOpen } from "react-icons/sl";
import { GiStethoscope } from "react-icons/gi";
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { useGetGraduatedProjectsQuery } from '../../api/endpoints/admin/graduationApi'; 
>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889

>>>>>>> adminFeature
const GraduatedProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

<<<<<<< HEAD
  const fallbackProjects = [
    {
      id: 1,
      name: "موقع للتواصل الاجتماعي",
      category: "تكنولوجي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      status: "positive"
    },
    {
      id: 2,
      name: "منصة تعليمية",
      category: "تعليمي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      status: "negative"
    },
    {
      id: 3,
      name: "نظام إدارة طلاب",
      category: "تعليمي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      status: "positive"
    },
    {
      id: 4,
      name: "تطبيق طبي",
      category: "طبي",
      team: "Green Panda",
      members: ["نصوح شاهين", "علي احمد"],
      status: "positive"
    },
  ];

  // 1) الفلترة الصحيحة بحسب الفئة والبحث
  const filteredProjects = fallbackProjects.filter((project) => {
    const matchCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
=======
  const { data: projects = [], isLoading, isError } = useGetGraduatedProjectsQuery();

  const filteredProjects = projects.filter((project) => {
    const matchCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchSearch = project.title?.toLowerCase().includes(searchQuery.toLowerCase());
>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889
    return matchCategory && matchSearch;
  });

  const categories = [
    { id: "all", label: "الكل", icon: <LuFileStack /> },
    { id: "تكنولوجي", label: "تكنولوجي", icon: <GrTechnology /> },
    { id: "تعليمي", label: "تعليمي", icon: <SlBookOpen /> },
    { id: "طبي", label: "طبي", icon: <GiStethoscope /> },
  ];

<<<<<<< HEAD
=======

  if (isLoading) {
    return <div className="text-center mt-40 font-bold text-lg">جاري تحميل المشاريع المتخرجة...</div>;
  }

  if (isError) {
    return <div className="text-center mt-40 font-bold text-lg text-red-500">حدث خطأ أثناء جلب البيانات من السيرفر.</div>;
  }

>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889
  return (
    <div className='container mt-20 dir-rtl text-right'>
      <h2 className="text-xl font-bold mt-6 mb-4 text-main-color">
        إدارة المشاريع المتخرجة
      </h2>

      <div className="mt-4">
        <CategoryFilterBar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      
      <SearchBar onSearch={setSearchQuery} />
<<<<<<< HEAD
     <div className="grid grid-cols-3 gap-6 mt-6">
      {filteredProjects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          details={project.status === "positive" ? "graduated-positive" : "graduated-negative"} 
        />
      ))}
    </div>
=======

      {filteredProjects.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">لا توجد مشاريع متطابقة مع البحث.</div>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              details={"graduated"} 
            />
          ))}
        </div>
      )}
>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889
    </div>
  );
};

export default GraduatedProjectsPage;