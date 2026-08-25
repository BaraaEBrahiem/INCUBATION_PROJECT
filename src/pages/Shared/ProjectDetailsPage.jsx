import React, {
  useEffect,
} from "react";

import {
  useParams,
} from "react-router-dom";

import ProjectDetailsCard from "../../components/ProjectDetailsCard";
import LoadingOverlay from "../../components/LoadingOverlay";

import { showError } from "../../Utils/toast";

import {
  useGetProjectDetailsQuery,
} from "../../api/endpoints/publicProjectsApi";

const ProjectDetailsPage =
  () => {
    const { id } =
      useParams();

    const {
      data: project,
      isLoading,
      error,
    } =
      useGetProjectDetailsQuery(
        id
      );

    useEffect(() => {
      if (error) {
        const errorMsg =
          error?.data
            ?.detail ||
          "حدث خطأ أثناء تحميل تفاصيل المشروع";

        showError(
          errorMsg
        );
      }
    }, [error]);

    if (isLoading) {
      return (
        <LoadingOverlay>
          جاري جلب تفاصيل
          المشروع...
        </LoadingOverlay>
      );
    }

    // تحويل بيانات الباك
    const finalProject =
      project
        ? {
            id: project.id,

            title:
              project.title ||
              "بدون عنوان",
            image: project.image, 

            sector:
              project.sector ||
              "غير محدد",

            team_members:
              project.team_members ||
              [],

            project_goal:
              project.project_goal ||
              "لا يوجد وصف",

            project_services:
  Array.isArray(
    project.project_services
  )
    ? project.project_services
    : project.project_services
    ? [project.project_services]
    : [],

            emails:
              project.emails ||
              [],

            owner_email:
              project.owner_email ||
              "",

            owner_id:
              project.owner_id,
          
               
          }
        : null;
    

    return (
      <div
        className="container py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-6"
        dir="rtl"
      >
        {finalProject ? (
          <ProjectDetailsCard
            project={
              finalProject
            }
          />
        ) : (
          <div className="flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl py-16 text-center">
            <span className="text-4xl mb-2">
              🔍
            </span>

            <p className="text-gray-500 font-bold text-lg">
              لم يتم العثور
              على المشروع
              المطلوب
            </p>

            <p className="text-gray-400 text-xs mt-1">
              تأكد من صحة
              الرابط أو أن
              المشروع قد
              تم اعتماده.
            </p>
          </div>
        )}
      </div>
    );
  };

export default ProjectDetailsPage;