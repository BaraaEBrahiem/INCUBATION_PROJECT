import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import Projects from "../../components/Projects";
import CategoryFilterBar from "../../components/CategoryFilterBar";

import { LuFileStack } from "react-icons/lu";
import { GrTechnology } from "react-icons/gr";
import { SlBookOpen } from "react-icons/sl";
import { GiStethoscope } from "react-icons/gi";

import {
  useGetPublicProjectsQuery,
} from "../../api/endpoints/publicProjectsApi";

const ProjectsPage = () => {
  const location = useLocation();

  const exhibitionYear =
    location.state?.year;

  const graduationStatus =
    location.state?.graduationStatus;

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const {
    data: projectsFromApi,
    isLoading,
    error,
    refetch,
  } = useGetPublicProjectsQuery();

  const fallbackProjects = [
    {
      id: 1,
      title:
        "موقع للتواصل الاجتماعي",
      category:
        "تكنولوجي",
      team_members: [
        "نصوح شاهين",
        "علي احمد",
      ],
      year: 2024,
      status:
        "GRADUATED_POSITIVE",
    },
    {
      id: 2,
      title:
        "منصة تعليمية",
      category:
        "تعليمي",
      team_members: [
        "نصوح شاهين",
        "علي احمد",
      ],
      year: 2024,
      status:
        "GRADUATED_NEGATIVE",
    },
  ];

  let projects = [];

  if (
    Array.isArray(
      projectsFromApi
    )
  ) {
    projects =
      projectsFromApi;
  }

  if (
    projectsFromApi?.results &&
    Array.isArray(
      projectsFromApi.results
    )
  ) {
    projects =
      projectsFromApi.results;
  }

  if (
    projectsFromApi?.data &&
    Array.isArray(
      projectsFromApi.data
    )
  ) {
    projects =
      projectsFromApi.data;
  }

  if (
    projects.length === 0
  ) {
    projects =
      fallbackProjects;
  }

  const normalizedProjects =
    projects.map(
      (project) => ({
        ...project,

        id:
          project.id,

        name:
          project.title ||
          "بدون عنوان",

        category:
          project.category ||
          "غير مصنف",

        members:
          Array.isArray(
            project.team_members
          )
            ? project.team_members
            : [],

        team:
          project.team ||
          "غير محدد",

        year:
          project.year,

        status:
          project.status,

        // ⭐ التوجيه الوحيد المسموح
        detailsPath:
          project.status ===
          "GRADUATED_NEGATIVE"
            ? `/admin/project-details/${project.id}`
            : `/card-request-details/${project.id}`,
      })
    );

  const getPageTitle =
    () => {
      if (
        graduationStatus ===
        "positive"
      ) {
        return "المشاريع المتخرجة - تخريج إيجابي";
      }

      if (
        graduationStatus ===
        "negative"
      ) {
        return "المشاريع المتخرجة - تخريج سلبي";
      }

      if (
        exhibitionYear
      ) {
        return `مشاريع معرض ${exhibitionYear}`;
      }

      return "جميع المشاريع";
    };

  const getFilteredByContext =
    () => {
      if (
        graduationStatus
      ) {
        return normalizedProjects.filter(
          (p) => {
            if (
              graduationStatus ===
              "positive"
            ) {
              return (
                p.status ===
                "GRADUATED_POSITIVE"
              );
            }

            if (
              graduationStatus ===
              "negative"
            ) {
              return (
                p.status ===
                "GRADUATED_NEGATIVE"
              );
            }

            return false;
          }
        );
      }

      if (
        exhibitionYear
      ) {
        return normalizedProjects.filter(
          (p) =>
            Number(
              p.year
            ) ===
            Number(
              exhibitionYear
            )
        );
      }

      return normalizedProjects;
    };

  const filteredByContext =
    getFilteredByContext();

  const filteredProjects =
    filteredByContext.filter(
      (project) => {
        const matchCategory =
          selectedCategory ===
            "all" ||
          project.category ===
            selectedCategory;

        const matchSearch =
          project.name
            ?.toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            );

        return (
          matchCategory &&
          matchSearch
        );
      }
    );

  const categories = [
    {
      id: "all",
      label: "الكل",
      icon:
        <LuFileStack />,
    },
    {
      id:
        "تكنولوجي",
      label:
        "تكنولوجي",
      icon:
        <GrTechnology />,
    },
    {
      id:
        "تعليمي",
      label:
        "تعليمي",
      icon:
        <SlBookOpen />,
    },
    {
      id: "طبي",
      label:
        "طبي",
      icon:
        <GiStethoscope />,
    },
  ];

  if (
    isLoading
  ) {
    return (
      <p className="text-center mt-10">
        جاري التحميل...
      </p>
    );
  }

  if (
    error
  ) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">
          حدث خطأ أثناء
          تحميل المشاريع
        </p>

        <button
          onClick={
            refetch
          }
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-20">
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