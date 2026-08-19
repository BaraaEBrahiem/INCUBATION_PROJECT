import React from "react";
import ProjectCard from "../ProjectCard";
import { useGetUserPublicProjectsQuery } from "../../api/endpoints/publicProjectsApi";

const Exhibition = ({ id }) => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetUserPublicProjectsQuery("all");

  if (isLoading) {
    return (
      <div className="p-4 mb-40" id={id}>
        <div className="container">
          <h1 className="text-second-color font-semibold text-[40px] mb-10">
            المعرض
          </h1>

          <div className="text-center py-10">
            جاري تحميل المشاريع...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 mb-40" id={id}>
        <div className="container">
          <h1 className="text-second-color font-semibold text-[40px] mb-10">
            المعرض
          </h1>

          <div className="text-center text-red-500">
            حدث خطأ أثناء تحميل المشاريع.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mb-40" id={id}>
      <div className="container">
        <h1 className="text-second-color font-semibold text-[40px] mb-10">
          المعرض
        </h1>

        <div className="flex flex-col gap-5">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                ShowImage={true}
                details="general"
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              لا توجد مشاريع في المعرض.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exhibition;