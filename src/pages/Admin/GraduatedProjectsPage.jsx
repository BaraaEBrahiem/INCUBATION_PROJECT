import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import SearchBar from '../../components/SearchBar';
import CategoryFilterBar from '../../components/CategoryFilterBar';
import { LuFileStack } from "react-icons/lu";
import { GrTechnology } from "react-icons/gr";
import { SlBookOpen } from "react-icons/sl";
import { GiStethoscope } from "react-icons/gi";
import { useGetGraduatedProjectsQuery } from '../../api/endpoints/admin/graduationApi'; 

const GraduatedProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects = [], isLoading, isError } = useGetGraduatedProjectsQuery();

  const filteredProjects = projects.filter((project) => {
    const matchCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchSearch = project.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories = [
    { id: "all", label: "الكل", icon: <LuFileStack /> },
    { id: "تكنولوجي", label: "تكنولوجي", icon: <GrTechnology /> },
    { id: "تعليمي", label: "تعليمي", icon: <SlBookOpen /> },
    { id: "طبي", label: "طبي", icon: <GiStethoscope /> },
  ];


  if (isLoading) {
    return <div className="text-center mt-40 font-bold text-lg">جاري تحميل المشاريع المتخرجة...</div>;
  }

  if (isError) {
    return <div className="text-center mt-40 font-bold text-lg text-red-500">حدث خطأ أثناء جلب البيانات من السيرفر.</div>;
  }

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
    </div>
  );
};

export default GraduatedProjectsPage;